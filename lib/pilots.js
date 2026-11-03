// @ts-nocheck
/* The case study scenes. A small version of the home page's pilots scene: a terrain of dots with contour lines, and a loose
   formation of five AI pilots flying over it, each a small octahedron with a call sign, leaving a survey trace on the ground.
   Then the agent designer (one drone in flight with its callouts), the dashboard (telemetry gathering into charts), the
   running mission (phases, task pools, a bus), and a placeholder scene for the studies whose own scene is still to be built.
   Drag to turn. Every mount returns { setMode(dark), destroy() }. */
import * as THREE from "three";

var reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function rnd(a, b){ return a + Math.random()*(b - a); }
function hash(x,y,z){ var s = Math.sin(x*127.1 + y*311.7 + z*74.7)*43758.5453; return s - Math.floor(s); }
function vnoise(x,y,z){
  var ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z), fx = x-ix, fy = y-iy, fz = z-iz;
  fx = fx*fx*(3-2*fx); fy = fy*fy*(3-2*fy); fz = fz*fz*(3-2*fz);
  function L(a,b,t){ return a + (b-a)*t; }
  return L(L(L(hash(ix,iy,iz),hash(ix+1,iy,iz),fx), L(hash(ix,iy+1,iz),hash(ix+1,iy+1,iz),fx),fy), L(L(hash(ix,iy,iz+1),hash(ix+1,iy,iz+1),fx), L(hash(ix,iy+1,iz+1),hash(ix+1,iy+1,iz+1),fx),fy), fz);
}
var TW = 10.0, TD = 9.0;
var PEAKS = [[-3.6,-2.8,1.6,1.3],[-1.2,-3.4,1.9,1.5],[1.4,-2.2,1.3,1.2],[3.8,-3.2,1.7,1.4],[-2.4,0.2,0.9,1.1],[2.6,0.6,0.8,1.0],[0.4,-0.6,1.0,0.9],[-4.2,1.8,0.6,1.0],[4.4,2.0,0.7,1.1],[0.0,2.6,0.5,0.9]];
function terrainH(x, z){
  var n1 = vnoise(x*0.34 + 11, 7, z*0.34), n2 = vnoise(x*0.9 + 3, 2, z*0.9 + 5), n3 = vnoise(x*2.2, 5, z*2.2 + 9);
  var ridge = 1 - Math.abs(2*n1 - 1), hill = 0.5*ridge + 0.5*n1;
  var h = Math.pow(hill, 1.3)*1.0 + (n2 - 0.5)*0.55 + (n3 - 0.5)*0.12 - 0.55;
  for (var pk=0; pk<PEAKS.length; pk++){ var P0 = PEAKS[pk], dx = (x - P0[0])/P0[3], dz = (z - P0[1])/P0[3], g = Math.exp(-(dx*dx + dz*dz)); h += P0[2] * g * (0.55 + 0.45*ridge); }
  return Math.max(h, -0.45);
}
function dotMaterial(pr){
  return new THREE.ShaderMaterial({
    uniforms:{ uSize:{value:0.085}, uPR:{value:pr}, uH:{value:600}, uInvert:{value:0} }, transparent:true, depthWrite:false,
    vertexShader:'uniform float uSize; uniform float uPR; uniform float uH; attribute vec3 color; attribute float aSize; varying vec3 vC; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; vC = color; gl_PointSize = uSize * aSize * uPR * uH / -mv.z; }',
    fragmentShader:'varying vec3 vC; uniform float uInvert; void main(){ vec2 q = gl_PointCoord - 0.5; if (dot(q, q) > 0.25) discard; gl_FragColor = vec4(mix(vC, vec3(1.0) - vC, uInvert), 1.0); }'
  });
}
/* Shared plumbing for the small scenes: renderer, camera, a turning group, drag and cursor tilt, pause when off screen, resize. */
function stage(el, camZ, worldY, tilt){
  var W = el.clientWidth, H = el.clientHeight;
  var renderer = new THREE.WebGLRenderer({antialias:true, alpha:true}); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(W, H, false); el.appendChild(renderer.domElement);
  var scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, W/H, 0.1, 100); camera.position.set(0, 0, camZ);
  var world = new THREE.Group(), spin = new THREE.Group(); scene.add(world); world.add(spin); world.position.set(0, worldY, 0);
  var mat = dotMaterial(renderer.getPixelRatio()); mat.uniforms.uH.value = H;
  var S = {el:el, W:W, H:H, renderer:renderer, scene:scene, camera:camera, spin:spin, mat:mat, rotY:0, rotX:0, tiltM:0, yawM:0, running:true, alive:true, t0:performance.now(), last:performance.now(), tilt:tilt, scr:new THREE.Vector3(), mats:[mat], made:[renderer.domElement]};
  var dragging = false, lx = 0, ly = 0;
  function down(e){ dragging = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); }
  function move(e){ var rc = el.getBoundingClientRect(); if (dragging){ S.rotY += (e.clientX - lx)*0.006; S.rotX = Math.max(-0.3, Math.min(0.6, S.rotX + (e.clientY - ly)*0.004)); lx = e.clientX; ly = e.clientY; } S.yawM = ((e.clientX - rc.left)/rc.width - 0.5)*0.16; S.tiltM = ((e.clientY - rc.top)/rc.height - 0.5)*0.12; }
  function up(){ dragging = false; } function leave(){ S.yawM = 0; S.tiltM = 0; }
  el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('pointerleave', leave);
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ S.running = e.isIntersecting; S.last = performance.now(); }); }, {threshold: 0.05}); io.observe(el);
  var ro = new ResizeObserver(function(){ S.W = el.clientWidth; S.H = el.clientHeight; if (!S.W || !S.H) return; renderer.setSize(S.W, S.H, false); camera.aspect = S.W/S.H; camera.updateProjectionMatrix(); mat.uniforms.uH.value = S.H; }); ro.observe(el);
  S.yaw0 = 0;
  S.view = function(t){ var sway = reduce ? 0 : Math.sin(t*0.09)*0.1; spin.rotation.x += (tilt + S.rotX + S.tiltM - spin.rotation.x)*0.05; spin.rotation.y += (S.yaw0 + sway + S.rotY + S.yawM - spin.rotation.y)*0.05; };
  S.tag = function(){ var tg = document.createElement('div'); tg.className = 'ptag'; el.appendChild(tg); S.made.push(tg); return tg; };
  S.place = function(tg, x, y, z, left){ S.scr.set(x, y, z); spin.localToWorld(S.scr); S.scr.project(camera); var tx = (S.scr.x*0.5 + 0.5)*S.W, ty = (-S.scr.y*0.5 + 0.5)*S.H - 8; tg.classList.toggle('flip', !!left); tg.style.transform = left ? 'translate(calc(' + (tx - 8) + 'px - 100%),' + ty + 'px)' : 'translate(' + (tx + 8) + 'px,' + ty + 'px)'; };
  S.points = function(n, shade, size){ var pp = new Float32Array(n*3), cc = new Float32Array(n*3), ss = new Float32Array(n); for (var q=0;q<n;q++){ pp[q*3+1] = -40; cc[q*3] = cc[q*3+1] = cc[q*3+2] = shade; ss[q] = size; } var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pp, 3)); g.setAttribute('color', new THREE.BufferAttribute(cc, 3)); g.setAttribute('aSize', new THREE.BufferAttribute(ss, 1)); spin.add(new THREE.Points(g, mat)); return {g:g, p:pp, c:cc, s:ss}; };
  S.lines = function(n, opacity){ var lp = new Float32Array(n*6), lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp, 3)); var lm = new THREE.LineBasicMaterial({color:0x161616, transparent:opacity < 1, opacity:opacity}); S.mats.push(lm); spin.add(new THREE.LineSegments(lg, lm)); return {g:lg, p:lp}; };
  S.setMode = function(d){ mat.uniforms.uInvert.value = d ? 1 : 0; S.mats.forEach(function(m){ if (m.color) m.color.set(d ? 0xECEBE7 : 0x161616); }); };
  S.destroy = function(){
    S.alive = false; io.disconnect(); ro.disconnect();
    el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); el.removeEventListener('pointerleave', leave);
    renderer.dispose(); S.made.forEach(function(n){ if (n.parentNode) n.parentNode.removeChild(n); });
  };
  S.loop = function(frame){ function tick(now){ if (!S.alive) return; requestAnimationFrame(tick); if (!S.running) return; frame(now); } requestAnimationFrame(tick); };
  return S;
}
function ground(S, w, d, cols, rows, shade, size){ var P = S.points(cols*rows, shade, size); for (var r=0;r<rows;r++) for (var c=0;c<cols;c++){ var i = r*cols + c; P.p[i*3] = (c/(cols-1) - 0.5)*w; P.p[i*3+1] = 0; P.p[i*3+2] = (r/(rows-1) - 0.5)*d; } P.g.attributes.position.needsUpdate = true; return P; }

