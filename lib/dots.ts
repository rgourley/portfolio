/* Dot images, shared by the case studies and the index pages.
   Each image is sampled on a grid; every cell becomes one round dot whose radius follows the darkness of the pixel on paper
   (brightness on a dark page, and brightness too when the image itself is dark, so a dark UI reads as a wireframe of its light parts).
   Dots start scattered and gather when the image comes into view, row by row. Once settled they take their pixel colours and the
   photograph fades in beneath them. One figure per page runs this engine, the page's hero; every other figure is its photograph alone.
   A hero that has built once this session arrives as the photograph. From then on only the dots the cursor disturbs are drawn: the cursor sweeps through them like a
   hand through loose material, throwing the dots under it the way it is moving, faster when it moves faster, and they fly in colour,
   tumble, drift and ease back to their pixels over about a second. Only airborne dots are stepped and drawn, never more than a few
   hundred per figure, so a settled page costs nothing. Phases: gather, colour, reveal, photo.
   The photograph itself is a next/image element the component renders; the engine only reads its pixels and fades it in. */

type Phase = "gather" | "colour" | "reveal" | "photo";
export interface DotOptions { cell?: number }

const PAD = 64, TAU = Math.PI * 2, MAX_AIR = 1000;
let reduce = false, dark = false, ink = "#161616", inkRGB = [22, 22, 22];
const instances: Dots[] = [];
let lastP: { x: number; y: number; t: number } | null = null, mvx = 0, mvy = 0;
let built: Record<string, 1> = {};
let booted = false;
let rafId = 0, last = 0;

function rnd(a: number, b: number) { return a + Math.random() * (b - a); }
function mix(a: number, b: number, f: number) { return Math.round(a + (b - a) * f); }
function markBuilt(src: string) { built[src] = 1; try { sessionStorage.setItem("dotsBuilt", JSON.stringify(built)); } catch {} }

class Dots {
  host: HTMLElement; photo: HTMLImageElement; src: string; cell: number;
  canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D;
  img: HTMLImageElement | null = null; n = 0; inv = false; active = false; born = 0; seen = false; lastTouch = 0; near = false; loaded = false;
  phase: Phase = "gather"; phaseT = 0; amt = 0; gatherer = false;
  w = 0; h = 0; dpr = 1; cols = 0; rows = 0;
  hx!: Float32Array; hy!: Float32Array; x!: Float32Array; y!: Float32Array; vx!: Float32Array; vy!: Float32Array;
  lum!: Float32Array; delay!: Float32Array; rgb!: Uint8ClampedArray; col: string[] = [];
  /** the airborne dots: a flag per dot, the list of their indices, when each was thrown, how long it flies, and its tumble phase */
  air!: Uint8Array; airIdx!: Int32Array; airN = 0; t0!: Float32Array; life!: Float32Array; ph!: Float32Array; now = 0;
  /** throws are rationed by time, not by pointer events, so a sweep leaves an even trail whatever the mouse's report rate */
  credit = 0; creditAt = 0;

