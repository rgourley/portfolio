"use client";

import { useEffect, useRef } from "react";

// A structure that grows in 3D. Every so often a branch splits into a handful of tries.
// Most tries wither and fade, the ones that hold up thicken and keep growing.
// The camera orbits slowly, and the oldest paths fade away as new ones grow, so it never restarts.
type V = { x: number; y: number; z: number };
type Group = { members: Branch[]; judged: boolean };
type Branch = {
  pts: V[];
  dir: V;
  state: "trial" | "grow" | "done" | "dying" | "ghost";
  len: number;
  target: number;
  alpha: number;
  gen: number;
  node: number; // size of the dot where the branch starts, grows with its generation
  group: Group | null;
  born: number;
};

const RADIUS = 130; // growth stays near a drifting home point, inside this distance
const SPEED = 34; // units per second a tip grows
const TRY_LEN = 26; // how far a try grows before it is judged
const MAX_TIPS = 4;
const GHOST = 0.3; // failed tries stay as faint trails, so you can see how many there were
const OLD = 18; // seconds before a kept path starts to fade
const OLD_GHOST = 8; // failed tries go sooner

const add = (a: V, b: V, s = 1): V => ({ x: a.x + b.x * s, y: a.y + b.y * s, z: a.z + b.z * s });
const norm = (a: V): V => {
  const l = Math.hypot(a.x, a.y, a.z) || 1;
  return { x: a.x / l, y: a.y / l, z: a.z / l };
};
const rand = (s: number): V => ({ x: (Math.random() - 0.5) * s, y: (Math.random() - 0.5) * s, z: (Math.random() - 0.5) * s });

