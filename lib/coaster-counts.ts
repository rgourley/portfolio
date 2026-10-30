import { createHash, randomUUID } from "node:crypto";
import { isDayFinished, isFinished } from "@/lib/coaster";

// Market Coaster ride counts in Upstash Redis, through its REST API.
// Each UTC day has two ranked sets: rides started ("ridden") and shared ride links opened ("shared").
// "This week" is the union of the last 7 days, so the lists never empty out at the start of a week.
// A visitor counts once per ride per day. One address counts at most RATE_LIMIT rides an hour.
// The store keeps a hash of the address, never the address itself.

export type TopEntry = { id: string; n: number };
export type Top = { ridden: TopEntry[]; shared: TopEntry[] };
type Reply = { result?: unknown; error?: string };

const DAY_TTL = 8 * 86400;
const SEEN_TTL = 86400;
const RATE_LIMIT = 30;
// A ride shows in a list only after this many counts, so one visitor cannot put a ride on the board.
export const MIN_COUNT = 3;
const LIST_SIZE = 12;

// KEYS: rate key, ridden seen key, ridden day set, and for a shared open also the shared seen key and shared day set.
// ARGV: ride id, rate limit, day set TTL. The return value is 1 when the ride count went up, else 0.
const COUNT_SCRIPT = `
local n = redis.call('INCR', KEYS[1])
if n == 1 then redis.call('EXPIRE', KEYS[1], 3600) end
if n > tonumber(ARGV[2]) then return 0 end
local counted = 0
if redis.call('SET', KEYS[2], 1, 'NX', 'EX', ${SEEN_TTL}) then
  redis.call('ZINCRBY', KEYS[3], 1, ARGV[1])
  redis.call('EXPIRE', KEYS[3], ARGV[3])
  counted = 1
end
if KEYS[4] and redis.call('SET', KEYS[4], 1, 'NX', 'EX', ${SEEN_TTL}) then
  redis.call('ZINCRBY', KEYS[5], 1, ARGV[1])
  redis.call('EXPIRE', KEYS[5], ARGV[3])
end
return counted`;

async function redis(commands: Array<Array<string | number>>): Promise<unknown[]> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("ride counts are not configured: KV_REST_API_URL or KV_REST_API_TOKEN is missing");
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  const body = (await res.json().catch(() => null)) as Reply[] | null;
  if (!res.ok || !Array.isArray(body)) throw new Error(`Upstash pipeline failed: status=${res.status} body=${JSON.stringify(body).slice(0, 200)}`);
  const bad = body.find((r) => r.error);
  if (bad) throw new Error(`Upstash command failed: ${bad.error}`);
  return body.map((r) => r.result);
}

// A session token names a stock session ("orcl-oct-28-2026") or a crypto day ("crypto-btcusd-oct-27-2026").
// The token counts only when the date is a real calendar date on a finished day. Stock sessions are weekdays only.
const SESSION = /^(crypto-)?([a-z0-9.]{1,15})-([a-z]{3})-(\d{1,2})-(\d{4})$/;
const STOCK = /^[a-z][a-z0-9.]{0,9}$/;
const COIN = /^[a-z0-9]{2,15}usd$/;
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const FIRST_YEAR = 2003;

export function isSessionToken(token: string, nowMs: number): boolean {
  const m = SESSION.exec(token);
  if (!m) return false;
  const crypto = Boolean(m[1]);
  if (!(crypto ? COIN : STOCK).test(m[2])) return false;
  const month = MONTHS.indexOf(m[3]);
  const year = Number(m[5]);
  if (month < 0 || year < FIRST_YEAR) return false;
  const day = new Date(Date.UTC(year, month, Number(m[4]), 12));
  if (day.getUTCMonth() !== month) return false;
  const date = day.toISOString().slice(0, 10);
  if (crypto) return isDayFinished(date, nowMs / 1000);
  const weekday = day.getUTCDay();
  return weekday !== 0 && weekday !== 6 && isFinished(date, nowMs / 1000);
}

const utcDate = (ms: number): string => new Date(ms).toISOString().slice(0, 10);
const lastDays = (nowMs: number, count: number): string[] => Array.from({ length: count }, (_, i) => utcDate(nowMs - i * 86400000));
const visitor = (address: string): string => createHash("sha256").update(`coaster:${address}`).digest("hex").slice(0, 16);

export async function countRide(rideId: string, shared: boolean, address: string, nowMs: number): Promise<boolean> {
  const day = utcDate(nowMs);
  const who = visitor(address);
  const keys = [`mc:rate:${who}`, `mc:seen:ridden:${day}:${who}:${rideId}`, `mc:ridden:${day}`];
  if (shared) keys.push(`mc:seen:shared:${day}:${who}:${rideId}`, `mc:shared:${day}`);
  const [result] = await redis([["EVAL", COUNT_SCRIPT, keys.length, ...keys, rideId, RATE_LIMIT, DAY_TTL]]);
  return result === 1;
}

// ZRANGE ... WITHSCORES returns [member, score, member, score, ...].
function ranked(flat: unknown): TopEntry[] {
  if (!Array.isArray(flat)) throw new Error(`Upstash ZRANGE returned ${JSON.stringify(flat).slice(0, 200)}`);
  const out: TopEntry[] = [];
  for (let i = 0; i < flat.length; i += 2) out.push({ id: String(flat[i]), n: Number(flat[i + 1]) });
  return out;
}

// Redis adds the last 7 days into a short-lived key and returns only the top LIST_SIZE rides with MIN_COUNT or more.
export async function topRides(nowMs: number): Promise<Top> {
  const days = lastDays(nowMs, 7);
  const run = randomUUID();
  const top = (kind: string): Array<Array<string | number>> => {
    const tmp = `mc:tmp:${kind}:${run}`;
    return [
      ["ZUNIONSTORE", tmp, days.length, ...days.map((d) => `mc:${kind}:${d}`)],
      ["ZRANGE", tmp, "+inf", MIN_COUNT, "BYSCORE", "REV", "LIMIT", 0, LIST_SIZE, "WITHSCORES"],
      ["DEL", tmp],
    ];
  };
  const replies = await redis([...top("ridden"), ...top("shared")]);
  return { ridden: ranked(replies[1]), shared: ranked(replies[4]) };
}