/* The pilots: a terrain of dots, and five AI pilots in loose formation flying over it. */
export function mount(el){
  var S = stage(el, 13.5, -1.2, 0.46), spin = S.spin, mat = S.mat;
  // the terrain: a lattice shaded by height, and contour lines in ink
  var cols = 112, rows = 68, cnt = cols*rows + 2600, pos = new Float32Array(cnt*3), col = new Float32Array(cnt*3), siz = new Float32Array(cnt), i = 0;
  for (var r=0;r<rows;r++) for (var c=0;c<cols;c++, i++){ var x = (c/(cols-1) - 0.5)*TW, z = (r/(rows-1) - 0.5)*TD, h = terrainH(x, z), t = Math.min(1, (h + 0.45)/2.6), sh = 0.66 - 0.42*t; pos[i*3] = x; pos[i*3+1] = h; pos[i*3+2] = z; col[i*3] = sh; col[i*3+1] = sh; col[i*3+2] = sh*0.99; siz[i] = 0.5 + 0.4*t; }
  var tries = 0; while (i < cnt && tries++ < 200000){ var cx = rnd(-TW/2, TW/2), cz = rnd(-TD/2, TD/2), ch = terrainH(cx, cz), f = ((ch + 0.45)/0.22) % 1; if (f > 0.09) continue; pos[i*3] = cx; pos[i*3+1] = ch + 0.01; pos[i*3+2] = cz; col[i*3] = col[i*3+1] = col[i*3+2] = 0.09; siz[i] = 0.7; i++; }
  var geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); geo.setAttribute('aSize', new THREE.BufferAttribute(siz, 1));
  spin.add(new THREE.Points(geo, mat));
  // the survey trace: ground dots left where the lead has flown
  var TR = 220, trPos = new Float32Array(TR*3), trCol = new Float32Array(TR*3), trSiz = new Float32Array(TR), trAt = 0, trLast = 0;
  for (var q=0;q<TR;q++){ trPos[q*3+1] = -40; trCol[q*3] = trCol[q*3+1] = trCol[q*3+2] = 0.09; trSiz[q] = 0.5; }
  var trGeo = new THREE.BufferGeometry(); trGeo.setAttribute('position', new THREE.BufferAttribute(trPos, 3)); trGeo.setAttribute('color', new THREE.BufferAttribute(trCol, 3)); trGeo.setAttribute('aSize', new THREE.BufferAttribute(trSiz, 1));
  spin.add(new THREE.Points(trGeo, mat));
  // the pilots: five octahedra in a loose V, drop lines to the ground, call signs
  var AG = 5, agents = [], agentGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.075, 0)), lineMat = new THREE.LineBasicMaterial({color:0x161616}); S.mats.push(lineMat);
  var formation = [[0,0],[-0.5,-0.42],[0.5,-0.42],[-1.0,-0.84],[1.0,-0.84]], names = ['HM-01','HM-02','HM-03','HM-04','HM-05'];
  var dropPos = new Float32Array(AG*2*3), dropGeo = new THREE.BufferGeometry(); dropGeo.setAttribute('position', new THREE.BufferAttribute(dropPos, 3));
  var dropMat = new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.28}); S.mats.push(dropMat); spin.add(new THREE.LineSegments(dropGeo, dropMat));
  for (var a0=0; a0<AG; a0++){ var m = new THREE.LineSegments(agentGeo, lineMat); m.rotation.order = 'YXZ'; spin.add(m); var tag = S.tag(); tag.textContent = names[a0]; agents.push({m:m, tag:tag, x:0, y:1, z:0, fx:rnd(0,6.28), fz:rnd(0,6.28), ph:rnd(0,6.28)}); }
  // the lead flies a slow looping course that keeps it over the field, heading from its own motion
  var lead = {x:3, z:1, h:Math.PI, bank:0};
  function leadAt(t){ return [3.3*Math.sin(t*0.19), 0.6*Math.sin(t*0.41 + 1.3) + 0.4*Math.sin(t*0.13)]; }
  var scr = S.scr;
  S.loop(function(now){
    var dt = Math.min(0.05, (now - S.last)/1000); S.last = now; var t = (now - S.t0)/1000;
    // the lead
    var p = leadAt(t), p2 = leadAt(t + 0.05), vx = p2[0] - p[0], vz = p2[1] - p[1], hNew = Math.atan2(vz, vx), dh = Math.atan2(Math.sin(hNew - lead.h), Math.cos(hNew - lead.h));
    lead.h += dh; lead.x = p[0]; lead.z = p[1]; lead.bank += (Math.max(-0.5, Math.min(0.5, -dh/Math.max(dt, 0.001)*0.18)) - lead.bank)*0.06;
    var cosH = Math.cos(lead.h), sinH = Math.sin(lead.h);
    for (var k=0;k<AG;k++){ var a = agents[k], fo = formation[k];
      // slot in the lead's frame, drifting a little so the V breathes
      var sx = fo[0] + 0.12*Math.sin(t*0.5 + a.fx), sz = fo[1] + 0.12*Math.sin(t*0.37 + a.fz);
      var tx = lead.x + sx*(-sinH) + sz*(-cosH), tz = lead.z + sx*cosH + sz*(-sinH);
      a.x += (tx - a.x)*Math.min(1, dt*3.2); a.z += (tz - a.z)*Math.min(1, dt*3.2);
      var ty = terrainH(a.x, a.z) + 0.78 + 0.1*Math.sin(t*0.7 + a.ph); a.y += (ty - a.y)*Math.min(1, dt*2.2);
      a.m.position.set(a.x, a.y, a.z); a.m.rotation.y = -lead.h; a.m.rotation.x += (lead.bank + 0.1*Math.sin(t*1.25 + k*1.7) - a.m.rotation.x)*0.08; a.m.rotation.z += (0.22*Math.sin(t*1.6 + k*1.1) - a.m.rotation.z)*0.08;
      var g = terrainH(a.x, a.z); dropPos[k*6] = a.x; dropPos[k*6+1] = a.y - 0.08; dropPos[k*6+2] = a.z; dropPos[k*6+3] = a.x; dropPos[k*6+4] = g + 0.02; dropPos[k*6+5] = a.z;
      scr.set(a.x, a.y, a.z); spin.localToWorld(scr); scr.project(S.camera); a.tag.style.transform = 'translate(' + ((scr.x*0.5 + 0.5)*S.W + 10) + 'px,' + ((-scr.y*0.5 + 0.5)*S.H - 18) + 'px)';
    }
    dropGeo.attributes.position.needsUpdate = true;
    if (t - trLast > 0.12){ trLast = t; var gi = trAt % TR; trPos[gi*3] = lead.x; trPos[gi*3+1] = terrainH(lead.x, lead.z) + 0.015; trPos[gi*3+2] = lead.z; trAt++; trGeo.attributes.position.needsUpdate = true; }
    // the view: a gentle sway when idle, the drag or the cursor otherwise
    var sway = reduce ? 0 : Math.sin(t*0.09)*0.08;
    spin.rotation.x += (0.46 + S.rotX + S.tiltM - spin.rotation.x)*0.05;
    spin.rotation.y += (sway + S.rotY + S.yawM - spin.rotation.y)*0.05;
    S.renderer.render(S.scene, S.camera);
  });
  return { setMode: S.setMode, destroy: S.destroy };
}

