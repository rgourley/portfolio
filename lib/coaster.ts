// Market Coaster session clock, shared by the bars and session routes.
// A regular session runs from 9:30 to 16:00 ET. A session counts as finished 20 minutes after the close,
// so late prints are in before the data is cached.

const ET_HOUR = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", hourCycle: "h23" });
const ET_DATE = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" });

export const SESSION_SECONDS = 390 * 60;
export const SETTLE_SECONDS = 20 * 60;

// The epoch second of 9:30 ET on the date, for both standard and daylight time.
export function sessionOpen(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  for (const utcHour of [13, 14]) {
    const t = Date.UTC(y, m - 1, d, utcHour, 30);
    if (Number(ET_HOUR.format(new Date(t))) === 9) return t / 1000;
  }
  throw new Error(`no 9:30 ET found for date=${date}`);
}

export function isFinished(date: string, nowSeconds: number): boolean {
  return sessionOpen(date) + SESSION_SECONDS + SETTLE_SECONDS <= nowSeconds;
}

// Weekdays from today back, newest first, that have finished. Holidays are not known here.
// The caller skips a date when Massive has no trading for it.
export function recentWeekdays(nowSeconds: number, count: number): string[] {
  const out: string[] = [];
  for (let back = 0; out.length < count && back < count * 3; back++) {
    const date = ET_DATE.format(new Date((nowSeconds - back * 86400) * 1000));
    const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
    if (weekday === 0 || weekday === 6 || !isFinished(date, nowSeconds)) continue;
    out.push(date);
  }
  return out;
}

// Crypto trades all day, so a crypto ride is one ET calendar day, midnight to midnight, in 1-minute bars.
export const CRYPTO_TICKER = /^X:[A-Z0-9]{2,15}USD$/;
export const DAY_SECONDS = 86400;

// The epoch second of midnight ET at the start of the date, for both standard and daylight time.
export function dayStart(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  for (const utcHour of [4, 5]) {
    const t = Date.UTC(y, m - 1, d, utcHour, 0);
    if (Number(ET_HOUR.format(new Date(t))) === 0) return t / 1000;
  }
  throw new Error(`no midnight ET found for date=${date}`);
}

// The date after the given date. An ET day is 23 or 25 hours long when the clocks change, so a day ends at the next midnight.
export function nextDate(date: string): string {
  return new Date(Date.parse(`${date}T12:00:00Z`) + DAY_SECONDS * 1000).toISOString().slice(0, 10);
}

export function dayEnd(date: string): number {
  return dayStart(nextDate(date));
}

export function isDayFinished(date: string, nowSeconds: number): boolean {
  return dayEnd(date) + SETTLE_SECONDS <= nowSeconds;
}

// The newest ET calendar day that has finished. A crypto ride from search rides this day.
export function lastCryptoDay(nowSeconds: number): string {
  for (let back = 0; back < 3; back++) {
    const date = ET_DATE.format(new Date((nowSeconds - back * DAY_SECONDS) * 1000));
    if (isDayFinished(date, nowSeconds)) return date;
  }
  throw new Error(`no finished ET day found for nowSeconds=${nowSeconds}`);
}

// Prices are stored as integers. Cents lose a coin like DOGE at $0.08, so a low price gets more decimal places.
// The scale keeps at least five significant digits.
export function priceScale(price: number): number {
  const digits = Math.max(2, Math.ceil(5 - Math.log10(price)));
  return 10 ** Math.min(digits, 10);
}
