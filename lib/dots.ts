/* Dot images, shared by the case studies and the index pages.
   Each image is sampled on a grid; every cell becomes one round dot whose radius follows the darkness of the pixel on paper
   (brightness on a dark page, and brightness too when the image itself is dark, so a dark UI reads as a wireframe of its light parts).
   Dots start scattered and gather when the image comes into view, row by row. Once settled they take their pixel colours and the
   photograph fades in beneath them. From then on only the dots the cursor disturbs are drawn: they fly off the image in colour and
   spring back. Only the first image on a page gathers (gather forces it, still prevents it); the rest arrive as the photo,
   and an image that has built once this session arrives as the photo too. Phases: gather, colour, reveal, photo.
   The photograph itself is a next/image element the component renders; the engine only reads its pixels and fades it in. */

type Phase = "gather" | "colour" | "reveal" | "photo";
export interface DotOptions { cell?: number; gather?: boolean; still?: boolean; pageKey?: string }

const PAD = 64, TAU = Math.PI * 2;
let reduce = false, dark = false, ink = "#161616", inkRGB = [22, 22, 22];
const instances: Dots[] = [];
let lastP: { x: number; y: number; t: number } | null = null, mvx = 0, mvy = 0;
let built: Record<string, 1> = {};
let booted = false, firstTaken = false, pageKey = "";
let rafId = 0, last = 0;

function rnd(a: number, b: number) { return a + Math.random() * (b - a); }
function mix(a: number, b: number, f: number) { return Math.round(a + (b - a) * f); }
function markBuilt(src: string) { built[src] = 1; try { sessionStorage.setItem("dotsBuilt", JSON.stringify(built)); } catch {} }

class Dots {
  host: HTMLElement; photo: HTMLImageElement; src: string; cell: number;
  canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D;
  img: HTMLImageElement | null = null; n = 0; inv = false; active = false; born = 0; seen = false; lastTouch = 0;
  phase: Phase = "gather"; phaseT = 0; amt = 0; gatherer = false;
  w = 0; h = 0; dpr = 1; cols = 0; rows = 0;
  hx!: Float32Array; hy!: Float32Array; x!: Float32Array; y!: Float32Array; vx!: Float32Array; vy!: Float32Array;
  lum!: Float32Array; delay!: Float32Array; rgb!: Uint8ClampedArray; col: string[] = [];