/* A generic fixed-wing drone as dots, in its own frame: nose toward negative x. A long slender fuselage with a bulbous sensor
   nose and a turret underneath, a straight high-aspect wing with a little dihedral, a V-tail, and a pusher propeller at the
   back. Each dot is shaded by a fixed light so the form reads. Returns [x, y, z, shade, size] rows at the given scale. */
function craftDots(sc){
  var L = [0.45, 0.8, 0.4], ll = Math.hypot(L[0], L[1], L[2]); L = [L[0]/ll, L[1]/ll, L[2]/ll]; var pts = [];
  function add(x, y, z, nx, ny, nz, size){ var nl = Math.hypot(nx, ny, nz) || 1, d = Math.max(0, (nx*L[0] + ny*L[1] + nz*L[2])/nl); pts.push([x*sc, y*sc, z*sc, 0.6 - 0.48*d, size || 0.5]); }
  function fr(u){ var nose = 0.24*Math.sin(Math.PI*Math.min(1, u/0.42))*(u < 0.42 ? 1 : 0), body = 0.13*(1 - u)*(1 - u) + 0.04; return Math.max(nose, body)*(u < 0.03 ? u/0.03 : 1); }
  for (var i=0;i<2200;i++){ var u = Math.random(), a = rnd(0, 6.2832), r = fr(u); add(-1.7 + u*3.4, Math.cos(a)*r*0.92 + 0.02, Math.sin(a)*r, 0, Math.cos(a), Math.sin(a), 0.46); }
  for (var g=0; g<240; g++){ var ga = rnd(0,6.2832), gu = rnd(-1,1), gs = Math.sqrt(1 - gu*gu), gr = 0.13; add(-1.05 + gr*gs*Math.cos(ga), -0.2 + gr*gu, gr*gs*Math.sin(ga), gs*Math.cos(ga), gu, gs*Math.sin(ga), 0.42); }
  for (var w=0; w<2600; w++){ var t = rnd(-1, 1), at = Math.abs(t), span = 3.1*t, chord = 0.46 - 0.14*at, le = -0.35 + 0.05*at, c = rnd(0, 1), xw = le + c*chord, th = 0.03*(1 - at*0.6)*Math.sin(Math.PI*c), top = Math.random() < 0.55;
    add(xw, (top ? th : -th) + 0.06 + 0.06*at, span, (c < 0.3 ? -0.3 : 0.1), top ? 1 : -1, 0, 0.42); }
  for (var f=0; f<520; f++){ var sd = f < 260 ? 1 : -1, fc = rnd(0, 1), fl = rnd(0, 1), fx = 1.2 + fl*0.1 + fc*0.34, ang = 35*Math.PI/180; add(fx, 0.03 + fl*0.62*Math.cos(ang), sd*fl*0.62*Math.sin(ang), 0, Math.sin(ang), -sd*Math.cos(ang), 0.42); }
  for (var h=0;h<120;h++){ var ha = rnd(0,6.2832), hu = rnd(-1,1), hs = Math.sqrt(1-hu*hu); add(1.72 + 0.06*hu, 0.02 + 0.06*hs*Math.cos(ha), 0.06*hs*Math.sin(ha), hu, hs*Math.cos(ha), hs*Math.sin(ha), 0.4); }
  for (var b=0;b<120;b++){ var ba = rnd(0,6.2832), br = Math.sqrt(Math.random())*0.5, bl = Math.abs(Math.sin(ba)); if (bl < 0.92) continue; add(1.75, 0.02 + Math.cos(ba)*br, Math.sin(ba)*br, 1, 0, 0, 0.28); }
  return pts;
}
/* The same drone as a designed wireframe: fuselage sections joined by longitudinal lines, the wing's outline, spar and ribs,
   the V-tail outlines, the propeller blades and spinner. Returns a flat array of segment endpoints. */