  constructor(host: HTMLElement, photo: HTMLImageElement, src: string, cell: number, still: boolean) {
    this.host = host; this.photo = photo; this.src = src; this.cell = cell || 5;
    if (built[src] || still) { this.phase = "photo"; this.seen = true; }
    this.canvas = document.createElement("canvas"); host.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;
    if (reduce || this.phase === "photo") { this.phase = "photo"; this.photo.style.opacity = "1"; }
  }
  /** the photograph has loaded; the dots are sampled once the figure is near the viewport, so figures far down the page cost nothing until then */
  ready() {
    this.loaded = true; if (this.near && !this.n) { this.img = this.photo; this.build(); }
  }
  approach() {
    this.near = true; if (this.loaded && !this.n) { this.img = this.photo; this.build(); }
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
    this.air = new Uint8Array(n); this.airIdx = new Int32Array(MAX_AIR); this.airN = 0; this.t0 = new Float32Array(n); this.life = new Float32Array(n); this.ph = new Float32Array(n);
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
    else if (this.seen) { this.active = true; run(); }
    this.draw();
  }
  wake(now: number) {
    if (this.seen) return; this.seen = true; this.born = now;
    if (!reduce) { this.active = true; run(); }
  }
  /** The cursor at (px, py) moving at (svx, svy) pixels a frame. While the figure is still gathering the dots under the cursor get
      the old small nudge; a reader who asked for reduced motion gets no hover response, as before. Once the figure is a photograph
      the cursor throws them: each dot inside the radius gets the pointer's direction at the pointer's speed, a little sideways
      scatter, and a touch outward, all scaled by how close it sat to the cursor, so a fast sweep sprays dots across the figure and
      a slow pass barely stirs them. The radius grows with speed. Dots at the edge of the radius come home sooner than the ones
      thrown from its centre. */
  push(px: number, py: number, now: number, svx = mvx, svy = mvy) {
    if (!this.n || reduce) return;
    const x = this.x, y = this.y, vx = this.vx, vy = this.vy; let hit = false;
    if (this.phase !== "photo") {
      const R = 76, R2 = R * R;
      for (let i = 0; i < this.n; i++) {
        const dx = x[i] - px, dy = y[i] - py, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 0.001; let f = 1 - d / R; f = f * f * 6.5;
          vx[i] += dx / d * f + svx * 0.22 * f; vy[i] += dy / d * f + svy * 0.22 * f; hit = true;
        }
      }
      if (hit) { this.active = true; this.lastTouch = now; run(); if (!this.seen) this.wake(now); }
      return;
    }
    const speed = Math.min(60, Math.hypot(svx, svy));
    if (speed < 0.8) return;                                   // a still or creeping pointer stirs nothing
    const R = 40 + speed * 1.6, R2 = R * R, ux = svx / speed, uy = svy / speed, qx = -uy, qy = ux;
    this.credit = Math.min(260, this.credit + (now - this.creditAt) * 3.2); this.creditAt = now;
    if (this.credit < 1) return;
    const air = this.air, airIdx = this.airIdx, t0 = this.t0, life = this.life, ph = this.ph;
    // only the rows the radius can reach are visited
    const rowH = this.h / this.rows, lo = Math.max(0, Math.floor((py - R) / rowH)) * this.cols, hi = Math.min(this.n, (Math.ceil((py + R) / rowH) + 1) * this.cols);
    for (let i = lo; i < hi; i++) {
      if (this.airN >= MAX_AIR || this.credit < 1) break;
      const dx = x[i] - px, dy = y[i] - py, d2 = dx * dx + dy * dy;
      if (d2 >= R2) continue;
      const d = Math.sqrt(d2) || 0.001; let f = 1 - d / R; f = f * f * (3 - 2 * f);
      if (Math.random() > (0.12 + 0.5 * f) * Math.min(1, speed / 24)) continue;   // a spray, not a slab: the dots nearest the cursor are the likeliest to go, and a slow pass takes few
      this.credit -= 1;
      const side = rnd(-1, 1) * speed * 0.32, out = 1.4 + speed * 0.04;
      vx[i] += (ux * speed * 0.72 + qx * side + dx / d * out) * f;
      vy[i] += (uy * speed * 0.72 + qy * side + dy / d * out) * f;
      if (!air[i]) { air[i] = 1; airIdx[this.airN++] = i; ph[i] = rnd(0, TAU); }
      t0[i] = now; life[i] = (640 + 560 * speed / 60 + rnd(0, 260)) * (0.55 + 0.45 * f);
      hit = true;
    }
    if (hit) { this.active = true; this.lastTouch = now; run(); if (!this.seen) this.wake(now); }
  }
  step(now: number, dt: number) {
    this.now = now;
    if (this.phase === "photo") { this.stepAir(now, dt); return; }
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
    else if (this.phase === "reveal") { this.amt = Math.min(1, (now - this.phaseT) / 420); this.photo.style.opacity = String(this.amt); moving++; if (this.amt >= 1) { this.phase = "photo"; markBuilt(this.src); for (let j = 0; j < this.n; j++) { x[j] = hx[j]; y[j] = hy[j]; vx[j] = vy[j] = 0; } } }
    this.draw();
    if (!moving) { this.active = false; for (let j = 0; j < this.n; j++) { x[j] = hx[j]; y[j] = hy[j]; vx[j] = vy[j] = 0; } this.draw(); }
  }
  /** The flight of the airborne dots. A thrown dot flies on with light drag and a slow wander; as its time runs out the pull of its
      pixel grows until it eases home, then it lands and leaves the list. Nothing else on the figure is touched. */
  stepAir(now: number, dt: number) {
    const x = this.x, y = this.y, vx = this.vx, vy = this.vy, hx = this.hx, hy = this.hy, air = this.air, airIdx = this.airIdx, t0 = this.t0, life = this.life, ph = this.ph;
    let w = 0;
    for (let j = 0; j < this.airN; j++) {
      const i = airIdx[j], p = (now - t0[i]) / life[i], q = Math.min(1, p);
      const k = (0.003 + 0.14 * q * q) * dt, drag = Math.pow(p < 1 ? 0.945 : 0.8, dt), wander = p < 1 ? (1 - q) * 0.05 * dt : 0;
      const dx = hx[i] - x[i], dy = hy[i] - y[i];
      vx[i] = (vx[i] + dx * k + Math.sin(now * 0.0031 + ph[i]) * wander) * drag;
      vy[i] = (vy[i] + dy * k + Math.cos(now * 0.0027 + ph[i] * 1.7) * wander) * drag;
      x[i] += vx[i] * dt; y[i] += vy[i] * dt;
      if (p >= 1 && dx * dx + dy * dy < 0.3 && vx[i] * vx[i] + vy[i] * vy[i] < 0.01) { x[i] = hx[i]; y[i] = hy[i]; vx[i] = vy[i] = 0; air[i] = 0; }
      else airIdx[w++] = i;
    }
    this.airN = w;
    this.draw();
    if (!w) this.active = false;
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
    // the photograph is on show: only the airborne dots are drawn, each tumbling in size as it flies and shrinking a little as it tires
    const air = this.airIdx, t0 = this.t0, life = this.life, tum = this.ph, now = this.now;
    for (let j = 0; j < this.airN; j++) {
      i = air[j]; dx = x[i] - hx[i]; dy = y[i] - hy[i]; disp = dx * dx + dy * dy;
      if (disp < 1.2) continue;
      const p = Math.min(1, (now - t0[i]) / life[i]);
      r = cell * 0.8 * (0.5 + 0.5 * Math.abs(Math.sin(now * 0.011 + tum[i]))) * (1 - 0.3 * p);
      X = x[i] + PAD; Y = y[i] + PAD;
      ctx.fillStyle = col[i]; ctx.beginPath(); ctx.arc(X, Y, r, 0, TAU); ctx.fill();
    }
  }

}