  constructor(host: HTMLElement, photo: HTMLImageElement, src: string, cell: number, still: boolean) {
    this.host = host; this.photo = photo; this.src = src; this.cell = cell || 5;
    if (built[src] || still) { this.phase = "photo"; this.seen = true; }
    this.canvas = document.createElement("canvas"); host.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;
    if (reduce || this.phase === "photo") { this.phase = "photo"; this.photo.style.opacity = "1"; }
  }
  ready() {
    this.img = this.photo; this.build();
  }
  build() {
    const w = this.host.clientWidth, h = this.host.clientHeight; if (!w || !h || !this.img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2), cell = this.cell;
    this.w = w; this.h = h; this.dpr = dpr;
    this.canvas.width = Math.round((w + 2 * PAD) * dpr); this.canvas.height = Math.round((h + 2 * PAD) * dpr);
    this.canvas.style.width = (w + 2 * PAD) + "px"; this.canvas.style.height = (h + 2 * PAD) + "px";
    const cols = Math.max(2, Math.round(w / cell)), rows = Math.max(2, Math.round(h / cell));
    const off = document.createElement("canvas"); off.width = cols; off.height = rows;
    // sample a centre crop that matches the box, so a frame of another shape shows the image the way object-fit: cover does
    const iw = this.img.naturalWidth || this.img.width, ih = this.img.naturalHeight || this.img.height, ia = iw / ih, ha = w / h;
    let sx = 0, sy = 0, sw = iw, sh = ih;
    if (ia > ha) { sw = ih * ha; sx = (iw - sw) / 2; } else if (ia < ha) { sh = iw / ha; sy = (ih - sh) / 2; }
    const oc = off.getContext("2d")!;
    let d: Uint8ClampedArray;
    try { oc.drawImage(this.img, sx, sy, sw, sh, 0, 0, cols, rows); d = oc.getImageData(0, 0, cols, rows).data; }
    catch { this.phase = "photo"; this.photo.style.opacity = "1"; return; }
    const n = cols * rows; let sum = 0;
    this.n = n; this.cols = cols; this.rows = rows;
    this.hx = new Float32Array(n); this.hy = new Float32Array(n); this.x = new Float32Array(n); this.y = new Float32Array(n);
    this.vx = new Float32Array(n); this.vy = new Float32Array(n); this.lum = new Float32Array(n); this.delay = new Float32Array(n);
    this.rgb = new Uint8ClampedArray(n * 3); this.col = new Array(n);
    const cw = w / cols, ch = h / rows; let i = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++, i++) {
      const o = i * 4, l = (0.2126 * d[o] + 0.7152 * d[o + 1] + 0.0722 * d[o + 2]) / 255;
      this.lum[i] = l; sum += l;
      this.rgb[i * 3] = d[o]; this.rgb[i * 3 + 1] = d[o + 1]; this.rgb[i * 3 + 2] = d[o + 2];
      this.col[i] = "rgb(" + d[o] + "," + d[o + 1] + "," + d[o + 2] + ")";
      this.hx[i] = (c + 0.5) * cw + rnd(-0.12, 0.12) * cw;
      this.hy[i] = (r + 0.5) * ch + rnd(-0.12, 0.12) * ch;
      const snap = reduce || this.seen;
      this.x[i] = snap ? this.hx[i] : this.hx[i] + rnd(-1, 1) * 160;
      this.y[i] = snap ? this.hy[i] : this.hy[i] + rnd(-1, 1) * 110;
      this.delay[i] = (r / rows) * 0.4 + rnd(0, 0.18);
    }
    this.inv = (sum / n) < 0.42;   // a dark image: its light parts become the dots
    if (reduce || this.phase === "photo") { this.phase = "photo"; this.photo.style.opacity = "1"; }
    else if (this.seen) { this.active = true; }
    this.draw();
  }
  wake(now: number) {
    if (this.seen) return; this.seen = true; this.born = now;
    if (!reduce) this.active = true;
  }
  push(px: number, py: number, now: number) {
    if (!this.n || reduce) return;
    const R = 76, R2 = R * R, x = this.x, y = this.y, vx = this.vx, vy = this.vy; let hit = false;
    for (let i = 0; i < this.n; i++) {
      const dx = x[i] - px, dy = y[i] - py, d2 = dx * dx + dy * dy;
      if (d2 < R2) {
        const d = Math.sqrt(d2) || 0.001; let f = 1 - d / R; f = f * f * 6.5;
        vx[i] += dx / d * f + mvx * 0.22 * f; vy[i] += dy / d * f + mvy * 0.22 * f; hit = true;
      }
    }
    if (hit) { this.active = true; this.lastTouch = now; if (!this.seen) this.wake(now); }
  }
  step(now: number, dt: number) {
    const t = (now - this.born) / 1000, k = 0.08 * dt, drag = Math.pow(0.78, dt), thr = this.phase === "gather" ? 0.8 : 0.02;
    let moving = 0;
    const x = this.x, y = this.y, vx = this.vx, vy = this.vy, hx = this.hx, hy = this.hy, delay = this.delay;
    for (let i = 0; i < this.n; i++) {
      if (t < delay[i]) { moving++; continue; }
      const dx = hx[i] - x[i], dy = hy[i] - y[i];
      vx[i] = (vx[i] + dx * k) * drag; vy[i] = (vy[i] + dy * k) * drag;
      x[i] += vx[i] * dt; y[i] += vy[i] * dt;
      if (dx * dx + dy * dy > thr || vx[i] * vx[i] + vy[i] * vy[i] > 0.002) moving++;
    }
    // the gather ends when every dot is home, or after 2.6 s whatever is left, so a big image always goes on to become the photo
    if (this.phase === "gather" && (!moving || t > 2.6)) { this.phase = "colour"; this.phaseT = now; moving = 1; }
    else if (this.phase === "colour") { this.amt = Math.min(1, (now - this.phaseT) / 380); moving++; if (this.amt >= 1) { this.phase = "reveal"; this.phaseT = now; } }
    else if (this.phase === "reveal") { this.amt = Math.min(1, (now - this.phaseT) / 420); this.photo.style.opacity = String(this.amt); moving++; if (this.amt >= 1) { this.phase = "photo"; markBuilt(this.src); } }
    this.draw();
    if (!moving) { this.active = false; for (let j = 0; j < this.n; j++) { x[j] = hx[j]; y[j] = hy[j]; vx[j] = vy[j] = 0; } this.draw(); }
  }
  draw() {
    const ctx = this.ctx, dpr = this.dpr, cell = this.cell, base = cell * 0.56, ph = this.phase, amt = this.amt, bright = dark !== this.inv;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.w + 2 * PAD, this.h + 2 * PAD);
    const x = this.x, y = this.y, hx = this.hx, hy = this.hy, lum = this.lum, col = this.col, rgb = this.rgb;
    let i: number, v: number, dx: number, dy: number, disp: number, r: number, X: number, Y: number;
    if (ph === "gather") {
      ctx.fillStyle = ink; ctx.beginPath();
      for (i = 0; i < this.n; i++) {
        v = bright ? lum[i] : 1 - lum[i]; v = Math.pow(v, 0.95);
        dx = x[i] - hx[i]; dy = y[i] - hy[i]; disp = Math.sqrt(dx * dx + dy * dy);
        r = base * v * (1 + Math.min(disp, 48) / 48 * 0.4);
        if (r < 0.28) continue;
        X = x[i] + PAD; Y = y[i] + PAD; ctx.moveTo(X + r, Y); ctx.arc(X, Y, r, 0, TAU);
      }
      ctx.fill(); return;
    }
    if (ph === "colour" || ph === "reveal") {
      const ir = inkRGB[0], ig = inkRGB[1], ib = inkRGB[2], f = ph === "colour" ? amt : 1;
      ctx.globalAlpha = ph === "reveal" ? 1 - amt : 1;
      for (i = 0; i < this.n; i++) {
        v = bright ? lum[i] : 1 - lum[i]; v = Math.pow(v, 0.95);
        r = base * v + (cell * 0.72 - base * v) * f;
        if (r < 0.28) continue;
        X = x[i] + PAD; Y = y[i] + PAD;
        ctx.fillStyle = f >= 1 ? col[i] : "rgb(" + mix(ir, rgb[i * 3], f) + "," + mix(ig, rgb[i * 3 + 1], f) + "," + mix(ib, rgb[i * 3 + 2], f) + ")";
        ctx.beginPath(); ctx.arc(X, Y, r, 0, TAU); ctx.fill();
      }
      ctx.globalAlpha = 1; return;
    }
    for (i = 0; i < this.n; i++) {
      dx = x[i] - hx[i]; dy = y[i] - hy[i]; disp = dx * dx + dy * dy;
      if (disp < 1.2) continue;
      disp = Math.sqrt(disp); r = cell * 0.7 * (1 - Math.min(disp, 220) / 220 * 0.45);
      X = x[i] + PAD; Y = y[i] + PAD;
      ctx.fillStyle = col[i]; ctx.beginPath(); ctx.arc(X, Y, r, 0, TAU); ctx.fill();
    }
  }
}