function craftLines(sc){
  var seg = [];
  function S3(a, b){ seg.push(a[0]*sc, a[1]*sc, a[2]*sc, b[0]*sc, b[1]*sc, b[2]*sc); }
  function ring(x, r, ry, n, y0){ var pts = []; for (var i=0;i<n;i++){ var a = i/n*6.2832; pts.push([x, (y0 || 0) + Math.cos(a)*r*(ry || 1), Math.sin(a)*r]); } for (var j=0;j<n;j++) S3(pts[j], pts[(j+1)%n]); return pts; }
  function fr(u){ var nose = 0.24*Math.sin(Math.PI*Math.min(1, u/0.42))*(u < 0.42 ? 1 : 0), body = 0.13*(1 - u)*(1 - u) + 0.04; return Math.max(nose, body)*(u < 0.03 ? u/0.03 : 1); }
  var secs = [0.03, 0.08, 0.15, 0.24, 0.34, 0.44, 0.56, 0.68, 0.8, 0.9, 0.97], prev = null;
  for (var si=0; si<secs.length; si++){ var u = secs[si], x = -1.7 + u*3.4, pts = ring(x, fr(u), 0.92, 12, 0.02); if (prev) for (var k=0;k<12;k+=2) S3(prev[k], pts[k]); prev = pts; }
  S3([-1.7, 0.02, 0], [-1.7 + 0.03*3.4, 0.02 + fr(0.03)*0.92, 0]); S3([-1.7, 0.02, 0], [-1.7 + 0.03*3.4, 0.02 - fr(0.03)*0.92, 0]);
  ring(-1.05, 0.13, 1, 14, -0.2); for (var m=0;m<14;m++){ var a0 = m/14*6.2832, a1 = (m+1)/14*6.2832; S3([-1.05 + Math.cos(a0)*0.13, -0.2 + Math.sin(a0)*0.13, 0], [-1.05 + Math.cos(a1)*0.13, -0.2 + Math.sin(a1)*0.13, 0]); }
  for (var sd=-1; sd<=1; sd+=2){ var tip = 3.1*sd, root = 0.12*sd, dih = 0.06;
    var rootLE = [-0.35, 0.06, root], rootTE = [-0.35 + 0.46, 0.06, root], tipLE = [-0.3, 0.06 + dih, tip], tipTE = [-0.3 + 0.32, 0.06 + dih, tip];
    S3(rootLE, tipLE); S3(rootTE, tipTE); S3(tipLE, tipTE);
    for (var rb=1; rb<=7; rb++){ var f = rb/7.5, z = root + (tip - root)*f, le = -0.35 + 0.05*f, ch = 0.46 - 0.14*f, y = 0.06 + dih*f; S3([le, y, z], [le + ch, y, z]); }
    S3([-0.35 + 0.15, 0.06, root], [-0.3 + 0.11, 0.06 + dih, tip]); }
  var ang = 35*Math.PI/180;
  for (var sd2=-1; sd2<=1; sd2+=2){ var bx = 1.2, b0 = [bx, 0.03, 0], b1 = [bx + 0.34, 0.03, 0], t0 = [bx + 0.1, 0.03 + 0.62*Math.cos(ang), sd2*0.62*Math.sin(ang)], t1 = [bx + 0.1 + 0.3, 0.03 + 0.62*Math.cos(ang), sd2*0.62*Math.sin(ang)];
    S3(b0, t0); S3(b1, t1); S3(t0, t1); S3([bx + 0.05, 0.03 + 0.31*Math.cos(ang), sd2*0.31*Math.sin(ang)], [bx + 0.05 + 0.32, 0.03 + 0.31*Math.cos(ang), sd2*0.31*Math.sin(ang)]); }
  // the propeller: two blades and a spinner, no disc, and no landing gear
  S3([1.75, 0.5, 0], [1.75, -0.46, 0]); S3([1.75, 0.02, 0.1], [1.75, 0.02, -0.1]); ring(1.72, 0.06, 1, 8, 0.02);
  return new Float32Array(seg);
}
/* The agent designer: one agent in flight over the flat field, its drop line to the ground, a ring of dots turning round it,
   and six callouts fixed round the frame, each anchored to a point that rides with the agent: the built-in managers and the
   blocks an engineer configures. */