export default function IterationDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let color = "255,255,255";

    const readColor = () => {
      // Follow the site theme: the canvas inherits text-foreground.
      const m = getComputedStyle(canvas).color.match(/\d+(\.\d+)?/g);
      if (m) color = `${m[0]},${m[1]},${m[2]}`;
    };
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColor();
    };

    // Faint particles and a dot grid on the floor give the orbit some depth.
    const dust: V[] = Array.from({ length: 90 }, () => rand(900));
    const floor: V[] = [];
    for (let i = -20; i <= 20; i++) for (let j = -20; j <= 20; j++) floor.push({ x: i * 26, y: RADIUS * 0.95, z: j * 26 });

    let branches: Branch[] = [];
    let fade = 0; // whole-scene opacity, for the first fade in
    let now = 0;
    let home: V = { x: 0, y: 0, z: 0 };
    let cam: V = { x: 0, y: 0, z: 0 }; // where the camera looks, eased toward the home point

    const sprout = (from: Branch) => {
      const tip = from.pts[from.pts.length - 1];
      const count = 5 + Math.floor(Math.random() * 4);
      const group: Group = { members: [], judged: false };
      for (let i = 0; i < count; i++) {
        const b: Branch = {
          pts: [tip],
          dir: norm(add(from.dir, rand(2.6))),
          state: "trial",
          len: 0,
          target: 0,
          alpha: 0.7,
          gen: from.gen + 1,
          node: 0,
          group,
          born: now,
        };
        group.members.push(b);
        branches.push(b);
      }
      from.state = "done";
    };

    const seed = () => {
      const root: Branch = {
        pts: [{ x: 0, y: 0, z: 0 }],
        dir: norm(rand(2)),
        state: "grow",
        len: 0,
        target: 50,
        alpha: 1,
        gen: 0,
        node: 0,
        group: null,
        born: now,
      };
      branches = [root];
    };

    const tips = () => branches.filter((b) => b.state === "grow" || b.state === "trial").length;

    const judge = (group: Group) => {
      group.judged = true;
      const growing = branches.filter((b) => b.state === "grow").length;
      const keep = growing + 1 < MAX_TIPS && Math.random() < 0.45 ? 2 : 1;
      const order = [...group.members].sort(() => Math.random() - 0.5);
      order.forEach((b, i) => {
        if (i < keep) {
          b.state = "grow";
          b.target = TRY_LEN + 50 + Math.random() * 60;
        } else {
          b.state = "dying";
        }
      });
    };

    const step = (dt: number) => {
      now += dt;
      // The home point drifts slowly, so the growth reaches out and travels instead of filling a ball.
      home = { x: 170 * Math.sin(now * 0.045), y: 40 * Math.sin(now * 0.07), z: 170 * Math.sin(now * 0.033 + 1) };
      for (const b of branches) {
        if (b.state === "trial" || b.state === "grow") {
          const limit = b.state === "trial" ? TRY_LEN : b.target;
          if (b.len < limit) {
            const tip = b.pts[b.pts.length - 1];
            // Wander a little, and turn back toward the drifting home point near the edge.
            const rel = { x: tip.x - home.x, y: tip.y - home.y, z: tip.z - home.z };
            const out = Math.hypot(rel.x, rel.y, rel.z) / RADIUS;
            const steer = out > 0.75 ? { x: -rel.x, y: -rel.y, z: -rel.z } : { x: 0, y: 0, z: 0 };
            b.dir = norm(add(add(b.dir, rand(1.6 * dt)), norm(steer), 1.4 * dt * Math.max(0, out - 0.75) * 4));
            const d = SPEED * dt * (b.state === "trial" ? 1.1 : 1);
            const next = add(tip, b.dir, d);
            const prev = b.pts[b.pts.length - 2];
            if (prev && Math.hypot(tip.x - prev.x, tip.y - prev.y, tip.z - prev.z) < 4) b.pts[b.pts.length - 1] = next;
            else b.pts.push(next);
            b.len += d;
          } else if (b.state === "grow") {
            sprout(b);
          }
        }
        if (b.state === "dying") {
          b.alpha = Math.max(GHOST, b.alpha - dt * 0.45);
          if (b.alpha === GHOST) b.state = "ghost";
        }
        // Old paths fade away instead of the whole thing restarting.
        if ((b.state === "done" && now - b.born > OLD) || (b.state === "ghost" && now - b.born > OLD_GHOST)) {
          b.alpha -= dt * 0.22;
        } else if (b.state === "grow" || b.state === "done") {
          b.alpha = Math.min(1, b.alpha + dt * 0.8);
        }
        if (b.state === "grow" || b.state === "done") {
          b.node += (Math.min(1.6 + b.gen * 0.35, 5) - b.node) * Math.min(1, dt * 2);
        }
      }
      for (const b of branches) {
        const g = b.group;
        if (g && !g.judged && g.members.every((m) => m.len >= TRY_LEN)) judge(g);
      }

      branches = branches.filter((b) => b.alpha > 0);
      if (tips() === 0) seed();
      fade = Math.min(1, fade + dt * 0.8);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const yaw = t * 0.16;
      const pitch = 0.32 + Math.sin(t * 0.07) * 0.12;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const dist = 520;
      const fit = height / 330;
      // Follow the drifting home point, which moves smoothly, rather than the tips, which jump as tries sprout and die.
      cam = add(cam, { x: home.x - cam.x, y: 0, z: home.z - cam.z }, 0.012);
      const project = (q: V) => {
        const p = { x: q.x - cam.x, y: q.y, z: q.z - cam.z };
        const x1 = p.x * cy - p.z * sy;
        const z1 = p.x * sy + p.z * cy;
        const y2 = p.y * cp - z1 * sp;
        const z2 = p.y * sp + z1 * cp;
        const s = (dist / (dist + z2)) * fit;
        // Depth fog: far things fade.
        const fog = Math.max(0.25, Math.min(1, 1 - z2 / (RADIUS * 2.2)));
        return { x: width / 2 + x1 * s, y: height * 0.44 + y2 * s, s, fog, z: z2 };
      };

      // The grid follows the camera in whole steps, so it reads as an endless floor.
      const sx = Math.round(cam.x / 26) * 26;
      const sz = Math.round(cam.z / 26) * 26;
      for (const f of floor) {
        const p = project({ x: f.x + sx, y: f.y, z: f.z + sz });
        if (p.s <= 0) continue;
        // Fade toward the grid's edge so it reads as a pool of light, not a box.
        const edge = Math.max(0, 1 - Math.hypot(f.x + sx - cam.x, f.z + sz - cam.z) / 520);
        ctx.fillStyle = `rgba(${color},${0.5 * edge * p.fog * fade})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 * p.s, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const d of dust) {
        const p = project(d);
        if (p.s <= 0) continue;
        ctx.fillStyle = `rgba(${color},${0.12 * p.fog * fade})`;
        ctx.fillRect(p.x, p.y, 1.2 * p.s, 1.2 * p.s);
      }

      // Far branches first so near ones sit on top.
      const projected = branches.map((b) => {
        const pts = b.pts.map(project);
        const depth = pts.reduce((sum, p) => sum + p.z, 0) / pts.length;
        return { b, pts, depth };
      });
      projected.sort((a, b) => b.depth - a.depth);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const { b, pts } of projected) {
        if (pts.length < 2) continue;
        const kept = b.state === "grow" || b.state === "done";
        const a = b.alpha * fade;
        const fog = pts[pts.length - 1].fog;
        ctx.strokeStyle = `rgba(${color},${(kept ? 0.7 : 0.35) * a * fog})`;
        ctx.lineWidth = (kept ? 0.8 + Math.min(b.gen, 8) * 0.18 : 0.7) * pts[pts.length - 1].s;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          // Smooth curve through the midpoints.
          const mx = (pts[i].x + pts[i + 1].x) / 2;
          const my = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        ctx.stroke();

        // A dot where a kept branch starts, sized by how many rounds it survived.
        if (kept && b.node > 0.1) {
          const p = pts[0];
          ctx.fillStyle = `rgba(${color},${0.9 * a * p.fog})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, b.node * p.s, 0, Math.PI * 2);
          ctx.fill();
        }
        // Glowing tip on anything still growing.
        if (b.state === "grow" || b.state === "trial") {
          const p = pts[pts.length - 1];
          const r = (b.state === "grow" ? 9 : 6) * p.s;
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          glow.addColorStop(0, `rgba(${color},${0.9 * a * p.fog})`);
          glow.addColorStop(1, `rgba(${color},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resize();
    seed();

    if (reduced) {
      // One still frame of a grown structure.
      fade = 1;
      for (let i = 0; i < 900 && tips() > 0; i++) step(1 / 30);
      fade = 1;
      draw(2);
      return;
    }

    let raf = 0;
    let last = 0;
    let clock = 0;
    const tick = (now: number) => {
      // Cap the step so a background tab doesn't jump the growth.
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      clock += dt;
      step(dt);
      draw(clock);
      raf = requestAnimationFrame(tick);
    };

    // Only animate while on screen.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    // The light/dark switch sets data-mode on <html>; re-read the ink color so the lines don't vanish into the new background.
    const themeObserver = new MutationObserver(readColor);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    // "wideimg" breaks out of the reading column the same way a #wide image does.
    <div className="wideimg">
      <canvas
        ref={canvasRef}
        className="block h-[380px] md:h-[480px] w-full"
        style={{ color: "var(--ink)" }}
        role="img"
        aria-label="A structure growing in 3D: at each split several tries sprout, most fade away, and the ones that hold up thicken and keep growing."
      />
    </div>
  );
}