let io: IntersectionObserver | null = null;
function boot() {
  if (booted || typeof window === "undefined") return; booted = true;
  reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { built = JSON.parse(sessionStorage.getItem("dotsBuilt") || "{}"); } catch {}
  io = new IntersectionObserver((es) => {
    const now = performance.now();
    es.forEach((e) => { if (e.isIntersecting) { const d = (e.target as any)._dots as Dots | undefined; if (d) d.wake(now); } });
  }, { threshold: 0.2 });
  window.addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (lastP) { const dtm = Math.max(8, now - lastP.t); mvx = (e.clientX - lastP.x) / dtm * 16; mvy = (e.clientY - lastP.y) / dtm * 16; }
    lastP = { x: e.clientX, y: e.clientY, t: now };
    for (let i = 0; i < instances.length; i++) {
      const d = instances[i]; if (!d.n) continue;
      const rc = d.host.getBoundingClientRect();
      if (rc.bottom < -PAD || rc.top > innerHeight + PAD) continue;
      const px = e.clientX - rc.left, py = e.clientY - rc.top;
      if (px < -PAD || py < -PAD || px > d.w + PAD || py > d.h + PAD) continue;
      d.push(px, py, now);
    }
  }, { passive: true });
  let rto = 0;
  window.addEventListener("resize", () => { clearTimeout(rto); rto = window.setTimeout(() => { instances.forEach((d) => { d.build(); }); }, 150); });
  // dark mode: the page swaps its tokens on the html element; the dots follow
  new MutationObserver(() => setMode(document.documentElement.getAttribute("data-mode") === "dark")).observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
  setMode(document.documentElement.getAttribute("data-mode") === "dark");
}
function loop(now: number) {
  rafId = instances.length ? requestAnimationFrame(loop) : 0;
  const dt = Math.min(2.5, (now - last) / 16.67); last = now;
  for (let i = 0; i < instances.length; i++) if (instances[i].active) instances[i].step(now, dt);
}
function setMode(isDark: boolean) {
  dark = isDark;
  const v = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim(); if (v) ink = v;
  inkRGB = isDark ? [236, 235, 231] : [22, 22, 22];
  instances.forEach((d) => { if (d.n) d.draw(); });
}

/** Mounts a dot image on a host that already holds its photograph. Returns the instance's teardown. */
export function mountDots(host: HTMLElement, photo: HTMLImageElement, src: string, opts: DotOptions = {}) {
  boot();
  if (opts.pageKey !== undefined && opts.pageKey !== pageKey) { pageKey = opts.pageKey; firstTaken = false; }
  const gather = !!opts.gather || (!firstTaken && !opts.still);   // only the first image on a page gathers; the rest arrive as photos
  const d = new Dots(host, photo, src, opts.cell || 5, !gather);
  if (gather) { firstTaken = true; d.gatherer = true; }
  (host as any)._dots = d; instances.push(d); io?.observe(host);
  if (!rafId) { last = performance.now(); rafId = requestAnimationFrame(loop); }
  const onLoad = () => d.ready();
  if (photo.complete && photo.naturalWidth) onLoad(); else photo.addEventListener("load", onLoad);
  return () => {
    photo.removeEventListener("load", onLoad);
    io?.unobserve(host);
    const i = instances.indexOf(d); if (i >= 0) instances.splice(i, 1);
    if (d.gatherer) firstTaken = false;
    d.canvas.remove(); delete (host as any)._dots;
  };
}