export function mountDrone(el){
  var S = stage(el, 9.6, -0.95, 0.3), spin = S.spin;
  ground(S, 9, 5.4, 60, 36, 0.76, 0.42);
  var HALO = 110, D = S.points(HALO, 0.3, 0.4);
  var lineMat = new THREE.LineBasicMaterial({color:0x161616}); S.mats.push(lineMat);
  var SC = 0.58, cd = craftDots(SC), craft = new THREE.Group(); craft.rotation.order = 'YXZ'; spin.add(craft);
  // the drone is drawn in lines, a designed wireframe, with a few dots along the sections for texture
  var wire = new THREE.BufferGeometry(); wire.setAttribute('position', new THREE.BufferAttribute(craftLines(SC), 3)); craft.add(new THREE.LineSegments(wire, lineMat));
  (function(){ var n = Math.min(cd.length, 900), pp = new Float32Array(n*3), cc = new Float32Array(n*3), ss = new Float32Array(n); for (var q=0;q<n;q++){ var e = cd[Math.floor(q*cd.length/n)]; pp[q*3] = e[0]; pp[q*3+1] = e[1]; pp[q*3+2] = e[2]; cc[q*3] = cc[q*3+1] = cc[q*3+2] = 0.45; ss[q] = 0.3; } var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pp, 3)); g.setAttribute('color', new THREE.BufferAttribute(cc, 3)); g.setAttribute('aSize', new THREE.BufferAttribute(ss, 1)); craft.add(new THREE.Points(g, S.mat)); })();
  var body = craft;
  var drop = S.lines(1, 0.28);
  // the callouts anchor to parts of the aircraft, in its own frame; each carries a readout; most tick as the agent flies, the payload holds still
  var CALL = [ {k:'BUILT-IN', n:'Motion Manager', o:[-0.1*SC, 0.16*SC, 0], side:-1, row:0, v:function(t){ return 'LOOP 400 HZ  KP 0.010  KD ' + (0.0052 + 0.0004*Math.sin(t*0.7)).toFixed(4); }},
               {k:'BUILT-IN', n:'Behavior Manager', o:[-1.35*SC, 0.2*SC, 0], side:-1, row:1, v:function(t){ return 'STATE ' + ['LOITER','TRANSIT','SURVEY','RTB'][Math.floor(t/7) % 4] + '  WPT ' + (3 + Math.floor(t/9) % 5) + '/7'; }},
               {k:'BLOCK', n:'Camera', o:[-1.05*SC, -0.34*SC, 0], side:-1, row:2, v:function(t){ return 'GIMBAL ' + (-12 + 6*Math.sin(t*0.4)).toFixed(0) + ' DEG  ZOOM ' + (2 + Math.floor((t/5) % 3)) + 'X'; }},
               {k:'BLOCK', n:'Garmin500 GPS', o:[1.05*SC, 0.16*SC, 0], side:1, row:0, v:function(t){ return 'SIGNAL ' + (88 + 9*Math.abs(Math.sin(t*0.55))).toFixed(0) + '%  ' + (10 + Math.floor((t/4) % 3)) + ' SATS'; }},
               {k:'BLOCK', n:'Payload', o:[0.45*SC, -0.12*SC, 0], side:1, row:1, v:function(t){ return 'MASS 2.4 KG  TEMP 41 C'; }},
               {k:'BLOCK', n:'State Estimation', o:[-0.7*SC, 0.26*SC, 0], side:1, row:2, v:function(t){ return 'DRIFT ' + (0.3 + 0.2*Math.abs(Math.sin(t*0.5))).toFixed(1) + ' M  CONF ' + (96 + 3*Math.abs(Math.cos(t*0.35))).toFixed(0) + '%'; }} ];
  var lead = S.lines(CALL.length, 0.4), rings = S.points(CALL.length*24, 0.09, 0.4);
  for (var ci=0; ci<CALL.length; ci++){ var C = CALL[ci]; C.tag = S.tag(); C.tag.classList.add('call'); C.tag.innerHTML = '<small>' + C.k + '</small>' + C.n + '<em></em>'; C.em = C.tag.querySelector('em'); C.lx = C.side*2.9; C.ly = 2.05 - C.row*0.95; C.last = ''; }
  var Dr = {x:0, y:1.4, z:0, h:0, bank:0}, wv = new THREE.Vector3(), av = new THREE.Vector3();
  function at(t){ return [0.8*Math.sin(t*0.27), 1.35 + 0.15*Math.sin(t*0.5), 0.35*Math.sin(t*0.54 + 0.8)]; }
  S.loop(function(now){
    var dt = Math.min(0.05, (now - S.last)/1000); S.last = now; var t = (now - S.t0)/1000;
    var p = at(t), p2 = at(t + 0.05), hNew = Math.atan2(p2[2] - p[2], p2[0] - p[0]), dh = Math.atan2(Math.sin(hNew - Dr.h), Math.cos(hNew - Dr.h));
    Dr.h += dh; Dr.x = p[0]; Dr.y = p[1]; Dr.z = p[2]; Dr.bank += (Math.max(-0.5, Math.min(0.5, -dh/Math.max(dt, 0.001)*0.18)) - Dr.bank)*0.06;
    // the nose points along the direction of travel; a little bank in the turns and a slow rock
    body.position.set(Dr.x, Dr.y, Dr.z); body.rotation.y = Math.PI - Dr.h; body.rotation.x += (Dr.bank*0.8 + 0.05*Math.sin(t*1.25) - body.rotation.x)*0.08; body.rotation.z += (0.06*Math.sin(t*1.6) - body.rotation.z)*0.08; craft.updateMatrixWorld();
    drop.p[0] = Dr.x; drop.p[1] = Dr.y - 0.18; drop.p[2] = Dr.z; drop.p[3] = Dr.x; drop.p[4] = 0.02; drop.p[5] = Dr.z; drop.g.attributes.position.needsUpdate = true;
    for (var hq=0; hq<HALO; hq++){ var a = hq/HALO*6.2832 + t*0.25, rr = 1.7 + 0.04*Math.sin(hq*0.7 + t*2); D.p[hq*3] = Dr.x + Math.cos(a)*rr; D.p[hq*3+1] = Dr.y - 0.1 + 0.05*Math.sin(a*2 + t); D.p[hq*3+2] = Dr.z + Math.sin(a)*rr; }
    D.g.attributes.position.needsUpdate = true;
    // the callouts: anchors ride with the agent (turning slowly round it), readouts hold their place at the sides, leaders stretch between
    for (var ci2=0; ci2<CALL.length; ci2++){ var C2 = CALL[ci2]; av.set(C2.o[0], C2.o[1], C2.o[2]); craft.localToWorld(av); spin.worldToLocal(av); var ax = av.x, ay = av.y, az = av.z;
      for (var rq=0; rq<24; rq++){ var ra = rq/24*6.2832, i2 = ci2*24 + rq; rings.p[i2*3] = ax + Math.cos(ra)*0.07; rings.p[i2*3+1] = ay + Math.sin(ra)*0.07; rings.p[i2*3+2] = az; }
      // the readouts are not nailed down: each drifts a little on its own slow clock
      wv.set(C2.lx + 0.12*Math.sin(t*0.23 + ci2*1.7), C2.ly + 0.1*Math.sin(t*0.31 + ci2*2.3), 0.3); spin.worldToLocal(wv);
      lead.p[ci2*6] = ax; lead.p[ci2*6+1] = ay; lead.p[ci2*6+2] = az; lead.p[ci2*6+3] = wv.x; lead.p[ci2*6+4] = wv.y; lead.p[ci2*6+5] = wv.z;
      S.place(C2.tag, wv.x, wv.y, wv.z, C2.side < 0);
      var val = C2.v(t); if (val !== C2.last){ C2.em.textContent = val; C2.last = val; }
    }
    rings.g.attributes.position.needsUpdate = true; lead.g.attributes.position.needsUpdate = true;
    S.view(t); S.renderer.render(S.scene, S.camera);
  });
  return { setMode: S.setMode, destroy: S.destroy };
}

/* Reading what the agent did: raw telemetry, a storm of dots streaming in, that gathers into a clean dashboard of small charts,
   a line, bars and a gauge, holds, then dissolves back into the stream and gathers again. */