let io: IntersectionObserver | null = null, nearIo: IntersectionObserver | null = null;
function boot() {
  if (booted || typeof window === "undefined") return; booted = true;
  reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { built = JSON.parse(sessionStorage.getItem("dotsBuilt") || "{}"); } catch {}
  io = new IntersectionObserver((es) => {
    const now = performance.now();
    es.forEach((e) => { if (e.isIntersecting) { const d = (e.target as any)._dots as Dots | undefined; if (d) d.wake(now); } });
  }, { threshold: 0.2 });
  // a figure is sampled when it comes within a screen of the viewport, not when the page loads
  nearIo = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { const d = (e.target as any)._dots as Dots | undefined; if (d) { d.approach(); nearIo?.unobserve(e.target); } } });
  }, { rootMargin: "100% 0px" });
  const tap = (px: number, py: number) => {
    // one short throw on a tap, in a random direction, gentle
    const a = rnd(0, TAU), sp = 14;
    for (let i = 0; i < instances.length; i++) {
      const d = instances[i]; if (!d.n) continue;
      const rc = d.host.getBoundingClientRect(), x = px - rc.left, y = py - rc.top;
      if (x < -PAD || y < -PAD || x > d.w + PAD || y > d.h + PAD) continue;
      d.push(x, y, performance.now(), Math.cos(a) * sp, Math.sin(a) * sp);
    }
  };
  window.addEventListener("pointerdown", (e) => { if (e.pointerType === "touch") tap(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
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
  window.addEventListener("resize", () => { clearTimeout(rto); rto = window.setTimeout(() => { instances.forEach((d) => { if (d.n) d.build(); }); }, 150); });
  // dark mode: the page swaps its tokens on the html element; the dots follow
  new MutationObserver(() => setMode(document.documentElement.getAttribute("data-mode") === "dark")).observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
  setMode(document.documentElement.getAttribute("data-mode") === "dark");
}
/** The one frame loop for every figure on the page. It runs while any figure is moving and stops when all have settled;
    wake, push and build start it again. */
function loop(now: number) {
  const dt = Math.min(2.5, (now - last) / 16.67); last = now;
  let busy = false;
  for (let i = 0; i < instances.length; i++) if (instances[i].active) { instances[i].step(now, dt); busy = busy || instances[i].active; }
  rafId = busy ? requestAnimationFrame(loop) : 0;
}
function run() { if (!rafId) { last = performance.now(); rafId = requestAnimationFrame(loop); } }
function setMode(isDark: boolean) {
  dark = isDark;
  const v = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim(); if (v) ink = v;
  inkRGB = isDark ? [236, 235, 231] : [22, 22, 22];
  instances.forEach((d) => { if (d.n) d.draw(); });
}

/** Mounts the page's dot figure on a host that already holds its photograph. Returns the instance's teardown. */
export function mountDots(host: HTMLElement, photo: HTMLImageElement, src: string, opts: DotOptions = {}) {
  boot();
  const d = new Dots(host, photo, src, opts.cell || 5, false);
  d.gatherer = true;
  (host as any)._dots = d; instances.push(d); io?.observe(host); nearIo?.observe(host);
  const onLoad = () => d.ready();
  if (photo.complete && photo.naturalWidth) onLoad(); else photo.addEventListener("load", onLoad);
  return () => {
    photo.removeEventListener("load", onLoad);
    io?.unobserve(host); nearIo?.unobserve(host);
    const i = instances.indexOf(d); if (i >= 0) instances.splice(i, 1);
    d.canvas.remove(); delete (host as any)._dots;
  };
}
