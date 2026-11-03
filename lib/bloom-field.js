// @ts-nocheck
/* The home page's field: one fixed field of dots behind the page, greys on near-white. Eighteen thousand dots make each
   line's object: a spiral galaxy that runs behind the headline and turns on its axis, a terrain with five AI pilots over it,
   a block of buildings that underwriting agents read, the market as a constellation, seven agents' equity curves, a table of
   proxies, and a point the whole field is drawn into. Scrolling blows the object apart; when you stop, the dots gather into
   the next object. A few dots pulse. The cursor pushes dots aside. Drag to turn whatever is formed.
   mountField(host, root) returns { destroy }. root is the page element that holds the hero, the lines, the counter and the rail. */
import * as THREE from "three";

export function mountField(host, root) {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alive = true, cleanups = [];
  function on(target, type, fn, opts){ target.addEventListener(type, fn, opts); cleanups.push(function(){ target.removeEventListener(type, fn, opts); }); }
  var renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  host.appendChild(renderer.domElement);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  var N = 18000;
  var G = { ink:[0.09,0.09,0.09], dark:[0.2,0.2,0.2], mid:[0.43,0.43,0.42], soft:[0.62,0.62,0.6], light:[0.76,0.76,0.74] };
  function rnd(a,b){ return a + Math.random()*(b-a); }
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function hash(x,y,z){ var s = Math.sin(x*127.1 + y*311.7 + z*74.7)*43758.5453; return s - Math.floor(s); }
  function vnoise(x,y,z){
    var ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z), fx = x-ix, fy = y-iy, fz = z-iz;
    fx = fx*fx*(3-2*fx); fy = fy*fy*(3-2*fy); fz = fz*fz*(3-2*fz);
    function L(a,b,t){ return a + (b-a)*t; }
    return L(L(L(hash(ix,iy,iz),hash(ix+1,iy,iz),fx), L(hash(ix,iy+1,iz),hash(ix+1,iy+1,iz),fx),fy), L(L(hash(ix,iy,iz+1),hash(ix+1,iy,iz+1),fx), L(hash(ix,iy+1,iz+1),hash(ix+1,iy+1,iz+1),fx),fy), fz);
  }

  // ---------- figures: N motes each, [x,y,z, r,g,b] ----------
  function pack(list, size){
    var p = new Float32Array(N*3), c = new Float32Array(N*3), s = new Float32Array(N);
    for (var i=0;i<N;i++){
      var e = list[i % list.length], j = i < list.length ? 0 : 0.04;
      p[i*3]=e[0]+rnd(-j,j); p[i*3+1]=e[1]+rnd(-j,j); p[i*3+2]=e[2]+rnd(-j,j);
      c[i*3]=e[3]; c[i*3+1]=e[4]; c[i*3+2]=e[5];
      s[i] = e.length > 6 ? e[6] : 1;          // optional per-dot size
    }
    return {p:p, c:c, s:s, size:size || 1};
  }
  var FIG = {};
  // hero: a spiral galaxy built the way real ones are structured.
  // a dense bulge, two main logarithmic arms with two fainter ones between, arms that widen and loosen with radius,
  // a thin diffuse disk underneath, and a sparse halo. the disk lies flat; the view tilts it to three quarters.
  function gauss(){ var u = 1 - Math.random(), v = Math.random(); return Math.sqrt(-2*Math.log(u)) * Math.cos(6.2832*v); }
  FIG.hero = function(){
    var list = [], R = 5.6, b = 0.27, BAR = 0.8;         // b sets how tightly the arms wind, BAR the half-length of the central bar
    for (var n=0;n<N;n++){
      var u = Math.random(), x, y, z, shade, s;
      if (u < 0.16){
        // the bulge: a flattened ball, very dense at the centre
        var rr = Math.pow(Math.abs(gauss()), 1.3) * 0.55, a1 = rnd(0,6.2832), c1 = rnd(-1,1), s1 = Math.sqrt(1-c1*c1);
        x = Math.cos(a1)*s1*rr; z = Math.sin(a1)*s1*rr; y = c1*rr*0.5;
        shade = 0.04 + 0.2*Math.min(1, rr/0.6); s = 0.9 + 0.9*Math.random()*(1 - Math.min(1, rr/0.6));
      } else if (u < 0.24){
        // the bar: a soft elongated core that the two main arms spring from, rounded off rather than a hard line
        var bx = gauss()*BAR*0.4, bz = gauss()*0.22, by = gauss()*0.09;
        x = bx; z = bz; y = by;
        shade = 0.08 + 0.2*Math.min(1, Math.abs(bx)/BAR); s = 0.7 + 0.5*Math.random();
      } else if (u < 0.84){
        // the arms: log spiral r = r0 * e^(b*theta), sampled by radius so the outer arms are as populated as the inner.
        // two bright arms leaving the ends of the bar, two fainter ones between them
        var major = Math.random() < 0.76, k = major ? (n % 2) : 2 + (n % 2), r0 = BAR;
        var r = BAR + Math.pow(Math.random(), 0.9) * (R - BAR), theta = Math.log(r/r0)/b;
        var phase = theta + (major ? k*Math.PI : Math.PI/2 + (k-2)*Math.PI);
        var width = 0.07 + 0.16*(r/R);                  // arms widen outward
        var off = gauss() * width * (major ? 1 : 1.5);  // the faint arms are looser
        // the dust lane: a dark gap along the inner edge of each main arm, where real spirals hide their stars
        if (major && off < -width*0.25 && off > -width*0.9 && Math.random() < 0.8) continue;
        // the arm's own direction, so clumps stretch along it rather than across it
        var tx = -Math.sin(phase) + b*Math.cos(phase), tz = Math.cos(phase) + b*Math.sin(phase), tl = Math.hypot(tx,tz);
        var along = Math.random() < 0.3 ? gauss()*0.12 : 0;
        // spurs: short feathers that trail off the arms at a steep angle
        var spur = 0; if (major && Math.random() < 0.12){ spur = Math.random()*0.5; off += spur*0.6; along -= spur*0.9; }
        // star-forming knots along the arms: beads of brighter, bigger dots
        var bead = Math.random() < 0.07;
        x = Math.cos(phase)*(r + off) + tx/tl*along; z = Math.sin(phase)*(r + off) + tz/tl*along; y = gauss()*0.035*(1 + r/R);
        var tt = r/R;
        shade = (major ? 0.12 : 0.32) + 0.3*tt - (bead ? 0.12 : 0);
        s = 0.45 + 0.4*(1 - tt)*Math.random() + (bead ? 0.9 : 0);
      } else if (u < 0.96){
        // the disk: an exponential sheet of faint stars between the arms
        var rd = -Math.log(1 - Math.random()) * 1.4; if (rd > R) rd = R*Math.random();
        var ad = rnd(0,6.2832);
        x = Math.cos(ad)*rd; z = Math.sin(ad)*rd; y = gauss()*0.04*(1 + rd/R);
        shade = 0.48 + 0.2*(rd/R); s = 0.4 + 0.3*Math.random();
      } else {
        // the halo: a few far stars all round, and a handful of tight globular clusters
        var rh = R*(0.6 + Math.random()*0.9), ah = rnd(0,6.2832), ch = rnd(-1,1), sh = Math.sqrt(1-ch*ch);
        x = Math.cos(ah)*sh*rh; z = Math.sin(ah)*sh*rh; y = ch*rh*0.5;
        if (Math.random() < 0.35){ var gci = n % 5, gca = gci*1.2566 + 0.4, gcr = R*(0.75 + 0.1*gci); x = Math.cos(gca)*gcr + gauss()*0.06; z = Math.sin(gca)*gcr + gauss()*0.06; y = (gci - 2)*0.5 + gauss()*0.05; }
        shade = 0.55 + 0.15*Math.random(); s = 0.35 + 0.3*Math.random();
      }
      list.push([x, y, z, shade, shade, shade*0.99, s]);
    }
    return pack(list, 0.56);
  };
  // terrain: a synthetic environment read as a topographic lattice. a regular grid of dots over fractal elevation,
  // a mountain range rising at the back, a flat valley floor, and contour lines picked out darker
  var TW = 10.0, TD = 9.0;                             // width and depth of the terrain in world units
  // the hills: x, z, height, radius. spread across the whole field, the taller ones further back
  var PEAKS = [[-3.6,-2.8,1.6,1.3],[-1.2,-3.4,1.9,1.5],[1.4,-2.2,1.3,1.2],[3.8,-3.2,1.7,1.4],[-2.4,0.2,0.9,1.1],[2.6,0.6,0.8,1.0],[0.4,-0.6,1.0,0.9],[-4.2,1.8,0.6,1.0],[4.4,2.0,0.7,1.1],[0.0,2.6,0.5,0.9]];
  function terrainH(x, z){
    var n1 = vnoise(x*0.34 + 11, 7, z*0.34), n2 = vnoise(x*0.9 + 3, 2, z*0.9 + 5), n3 = vnoise(x*2.2, 5, z*2.2 + 9);
    var ridge = 1 - Math.abs(2*n1 - 1);                // ridged noise, blended with the plain noise so the hills stay rounded
    var hill = 0.5*ridge + 0.5*n1;
    var h = Math.pow(hill, 1.3)*1.0 + (n2 - 0.5)*0.55 + (n3 - 0.5)*0.12 - 0.55;
    // hills scattered across the field rather than one range: each a soft peak, sharpened by the ridged noise
    for (var pk=0; pk<PEAKS.length; pk++){
      var P0 = PEAKS[pk], dx = (x - P0[0])/P0[3], dz = (z - P0[1])/P0[3], g = Math.exp(-(dx*dx + dz*dz));
      h += P0[2] * g * (0.55 + 0.45*ridge);
    }
    return Math.max(h, -0.45);                         // a valley floor
  }
  FIG.terrain = function(){
    var list = [], cols = 126, rows = 76;
    // the lattice
    for (var r=0;r<rows;r++) for (var c=0;c<cols;c++){
      var x = (c/(cols-1) - 0.5)*TW, z = (r/(rows-1) - 0.5)*TD, h = terrainH(x, z), t = Math.min(1, (h + 0.45)/2.6);
      var shade = 0.66 - 0.42*t;                        // low ground light, high ground dark
      list.push([x, h, z, shade, shade, shade*0.99, 0.5 + 0.4*t]);
    }
    // the contour lines
    var want = N - list.length, tries = 0;
    while (list.length < N && tries < want*40){
      tries++;
      var cx = rnd(-TW/2, TW/2), cz = rnd(-TD/2, TD/2), ch = terrainH(cx, cz);
      var f = ((ch + 0.45) / 0.22) % 1;
      if (f > 0.09) continue;
      list.push([cx, ch + 0.01, cz, G.ink[0], G.ink[1], G.ink[2], 0.7]);
    }
    return pack(list, 0.8);
  };
  // underwriting as a place: a block of buildings made of dots, the book of business, and a few agents that fly from
  // one to the next, hover, scan it with a cone of light, and surface what they found as a readout, the way the pilots' call signs do.
  // the readouts are text, not dots; the dots make the buildings. the building being read darkens while it is scanned.
  var BLDG = [];
  (function(){
    var cols = 6, rows = 4, lot = 0;
    for (var r=0;r<rows;r++) for (var c=0;c<cols;c++){
      lot++;
      if (Math.random() < 0.14) continue;
      var cx = -4.3 + c*1.6 + rnd(-0.14,0.14), cz = -3.1 + r*1.65 + rnd(-0.1,0.1);
      var w = rnd(0.5,1.0), d = rnd(0.45,0.9), h = Math.random() < 0.25 ? rnd(1.1,1.8) : rnd(0.2,0.9);
      var fire = Math.round((0.05 + Math.random()*0.55)*100)/100, flood = pick(['X','X','X','AE','VE']), roof = 1985 + Math.floor(Math.random()*37);
      var tiv = Math.round((w*d*h*3.8 + 0.8)*10)/10;
      BLDG.push({lot:lot, x:cx, z:cz, w:w, d:d, h:h, fire:fire, flood:flood, roof:roof, tiv:tiv, ok: fire < 0.4 && flood !== 'VE', s0:0, n:0});
    }
  })();
  // the rest of the city: rows behind the block that run off into the distance, each fainter, smaller and sparser than the last. the agents never go there
  var FARB = [];
  (function(){ for (var r=1; r<=5; r++) for (var c=0; c<9; c++){ if (Math.random() < 0.2) continue; var fd = r/6;
    FARB.push({x:-6.7 + c*1.6 + rnd(-0.14,0.14), z:-3.1 - r*1.65 + rnd(-0.1,0.1), w:rnd(0.5,1.0), d:rnd(0.45,0.9), h:(Math.random() < 0.25 ? rnd(1.1,1.9) : rnd(0.2,0.9)), fd:fd}); } })();
  FIG.grid = function(){
    var list = [], DENS = 95;
    function edge(ax,ay,az,bx,by,bz,sp,shade,size){ var L = Math.hypot(bx-ax,by-ay,bz-az), n = Math.max(2, Math.round(L/sp)); for (var i=0;i<=n;i++){ var f=i/n; list.push([ax+(bx-ax)*f, ay+(by-ay)*f, az+(bz-az)*f, shade, shade, shade*0.99, size]); } }
    for (var bi=0; bi<BLDG.length; bi++){
      var B = BLDG[bi], x0 = B.x - B.w/2, x1 = B.x + B.w/2, z0 = B.z - B.d/2, z1 = B.z + B.d/2, h = B.h;
      B.s0 = list.length;
      // the edges in ink
      edge(x0,0,z0, x0,h,z0, 0.055, 0.09, 0.62); edge(x1,0,z0, x1,h,z0, 0.055, 0.09, 0.62); edge(x0,0,z1, x0,h,z1, 0.055, 0.09, 0.62); edge(x1,0,z1, x1,h,z1, 0.055, 0.09, 0.62);
      edge(x0,h,z0, x1,h,z0, 0.055, 0.09, 0.62); edge(x0,h,z1, x1,h,z1, 0.055, 0.09, 0.62); edge(x0,h,z0, x0,h,z1, 0.055, 0.09, 0.62); edge(x1,h,z0, x1,h,z1, 0.055, 0.09, 0.62);
      edge(x0,0,z1, x1,0,z1, 0.055, 0.2, 0.5); edge(x0,0,z0, x0,0,z1, 0.055, 0.2, 0.5); edge(x1,0,z0, x1,0,z1, 0.055, 0.2, 0.5);
      // the storeys, drawn round the front and the two sides
      for (var fl=0.3; fl<h-0.12; fl+=0.3){ edge(x0,fl,z1, x1,fl,z1, 0.07, 0.43, 0.42); edge(x0,fl,z0, x0,fl,z1, 0.07, 0.62, 0.38); edge(x1,fl,z0, x1,fl,z1, 0.07, 0.62, 0.38); }
      // the faces: the roof mid grey, the front soft, the sides light
      var nTop = Math.round(B.w*B.d*DENS), nFront = Math.round(B.w*h*DENS*0.7), nSide = Math.round(B.d*h*DENS*0.45);
      for (var k=0;k<nTop;k++) list.push([rnd(x0,x1), h, rnd(z0,z1), 0.2, 0.2, 0.2, 0.52]);
      for (var k2=0;k2<nFront;k2++) list.push([rnd(x0,x1), rnd(0,h), z1, 0.43, 0.43, 0.42, 0.46]);
      for (var k3=0;k3<nSide;k3++){ list.push([x0, rnd(0,h), rnd(z0,z1), 0.62, 0.62, 0.6, 0.4]); list.push([x1, rnd(0,h), rnd(z0,z1), 0.62, 0.62, 0.6, 0.4]); }
      B.n = list.length - B.s0;
    }
    // the far rows: edges and faces fade toward the paper with distance, fewer dots, no storeys past the second row
    for (var fb=0; fb<FARB.length; fb++){ var F = FARB[fb], fx0 = F.x - F.w/2, fx1 = F.x + F.w/2, fz0 = F.z - F.d/2, fz1 = F.z + F.d/2, fh = F.h, fd = F.fd;
      var eS = 0.09 + (0.72 - 0.09)*fd, eZ = 0.62*(1 - 0.5*fd), sp2 = 0.055*(1 + 1.2*fd);
      edge(fx0,0,fz0, fx0,fh,fz0, sp2, eS, eZ); edge(fx1,0,fz0, fx1,fh,fz0, sp2, eS, eZ); edge(fx0,0,fz1, fx0,fh,fz1, sp2, eS, eZ); edge(fx1,0,fz1, fx1,fh,fz1, sp2, eS, eZ);
      edge(fx0,fh,fz0, fx1,fh,fz0, sp2, eS, eZ); edge(fx0,fh,fz1, fx1,fh,fz1, sp2, eS, eZ); edge(fx0,fh,fz0, fx0,fh,fz1, sp2, eS, eZ); edge(fx1,fh,fz0, fx1,fh,fz1, sp2, eS, eZ);
      if (fd < 0.4) for (var fl2=0.3; fl2<fh-0.12; fl2+=0.3) edge(fx0,fl2,fz1, fx1,fl2,fz1, 0.09, 0.43 + (0.74 - 0.43)*fd, 0.36);
      var dens = DENS*(1 - 0.75*fd), tS = 0.2 + (0.72 - 0.2)*fd, frS = 0.43 + (0.76 - 0.43)*fd, sdS = 0.62 + (0.78 - 0.62)*fd, fz = 0.46*(1 - 0.5*fd);
      var nT = Math.round(F.w*F.d*dens), nF = Math.round(F.w*fh*dens*0.7), nS = Math.round(F.d*fh*dens*0.4);
      for (var q1=0;q1<nT;q1++) list.push([rnd(fx0,fx1), fh, rnd(fz0,fz1), tS, tS, tS, fz]);
      for (var q2=0;q2<nF;q2++) list.push([rnd(fx0,fx1), rnd(0,fh), fz1, frS, frS, frS*0.99, fz]);
      for (var q3=0;q3<nS;q3++){ list.push([fx0, rnd(0,fh), rnd(fz0,fz1), sdS, sdS, sdS*0.98, fz*0.9]); list.push([fx1, rnd(0,fh), rnd(fz0,fz1), sdS, sdS, sdS*0.98, fz*0.9]); } }
    // the streets between the lots, faint; they run on behind the block more thinly
    for (var c=0; c<=6; c++){ var sx = -5.1 + c*1.6; for (var z=-3.95; z<2.75; z+=0.09) list.push([sx, 0, z, G.light[0], G.light[1], G.light[2], 0.3]); }
    for (var c2=0; c2<=9; c2++){ var sx2 = -7.5 + c2*1.6; for (var z2=-12.2; z2<-3.95; z2+=0.16) list.push([sx2, 0, z2, G.light[0], G.light[1], G.light[2], 0.22]); }
    for (var r2=1; r2<=5; r2++){ var sz2 = -3.92 - r2*1.65; for (var x2=-7.5; x2<7.1; x2+=0.16) list.push([x2, 0, sz2, G.light[0], G.light[1], G.light[2], 0.22]); }
    for (var r=0; r<=4; r++){ var sz = -3.92 + r*1.65; for (var x=-5.1; x<4.6; x+=0.09) list.push([x, 0, sz, G.light[0], G.light[1], G.light[2], 0.3]); }
    while (list.length < N) list.push([rnd(-5.1, 4.6), -0.01, rnd(-3.95, 2.75), G.light[0], G.light[1], G.light[2], 0.2]);
    var tgt = pack(list, 0.75);
    tgt.base = new Float32Array(tgt.c);
    return tgt;
  };
  // darken a building while an agent reads it, and let it go after
  function tint(k, on){
    var fg = targets.grid; if (!fg) return;
    var B = BLDG[k];
    for (var i=B.s0; i<B.s0 + B.n && i<N; i++){ fg.c[i*3] = on ? 0.09 : fg.base[i*3]; fg.c[i*3+1] = on ? 0.09 : fg.base[i*3+1]; fg.c[i*3+2] = on ? 0.09 : fg.base[i*3+2]; }
  }
  function readout(i, B){
    return 'UW-0' + (i+1) + '  LOT ' + (B.lot < 10 ? '0' : '') + B.lot + '\nFIRE ' + B.fire.toFixed(2) + '   FLOOD ' + B.flood + '\nROOF ' + B.roof + '   TIV $' + B.tiv.toFixed(1) + 'M\n' + (B.ok ? 'IN APPETITE' : 'OUT OF APPETITE');
  }
  // the market as a constellation: nodes of every size hanging in space around each other, some big, most small,
  // passing data between them in short trains. live each frame.
  var NW = 10.0, ND = 8.0, NODES = [], LINKS = [];
  (function(){
    // four tiers, from six hubs down to a hundred tiny nodes, spread through a deep volume so the turn keeps bringing new ones forward
    var tiers = [[6, 0.34, 400, 1.0, 2.2, 1.6], [14, 0.19, 140, 0.5, 2.9, 0.5], [60, 0.085, 40, 0.15, 3.3, 0.35], [110, 0.05, 12, 0.1, 3.6, 0.25]];
    for (var ti=0; ti<tiers.length; ti++){
      for (var c=0; c<tiers[ti][0]; c++){
        for (var tr=0; tr<80; tr++){
          var x = rnd(-6.5, 6.5), z = rnd(-5.5, 1.5), y = rnd(tiers[ti][3], tiers[ti][4]), ok = true;
          for (var j=0;j<NODES.length;j++){ var o = NODES[j]; if (Math.hypot(x - o.x, y - o.y, z - o.z) < tiers[ti][1] + o.r + tiers[ti][5]){ ok = false; break; } }
          if (ok){ NODES.push({x:x, y:y, z:z, r:tiers[ti][1], d:tiers[ti][2], tier:ti, ph:Math.random()*6.28}); break; }
        }
      }
    }
    // links: the hubs all talk to each other; everything else to its nearest few, the tiny ones to just one
    var seen = {};
    function link(a, b){ var key = a < b ? a + '-' + b : b + '-' + a; if (seen[key] || a === b) return; seen[key] = true; LINKS.push([a, b]); }
    for (var i=0;i<NODES.length;i++){
      var n = NODES[i], want = n.tier === 3 ? 1 : n.tier === 2 ? 2 : 3, cand = [];
      for (var k=0;k<NODES.length;k++) if (k !== i) cand.push([Math.hypot(NODES[k].x - n.x, NODES[k].y - n.y, NODES[k].z - n.z) * (NODES[k].tier === 0 ? 0.7 : 1), k]);
      cand.sort(function(p, q){ return p[0] - q[0]; });
      for (var w=0; w<want; w++) link(i, cand[w][1]);
      if (n.tier === 0) for (var h=0;h<NODES.length;h++) if (NODES[h].tier === 0) link(i, h);
    }
  })();
  function ballDot(n, scale){ var rr = Math.cbrt(Math.random())*n.r*scale, u = rnd(-1,1), s1 = Math.sqrt(1-u*u), a = rnd(0,6.2832); return [n.x + Math.cos(a)*s1*rr, n.y + u*rr, n.z + Math.sin(a)*s1*rr]; }
  // the market: a constellation of nodes at every size, each a ball of dots, dotted links between them, data in short trains at mixed speeds.
  // the far nodes are faded toward the paper and smaller; as the scene turns they come forward and into focus. live each frame.
  FIG.chart = function(){
    var list = [], PKT = 12, balls = [], nodeOf = [], linkRanges = [];
    for (var ni=0; ni<NODES.length; ni++){
      var n = NODES[ni], col = n.tier === 0 ? G.ink : n.tier === 1 ? G.dark : n.tier === 2 ? G.mid : G.soft, b0 = list.length;
      for (var k=0;k<n.d;k++){ var q = ballDot(n, 1); list.push([q[0], q[1], q[2], col[0], col[1], col[2], n.tier >= 2 ? 0.55 : 0.7]); }
      if (n.tier === 0) for (var k2=0;k2<70;k2++){ var a2 = k2/70*6.2832; list.push([n.x + Math.cos(a2)*n.r*1.7, n.y, n.z + Math.sin(a2)*n.r*1.7, G.light[0], G.light[1], G.light[2], 0.4]); }
      balls.push([b0, list.length, n, ni]);
    }
    for (var li=0; li<LINKS.length; li++){
      var A = NODES[LINKS[li][0]], B = NODES[LINKS[li][1]], L = Math.hypot(B.x - A.x, B.y - A.y, B.z - A.z), steps = Math.floor(L/0.09), l0 = list.length;
      for (var s=0; s<=steps; s++){ var f = s/steps, x = A.x + (B.x - A.x)*f, y = A.y + (B.y - A.y)*f, z = A.z + (B.z - A.z)*f; if (Math.hypot(x - A.x, y - A.y, z - A.z) < A.r*1.15 || Math.hypot(x - B.x, y - B.y, z - B.z) < B.r*1.15) continue; list.push([x, y, z, G.light[0], G.light[1], G.light[2], 0.34]); }
      linkRanges.push([l0, list.length, LINKS[li][0], LINKS[li][1]]);
    }
    // the data in flight runs on every link except those to the tiny far nodes
    var pkLinks = []; for (var pl=0; pl<LINKS.length; pl++) if (NODES[LINKS[pl][0]].tier <= 2 && NODES[LINKS[pl][1]].tier <= 2) pkLinks.push(pl);
    var packetStart = list.length; for (var p=0;p<pkLinks.length*PKT;p++) list.push([0, -40, 0, G.ink[0], G.ink[1], G.ink[2], 0.6]);
    var fillStart = list.length;
    while (list.length < N){ var u = Math.random(), nk = u < 0.4 ? Math.floor(Math.random()*6) : u < 0.75 ? 6 + Math.floor(Math.random()*14) : 20 + Math.floor(Math.random()*(NODES.length - 20)), nn = NODES[nk], col2 = nn.tier === 0 ? G.ink : nn.tier === 1 ? G.dark : nn.tier === 2 ? G.mid : G.soft, q2 = ballDot(nn, 1.05); list.push([q2[0], q2[1], q2[2], col2[0], col2[1], col2[2], 0.5]); nodeOf.push(nk); }
    var tgt = pack(list, 0.75), P = tgt.p, S = tgt.s, C = tgt.c, base = new Float32Array(P), baseS = new Float32Array(S), baseC = new Float32Array(C);
    var wv = new THREE.Vector3(), fade = new Float32Array(NODES.length), LR = G.light[0], LG = G.light[1], LB = G.light[2];
    function shade(o, i, f){ C[o] = LR + (baseC[o] - LR)*f; C[o+1] = LG + (baseC[o+1] - LG)*f; C[o+2] = LB + (baseC[o+2] - LB)*f; S[i] = baseS[i]*(0.4 + 0.6*f); }
    tgt.live = function(t){
      // depth: each node's distance to the camera through the turning group. far ones fade toward the paper and shrink; the turn brings them forward
      spin.updateMatrixWorld();
      for (var fi=0; fi<NODES.length; fi++){ var nd0 = NODES[fi]; wv.set(nd0.x, nd0.y, nd0.z).applyMatrix4(spin.matrixWorld); var dep = wv.distanceTo(camera.position); fade[fi] = Math.max(0.05, Math.min(1, (17.5 - dep)/6.5)); }
      // the clouds are alive: each one breathes on its own clock and every dot in it trembles a little
      for (var bi=0; bi<balls.length; bi++){ var R = balls[bi], nd = R[2], fB = fade[R[3]], pulse = 1 + 0.05*Math.sin(t*1.1 + nd.ph), amp = nd.tier >= 2 ? 0.012 : 0.02;
        for (var di=R[0]; di<R[1]; di++){ var od = di*3, jj = di*0.37;
          P[od] = nd.x + (base[od] - nd.x)*pulse + Math.sin(t*2.3 + jj)*amp; P[od+1] = nd.y + (base[od+1] - nd.y)*pulse + Math.cos(t*1.9 + jj*1.3)*amp; P[od+2] = nd.z + (base[od+2] - nd.z)*pulse + Math.sin(t*2.1 + jj*0.7)*amp; shade(od, di, fB); } }
      for (var gi=fillStart; gi<N; gi++){ var og = gi*3, jg = gi*0.41; P[og] = base[og] + Math.sin(t*2.4 + jg)*0.02; P[og+1] = base[og+1] + Math.cos(t*1.8 + jg*1.1)*0.02; P[og+2] = base[og+2] + Math.sin(t*2.0 + jg*0.6)*0.02; shade(og, gi, fade[nodeOf[gi - fillStart]]); }
      for (var lr=0; lr<linkRanges.length; lr++){ var LRg = linkRanges[lr], fL = (fade[LRg[2]] + fade[LRg[3]])*0.5; for (var ld=LRg[0]; ld<LRg[1]; ld++) shade(ld*3, ld, fL); }
      // the data: each link carries short trains both ways, some crawling, some racing, stepping aside so the two directions do not collide
      for (var pk0=0; pk0<pkLinks.length; pk0++){ var ln = pkLinks[pk0], A1 = NODES[LINKS[ln][0]], B1 = NODES[LINKS[ln][1]], L1 = Math.hypot(B1.x - A1.x, B1.y - A1.y, B1.z - A1.z), nx = -(B1.z - A1.z)/L1, nz = (B1.x - A1.x)/L1, fP = (fade[LINKS[ln][0]] + fade[LINKS[ln][1]])*0.5;
        var a0 = A1.r*1.15/L1, a1 = 1 - B1.r*1.15/L1, sp = (0.05 + 0.16*((ln*7) % 5)/4) * 2.2/Math.max(1.4, L1);
        for (var pk=0; pk<PKT; pk++){
          var idx = packetStart + pk0*PKT + pk, o = idx*3, grp = Math.floor(pk/3), fwd = grp % 2 === 0, spG = sp * (0.5 + 1.1*((ln*3 + grp) % 4)/3);
          var uu0 = (t*spG + grp/(PKT/3) + (pk % 3)*0.05/L1) % 1, uu = fwd ? uu0 : 1 - uu0, v = a0 + (a1 - a0)*uu, side = (fwd ? 0.028 : -0.028);
          P[o] = A1.x + (B1.x - A1.x)*v + nx*side; P[o+1] = A1.y + (B1.y - A1.y)*v + 0.02; P[o+2] = A1.z + (B1.z - A1.z)*v + nz*side;
          S[idx] = (0.4 + 0.45*Math.sin(uu*Math.PI))*(0.3 + 0.7*fP); C[o] = LR + (G.ink[0] - LR)*fP; C[o+1] = LG + (G.ink[1] - LG)*fP; C[o+2] = LB + (G.ink[2] - LB)*fP;
        }
      }
    };
    tgt.live(0);
    return tgt;
  };
  // ClawStreet: a training flywheel for financial agents, drawn like the chart on clawstreet.io but in three dimensions and one ink.
  // seven agents' equity curves, each in its own lane in depth, all rebased to the same origin at the left edge so they fan out
  // from one point; the lane in ink is the index they are measured against. the curves jump, gap and fall back like real ones.
  // a faint curtain hangs from each curve to the floor, level lines sit on the back wall, and the window keeps rolling.
  var CL = 7, CLP = 110, CLD = 5, CW = 8.0, CLX0 = -6.0, CLZ0 = -2.6, CLDZ = 0.85, CL_SPY = 3, CLY0 = 1.3, CURT = 3, LEVELS = [0.9, 1.0, 1.1, 1.2, 1.3, 1.4], LVL_D = 70;
  var CL_NAMES = ['OPUS 5.5','SONNET 5.5','HERMES 3','SPY','DEEPSEEK R1','QWEN 3','HAIKU 5.5'];
  var CL_LESSONS = ['sized 3x into earnings','chased the open, sold the low','read empty news as all clear','no stop, held through the gap','overfit to last week','copied the example request'];
  var CLAW = [];
  function clawStep(a, l, t){
    a.mom = a.mom*0.72 + rnd(-0.007,0.007)*(l===CL_SPY?0.45:1) + a.drift;
    if (l !== CL_SPY && Math.random() < 0.02){ var jump = rnd(-0.05, 0.07); a.mom += jump; if (jump < -0.02){ a.lesson = pick(CL_LESSONS); a.lessonUntil = t + 4; } }
    if (l === CL_SPY && Math.random() < 0.01) a.mom += rnd(-0.02, 0.025);
    a.s.push(Math.max(0.3, a.s[a.s.length-1] + a.mom)); if (a.s.length > CLP) a.s.shift();
    if (Math.random() < 0.004) a.drift = rnd(-0.0006,0.0016);
  }
  (function(){ for (var l=0;l<CL;l++){ var a = {name:CL_NAMES[l], s:[1], mom:0, drift: l === CL_SPY ? 0.0005 : rnd(-0.0006, 0.0016), pnl:0, lesson:'', lessonUntil:-99, hx:0, hy:0, hz:0, px:new Float32Array(CLP), py:new Float32Array(CLP)}; for (var i=1;i<CLP;i++) clawStep(a, l, -99); CLAW.push(a); } })();
  FIG.claw = function(){
    var list = [];
    // the floor: time lines across the lanes and one base line per lane
    for (var g=0; g<=8; g++){ var gx = CLX0 + g*CW/8; for (var z=CLZ0-0.3; z<CLZ0+CLDZ*(CL-1)+0.3; z+=0.08) list.push([gx, 0, z, G.light[0], G.light[1], G.light[2], 0.26]); }
    for (var l=0;l<CL;l++){ var lz = CLZ0 + l*CLDZ; for (var x=CLX0; x<=CLX0 + CW; x+=0.07) list.push([x, 0, lz, G.light[0], G.light[1], G.light[2], 0.3]); }
    // the back wall: a vertical edge at the origin and level lines placed by live()
    for (var y0=0; y0<3.2; y0+=0.06) list.push([CLX0, y0, CLZ0 - 0.5, G.soft[0], G.soft[1], G.soft[2], 0.3]);
    var lvlStart = list.length; for (var lv=0; lv<LEVELS.length*LVL_D; lv++) list.push([0, -40, 0, G.soft[0], G.soft[1], G.soft[2], 0.3]);
    var curveStart = list.length;
    for (var l2=0;l2<CL;l2++){ var cc = l2 === CL_SPY ? G.ink : G.dark; for (var i=0;i<CLP*CLD;i++) list.push([0, 0, 0, cc[0], cc[1], cc[2], 0.6]); }
    var curtStart = list.length; for (var l3=0;l3<CL;l3++) for (var k=0;k<CLP*CURT;k++) list.push([0,0,0,G.light[0],G.light[1],G.light[2],0.24]);
    var dropStart = list.length; for (var l4=0;l4<CL;l4++) for (var k4=0;k4<24;k4++) list.push([0,0,0,G.mid[0],G.mid[1],G.mid[2],0.32]);
    while (list.length < N){ var l5 = Math.floor(Math.random()*CL); list.push([rnd(CLX0, CLX0 + CW), -0.01, CLZ0 + l5*CLDZ + rnd(-0.03,0.03), G.light[0], G.light[1], G.light[2], 0.2]); }
    var tgt = pack(list, 0.75), P = tgt.p, S = tgt.s, C = tgt.c, stepAt = 0, curtF = new Float32Array(CL*CLP*CURT), vLo = 0.96, vHi = 1.06;
    // depth: the lane nearest the camera is darkest, the far ones fade toward the paper; age: a line fades away behind its head
    var laneCol = []; for (var lc=0; lc<CL; lc++){ var dep = 0.35 + 0.65*lc/(CL-1), src = lc === CL_SPY ? G.ink : G.dark; laneCol.push([G.light[0] + (src[0]-G.light[0])*dep, G.light[1] + (src[1]-G.light[1])*dep, G.light[2] + (src[2]-G.light[2])*dep]); }
    for (var l0=0;l0<CL;l0++) CLAW[l0].base = CLAW[l0].s[0];
    for (var cf=0; cf<curtF.length; cf++) curtF[cf] = Math.random();
    tgt.live = function(t){
      while (stepAt + 0.12 < t){ stepAt += 0.12; for (var l=0;l<CL;l++) clawStep(CLAW[l], l, t); }
      // rebase every lane to its first value in the window, so all seven leave the same point. the base and the scale ease, so a new print never jolts the picture
      var sub = (t - stepAt)/0.12, lo = Infinity, hi = -Infinity;
      for (var l6=0;l6<CL;l6++){ var a6 = CLAW[l6]; a6.base += (a6.s[0] - a6.base)*0.06; var b = a6.base; for (var i6=0;i6<CLP;i6++){ var v = a6.s[i6]/b; if (v<lo) lo=v; if (v>hi) hi=v; } }
      vLo += (Math.min(lo, 0.96) - vLo)*0.05; vHi += (Math.max(hi, 1.06) - vHi)*0.05; lo = vLo; hi = vHi;
      var scl = 2.6/Math.max(0.25, hi-lo), yOf = function(v){ return 0.15 + (v - lo)*scl; };
      for (var l7=0;l7<CL;l7++){ var a7 = CLAW[l7], lz7 = CLZ0 + l7*CLDZ, isSpy = l7 === CL_SPY, b7 = a7.base, lcol = laneCol[l7];
        a7.pnl = ((a7.s[CLP-2] + (a7.s[CLP-1] - a7.s[CLP-2])*sub)/b7 - 1)*100;
        // the head sits one print in from the right edge and glides toward the newest value while the rest of the line scrolls under it, so a new print never pops
        var hxv = CLX0 + (CLP-2)/(CLP-1)*CW, hyv = yOf((a7.s[CLP-2] + (a7.s[CLP-1] - a7.s[CLP-2])*sub)/b7);
        for (var i7=0;i7<CLP;i7++){ var isH = i7 === CLP-1, x7 = isH ? hxv : CLX0 + (i7 - sub)/(CLP-1)*CW, y7 = isH ? hyv : yOf(a7.s[i7]/b7), xN = i7 >= CLP-2 ? hxv : CLX0 + (i7 + 1 - sub)/(CLP-1)*CW, yN = i7 >= CLP-2 ? hyv : yOf(a7.s[i7+1]/b7); a7.px[i7] = x7; a7.py[i7] = y7;
          var age = Math.pow(i7/(CLP-1), 1.3), sz = (0.08 + 0.92*age);
          for (var k7=0;k7<CLD;k7++){ var idx = curveStart + (l7*CLP + i7)*CLD + k7, o = idx*3, f = k7/CLD; P[o] = x7 + f*(xN - x7); P[o+1] = y7 + (yN-y7)*f; P[o+2] = lz7; S[idx] = (isSpy ? (k7 === 0 ? 0.85 : 0.001) : 0.6) * sz;
            C[o] = G.light[0] + (lcol[0]-G.light[0])*age; C[o+1] = G.light[1] + (lcol[1]-G.light[1])*age; C[o+2] = G.light[2] + (lcol[2]-G.light[2])*age; }
          for (var c7=0;c7<CURT;c7++){ var ci = l7*CLP*CURT + i7*CURT + c7, oc = (curtStart + ci)*3, cfv = curtF[ci]; P[oc] = x7 + cfv*(xN - x7); P[oc+1] = (y7 + (yN-y7)*cfv) * ((ci*31 % 17)/17); P[oc+2] = lz7; S[curtStart + ci] = isSpy ? 0.001 : 0.24*sz; } }
        a7.hx = hxv; a7.hy = hyv; a7.hz = lz7;
        for (var k8=0;k8<24;k8++){ var o8 = (dropStart + l7*24 + k8)*3; P[o8] = a7.hx; P[o8+1] = a7.hy*k8/24; P[o8+2] = lz7; }
      }
      // level lines on the back wall follow the scale
      for (var lv2=0; lv2<LEVELS.length; lv2++){ var ly = yOf(LEVELS[lv2]), on = LEVELS[lv2] > lo && LEVELS[lv2] < hi; for (var d2=0; d2<LVL_D; d2++){ var o9 = (lvlStart + lv2*LVL_D + d2)*3; P[o9] = CLX0 + d2/(LVL_D-1)*CW; P[o9+1] = on ? ly : -40; P[o9+2] = CLZ0 - 0.5; } }
    };
    tgt.live(0); return tgt;
  };
  // Proxies: an AI harness for structured concept feedback. two scenes. first a field of documents that runs off into the
  // distance, and one agent reading them page after page with its scan cone. then the near pages gather into an oval table
  // where five proxies already sit, the agent flies to the empty seat and materialises there as the sixth, and the table
  // starts discussing: one proxy at a time leaves a note while a train of dots carries its point across the table.
  // after a while the table scatters back into documents and the agent reads again.
  // the notes read like someone who has been through the whole pack: each one ties two documents together
  var PX = [
    {n:'PM', q:'Onboarding teaches the whole model up front. Lead with the one\ndecision people make daily and teach the rest in context.'},
    {n:'ENG', q:'The sync flow assumes the network is there. Design the offline\npath first; the happy path falls out of it.'},
    {n:'CFO', q:'Per-seat pricing caps you at team size. Price on accounts\nanalysed, which is what grows with the customer.'},
    {n:'LEGAL', q:'Strip names from customer quotes at capture, not at publish.\nThen there is nothing to clear and nothing to leak.'},
    {n:'SUPPORT', q:'Every move of the back button costs a week of tickets.\nKeep it where it was and change the label instead.'},
    {n:'SALES', q:'A one-minute demo lives or dies on sample data.\nShip the sample set with the build, not in a later release.'} ];
  var PRX = 2.4, PRZ = 1.45, PXN = PX.length, PX_PERSON = 680, PXJOIN = 5, PXPK = 18, pxWas = false, NEARP = [], FARP = [];
  var PXSTAGE = 0, PXJF = 0, PXPH = 'read', PXT = -99, PXREAD = [], PXRI = 0, PXCUR = 0, PXAT = -99, PXLEN = 4.8;
  var PX_NAMES = ['brief.md','flow-v2.md','wireframes.md','pricing.md','onboarding.md','risks.md','roadmap.md','research.md','metrics.md','copy.md','interviews.md','spec.md','journey.md','backlog.md','audit.md','launch.md','support-log.md','okrs.md','contract.md','deck.md','notes.md'];
  for (var pi0=0; pi0<PXN; pi0++){ var ang0 = pi0/PXN*6.2832 + 0.52; PX[pi0].x = Math.cos(ang0)*(PRX+0.6); PX[pi0].z = Math.sin(ang0)*(PRZ+0.6); }
  for (var fr=0; fr<8; fr++) for (var fc=0; fc<7; fc++){ var scl0 = 1 - 0.07*fr, pg = {x:-5.4 + fc*1.8 + (fr % 2)*0.9, z:2.6 - fr*1.75, w:1.2*scl0, d:1.6*scl0, name:PX_NAMES[(fr*7 + fc) % PX_NAMES.length], fill:[220,200,180,150,120,95,70,50][fr], lines:[9,9,8,7,6,5,4,3][fr], size:[0.3,0.29,0.27,0.25,0.23,0.21,0.19,0.17][fr], far: fr >= 3}; (fr < 3 ? NEARP : FARP).push(pg); }
  function pxBall(){ var u = Math.random()*2-1, a = rnd(0,6.2832), r = Math.cbrt(Math.random()), q = Math.sqrt(1-u*u); return [r*q*Math.cos(a), r*u, r*q*Math.sin(a)]; }
  function segTo(arr,ax,ay,az,bx,by,bz,spc,col,size){ var L = Math.hypot(bx-ax,by-ay,bz-az), n = Math.max(2, Math.round(L/spc)); for (var i=0;i<=n;i++){ var f=i/n; arr.push([ax+(bx-ax)*f, ay+(by-ay)*f, az+(bz-az)*f, col[0],col[1],col[2], size]); } }
  function pageDots(arr, D, col, lineCol){
    var x0 = D.x - D.w/2, x1 = D.x + D.w/2, z0 = D.z - D.d/2, z1 = D.z + D.d/2, size = D.size;
    segTo(arr,x0,0.02,z0, x1,0.02,z0, 0.07,col,size*1.3); segTo(arr,x0,0.02,z1, x1,0.02,z1, 0.07,col,size*1.3); segTo(arr,x0,0.02,z0, x0,0.02,z1, 0.07,col,size*1.3); segTo(arr,x1,0.02,z0, x1,0.02,z1, 0.07,col,size*1.3);
    for (var ln=0; ln<D.lines; ln++){ var lz = z0 + 0.2*D.w/1.2 + ln*(D.d - 0.4*D.w/1.2)/D.lines, lw = ln === 0 ? 0.5*D.w : (0.55 + ((ln*3 + Math.round(D.x*7)) % 5)/5*0.4)*(D.w - 0.2); segTo(arr, x0 + 0.1, 0.03, lz, x0 + 0.1 + lw, 0.03, lz, 0.06, lineCol, size*1.4); }
    for (var pp=0; pp<D.fill; pp++) arr.push([rnd(x0, x1), 0.0, rnd(z0, z1), col[0],col[1],col[2], size]);
  }
  function personDots(arr, sp, k){ var v = pxBall(), isHead = k < 260, c0 = isHead ? G.dark : G.mid; if (isHead) arr.push([sp.x + v[0]*0.22, 1.08 + v[1]*0.24, sp.z + v[2]*0.22, c0[0],c0[1],c0[2], 0.55]); else arr.push([sp.x + v[0]*0.44, 0.6 + Math.abs(v[1])*0.28, sp.z + v[2]*0.3, c0[0],c0[1],c0[2], 0.5]); }
  FIG.proxy = function(){
    // scene A: the near rows of the field. scene B: the table and the proxies, made from exactly those dots. the far rows and the haze are the same in both
    var listA = [], listB = [], joinAt = -1, joinCloud = [];
    for (var npi=0; npi<NEARP.length; npi++) pageDots(listA, NEARP[npi], G.soft, G.dark);
    var nearCount = listA.length;
    for (var i=0;i<1400;i++){ var a = rnd(0,6.2832), rr = 1 - Math.pow(Math.random(), 3)*0.08; listB.push([Math.cos(a)*PRX*rr, 0.55, Math.sin(a)*PRZ*rr, G.mid[0],G.mid[1],G.mid[2], 0.55]); }
    for (var i2=0;i2<1700;i2++){ var a2 = rnd(0,6.2832), r2 = Math.sqrt(Math.random())*0.985; listB.push([Math.cos(a2)*PRX*r2, 0.55, Math.sin(a2)*PRZ*r2, G.light[0],G.light[1],G.light[2], 0.34]); }
    for (var p=0;p<PXN;p++){ if (p === PXJOIN) joinAt = listB.length; for (var k=0;k<PX_PERSON;k++){ personDots(listB, PX[p], k); if (p === PXJOIN){ var cv = pxBall(); joinCloud.push([PX[p].x + cv[0]*1.6, 0.9 + cv[1]*1.3, PX[p].z + cv[2]*1.6]); } } }
    // the concept: a wireframe standing at the centre of the table
    var cw = 1.5, ch = 1.0, cy = 0.6;
    segTo(listB,-cw/2,cy,0, cw/2,cy,0, 0.04,G.ink,0.5); segTo(listB,-cw/2,cy+ch,0, cw/2,cy+ch,0, 0.04,G.ink,0.5); segTo(listB,-cw/2,cy,0,-cw/2,cy+ch,0,0.04,G.ink,0.5); segTo(listB,cw/2,cy,0,cw/2,cy+ch,0,0.04,G.ink,0.5);
    segTo(listB,-cw/2+0.15,cy+ch-0.2,0, -cw/2+0.75,cy+ch-0.2,0, 0.045,G.dark,0.5);
    segTo(listB,-cw/2+0.15,cy+ch-0.38,0, cw/2-0.15,cy+ch-0.38,0, 0.06,G.mid,0.4); segTo(listB,-cw/2+0.15,cy+ch-0.5,0, cw/2-0.4,cy+ch-0.5,0, 0.06,G.mid,0.4);
    segTo(listB,-cw/2+0.15,cy+0.12,0, -cw/2+0.6,cy+0.12,0, 0.04,G.ink,0.5); segTo(listB,-cw/2+0.15,cy+0.32,0,-cw/2+0.6,cy+0.32,0,0.04,G.ink,0.5); segTo(listB,-cw/2+0.15,cy+0.12,0,-cw/2+0.15,cy+0.32,0,0.04,G.ink,0.5); segTo(listB,-cw/2+0.6,cy+0.12,0,-cw/2+0.6,cy+0.32,0,0.04,G.ink,0.5);
    var pkStart = listB.length; for (var q=0;q<PXPK;q++) listB.push([0,-40,0,G.ink[0],G.ink[1],G.ink[2],0.65]);
    while (listB.length < nearCount){ var a3 = rnd(0,6.2832), r3 = Math.sqrt(Math.random())*0.98; listB.push([Math.cos(a3)*PRX*r3, 0.55, Math.sin(a3)*PRZ*r3, G.light[0],G.light[1],G.light[2], 0.22]); }
    while (listA.length < listB.length){ var pr = NEARP[Math.floor(Math.random()*NEARP.length)]; listA.push([pr.x + rnd(-pr.w/2, pr.w/2), 0, pr.z + rnd(-pr.d/2, pr.d/2), G.light[0],G.light[1],G.light[2], 0.22]); }
    var far = []; for (var fpi=0; fpi<FARP.length; fpi++) pageDots(far, FARP[fpi], G.light, G.soft);
    for (var di=0; di<far.length && listA.length < N; di++){ listA.push(far[di]); listB.push(far[di]); }
    while (listA.length < N){ var hz = [rnd(-7,7), rnd(0, 2.2), rnd(-12, 3), G.light[0],G.light[1],G.light[2], 0.12]; listA.push(hz); listB.push(hz); }
    var A = pack(listA, 0.75), B = pack(listB, 0.75), PA = A.p, PB = B.p, CA = A.c, CB = B.c, SA = A.s, SB = B.s;
    var tgt = {p:new Float32Array(PA), c:new Float32Array(CA), s:new Float32Array(SA), size:0.75}, P = tgt.p, C = tgt.c, S = tgt.s;
    tgt.live = function(t){
      // the near field becomes the table: every dot leaves on its own moment
      var st = PXSTAGE, lim = Math.min(nearCount, N);
      for (var i=0;i<lim;i++){ var o = i*3, dl = ((i*7919) % 1000)/1000, f = Math.max(0, Math.min(1, st*1.5 - dl*0.5)); f = f*f*(3 - 2*f);
        P[o] = PA[o] + (PB[o]-PA[o])*f; P[o+1] = PA[o+1] + (PB[o+1]-PA[o+1])*f; P[o+2] = PA[o+2] + (PB[o+2]-PA[o+2])*f;
        C[o] = CA[o] + (CB[o]-CA[o])*f; C[o+1] = CA[o+1] + (CB[o+1]-CA[o+1])*f; C[o+2] = CA[o+2] + (CB[o+2]-CA[o+2])*f; S[i] = SA[i] + (SB[i]-SA[i])*f; }
      // the sixth proxy: its dots go to an invisible cloud round the empty seat with the rest, then gather into the person once the agent lands
      if (joinAt >= 0) for (var j=0;j<PX_PERSON;j++){ var ij = joinAt + j, oj = ij*3, dj = ((ij*7919) % 1000)/1000, fs = Math.max(0, Math.min(1, st*1.5 - dj*0.5)); fs = fs*fs*(3 - 2*fs); var fj = Math.max(0, Math.min(1, PXJF*1.4 - dj*0.4)); fj = fj*fj*(3 - 2*fj);
        var cl = joinCloud[j], mx0 = PA[oj] + (cl[0]-PA[oj])*fs, my0 = PA[oj+1] + (cl[1]-PA[oj+1])*fs, mz0 = PA[oj+2] + (cl[2]-PA[oj+2])*fs, ms = SA[ij] + (0.001 - SA[ij])*fs;
        P[oj] = mx0 + (PB[oj]-mx0)*fj; P[oj+1] = my0 + (PB[oj+1]-my0)*fj; P[oj+2] = mz0 + (PB[oj+2]-mz0)*fj; S[ij] = ms + (SB[ij]-ms)*fj; }
      // the discussion: the speaking proxy's point travels across the table
      var sq = PX[PXCUR], ph = PXPH === 'talk' ? (t - PXAT)/PXLEN : -1;
      for (var q=0;q<PXPK;q++){ var o2 = (pkStart+q)*3, u = ph*1.9 - q*0.04, on = ph >= 0 && u > 0 && u < 1, ff = on ? u : 0, arc = Math.sin(ff*Math.PI)*0.55;
        P[o2] = on ? sq.x*(1-ff) : 0; P[o2+1] = on ? 1.08 + (1.1 - 1.08)*ff + arc : -40; P[o2+2] = on ? sq.z*(1-ff) : 0; }
    };
    tgt.live(0); return tgt;
  };
  // the point: the whole field is drawn into the full stop after "effortless". a vacuum, not a drain: the nearest
  // dots go first, each one accelerates as it closes, and the cloud shrinks inward until all that is left is the stop,
  // which breathes. it does not loop: the stop is the end of the line. scrolling away and back starts it again.
  var PTF, PTJ, PTT, PTD, PTS, ptV = new THREE.Vector3(), fsCanvas = document.createElement('canvas'), fsAt = 0, fsX = 0, fsY = 0;
  function fsScreen(){                                   // the centre of the period glyph, in screen pixels
    var el = document.getElementById('fs'); if (!el) return null;
    var now = performance.now(); if (now - fsAt < 200) return [fsX, fsY];
    var rg = document.createRange(); rg.selectNodeContents(el); var r = rg.getBoundingClientRect();
    var cs = getComputedStyle(el), g = fsCanvas.getContext('2d'); g.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    var m = g.measureText('.'), fz = parseFloat(cs.fontSize);
    var asc = m.fontBoundingBoxAscent || fz*0.93, desc = m.fontBoundingBoxDescent || fz*0.25;
    var base = r.top + (r.height - (asc + desc))/2 + asc;                                   // the baseline inside the inline box
    fsY = base - ((m.actualBoundingBoxAscent || fz*0.12) - (m.actualBoundingBoxDescent || 0))/2;
    fsX = r.left + ((m.actualBoundingBoxRight || r.width) - (m.actualBoundingBoxLeft || 0))/2;
    fsAt = now; return [fsX, fsY];
  }
  var figAt = 0;
  FIG.point = function(){
    var list = [];
    for (var i=0;i<N;i++){ var a = rnd(0,6.28), r = rnd(0,0.006), c = Math.random() < 0.6 ? G.ink : G.dark; list.push([Math.cos(a)*r, Math.sin(a)*r, rnd(-0.005,0.005), c[0], c[1], c[2], 0.16]); }
    var tgt = pack(list, 0.62), P = tgt.p, S = tgt.s;
    PTF = new Float32Array(N*3); PTJ = new Float32Array(N*3); PTT = new Float32Array(N); PTD = new Float32Array(N); PTS = new Float32Array(N);
    for (var k=0;k<N;k++){
      var o = k*3, th = rnd(0,6.28), ph = Math.acos(rnd(-1,1)), rr = 1.6 + 3.6*Math.pow(Math.random(), 0.6);   // the far field: a wide loose sphere
      PTF[o] = Math.sin(ph)*Math.cos(th)*rr*1.25; PTF[o+1] = Math.sin(ph)*Math.sin(th)*rr*0.8; PTF[o+2] = Math.cos(ph)*rr*0.7;
      PTJ[o] = P[o]; PTJ[o+1] = P[o+1]; PTJ[o+2] = P[o+2];
      PTT[k] = rnd(0, 0.9);                                  // a little randomness in when each dot lets go
      PTD[k] = rnd(0.55, 1.0);                               // the journey is quick
      PTS[k] = S[k];
    }
    tgt.live = function(){
      var el = (performance.now() - figAt)/1000, c = el < 0 ? 0 : el;
      var pulse = 0.5 + 0.5*Math.sin(c*Math.PI*2/3.4), swell = 1 + 0.35*pulse, gl = 0.65 + 0.35*pulse;
      if (c > 0.7) document.body.classList.add('fsgo');
      if (c > 6.2) document.body.classList.add('fsdone');
      var sp = fsScreen(), cx = 0, cy = 0, cz = 0;
      if (sp){
        var v = ptV.set((sp[0]/W)*2 - 1, -((sp[1]/H)*2 - 1), 0.5).unproject(camera);
        v.sub(camera.position); var tt = -camera.position.z / v.z; v.multiplyScalar(tt).add(camera.position);
        spin.worldToLocal(v); cx = v.x; cy = v.y; cz = v.z;
      }
      for (var i=0;i<N;i++){
        var o = i*3, dx = PTF[o]-cx, dy = PTF[o+1]-cy, dz = PTF[o+2]-cz, dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
        var t0 = 0.4 + Math.min(dist, 7.5)/7.5*4.2 + PTT[i], u = (c - t0)/PTD[i];                // the nearest let go first
        if (u <= 0){ P[o] = PTF[o]; P[o+1] = PTF[o+1]; P[o+2] = PTF[o+2]; S[i] = 0.95; continue; }
        if (u >= 1){ P[o] = cx + PTJ[o]*swell; P[o+1] = cy + PTJ[o+1]*swell; P[o+2] = cz + PTJ[o+2]; S[i] = PTS[i]*gl; continue; }
        var k = 1 - Math.pow(u, 2.6);                                                            // slow to let go, then faster and faster
        P[o] = cx + PTJ[o] + dx*k; P[o+1] = cy + PTJ[o+1] + dy*k; P[o+2] = cz + PTJ[o+2] + dz*k;
        S[i] = 0.95 - 0.5*u;
      }
    };
    return tgt;
  };
  FIG.hive = function(){
    var list = [], R = 0.34, cols = 9, rows = 7;
    for (var r=0;r<rows;r++) for (var c=0;c<cols;c++){
      var cx = (c - (cols-1)/2)*R*1.75 + (r%2 ? R*0.875 : 0), cy = (r - (rows-1)/2)*R*1.52;
      if (Math.hypot(cx, cy) > 2.6) continue;
      var col = Math.random() < 0.2 ? G.ink : Math.random() < 0.35 ? G.mid : G.soft;
      for (var k=0;k<210;k++){
        var a = rnd(0,6.28), edge = Math.random() < 0.45, rr = edge ? R*0.94*(0.92 + 0.08*Math.random()) : R*0.94*Math.sqrt(Math.random());
        list.push([cx + Math.cos(a)*rr, cy + Math.sin(a)*rr, rnd(-0.06,0.06), col[0], col[1], col[2]]);
      }
    }
    return pack(list, 0.7);
  };
  FIG.scatter = function(){
    var list = [];
    for (var i=0;i<N;i++){ var r = Math.pow(Math.random(), 0.45)*4.2, a = rnd(0,6.28), b = rnd(-1,1), c = pick([G.soft, G.soft, G.mid, G.dark]); list.push([Math.cos(a)*r*Math.sqrt(1-b*b), Math.sin(a)*r*Math.sqrt(1-b*b)*0.7, b*2.2, c[0], c[1], c[2]]); }
    return pack(list, 0.6);
  };
  var targets = {};
  function target(name){ if (!targets[name]) targets[name] = FIG[name](); return targets[name]; }

  // the galaxy sits right of centre and wide enough to run behind the end of the headline
  // the terrain fills the right of the screen and stays clear of the text on the left
  var ANCHOR = { hero:[1.9,0.3], terrain:[1.0,-1.7], grid:[1.0,-1.7], chart:[1.0,-1.7], claw:[0.6,-1.3], proxy:[1.0,-1.5], scatter:[2.4,0.2], point:[2.3,0.1], hive:[2.9,-0.4] };
  // the galaxy is seen well toward its side, past three quarters, so it reads as a disk with depth.
  // the terrain and the world map tilt their far edge up and away, like a landscape from an aircraft
  var TILT = { hero:0.46, terrain:0.42, grid:0.42, chart:0.42, claw:0.72, proxy:0.5, scatter:0, point:0, hive:0.15 };

  // ---------- the motes: dots only. a few of them pulse ----------
  var pos = new Float32Array(N*3), colr = new Float32Array(N*3), aRate = new Float32Array(N), aSize = new Float32Array(N), baseSize = new Float32Array(N), aSwell = new Float32Array(N);
  var from = new Float32Array(N*3), ring = new Float32Array(N*3), delay = new Float32Array(N), ph = new Float32Array(N), dirs = new Float32Array(N*3);
  for (var i=0;i<N;i++){
    pos[i*3] = from[i*3] = rnd(-9,9); pos[i*3+1] = from[i*3+1] = rnd(-6,6); pos[i*3+2] = from[i*3+2] = rnd(-3,3);
    colr[i*3] = G.soft[0]; colr[i*3+1] = G.soft[1]; colr[i*3+2] = G.soft[2];
    aRate[i] = Math.random() < 0.05 ? rnd(1.2, 3.2) : 0;
    baseSize[i] = rnd(0.8, 1.05); aSize[i] = baseSize[i]; ph[i] = rnd(0,6.28); aSwell[i] = 0;
    var dx = rnd(-1,1), dy = rnd(-1,1), dz = rnd(-1,1), dl = Math.hypot(dx,dy,dz) || 1; dirs[i*3] = dx/dl; dirs[i*3+1] = dy/dl; dirs[i*3+2] = dz/dl;
  }
  var geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colr, 3));
  geom.setAttribute('aRate', new THREE.BufferAttribute(aRate, 1));
  geom.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
  geom.setAttribute('aSwell', new THREE.BufferAttribute(aSwell, 1));
  var mat = new THREE.ShaderMaterial({
    uniforms:{ uSize:{value:0.09}, uTime:{value:0}, uPR:{value:renderer.getPixelRatio()}, uH:{value:900}, uInvert:{value:0} },
    transparent:true, depthWrite:false,
    vertexShader:[
      'uniform float uSize; uniform float uTime; uniform float uPR; uniform float uH;',
      'attribute vec3 color; attribute float aRate; attribute float aSize; attribute float aSwell;',
      'varying vec3 vC;',
      'void main(){',
      '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
      '  gl_Position = projectionMatrix * mv;',
      '  vC = color;',
      // a few pulse on their own clock; all of them swell while in flight
      '  float pulse = aRate > 0.0 ? 0.5 + 0.5*sin(uTime * aRate + aSize * 40.0) : 0.0;',
      '  gl_PointSize = uSize * aSize * (1.0 + 0.9*aSwell + 0.8*pulse) * uPR * uH / -mv.z;',
      '}'
    ].join('\n'),
    fragmentShader:[
      'varying vec3 vC; uniform float uInvert;',
      'void main(){',
      '  vec2 q = gl_PointCoord - 0.5;',
      '  if (dot(q, q) > 0.25) discard;',
      '  gl_FragColor = vec4(mix(vC, vec3(1.0) - vC, uInvert), 1.0);',
      '}'
    ].join('\n')
  });
  var world = new THREE.Group(); scene.add(world);
  var spin = new THREE.Group(); world.add(spin);
  var points = new THREE.Points(geom, mat); spin.add(points);

  // the swarm: five wireframe markers in formation over the terrain, links drawn between the ones in range, a tick from each to the ground
  var AG = 5, agents = [], swarm = new THREE.Group(); spin.add(swarm);
  var agentGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.048, 0)), agentMat = new THREE.LineBasicMaterial({color:0x161616});
  var formation = [[0,0],[-0.5,-0.4],[0.5,-0.4],[-1.0,-0.8],[1.0,-0.8]];
  var CALLS = ['HM-01','HM-02','HM-03','HM-04','HM-05'];
  for (var ai=0; ai<AG; ai++){
    var am = new THREE.LineSegments(agentGeo, agentMat); swarm.add(am); am.rotation.order = 'YXZ';
    // a call-sign readout that surfaces now and then, placed by projecting the marker to the screen
    var tag = document.createElement('div'); tag.className = 'tag'; host.appendChild(tag);
    agents.push({m:am, p:new THREE.Vector3(), y:0, tag:tag, nextAt: ai === 0 ? 1.5 : 3 + Math.random()*6, until:0});
  }
  var linkPos = new Float32Array(10*2*3), linkGeo = new THREE.BufferGeometry(); linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3));
  swarm.add(new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.35})));
  // dashed lines from each marker down to the ground, and a small cross where each one touches down
  var tickPos = new Float32Array(AG*2*3), tickGeo = new THREE.BufferGeometry(); tickGeo.setAttribute('position', new THREE.BufferAttribute(tickPos, 3));
  var tickLines = new THREE.LineSegments(tickGeo, new THREE.LineDashedMaterial({color:0x161616, transparent:true, opacity:0.45, dashSize:0.07, gapSize:0.05}));
  swarm.add(tickLines);
  var crossPos = new Float32Array(AG*4*3), crossGeo = new THREE.BufferGeometry(); crossGeo.setAttribute('position', new THREE.BufferAttribute(crossPos, 3));
  swarm.add(new THREE.LineSegments(crossGeo, new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.6})));
  // the course: a dashed track plotted on the ground ahead of the formation, with a waypoint mark every so often
  var COURSE = 140, coursePos = new Float32Array(COURSE*3), courseGeo = new THREE.BufferGeometry(), scr = new THREE.Vector3();
  for (var cp=0; cp<COURSE; cp++) coursePos[cp*3+1] = -40;
  courseGeo.setAttribute('position', new THREE.BufferAttribute(coursePos, 3));
  var courseMat = new THREE.ShaderMaterial({ uniforms:{ uPR:{value:renderer.getPixelRatio()}, uH:{value:900}, uCol:{value:new THREE.Color(0x161616)} }, transparent:true, depthWrite:false,
    vertexShader:'uniform float uPR; uniform float uH; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = 0.026 * uPR * uH / -mv.z; }',
    fragmentShader:'uniform vec3 uCol; void main(){ vec2 q = gl_PointCoord - 0.5; if (dot(q, q) > 0.25) discard; gl_FragColor = vec4(uCol, 0.7); }' });
  swarm.add(new THREE.Points(courseGeo, courseMat));
  var WAY = 4, wayPos = new Float32Array(WAY*4*3), wayGeo = new THREE.BufferGeometry(); wayGeo.setAttribute('position', new THREE.BufferAttribute(wayPos, 3));
  swarm.add(new THREE.LineSegments(wayGeo, new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.55})));
  // the survey so far: a faint trace of everywhere the formation has been, laid on the ground
  var HIST = 320, histPos = new Float32Array(HIST*3), histGeo = new THREE.BufferGeometry(); histGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(HIST*3), 3));
  swarm.add(new THREE.Line(histGeo, new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.16})));
  // the underwriting agents: three markers that fly from building to building, hover, scan, and read out what they find
  var SCAN_N = 3, scan = new THREE.Group(), scanners = []; spin.add(scan);
  // the scan: a fine cone from the agent down to the building's footprint, turning slowly while it reads
  var CONE_K = 14, conePos = new Float32Array(SCAN_N*CONE_K*12), coneGeo = new THREE.BufferGeometry(); coneGeo.setAttribute('position', new THREE.BufferAttribute(conePos, 3));
  var coneLines = new THREE.LineSegments(coneGeo, new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.2})); scan.add(coneLines);
  for (var si0=0; si0<SCAN_N; si0++){
    var sm = new THREE.LineSegments(agentGeo, agentMat); scan.add(sm); sm.rotation.order = 'YXZ';
    var stag = document.createElement('div'); stag.className = 'tag read'; host.appendChild(stag);
    scanners.push({m:sm, p:new THREE.Vector3(-4 + si0*3, 2.6, 2.5), b:-1, until:0, mode:'fly', h:0, tag:stag, recent:[]});
  }
  function busyBuilding(k){ for (var i=0;i<scanners.length;i++) if (scanners[i].b === k) return true; return false; }
  function pickBuilding(sc){ var tries = 0, k; do { k = Math.floor(Math.random()*BLDG.length); tries++; } while (tries < 40 && (sc.recent.indexOf(k) >= 0 || busyBuilding(k))); sc.recent.push(k); if (sc.recent.length > 6) sc.recent.shift(); return k; }
  // the trading agents: one marker and one readout at the head of each lane
  var claws = new THREE.Group(), clawM = []; spin.add(claws);
  for (var ci0=0; ci0<CL; ci0++){ var cm0 = new THREE.LineSegments(agentGeo, agentMat); claws.add(cm0); cm0.rotation.order = 'YXZ'; cm0.visible = ci0 !== CL_SPY; var ctag = document.createElement('div'); ctag.className = 'tag read flip'; host.appendChild(ctag); clawM.push({m:cm0, tag:ctag}); }
  // the curtain: a see-through grey surface from each curve down to the floor, its colour fading toward the paper with the trail
  var curtains = [];
  for (var cu0=0; cu0<CL; cu0++){ var cg = new THREE.BufferGeometry(), cpos = new Float32Array(CLP*2*3), ccol = new Float32Array(CLP*2*3), cidx = [];
    for (var ii=0; ii<CLP-1; ii++){ var v0 = ii*2; cidx.push(v0, v0+1, v0+2, v0+1, v0+3, v0+2); }
    cg.setAttribute('position', new THREE.BufferAttribute(cpos, 3)); cg.setAttribute('color', new THREE.BufferAttribute(ccol, 3)); cg.setIndex(cidx);
    var cmesh = new THREE.Mesh(cg, new THREE.MeshBasicMaterial({vertexColors:true, transparent:true, opacity:0.035, depthWrite:false, side:THREE.DoubleSide})); cmesh.visible = cu0 !== CL_SPY; claws.add(cmesh); curtains.push({g:cg, pos:cpos, col:ccol, m:cmesh}); }
  // the proxies' notes, and the reading agent with its scan cone
  var pxTags = []; for (var pt0=0; pt0<PXN; pt0++){ var ptag = document.createElement('div'); ptag.className = 'tag read'; host.appendChild(ptag); pxTags.push(ptag); }
  var pxScan = new THREE.Group(), pxAgents = []; spin.add(pxScan);
  var pxConePos = new Float32Array(20*6), pxConeCol = new Float32Array(20*6), pxConeGeo = new THREE.BufferGeometry(); pxConeGeo.setAttribute('position', new THREE.BufferAttribute(pxConePos, 3)); pxConeGeo.setAttribute('color', new THREE.BufferAttribute(pxConeCol, 3));
  var pxConeMat = new THREE.LineBasicMaterial({color:0x161616, transparent:true, opacity:0.2}); pxScan.add(new THREE.LineSegments(pxConeGeo, pxConeMat));
  for (var ag0=0; ag0<1; ag0++){ var agm = new THREE.LineSegments(agentGeo, agentMat); pxScan.add(agm); agm.position.set(0, 3.6, -6); var atag = document.createElement('div'); atag.className = 'tag read'; host.appendChild(atag); pxAgents.push({m:agm, tag:atag, readAt:0, open:0, tight:0}); }
  // dark mode: the page swaps its tokens, the dots invert in the shader, the swarm's lines take the light ink
  var inkMats = []; [swarm, scan, claws, pxScan].forEach(function(g){ g.traverse(function(ob){ if (ob.material && ob.material.color && !ob.material.skipInk && inkMats.indexOf(ob.material) < 0) inkMats.push(ob.material); }); });
  var dark = false;
  function setMode(d){
    dark = d;
    mat.uniforms.uInvert.value = d ? 1 : 0; courseMat.uniforms.uCol.value.set(d ? 0xECEBE7 : 0x161616);
    inkMats.forEach(function(m){ m.color.set(d ? 0xECEBE7 : 0x161616); });
  }
  var modeObs = new MutationObserver(function(){ setMode(document.documentElement.getAttribute('data-mode') === 'dark'); });
  modeObs.observe(document.documentElement, {attributes:true, attributeFilter:['data-mode']});
  setMode(document.documentElement.getAttribute('data-mode') === 'dark');
  // the route plans itself: each new waypoint is chosen to cover ground the formation has not visited yet
  var RX0 = -4.0, RX1 = 3.0, RZ0 = -2.0, RZ1 = 3.2;
  var lead = {x:2.6, z:1.6, h:Math.PI, v:0.5}, wps = [], visited = [], histN = 0, histAt = 0;
  function nextWaypoint(fromX, fromZ){
    var best = null, bestScore = -1;
    for (var c=0;c<14;c++){
      var cx = rnd(RX0, RX1), cz = rnd(RZ0, RZ1), dmin = 99;
      for (var vi=Math.max(0, visited.length-14); vi<visited.length; vi++){ var vv = visited[vi], dd = Math.hypot(cx - vv[0], cz - vv[1]); if (dd < dmin) dmin = dd; }
      for (var wi2=0; wi2<wps.length; wi2++){ var ww = wps[wi2], d2 = Math.hypot(cx - ww[0], cz - ww[1]); if (d2 < dmin) dmin = d2; }
      var leg = Math.hypot(cx - fromX, cz - fromZ), legScore = leg < 1.2 ? 0.2 : leg > 4.5 ? 0.5 : 1;
      var score = dmin * legScore;
      if (score > bestScore){ bestScore = score; best = [cx, cz]; }
    }
    return best;
  }
  for (var w0=0; w0<WAY; w0++){ var prev = wps.length ? wps[wps.length-1] : [lead.x, lead.z]; wps.push(nextWaypoint(prev[0], prev[1])); }
  for (var h0=0; h0<HIST; h0++){ histPos[h0*3] = lead.x; histPos[h0*3+1] = terrainH(lead.x, lead.z) + 0.012; histPos[h0*3+2] = lead.z; }
  swarm.visible = false;

  // a morph remembers where every dot is and gives each a delay from noise of where it is going, so figures form in patches
  var current = 'hero', switchedAt = performance.now(), cur = target('hero');
  function beginMorph(){
    switchedAt = performance.now();
    var P = cur.p;
    for (var i=0;i<N;i++){
      from[i*3] = pos[i*3]; from[i*3+1] = pos[i*3+1]; from[i*3+2] = pos[i*3+2];
      delay[i] = 0.5 * vnoise(P[i*3]*0.7 + 3, P[i*3+1]*0.7, P[i*3+2]*0.7);
    }
  }
  beginMorph();
  // on each change of page the whole figure gets a tumble: a kick on all three axes that eases out as the next one settles
  var kick = {x:0, y:0, z:0};
  function setFigure(name){
    if (name === current) return;
    current = name; cur = target(name); beginMorph(); figAt = performance.now(); document.body.classList.toggle('fsdot', name === 'point'); if (name !== 'point'){ document.body.classList.remove('fsdone'); document.body.classList.remove('fsgo'); }
    if (!reduce){ kick.x += rnd(0.35, 0.7) * (Math.random() < 0.5 ? -1 : 1); kick.y += rnd(0.6, 1.1) * (Math.random() < 0.5 ? -1 : 1); kick.z += rnd(0.25, 0.5) * (Math.random() < 0.5 ? -1 : 1); }
  }

  var W=0,H=0,narrow=false;
  function resize(){
    W = host.clientWidth; H = host.clientHeight; narrow = W < 700;
    renderer.setSize(W,H,false); camera.aspect = W/H; camera.updateProjectionMatrix();
    mat.uniforms.uH.value = H; mat.uniforms.uPR.value = renderer.getPixelRatio(); courseMat.uniforms.uH.value = H; courseMat.uniforms.uPR.value = renderer.getPixelRatio();
    if (narrow){ world.position.set(0, 1.6, 0); }
    camera.position.z = narrow ? 17 : 12;
  }
  on(window, 'resize', resize); resize();

  var mx = 0, my = 0, dragging = false, lastX = 0, lastY = 0, rotY = 0, rotX = 0, velY = 0, velX = 0;
  on(host, 'pointerdown', function(e){ dragging = true; lastX = e.clientX; lastY = e.clientY; velX = velY = 0; host.classList.add('drag'); host.setPointerCapture(e.pointerId); });
  on(host, 'pointermove', function(e){
    if (dragging){ velY = (e.clientX - lastX)*0.006; velX = (e.clientY - lastY)*0.004; rotY += velY; rotX = Math.max(-1.2, Math.min(1.2, rotX + velX)); lastX = e.clientX; lastY = e.clientY; }
    mx = e.clientX/W - .5; my = e.clientY/H - .5; cursorOn = true; lastPointer = performance.now();
  });
  var lastPointer = -99999, idleAmt = 0, spinAcc = 0;
  on(host, 'pointerleave', function(){ cursorOn = false; });
  // the cursor, carried into the swarm's own space, pushes nearby motes aside
  var cursorOn = false, cursorLocal = new THREE.Vector3(), cursorStrength = 0, ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0,0,1), 0), hit = new THREE.Vector3();
  function updateCursor(){
    ndc.set(mx*2, -my*2); ray.setFromCamera(ndc, camera);
    plane.normal.set(0,0,1).applyQuaternion(spin.getWorldQuaternion(new THREE.Quaternion())); plane.constant = -plane.normal.dot(spin.getWorldPosition(hit));
    if (ray.ray.intersectPlane(plane, hit)) { spin.worldToLocal(hit); cursorLocal.copy(hit); }
  }
  function endDrag(){ dragging = false; host.classList.remove('drag'); }
  on(host, 'pointerup', endDrag); on(host, 'pointercancel', endDrag);

  var lines = Array.prototype.slice.call(root.querySelectorAll('.line'));
  var sections = [root.querySelector('.hhero')].concat(lines);
  var counter = root.querySelector('#counter'), rail = root.querySelector('#hrail'), ticks = [];
  root.querySelector('#total').textContent = '/ ' + (sections.length < 10 ? '0' : '') + sections.length;
  sections.forEach(function(sec, i){
    var li = document.createElement('li'), b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Section ' + (i+1));
    b.addEventListener('click', function(){ goTo(i); }); li.appendChild(b); rail.appendChild(li); ticks.push(b);
  });
  function sectionIndex(){
    var mid = window.innerHeight/2, best = 0, bd = 1e9;
    sections.forEach(function(sec, i){ var r = sec.getBoundingClientRect(), dd = Math.abs(r.top + r.height/2 - mid); if (dd < bd){ bd = dd; best = i; } });
    return best;
  }
  function updateLines(){
    var vh = window.innerHeight, mid = vh*0.5, band = vh*0.3, fig = null;
    lines.forEach(function(el){
      var r = el.getBoundingClientRect(); var c = r.top + r.height/2;
      el.classList.remove('on','past');
      if (c < mid - band) el.classList.add('past');
      else if (c <= mid + band){ el.classList.add('on'); fig = el.getAttribute('data-fig'); }
    });
    var idx = sectionIndex();
    counter.textContent = (idx+1 < 10 ? '0' : '') + (idx+1);
    ticks.forEach(function(b, i){ b.classList.toggle('on', i === idx); });
    var atEnd = idx === sections.length - 1;
    setFigure(fig || (atEnd ? 'scatter' : (idx === 0 ? 'hero' : 'scatter')));
  }
  on(window, 'scroll', updateLines, {passive:true});

  // snapping with resistance: a wheel flick has to add up before it moves, it moves exactly one section, then it holds for a beat
  var locked = false, acc = 0, accAt = 0;
  function goTo(i){
    i = Math.max(0, Math.min(sections.length - 1, i));
    locked = true; acc = 0;
    sections[i].scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'center'});
    setTimeout(function(){ locked = false; acc = 0; }, 950);
  }
  on(window, 'wheel', function(e){
    if (document.body.classList.contains('agents')) return;
    e.preventDefault();
    if (locked) return;
    var now = performance.now(); if (now - accAt > 350) acc = 0; accAt = now;
    acc += e.deltaY;
    if (Math.abs(acc) > 120) goTo(sectionIndex() + (acc > 0 ? 1 : -1));
  }, {passive:false});
  on(window, 'keydown', function(e){
    if (document.body.classList.contains('agents')) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' '){ e.preventDefault(); if (!locked) goTo(sectionIndex() + 1); }
    if (e.key === 'ArrowUp' || e.key === 'PageUp'){ e.preventDefault(); if (!locked) goTo(sectionIndex() - 1); }
  });
  // the valve flips a class on the body; the lines and the counter follow
  var agentsObs = new MutationObserver(function(){ updateLines(); });
  agentsObs.observe(document.body, {attributes:true, attributeFilter:['class']});

  var t0 = performance.now(), last = t0, lastScroll = window.scrollY, accel = 0, breakAmt = 1, lastMove = -9999;
  function damp(a, stretch){ return 1 - Math.pow(1 - a, stretch); }
  function sstep(a, b, x){ var t = Math.max(0, Math.min(1, (x - a)/(b - a))); return t*t*(3 - 2*t); }
  function easeInOut(x){ return x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3)/2; }
  function frame(now){
    if (!alive) return;
    // a long gap between frames (a background tab) settles everything at once instead of replaying it
    var dt = Math.min(1500, now - last); last = now;
    var stretch = dt / (1000/60);
    var t = (now - t0)/1000, since = (now - switchedAt)/1000;
    var sy = window.scrollY, vel = dt > 200 ? 0 : (sy - lastScroll) / Math.max(1, dt); lastScroll = sy;
    if (Math.abs(vel) > 0.04) lastMove = now;
    accel += (Math.max(-1, Math.min(1, vel*0.9)) - accel) * damp(0.08, stretch);

    var breaking = (now - lastMove < 380) || current === 'scatter';
    breakAmt += ((breaking ? 1 : 0) - breakAmt) * damp(breaking ? 0.09 : 0.04, stretch);
    var d = reduce ? (breaking ? 1 : 0) : breakAmt;

    if (!dragging){
      velY *= Math.pow(0.94, stretch); velX *= Math.pow(0.94, stretch); rotY += velY; rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
      rotY -= rotY * damp(0.012, stretch); rotX -= rotX * damp(0.012, stretch);
    }
    // the galaxy turns on its own axis, slowly and without end
    var yawBase = current === 'hero' ? (reduce ? 0 : t*0.07) : 0;
    // on the galaxy the mouse height sets the viewing plane: up tips it toward edge-on, down opens it toward face-on
    var tiltMouse = current === 'hero' ? -my*1.15 : (current === 'terrain' || current === 'chart' || current === 'grid' || current === 'claw' || current === 'proxy') ? my*0.45 : my*0.08;
    // with no mouse for a couple of seconds the camera drifts on its own: a slow orbit and pan, cinematic, until you move again
    var idle = (now - lastPointer > 2500 && !dragging && !reduce) ? 1 : 0;
    idleAmt += (idle - idleAmt) * damp(0.015, stretch);
    // the orbit keeps turning one way, like the galaxy; it just stops advancing when the mouse is back
    // the galaxy, the underwriting block and the market keep turning slowly when idle; the terrain only sways, so the pilots keep flying right to left
    // ClawStreet loads square on, left to right, and only starts its slow turn once it has been read for a few seconds
    var turning = current === 'hero' || current === 'terrain' || current === 'grid' || current === 'chart' || current === 'proxy' || (current === 'claw' && performance.now() - figAt > 6500);
    if (turning) spinAcc += (current === 'hero' ? 0.0011 : 0.0015) * stretch * idleAmt;
    else { spinAcc = spinAcc % 6.2832; if (spinAcc < 0) spinAcc += 6.2832; spinAcc += ((spinAcc > 3.1416 ? 6.2832 : 0) - spinAcc) * damp(0.02, stretch); }
    var cinYaw = turning ? 0 : Math.sin(t*0.045) * 0.1 * idleAmt;
    var cinPitch = Math.sin(t*0.06 + 1.3) * 0.1 * idleAmt;
    var cinPanX = Math.sin(t*0.05) * 0.45 * idleAmt, cinPanY = Math.cos(t*0.05) * 0.2 * idleAmt;
    var kd = 1 - damp(0.03, stretch); kick.x *= kd; kick.y *= kd; kick.z *= kd;
    spin.rotation.x += (TILT[current] + rotX + tiltMouse*(1 - idleAmt) + cinPitch + kick.x - spin.rotation.x) * damp(0.04, stretch);
    spin.rotation.y += (yawBase + rotY + spinAcc + cinYaw + mx*0.2*(1 - idleAmt) + kick.y - spin.rotation.y) * damp(0.06, stretch);
    spin.rotation.z += (kick.z - spin.rotation.z) * damp(0.04, stretch);
    if (!narrow){ var an = ANCHOR[current]; world.position.x += (an[0] + cinPanX - world.position.x) * damp(0.03, stretch); world.position.y += (an[1] + cinPanY - world.position.y) * damp(0.03, stretch); }

    // the morph runs over 2.2 seconds: first into rings, then the rings become the object
    var prog = reduce ? 1 : Math.min(1, since / 2.2);
    var sway = reduce ? 0 : accel * 0.6;
    if (cur.live && !reduce) cur.live(t);               // a live figure rewrites its targets every frame
    var P = cur.p, C = cur.c, breathe = current === 'hero' ? 1 + 0.012*Math.sin(t*0.9) : 1;
    updateCursor();
    var cx = cursorLocal.x, cy = cursorLocal.y, cr = 0.3, cr2 = cr*cr;
    cursorStrength += ((cursorOn && !dragging ? 1 : 0) - cursorStrength) * damp(0.08, stretch);
    for (var i=0;i<N;i++){
      // straight from where it was to where it is going, each dot on its own noise-delayed clock
      var dl = delay[i]*0.9, pr = sstep(dl, dl + 0.5, prog), e = easeInOut(pr);
      var tx = P[i*3]*breathe, ty = P[i*3+1]*breathe, tz = P[i*3+2]*breathe;
      var x = from[i*3] + (tx - from[i*3])*e, y = from[i*3+1] + (ty - from[i*3+1])*e, z = from[i*3+2] + (tz - from[i*3+2])*e;
      // the cursor: a small local ripple, a soft wave that fades with distance, not a push
      if (cursorStrength > 0.01){
        var ddx = x - cx, ddy = y - cy, d2 = ddx*ddx + ddy*ddy;
        if (d2 < cr2 && d2 > 0.0001){
          var dd = Math.sqrt(d2), fall = (1 - dd/cr); fall = fall*fall*cursorStrength;
          var wave = Math.sin(dd*22 - t*6) * 0.02 * fall + 0.01*fall;
          x += ddx/dd*wave; y += ddy/dd*wave; z += 0.06*fall + 0.03*Math.sin(dd*18 - t*6)*fall;
        }
      }
      // breaking pushes each mote out along its own direction; a little drift keeps the loose ones alive
      var push = d * (1.3 + 1.3*((i*7919)%100)/100);
      x += dirs[i*3]*push; y += dirs[i*3+1]*push; z += dirs[i*3+2]*push;
      if (!reduce){
        x += Math.sin(t*0.7 + ph[i])*0.012*(0.4 + d); y += Math.cos(t*0.6 + ph[i]*1.3)*0.012*(0.4 + d);
        y -= sway * (0.3 + 0.7*Math.max(0, (y + 2.5)/5)); x += sway * 0.25 * (y + 2.5)/5;
      }
      pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
      aSwell[i] = Math.sin(pr*Math.PI) * 0.18 + d*0.2;
      aSize[i] += (baseSize[i]*cur.s[i] - aSize[i]) * damp(0.08, stretch);
      var cr0 = C[i*3], cg = C[i*3+1], cb = C[i*3+2];
      colr[i*3] += (cr0 - colr[i*3])*0.08; colr[i*3+1] += (cg - colr[i*3+1])*0.08; colr[i*3+2] += (cb - colr[i*3+2])*0.08;
    }
    geom.attributes.position.needsUpdate = true; geom.attributes.color.needsUpdate = true; geom.attributes.aSwell.needsUpdate = true; geom.attributes.aSize.needsUpdate = true;
    mat.uniforms.uSize.value = cur.size * 0.046;
    mat.uniforms.uTime.value = t;

    // the tumble: a marker keeps its heading but rocks on its other axes while it moves, the amount following its speed
    function tumble(m, speed, k, kd){ var amt = Math.min(1, 0.25 + speed*4); m.rotation.z += (Math.sin(t*1.6 + k)*0.32*amt - m.rotation.z)*kd; m.rotation.x += (Math.sin(t*1.25 + k*1.7)*0.22*amt - m.rotation.x)*kd*0.6; }
    var showSwarm = current === 'terrain' && d < 0.6 && prog > 0.9;
    swarm.visible = showSwarm;
    if (!showSwarm) agents.forEach(function(a){ a.tag.style.opacity = 0; a.until = 0; });
    // ClawStreet: markers ride the heads of the lanes, readouts sit to their left with the running return and any lesson just logged
    var showClaw = current === 'claw' && d < 0.6 && prog > 0.9; claws.visible = showClaw;
    for (var ci=0; ci<CL; ci++){ var ca = CLAW[ci], cmk = clawM[ci];
      if (!showClaw){ cmk.tag.style.opacity = 0; continue; }
      var cvy = Math.abs(ca.hy + 0.1 - cmk.m.position.y); cmk.m.position.set(ca.hx, ca.hy + 0.1, ca.hz); tumble(cmk.m, cvy*6, ci*1.3, damp(0.08, stretch));
      cmk.tag.textContent = ca.name + '  ' + (ca.pnl >= 0 ? '+' : '') + ca.pnl.toFixed(1) + '%' + (ca.lesson && t < ca.lessonUntil ? '\nLESSON  ' + ca.lesson : '');
      scr.set(ca.hx, ca.hy + 0.1, ca.hz); spin.localToWorld(scr); scr.project(camera);
      cmk.tag.style.transform = 'translate(calc(' + ((scr.x*0.5 + 0.5)*W - 16) + 'px - 100%),' + ((-scr.y*0.5 + 0.5)*H - 10) + 'px)'; cmk.tag.style.opacity = 1;
    }
    if (showClaw){ var inkR = dark ? 0.925 : 0.09, papR = dark ? 0.07 : 0.95, inkG = dark ? 0.92 : 0.09, papG = dark ? 0.07 : 0.945, inkB = dark ? 0.905 : 0.09, papB = dark ? 0.07 : 0.93;
      for (var cu=0; cu<CL; cu++){ if (cu === CL_SPY) continue; var ct = curtains[cu], ca2 = CLAW[cu], lz2 = CLZ0 + cu*CLDZ, dep2 = 0.35 + 0.65*cu/(CL-1);
        for (var vi=0; vi<CLP; vi++){ var age2 = Math.pow(vi/(CLP-1), 1.3)*dep2, o6 = vi*6; ct.pos[o6] = ca2.px[vi]; ct.pos[o6+1] = ca2.py[vi]; ct.pos[o6+2] = lz2; ct.pos[o6+3] = ca2.px[vi]; ct.pos[o6+4] = 0; ct.pos[o6+5] = lz2;
          var r6 = papR + (inkR - papR)*age2, g6 = papG + (inkG - papG)*age2, b6 = papB + (inkB - papB)*age2; ct.col[o6] = r6; ct.col[o6+1] = g6; ct.col[o6+2] = b6; ct.col[o6+3] = r6; ct.col[o6+4] = g6; ct.col[o6+5] = b6; }
        ct.g.attributes.position.needsUpdate = true; ct.g.attributes.color.needsUpdate = true; } }
    // Proxies: read the field, gather into the table, join the empty seat, talk, scatter, read again
    var showPx = current === 'proxy' && d < 0.6 && prog > 0.9, ag = pxAgents[0], jseat = PX[PXJOIN];
    function pxPick(){ var out = [], tries = 0, want = 3 + Math.floor(Math.random()*2); while (out.length < want && tries++ < 200){ var k = Math.floor(Math.random()*NEARP.length); if (out.indexOf(k) < 0 && Math.abs(NEARP[k].x) < 2.7 && NEARP[k].z < 2) out.push(k); } return out; }
    if (showPx && !pxWas){ PXPH = 'read'; PXT = t; PXSTAGE = 0; PXJF = 0; PXREAD = pxPick(); PXRI = 0; ag.readAt = 0; ag.open = 0; ag.tight = 0; ag.m.position.set(rnd(-3,3), 3.6, -4); } pxWas = showPx;
    pxScan.visible = showPx; if (!showPx) ag.m.visible = false;
    if (!showPx){ ag.tag.style.opacity = 0; for (var h0=0; h0<PXN; h0++) pxTags[h0].style.opacity = 0; if (current !== 'proxy'){ PXSTAGE = 0; PXJF = 0; } }
    else {
      var el = t - PXT, kdm = damp(0.05, stretch), agx0 = ag.m.position.x, agz0 = ag.m.position.z, Dg = null, near = false;
      if (PXPH === 'read'){ Dg = NEARP[PXREAD[PXRI]]; ag.m.visible = true; var kdr = damp(0.085, stretch);
        // three or four pages from the middle of the field, one after another: fly over, hover, read for a second, move on
        ag.m.position.x += (Dg.x - ag.m.position.x)*kdr; ag.m.position.y += (1.5 + 0.06*Math.sin(t*2) - ag.m.position.y)*kdr; ag.m.position.z += (Dg.z - ag.m.position.z)*kdr;
        near = Math.hypot(ag.m.position.x - Dg.x, ag.m.position.z - Dg.z) < 0.15 && Math.abs(ag.m.position.y - 1.5) < 0.25;
        if (near && !ag.readAt) ag.readAt = t;
        // the main scan comes first, wide; after half a second it tightens to the document's own outline, then the agent moves on
        ag.tight += (((near && ag.readAt && t - ag.readAt > 0.55) ? 1 : 0) - ag.tight) * damp(0.12, stretch);
        if (ag.readAt && t - ag.readAt > 1.4){ ag.readAt = 0; ag.tight = 0; PXRI++; if (PXRI >= PXREAD.length){ PXPH = 'gather'; PXT = t; } } }
      else if (PXPH === 'gather'){ PXSTAGE = Math.min(1, el/2.8); ag.m.position.x += (jseat.x - ag.m.position.x)*kdm*0.7; ag.m.position.y += (2.2 - ag.m.position.y)*kdm*0.7; ag.m.position.z += (jseat.z - ag.m.position.z)*kdm*0.7;
        if (PXSTAGE >= 1 && Math.hypot(ag.m.position.x - jseat.x, ag.m.position.z - jseat.z) < 0.1){ PXPH = 'join'; PXT = t; } }
      else if (PXPH === 'join'){ PXJF = Math.min(1, el/1.7); ag.m.position.y += (1.08 - ag.m.position.y)*kdm*0.5; ag.m.visible = PXJF < 0.35;
        if (PXJF >= 1){ PXPH = 'talk'; PXT = t; PXAT = t; PXCUR = PXJOIN; } }
      else if (PXPH === 'talk'){ ag.m.visible = false; if (t > PXAT + PXLEN){ PXAT = t; PXCUR = (PXCUR + 1 + Math.floor(Math.random()*(PXN - 1))) % PXN; } if (el > 24){ PXPH = 'scatter'; PXT = t; } }
      else if (PXPH === 'scatter'){ ag.m.visible = false; PXJF = Math.max(0, 1 - el/1.2); PXSTAGE = Math.max(0, 1 - Math.max(0, el - 0.6)/2.4);
        if (el > 3.2){ PXPH = 'read'; PXT = t; PXREAD = pxPick(); PXRI = 0; ag.readAt = 0; ag.open = 0; ag.m.position.set(rnd(-3,3), 3.6, -4); } }
      tumble(ag.m, Math.hypot(ag.m.position.x - agx0, ag.m.position.z - agz0)/Math.max(0.001, stretch)*6, 2.1, damp(0.08, stretch));
      // the scanner is always on: a narrow beam straight down while the agent flies, opening into a wide fan once it has arrived, reaching well past the page. the lines fade out toward the floor
      var coneOn = PXPH === 'read' && !!Dg; ag.open += (((coneOn && near) ? 1 : 0) - ag.open) * damp(0.08, stretch);
      var opn = ag.open, bw = 0.22, bx0 = ag.m.position.x - bw/2, bz0 = ag.m.position.z - bw/2;
      var kx = 1, kz = 1;
      var wx = Dg ? bw + (Dg.w*kx - bw)*opn : bw, wz = Dg ? bw + (Dg.d*kz - bw)*opn : bw, ax0 = Dg ? bx0 + (Dg.x - Dg.w*kx/2 - bx0)*opn : bx0, az0 = Dg ? bz0 + (Dg.z - Dg.d*kz/2 - bz0)*opn : bz0, sw = t*2.6;
      var iR = dark ? 0.925 : 0.09, iG = dark ? 0.92 : 0.09, iB = dark ? 0.905 : 0.09, pR = dark ? 0.07 : 0.95, pG = dark ? 0.07 : 0.945, pB = dark ? 0.07 : 0.93;
      for (var sk=0; sk<16; sk++){ var ob = sk*6, uu = (sk/16 + sw*0.1) % 1, per = uu*2*(wx + wz), px2, pz2;
        if (per < wx){ px2 = ax0 + per; pz2 = az0; } else if (per < wx + wz){ px2 = ax0 + wx; pz2 = az0 + (per - wx); } else if (per < 2*wx + wz){ px2 = ax0 + wx - (per - wx - wz); pz2 = az0 + wz; } else { px2 = ax0; pz2 = az0 + wz - (per - 2*wx - wz); }
        pxConePos[ob] = ag.m.position.x; pxConePos[ob+1] = ag.m.position.y; pxConePos[ob+2] = ag.m.position.z; pxConePos[ob+3] = coneOn ? px2 : ag.m.position.x; pxConePos[ob+4] = coneOn ? 0.02 : ag.m.position.y; pxConePos[ob+5] = coneOn ? pz2 : ag.m.position.z;
        pxConeCol[ob] = iR; pxConeCol[ob+1] = iG; pxConeCol[ob+2] = iB; pxConeCol[ob+3] = pR + (iR - pR)*0.12; pxConeCol[ob+4] = pG + (iG - pG)*0.12; pxConeCol[ob+5] = pB + (iB - pB)*0.12; }
      var cr4 = [[ax0, az0], [ax0 + wx, az0], [ax0 + wx, az0 + wz], [ax0, az0 + wz]];
      for (var e4=0; e4<4; e4++){ var ob4 = (16 + e4)*6, c0 = cr4[e4], c1 = cr4[(e4+1)%4]; pxConePos[ob4] = coneOn ? c0[0] : ag.m.position.x; pxConePos[ob4+1] = coneOn ? 0.02 : ag.m.position.y; pxConePos[ob4+2] = coneOn ? c0[1] : ag.m.position.z; pxConePos[ob4+3] = coneOn ? c1[0] : ag.m.position.x; pxConePos[ob4+4] = coneOn ? 0.02 : ag.m.position.y; pxConePos[ob4+5] = coneOn ? c1[1] : ag.m.position.z;
        var oS = 0.3 + 0.7*ag.tight; // the outline firms up into ink once the agent has settled on the document
        for (var cc=0; cc<2; cc++){ pxConeCol[ob4 + cc*3] = pR + (iR - pR)*oS; pxConeCol[ob4 + cc*3 + 1] = pG + (iG - pG)*oS; pxConeCol[ob4 + cc*3 + 2] = pB + (iB - pB)*oS; } }
      pxConeGeo.attributes.color.needsUpdate = true;
      ag.tag.textContent = jseat.n + ' AGENT  reading ' + (Dg ? Dg.name : '') + '  ' + (PXRI + 1) + '/' + PXREAD.length; ag.tag.style.opacity = coneOn && near ? 1 : 0;
      if (coneOn){ scr.copy(ag.m.position); spin.localToWorld(scr); scr.project(camera); var axp = (scr.x*0.5 + 0.5)*W, ayp = (-scr.y*0.5 + 0.5)*H - 8, flipA = axp > W*0.62;
        ag.tag.classList.toggle('flip', flipA); ag.tag.style.transform = flipA ? 'translate(calc(' + (axp - 14) + 'px - 100%),' + ayp + 'px)' : 'translate(' + (axp + 14) + 'px,' + ayp + 'px)'; }
      // the discussion: one note at a time beside whoever is speaking
      for (var pj=0; pj<PXN; pj++){ var ptg = pxTags[pj], onN = PXPH === 'talk' && pj === PXCUR; if (!onN){ ptg.style.opacity = 0; continue; }
        var ph2 = (t - PXAT)/PXLEN; ptg.textContent = PX[pj].n + '\n' + PX[pj].q; ptg.style.opacity = Math.min(1, ph2/0.08) * (ph2 > 0.88 ? Math.max(0, (1 - ph2)/0.12) : 1);
        scr.set(PX[pj].x, 1.45, PX[pj].z); spin.localToWorld(scr); scr.project(camera); var nxp = (scr.x*0.5 + 0.5)*W, nyp = (-scr.y*0.5 + 0.5)*H - 34, flipN = nxp > W*0.56;
        ptg.classList.toggle('flip', flipN); ptg.style.transform = flipN ? 'translate(calc(' + (nxp - 12) + 'px - 100%),' + nyp + 'px)' : 'translate(' + (nxp + 12) + 'px,' + nyp + 'px)'; }
    }
    pxConeGeo.attributes.position.needsUpdate = true;
    var showScan = current === 'grid' && d < 0.6 && prog > 0.9;
    scan.visible = showScan;
    if (!showScan) scanners.forEach(function(sc){ sc.tag.style.opacity = 0; if (sc.b >= 0){ tint(sc.b, false); sc.b = -1; sc.mode = 'fly'; } });
    if (showScan){
      var ds2 = Math.min(0.1, dt/1000);
      for (var sc0=0; sc0<SCAN_N; sc0++){
        var sc = scanners[sc0];
        if (sc.b < 0){ sc.b = pickBuilding(sc); sc.mode = 'fly'; }
        var Bq = BLDG[sc.b], hx = Bq.x, hz = Bq.z, hy = Bq.h + 0.6 + 0.04*Math.sin(t*1.3 + sc0);
        if (sc.mode === 'fly'){
          // cruise over the block, drop down over the building, then hold and read it
          var dx = hx - sc.p.x, dz = hz - sc.p.z, dxz = Math.hypot(dx, dz), step = Math.min(dxz, 0.9*ds2);
          if (dxz > 0.001){ sc.p.x += dx/dxz*step; sc.p.z += dz/dxz*step; sc.h = Math.atan2(dz, dx); }
          var ty = dxz > 0.9 ? Math.max(hy, 2.6) : hy;
          sc.p.y += (ty - sc.p.y) * damp(0.05, stretch);
          if (dxz < 0.03 && Math.abs(sc.p.y - hy) < 0.05){ sc.mode = 'scan'; sc.until = t + 4.2; tint(sc.b, true); sc.tag.textContent = readout(sc0, Bq); }
        } else {
          sc.p.set(hx, hy, hz);
          if (t > sc.until){ tint(sc.b, false); sc.b = -1; }
        }
        var scSpeed = sc.m.position.distanceTo(sc.p)/Math.max(0.001, stretch)*6; sc.m.position.copy(sc.p); sc.m.rotation.y = -sc.h; tumble(sc.m, scSpeed, sc0*1.9, damp(0.08, stretch));
        // the cone: spokes from the agent to an ellipse round the roof, and the ellipse itself; collapsed to the agent while flying
        var scanning = sc.mode === 'scan' && sc.b >= 0, rx = Bq.w/2*1.1, rz = Bq.d/2*1.1, ry = Bq.h + 0.01, sweep = t*0.4;
        for (var ck=0; ck<CONE_K; ck++){
          var a1 = sweep + ck/CONE_K*6.2832, a2 = sweep + (ck+1)/CONE_K*6.2832, oc = sc0*CONE_K*12 + ck*12;
          var ex1 = scanning ? hx + Math.cos(a1)*rx : sc.p.x, ez1 = scanning ? hz + Math.sin(a1)*rz : sc.p.z, ey = scanning ? ry : sc.p.y;
          var ex2 = scanning ? hx + Math.cos(a2)*rx : sc.p.x, ez2 = scanning ? hz + Math.sin(a2)*rz : sc.p.z;
          conePos[oc] = sc.p.x; conePos[oc+1] = sc.p.y; conePos[oc+2] = sc.p.z; conePos[oc+3] = ex1; conePos[oc+4] = ey; conePos[oc+5] = ez1;
          conePos[oc+6] = ex1; conePos[oc+7] = ey; conePos[oc+8] = ez1; conePos[oc+9] = ex2; conePos[oc+10] = ey; conePos[oc+11] = ez2;
        }
        var onS = sc.mode === 'scan' && sc.b >= 0;
        sc.tag.style.opacity = onS ? Math.min(1, (t - (sc.until - 4.2))/0.3) * (t > sc.until - 0.4 ? Math.max(0, (sc.until - t)/0.4) : 1) : 0;
        if (onS){ scr.set(Bq.x + Bq.w/2, Bq.h, Bq.z + Bq.d/2); spin.localToWorld(scr); scr.project(camera); sc.tag.style.transform = 'translate(' + ((scr.x*0.5 + 0.5)*W + 12) + 'px,' + ((-scr.y*0.5 + 0.5)*H - 12) + 'px)'; }
      }
      coneGeo.attributes.position.needsUpdate = true;
    }
    if (showSwarm){
      // the leader flies a slow loop over the field; the others hold a V behind it, each riding the ground under it
      // fly toward the next waypoint, turning smoothly; on arrival, log it and plan one more
      var ds = Math.min(0.1, dt/1000), tgt0 = wps[0], want = Math.atan2(tgt0[1] - lead.z, tgt0[0] - lead.x);
      var dh = Math.atan2(Math.sin(want - lead.h), Math.cos(want - lead.h));
      var turn = Math.max(-0.85*ds, Math.min(0.85*ds, dh)); lead.h += turn;
      var bank = ds > 0 ? -(turn/ds)*0.5 : 0, vEff = lead.v*(1 - 0.5*Math.min(1, Math.abs(dh)/0.5));
      lead.x += Math.cos(lead.h)*vEff*ds; lead.z += Math.sin(lead.h)*vEff*ds;
      if (Math.hypot(tgt0[0] - lead.x, tgt0[1] - lead.z) < 0.18){ visited.push(wps.shift()); if (visited.length > 40) visited.shift(); var lastW = wps[wps.length-1]; wps.push(nextWaypoint(lastW[0], lastW[1])); }
      if (t > histAt){ histAt = t + 0.25; histN = (histN + 1) % HIST; }
      histPos[histN*3] = lead.x; histPos[histN*3+1] = terrainH(lead.x, lead.z) + 0.012; histPos[histN*3+2] = lead.z;
      // the trace is drawn oldest to newest, so rotate the ring into the buffer order
      var lx = lead.x, lz = lead.z, heading = lead.h;
      var ch = Math.cos(heading), shh = Math.sin(heading), hdg = Math.round(((90 - heading*57.3) % 360 + 360) % 360);
      for (var ai2=0; ai2<AG; ai2++){
        var a = agents[ai2], fo = formation[ai2];
        // formation offsets are given along and across the heading
        var fx = fo[0] + 0.26*Math.sin(t*0.23 + ai2*1.7) + 0.12*Math.sin(t*0.47 + ai2*0.9), fz = fo[1] + 0.22*Math.cos(t*0.19 + ai2*2.1) + 0.1*Math.sin(t*0.37 + ai2*1.4);
        var px = lx + fz*ch - fx*shh, pz = lz + fz*shh + fx*ch;
        var gy = terrainH(px, pz), ty = gy + 0.75 + 0.14*Math.sin(t*0.35 + ai2*1.3) + 0.05*Math.sin(t*1.2 + ai2);
        a.y += (ty - a.y) * damp(0.08, stretch) || 0;
        if (!a.y) a.y = ty;
        a.p.set(px, a.y, pz); a.m.position.copy(a.p); a.m.rotation.y = -heading; a.m.rotation.x += (bank + Math.sin(t*1.25 + ai2*1.7)*0.12 - a.m.rotation.x) * damp(0.06, stretch); a.m.rotation.z += (Math.sin(t*1.6 + ai2*1.1)*0.26 - a.m.rotation.z) * damp(0.06, stretch);
        tickPos[ai2*6] = px; tickPos[ai2*6+1] = a.y; tickPos[ai2*6+2] = pz; tickPos[ai2*6+3] = px; tickPos[ai2*6+4] = gy + 0.01; tickPos[ai2*6+5] = pz;
        var cb = ai2*12, cs = 0.06;
        crossPos[cb] = px - cs; crossPos[cb+1] = gy + 0.01; crossPos[cb+2] = pz; crossPos[cb+3] = px + cs; crossPos[cb+4] = gy + 0.01; crossPos[cb+5] = pz;
        crossPos[cb+6] = px; crossPos[cb+7] = gy + 0.01; crossPos[cb+8] = pz - cs; crossPos[cb+9] = px; crossPos[cb+10] = gy + 0.01; crossPos[cb+11] = pz + cs;
        // the readout: surfaces for a couple of seconds every so often, then goes quiet
        if (t > a.nextAt){ a.until = t + 2.2; a.nextAt = t + 5 + Math.random()*7; a.tag.textContent = CALLS[ai2] + '  ALT ' + Math.round(120 + (a.y - gy)*180) + '  HDG ' + (hdg < 100 ? (hdg < 10 ? '00' : '0') : '') + hdg + '  LINK ' + (ai2 === 0 ? 4 : 2); }
        var on = t < a.until;
        a.tag.style.opacity = on ? (t > a.until - 0.4 ? (a.until - t)/0.4 : Math.min(1, (t - (a.until - 2.2))/0.3)) : 0;
        if (on){ scr.copy(a.p); swarm.localToWorld(scr); scr.project(camera); a.tag.style.transform = 'translate(' + ((scr.x*0.5 + 0.5)*W + 10) + 'px,' + ((-scr.y*0.5 + 0.5)*H - 22) + 'px)'; }
      }
      // links between any two within range: the mesh of communication
      var li = 0;
      for (var p1=0; p1<AG; p1++) for (var p2=p1+1; p2<AG; p2++){
        var A = agents[p1].p, B = agents[p2].p, inRange = A.distanceTo(B) < 1.9;
        linkPos[li*6] = A.x; linkPos[li*6+1] = A.y; linkPos[li*6+2] = A.z;
        linkPos[li*6+3] = inRange ? B.x : A.x; linkPos[li*6+4] = inRange ? B.y : A.y; linkPos[li*6+5] = inRange ? B.z : A.z;
        li++;
      }
      linkGeo.attributes.position.needsUpdate = true; tickGeo.attributes.position.needsUpdate = true; crossGeo.attributes.position.needsUpdate = true;
      tickLines.computeLineDistances();
      // the course ahead: from the formation through the next waypoints, laid on the ground
      // each leg is dotted back from the waypoint it ends at, so the dots stay put on the ground as the formation closes in
      var pts = [[lead.x, lead.z]].concat(wps), ci = 0;
      for (var si=0; si<pts.length-1 && ci<COURSE; si++){
        var ax = pts[si][0], az = pts[si][1], bx = pts[si+1][0], bz = pts[si+1][1], legL = Math.hypot(bx - ax, bz - az), ux = (ax - bx)/legL, uz = (az - bz)/legL;
        for (var dd2=0.14; dd2<legL && ci<COURSE; dd2+=0.14, ci++){ var cx2 = bx + ux*dd2, cz2 = bz + uz*dd2; coursePos[ci*3] = cx2; coursePos[ci*3+1] = terrainH(cx2, cz2) + 0.015; coursePos[ci*3+2] = cz2; }
      }
      for (; ci<COURSE; ci++) coursePos[ci*3+1] = -40;
      courseGeo.attributes.position.needsUpdate = true;
      for (var wi=0; wi<WAY; wi++){
        var wx = wps[wi][0], wz = wps[wi][1], wy = terrainH(wx, wz) + 0.015, wb = wi*12, ws = 0.07;
        wayPos[wb] = wx - ws; wayPos[wb+1] = wy; wayPos[wb+2] = wz - ws; wayPos[wb+3] = wx + ws; wayPos[wb+4] = wy; wayPos[wb+5] = wz + ws;
        wayPos[wb+6] = wx - ws; wayPos[wb+7] = wy; wayPos[wb+8] = wz + ws; wayPos[wb+9] = wx + ws; wayPos[wb+10] = wy; wayPos[wb+11] = wz - ws;
      }
      wayGeo.attributes.position.needsUpdate = true;
      // the survey trace, oldest to newest
      var hp = histGeo.attributes.position.array;
      for (var hi=0; hi<HIST; hi++){ var src = ((histN + 1 + hi) % HIST)*3; hp[hi*3] = histPos[src]; hp[hi*3+1] = histPos[src+1]; hp[hi*3+2] = histPos[src+2]; }
      histGeo.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  updateLines();
  requestAnimationFrame(frame);

  return {
    updateLines: updateLines,
    destroy: function(){
      alive = false;
      cleanups.forEach(function(f){ f(); });
      modeObs.disconnect(); agentsObs.disconnect();
      document.body.classList.remove('fsdot', 'fsgo', 'fsdone');
      renderer.dispose();
      while (host.firstChild) host.removeChild(host.firstChild);
      while (rail && rail.firstChild) rail.removeChild(rail.firstChild);
    }
  };
}