export function mountDash(el){
  var S = stage(el, 10.2, -0.35, 0.08), spin = S.spin;
  var N = 2600, P = S.points(N, 0.09, 0.55), home = new Float32Array(N*3), tone = new Float32Array(N), ph = new Float32Array(N);
  // the source of the telemetry: the same drone, small, flying across the top of the frame. the dots stream out of its trail into the charts
  var lineMat = new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:1}); S.mats.push(lineMat);
  var craft = new THREE.Group(); craft.rotation.order = 'YXZ'; spin.add(craft);
  var wire = new THREE.BufferGeometry(); wire.setAttribute('position', new THREE.BufferAttribute(craftLines(0.3), 3)); craft.add(new THREE.LineSegments(wire, lineMat));
  var Dr = {x:-3, y:2.4, z:0, h:0, bank:0, vx:-1, vz:0};
  // the transmission: rings of dots pulsing out of the drone while it sends, washing down toward the charts
  var PR = 3, PN = 28, pulses = S.points(PR*PN, 0.3, 0.4);
  function at(t){ return [-2.9 + 0.9*Math.sin(t*0.26), 2.45 + 0.1*Math.sin(t*0.5), -0.4 + 0.3*Math.sin(t*0.41 + 0.8)]; }
  // the dashboard layout: a line chart top left, bars top right, a gauge bottom left, a scatter bottom right, all in a 7 by 3.6 frame
  var i = 0;
  function put(x, y, z, tn){ if (i >= N) return; home[i*3] = x; home[i*3+1] = y; home[i*3+2] = z; tone[i] = tn; i++; }
  function rect(x0, y0, x1, y1, sp, tn){ for (var x=x0; x<=x1; x+=sp) { put(x, y0, 0, tn); put(x, y1, 0, tn); } for (var y=y0+sp; y<y1; y+=sp){ put(x0, y, 0, tn); put(x1, y, 0, tn); } }
  rect(-3.4, 0.2, -0.2, 1.8, 0.07, 0.6); rect(0.2, 0.2, 3.4, 1.8, 0.07, 0.6); rect(-3.4, -1.8, -0.2, -0.2, 0.07, 0.6); rect(0.2, -1.8, 3.4, -0.2, 0.07, 0.6);
  for (var lx=-3.2; lx<=-0.4; lx+=0.035){ var u = (lx + 3.2)/2.8, ly = 0.6 + 0.5*Math.sin(u*5.1) + 0.25*Math.sin(u*13.7) + 0.45*u; put(lx, ly, 0.01, 0.09); put(lx, ly - 0.02, 0.0, 0.3); }
  for (var b=0; b<9; b++){ var bx = 0.5 + b*0.34, bh = 0.35 + 0.95*(0.5 + 0.5*Math.sin(b*1.7 + 1)); for (var by=0.3; by<0.3 + bh; by+=0.05) for (var bw=0; bw<0.2; bw+=0.05) put(bx + bw, by, 0.01, by > 0.3 + bh - 0.1 ? 0.09 : 0.35); }
  for (var ga=Math.PI*1.05; ga>=-Math.PI*0.05; ga-=0.045){ put(-1.8 + Math.cos(ga)*1.1, -1.3 + Math.sin(ga)*1.1, 0.01, 0.4); put(-1.8 + Math.cos(ga)*0.95, -1.3 + Math.sin(ga)*0.95, 0.01, ga > Math.PI*0.32 ? 0.75 : 0.09); }
  for (var nd=0; nd<=1; nd+=0.04) put(-1.8 + Math.cos(0.42)*nd*0.9, -1.3 + Math.sin(0.42)*nd*0.9, 0.02, 0.09);
  for (var sc=0; sc<170; sc++){ var sx = 0.5 + Math.random()*2.6, sy = -1.6 + Math.random()*1.2*(0.3 + 0.7*(sx - 0.5)/2.6) + Math.random()*0.2; put(sx, sy, 0.01, 0.25); }
  for (var gl=0; gl<4; gl++){ for (var gx=-3.2; gx<=-0.4; gx+=0.12) put(gx, 0.45 + gl*0.35, -0.01, 0.78); }
  while (i < N) put(0.5 + Math.random()*2.6, -1.7 + Math.random()*1.3, 0.0, 0.85);
  for (var k=0;k<N;k++){ ph[k] = Math.random(); P.c[k*3] = P.c[k*3+1] = P.c[k*3+2] = tone[k]; }
  var labels = [ S.tag(), S.tag(), S.tag(), S.tag() ], names = ['ALTITUDE OVER TIME', 'FAILURES BY CAUSE', 'MISSION SCORE', 'DISTANCE TO WAYPOINT'], lpos = [[-3.4, 1.95, 0], [0.2, 1.95, 0], [-3.4, -0.05, 0], [0.2, -0.05, 0]];
  var state = S.tag(); state.classList.add('state');
  var CYC = 16, f = 0;
  S.loop(function(now){
    S.last = now; var t = (now - S.t0)/1000, c = t % CYC;
    // the cycle: the drone alone (0 to 2), its data flows out and the dashboard forms (2 to 5.5), hold (5.5 to 12.5), dissolve back to the drone (12.5 to 16)
    var target = c < 2 ? 0 : c < 5.5 ? (c - 2)/3.5 : c < 12.5 ? 1 : 1 - (c - 12.5)/3.5; f = target;
    // the drone flies its loop; its nose follows the motion; the trail runs the other way
    var pp = at(t), p2 = at(t + 0.05), hNew = Math.atan2(p2[2] - pp[2], p2[0] - pp[0]), dh = Math.atan2(Math.sin(hNew - Dr.h), Math.cos(hNew - Dr.h));
    Dr.h += dh; Dr.x = pp[0]; Dr.y = pp[1]; Dr.z = pp[2]; var vl = Math.hypot(p2[0] - pp[0], p2[2] - pp[2]) || 1; Dr.vx = (p2[0] - pp[0])/vl; Dr.vz = (p2[2] - pp[2])/vl;
    // once the data is sent the drone flies off to the right and fades; for the next run it comes back in from the left
    var away = c < 5.5 ? 0 : c < 8 ? (c - 5.5)/2.5 : c < 12.5 ? 1 : 1 - (c - 12.5)/3.5, leaving = c < 12.5, ea = away*away*(3 - 2*away), ax = leaving ? 6.5 : -6.5, ay = 3.6, az = leaving ? -1.5 : 0.5;
    craft.position.set(Dr.x + (ax - Dr.x)*ea, Dr.y + (ay - Dr.y)*ea, Dr.z + (az - Dr.z)*ea); craft.rotation.y = Math.PI - Dr.h; craft.rotation.z += (0.08*Math.sin(t*1.6) - craft.rotation.z)*0.08; lineMat.opacity = 1 - ea;
    for (var k2=0;k2<N;k2++){ var o = k2*3, d = ph[k2], g = Math.max(0, Math.min(1, f*1.6 - d*0.6)); g = g*g*(3 - 2*g);
      // a dot not yet released sits in the drone; once released it leaves the aircraft and flies to its place in the charts, growing as it goes
      var sxx = Dr.x + (d - 0.5)*0.25, syy = Dr.y - 0.1 + (ph[(k2*7) % N] - 0.5)*0.2, szz = Dr.z + (d - 0.5)*0.25;
      P.p[o] = sxx + (home[o] - sxx)*g; P.p[o+1] = syy + (home[o+1] - syy)*g; P.p[o+2] = szz + (home[o+2] - szz)*g; P.s[k2] = g <= 0 ? 0.001 : 0.12 + 0.48*g; }
    var sending = c > 0.3 && c < 5.5;
    for (var pr=0; pr<PR; pr++){ var rad = ((t*0.55 + pr/PR) % 1)*1.7; for (var pq=0; pq<PN; pq++){ var pi2 = pr*PN + pq, pa = pq/PN*6.2832; pulses.p[pi2*3] = Dr.x + Math.cos(pa)*rad; pulses.p[pi2*3+1] = sending ? Dr.y - 0.1 - rad*0.55 : -40; pulses.p[pi2*3+2] = Dr.z + Math.sin(pa)*rad*0.6; pulses.s[pi2] = 0.5*(1 - rad/1.7); } }
    pulses.g.attributes.position.needsUpdate = true; pulses.g.attributes.aSize.needsUpdate = true;
    P.g.attributes.position.needsUpdate = true; P.g.attributes.aSize.needsUpdate = true;
    for (var li=0; li<4; li++){ labels[li].textContent = names[li]; labels[li].style.opacity = f > 0.9 ? 1 : 0; S.place(labels[li], lpos[li][0], lpos[li][1], lpos[li][2], false); }
    state.textContent = c < 2 ? 'RUN 0412  IN FLIGHT' : c < 5.5 ? 'TELEMETRY  ' + Math.floor((c - 2)*4700 + 220) + ' POINTS' : c < 12.5 ? 'RUN 0412  ANALYSED' : 'NEXT RUN'; state.style.opacity = c < 5.5 || c > 12.5 ? 1 - ea : 1; S.place(state, c < 5.5 || c > 12.5 ? Dr.x + 0.3 : -3.4, c < 5.5 || c > 12.5 ? Dr.y + 0.25 : -2.2, c < 5.5 || c > 12.5 ? Dr.z : 0, false);
    S.view(t); S.renderer.render(S.scene, S.camera);
  });
  return { setMode: S.setMode, destroy: S.destroy };
}

/* A running mission: phases down the left, each with its task pool, a bus that carries whichever branch succeeds into the
   next phase, and the phase after that. Cards are drawn in lines, the live path in ink with dots travelling along it, the
   rest ghosted. Checks and crosses land as the mission plays out; the running phase breathes. */
export function mountFlow(el){
  var S = stage(el, 11.5, 0.6, 0.22), spin = S.spin; S.yaw0 = -0.42;
  var CW = 2.3, CH = 0.78, BUSX = -1.25;
  var cards = [ {x:-3.3, y:1.7, z:1.3, t:'Primary Search', k:'taskAreaSearch_1', d:'Area search, Geozone 1', st:'pending'},
                {x:-3.1, y:0.55, z:0.55, t:'Backup Search', k:'taskAreaRecon_1', d:'Area recon, NAI 1', st:'pending'},
                {x:-2.9, y:-0.6, z:-0.2, t:'Backup Search', k:'taskAreaSearch_1', d:'Area search, Geozone 1', st:'pending'},
                {x:-2.7, y:-1.75, z:-0.95, t:'Backup Search', k:'taskAreaSearch_2', d:'Area search, Geozone 2', st:'pending'},
                {x:0.4, y:1.7, z:-0.4, t:'Primary Search', k:'taskAreaSearch_2', d:'Zone 2, NAI, 162 ft/s', st:'pending'},
                {x:3.7, y:1.9, z:-1.6, t:'Target Follow', k:'taskTargetFollow_1', d:'Track, Geozone 1', st:'pending'} ];
  var ghostMat = new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.22}), inkMat = new THREE.LineBasicMaterial({color:0x161616}), pulseMat = new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.3});
  S.mats.push(ghostMat, inkMat, pulseMat);
  function rect(arr, x, y, z, w, h){ var x0 = x - w/2, x1 = x + w/2, y0 = y - h/2, y1 = y + h/2; arr.push(x0,y0,z, x1,y0,z, x1,y0,z, x1,y1,z, x1,y1,z, x0,y1,z, x0,y1,z, x0,y0,z); }
  // the panels and the whole wiring, ghosted; each panel also drops a thin line to the floor so it stands somewhere
  var base = [];
  for (var ci=0; ci<cards.length; ci++){ var c = cards[ci]; rect(base, c.x, c.y, c.z, CW, CH); base.push(c.x - CW/2 + 0.12, c.y + CH/2 - 0.26, c.z, c.x + CW/2 - 0.12, c.y + CH/2 - 0.26, c.z); base.push(c.x - CW/2, c.y - CH/2, c.z, c.x - CW/2, -2.6, c.z); }
  function port(c, side){ return [c.x + side*CW/2, c.y, c.z]; }
  for (var li=0; li<4; li++){ var pr = port(cards[li], 1); base.push(pr[0],pr[1],pr[2], BUSX,pr[1],pr[2]); }
  var pc = port(cards[4], -1), pcr = port(cards[4], 1), pt = port(cards[5], -1);
  for (var bi=0; bi<3; bi++) base.push(BUSX, cards[bi].y, cards[bi].z, BUSX, cards[bi+1].y, cards[bi+1].z);
  base.push(BUSX, cards[0].y, cards[0].z, BUSX, pc[1], pc[2], BUSX, pc[1], pc[2], pc[0], pc[1], pc[2], pcr[0], pcr[1], pcr[2], pt[0], pt[1], pt[2]);
  for (var vi=0; vi<3; vi++){ base.push(cards[vi].x, cards[vi].y - CH/2, cards[vi].z, cards[vi+1].x, cards[vi+1].y + CH/2, cards[vi+1].z); }
  for (var gx=-4.5; gx<=5; gx+=0.5) base.push(gx, -2.6, -2.6, gx, -2.6, 2.2);
  for (var gz=-2.6; gz<=2.2; gz+=0.6) base.push(-4.5, -2.6, gz, 5, -2.6, gz);
  var bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(base), 3)); spin.add(new THREE.LineSegments(bg, ghostMat));
  // the live path, in ink: redrawn as the mission moves on; and the pulse round the running card
  var live = S.lines(8, 1); live.g.setAttribute('position', new THREE.BufferAttribute(live.p, 3));
  var liveSeg = spin.children[spin.children.length - 1]; liveSeg.material = inkMat;
  var pulseGeo = new THREE.BufferGeometry(), pulsePos = new Float32Array(8*3); pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3)); spin.add(new THREE.LineSegments(pulseGeo, pulseMat));
  // the marks: each card gets a check or a cross (two segments) and a spinner of dots
  var marks = S.lines(cards.length*2, 1); spin.children[spin.children.length - 1].material = inkMat;
  var spinners = S.points(cards.length*12, 0.09, 0.42), flow = S.points(36, 0.09, 0.5);
  for (var ti=0; ti<cards.length; ti++){ var c2 = cards[ti]; c2.tag = S.tag(); c2.tag.classList.add('card'); c2.tag.innerHTML = '<b>' + c2.t + '</b><span>' + c2.k + '</span><em>' + c2.d + '</em>'; }
  var note = S.tag(); note.classList.add('state');
  var CYC = 15;
  function states(c){
    var st = ['pending','pending','pending','pending','pending','pending'], path = null, note_ = 'MISSION 0412  PRIMARY SEARCH';
    if (c > 0.5) st[0] = 'running';
    if (c > 3.4){ st[0] = 'fail'; st[1] = 'fail'; note_ = 'TASK 2 FAILED  BACKUP 1 CANCELLED'; }
    if (c > 4.2){ st[2] = 'running'; note_ = 'BACKUP SEARCH 2  RUNNING'; }
    if (c > 6.6){ st[2] = 'done'; st[3] = 'done'; st[4] = 'running'; path = [[cards[2].x + CW/2, cards[2].y, cards[2].z], [BUSX, cards[2].y, cards[2].z], [BUSX, cards[1].y, cards[1].z], [BUSX, cards[0].y, cards[0].z], [BUSX, cards[4].y, cards[4].z], [cards[4].x - CW/2, cards[4].y, cards[4].z]]; note_ = 'PRIMARY SEARCH  RUNNING ON BACKUP 2'; }
    if (c > 10.4){ st[4] = 'done'; st[5] = 'running'; path = [[cards[4].x + CW/2, cards[4].y, cards[4].z], [cards[5].x - CW/2, cards[5].y, cards[5].z]]; note_ = 'TARGET FOLLOW  RUNNING'; }
    if (c > 13.6){ st[5] = 'done'; path = null; note_ = 'MISSION 0412  COMPLETE'; }
    return {st:st, path:path, note:note_};
  }
  S.loop(function(now){
    S.last = now; var t = (now - S.t0)/1000, c = t % CYC, R = states(c), running = -1;
    for (var i=0; i<cards.length; i++){ var cd = cards[i], st = R.st[i]; cd.st = st; if (st === 'running') running = i;
      var mx = cd.x + CW/2 - 0.3, my = cd.y + CH/2 - 0.26, mz = cd.z + 0.01, o = i*12;
      if (st === 'done'){ marks.p.set([mx - 0.1, my, mz, mx - 0.03, my - 0.08, mz, mx - 0.03, my - 0.08, mz, mx + 0.12, my + 0.09, mz], o); }
      else if (st === 'fail'){ marks.p.set([mx - 0.09, my - 0.09, mz, mx + 0.09, my + 0.09, mz, mx - 0.09, my + 0.09, mz, mx + 0.09, my - 0.09, mz], o); }
      else { marks.p.set([0,-40,0, 0,-40,0, 0,-40,0, 0,-40,0], o); }
      for (var q=0;q<12;q++){ var si = i*12 + q, a = q/12*6.2832 - t*2.6, on = st === 'running'; spinners.p[si*3] = on ? mx + Math.cos(a)*0.1 : 0; spinners.p[si*3+1] = on ? my + Math.sin(a)*0.1 : -40; spinners.p[si*3+2] = mz; spinners.s[si] = 0.2 + 0.3*((q/12 + t*0.4) % 1); }
      cd.tag.classList.toggle('done', st === 'done'); cd.tag.classList.toggle('fail', st === 'fail'); cd.tag.classList.toggle('run', st === 'running');
      S.place(cd.tag, cd.x - CW/2 + 0.12, cd.y + CH/2 - 0.1, cd.z, false);
    }
    marks.g.attributes.position.needsUpdate = true; spinners.g.attributes.position.needsUpdate = true; spinners.g.attributes.aSize.needsUpdate = true;
    // the pulse: a second outline round the running card, breathing
    if (running >= 0){ var rc = cards[running], pad = 0.06 + 0.03*Math.sin(t*2.2), arr = []; rect(arr, rc.x, rc.y, rc.z + 0.02, CW + pad*2, CH + pad*2); pulsePos.set(arr); pulseMat.opacity = 0.25 + 0.2*Math.sin(t*2.2); } else pulsePos.fill(-40);
    pulseGeo.attributes.position.needsUpdate = true;
    // the live path and the dots travelling it
    live.p.fill(-40); var total = 0, segs = [];
    if (R.path){ for (var pi=0; pi<R.path.length - 1; pi++){ var a0 = R.path[pi], a1 = R.path[pi+1], L = Math.hypot(a1[0]-a0[0], a1[1]-a0[1], a1[2]-a0[2]) || 0.001; segs.push([a0, a1, L]); total += L; live.p.set([a0[0], a0[1], a0[2] + 0.005, a1[0], a1[1], a1[2] + 0.005], pi*6); } }
    live.g.attributes.position.needsUpdate = true;
    for (var fi=0; fi<36; fi++){ if (!R.path){ flow.p[fi*3+1] = -40; continue; } var u = ((t*0.9 + fi/36) % 1)*total, acc = 0, px = 0, py = 0, pz = 0;
      for (var sgi=0; sgi<segs.length; sgi++){ var sg = segs[sgi]; if (u <= acc + sg[2] || sgi === segs.length - 1){ var f = Math.max(0, Math.min(1, (u - acc)/sg[2])); px = sg[0][0] + (sg[1][0]-sg[0][0])*f; py = sg[0][1] + (sg[1][1]-sg[0][1])*f; pz = sg[0][2] + (sg[1][2]-sg[0][2])*f; break; } acc += sg[2]; }
      flow.p[fi*3] = px; flow.p[fi*3+1] = py; flow.p[fi*3+2] = pz + 0.01; }
    flow.g.attributes.position.needsUpdate = true;
    note.textContent = R.note; S.place(note, cards[3].x - CW/2, -2.95, cards[3].z, false);
    S.view(t); S.renderer.render(S.scene, S.camera);
  });
  return { setMode: S.setMode, destroy: S.destroy };
}

/* A placeholder for a scene still to be built: a quiet field of dots with a slow swell passing through it, a few rings
   resting on it, turning through a full slow circle. The tag says what the scene will be. */
export function mountHold(el, label){
  var S = stage(el, 12.5, -0.9, 0.5), cols = 96, rows = 56, G = ground(S, 10.5, 6.2, cols, rows, 0.6, 0.42);
  var base = new Float32Array(G.p);
  var RN = 3, RP = 90, R = S.points(RN*RP, 0.09, 0.5), rings = [[-2.2, -1.1, 0.9], [1.6, 0.4, 1.3], [-0.3, 1.6, 0.6]];
  var tag = S.tag(); tag.classList.add('state'); tag.textContent = (label || 'SCENE') + '  TO COME';
  var pin = S.lines(1, 0.28);
  S.loop(function(now){
    var t = (now - S.t0)/1000; S.yaw0 = reduce ? 0 : t*0.07;
    for (var i=0; i<cols*rows; i++){ var x = base[i*3], z = base[i*3+2]; var h = Math.sin(x*0.9 + t*0.5)*0.11 + Math.sin(z*1.3 - t*0.33)*0.08 + Math.sin((x + z)*0.5 + t*0.2)*0.06; G.p[i*3+1] = h; var tn = 0.62 - (h + 0.25)*0.5; G.c[i*3] = G.c[i*3+1] = G.c[i*3+2] = tn; }
    G.g.attributes.position.needsUpdate = true; G.g.attributes.color.needsUpdate = true;
    for (var r=0; r<RN; r++){ var rg = rings[r]; for (var k=0; k<RP; k++){ var a = k/RP*Math.PI*2, i2 = r*RP + k, x2 = rg[0] + Math.cos(a)*rg[2], z2 = rg[1] + Math.sin(a)*rg[2]; var h2 = Math.sin(x2*0.9 + t*0.5)*0.11 + Math.sin(z2*1.3 - t*0.33)*0.08 + Math.sin((x2 + z2)*0.5 + t*0.2)*0.06; R.p[i2*3] = x2; R.p[i2*3+1] = h2 + 0.02; R.p[i2*3+2] = z2; } }
    R.g.attributes.position.needsUpdate = true;
    var px = rings[1][0], pz = rings[1][1], ph = Math.sin(px*0.9 + t*0.5)*0.11 + Math.sin(pz*1.3 - t*0.33)*0.08 + Math.sin((px + pz)*0.5 + t*0.2)*0.06;
    pin.p.set([px, ph, pz, px, ph + 1.3, pz]); pin.g.attributes.position.needsUpdate = true;
    S.place(tag, px, ph + 1.3, pz, false);
    S.view(t); S.renderer.render(S.scene, S.camera);
  });
  return { setMode: S.setMode, destroy: S.destroy };
}

/** One entry point for the component: which scene, on which element. */
export function mountScene(kind, el, label){
  if (kind === 'pilots') return mount(el);
  if (kind === 'drone') return mountDrone(el);
  if (kind === 'dash') return mountDash(el);
  if (kind === 'flow') return mountFlow(el);
  return mountHold(el, label);
}
