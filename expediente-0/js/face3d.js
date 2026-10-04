/* EXPEDIENTE 0 — cabeza humana procedural para la sala de interrogatorio.
 * Cráneo modelado por desplazamiento de vértices (pómulos, mandíbula, nariz, cuencas,
 * arco superciliar), piel pintada (ojeras, rubor, arrugas, barba de días), ojos con
 * iris, pupila, venas y párpados, cejas y labios móviles. Todo sale del aspecto de la
 * persona (E0.appearance), así que es la misma cara en cada partida. */
(function () {
  const R0 = 0.13;
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const v3 = (x, y, z) => new THREE.Vector3(x, y, z).normalize();

  /* Relieves de la cara: centro (dirección), amplitud, anchura (y factor de estiramiento en x). */
  function bumps(r) {
    const k = (a, s) => a * (0.85 + r() * 0.3) * (s || 1);
    return [
      { c: v3(0.33, 0.12, 0.93), a: k(-0.085), s: 0.17, sx: 1.25 }, { c: v3(-0.33, 0.12, 0.93), a: k(-0.085), s: 0.17, sx: 1.25 }, // cuencas
      { c: v3(0.3, 0.33, 0.9), a: k(0.035), s: 0.13, sx: 1.8 }, { c: v3(-0.3, 0.33, 0.9), a: k(0.035), s: 0.13, sx: 1.8 },       // arco superciliar
      { c: v3(0.56, -0.08, 0.8), a: k(0.045), s: 0.16 }, { c: v3(-0.56, -0.08, 0.8), a: k(0.045), s: 0.16 },                      // pómulos
      { c: v3(0, 0.12, 1), a: k(0.05), s: 0.07 }, { c: v3(0, -0.02, 1), a: k(0.11), s: 0.075 }, { c: v3(0, -0.16, 0.99), a: k(0.17), s: 0.085 }, // puente y punta de la nariz
      { c: v3(0.11, -0.2, 0.97), a: k(0.06), s: 0.06 }, { c: v3(-0.11, -0.2, 0.97), a: k(0.06), s: 0.06 },                        // aletas
      { c: v3(0, -0.4, 0.92), a: k(0.045), s: 0.09, sx: 1.6 }, { c: v3(0, -0.5, 0.86), a: k(-0.02), s: 0.05, sx: 2.2 },           // labio superior y comisura
      { c: v3(0, -0.6, 0.8), a: k(0.04), s: 0.08, sx: 1.4 }, { c: v3(0, -0.86, 0.5), a: k(0.06), s: 0.14 },                       // labio inferior y barbilla
      { c: v3(0.5, -0.45, 0.72), a: k(-0.03), s: 0.12 }, { c: v3(-0.5, -0.45, 0.72), a: k(-0.03), s: 0.12 }                       // mejillas hundidas
    ];
  }
  function skullGeometry(A) {
    const r = rng(A.h ^ 0x51ed);
    const B = bumps(r);
    const geo = new THREE.SphereGeometry(R0, 72, 54);
    const pos = geo.attributes.position, d = new THREE.Vector3();
    const jaw = 0.18 + r() * 0.12;
    for (let i = 0; i < pos.count; i++) {
      d.set(pos.getX(i), pos.getY(i), pos.getZ(i)).normalize();
      let m = 1;
      B.forEach(b => { const dx = (d.x - b.c.x) / (b.sx || 1), dy = d.y - b.c.y, dz = d.z - b.c.z; m += b.a * Math.exp(-(dx * dx + dy * dy + dz * dz) / (2 * b.s * b.s)); });
      let x = d.x * m * 0.86, y = d.y * m * 1.12, z = d.z * m * 0.97;
      if (d.y < -0.15) { const t = (-d.y - 0.15); x *= 1 - jaw * t; z *= 1 - 0.08 * t * (d.z < 0 ? 1.6 : 0); }
      if (d.z < -0.2) z *= 1.04;
      pos.setXYZ(i, x * R0, y * R0, z * R0);
    }
    geo.computeVertexNormals();
    return geo;
  }

  /* Coordenadas de textura de una dirección de la esfera (como SphereGeometry de three). */
  function uvOf(dx, dy, dz, W, H) {
    const d = new THREE.Vector3(dx, dy, dz).normalize();
    let phi = Math.atan2(d.z, -d.x); if (phi < 0) phi += Math.PI * 2;
    return [phi / (Math.PI * 2) * W, Math.acos(Math.max(-1, Math.min(1, d.y))) / Math.PI * H];
  }
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(v * f)))); return 'rgb(' + c.join(',') + ')'; }
  function skinTexture(A, H) {
    const W = 1024, Ht = 512, cv = document.createElement('canvas'); cv.width = W; cv.height = Ht;
    const g = cv.getContext('2d'), r = rng(A.h ^ 0x9e37);
    g.fillStyle = A.skin; g.fillRect(0, 0, W, Ht);
    for (let i = 0; i < 9000; i++) { g.fillStyle = 'rgba(' + (r() < 0.5 ? '60,20,10' : '255,230,210') + ',' + (r() * 0.05) + ')'; g.fillRect(r() * W, r() * Ht, 1 + r() * 3, 1 + r() * 3); }
    const blob = (dx, dy, dz, rad, col) => { const [x, y] = uvOf(dx, dy, dz, W, Ht); const gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2); g.fill(); };
    const fear = (H.miedo || 50) / 100;
    // ojeras: más marcadas con la edad y el miedo
    [-1, 1].forEach(s => { blob(s * 0.33, 0.02, 0.94, 26, 'rgba(70,30,45,' + (0.22 + fear * 0.2 + (A.old ? 0.15 : 0)) + ')'); blob(s * 0.36, -0.03, 0.93, 18, 'rgba(40,20,30,' + (0.12 + fear * 0.12) + ')'); });
    // rubor y sombra de las mejillas
    [-1, 1].forEach(s => { blob(s * 0.55, -0.18, 0.8, 34, 'rgba(170,60,50,.16)'); blob(s * 0.5, -0.45, 0.72, 30, 'rgba(40,20,15,.14)'); });
    // labios
    const [lx, ly] = uvOf(0, -0.47, 0.88, W, Ht);
    g.fillStyle = 'rgba(120,40,40,.55)'; g.beginPath(); g.ellipse(lx, ly, 26, 7, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(70,20,20,.7)'; g.fillRect(lx - 24, ly - 1, 48, 2);
    // nariz: sombra lateral y orificios
    [-1, 1].forEach(s => blob(s * 0.12, -0.08, 0.98, 16, 'rgba(60,25,15,.18)'));
    const ink = 'rgba(55,25,15,';
    // arrugas
    if (A.old) {
      g.lineWidth = 1.4;
      for (let i = 0; i < 4; i++) { const [x1, y1] = uvOf(-0.35, 0.5 + i * 0.06, 0.85, W, Ht), [x2, y2] = uvOf(0.35, 0.5 + i * 0.06, 0.85, W, Ht); g.strokeStyle = ink + (0.28 - i * 0.04) + ')'; g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo((x1 + x2) / 2, y1 - 4, x2, y2); g.stroke(); }
      [-1, 1].forEach(s => { const [a1, b1] = uvOf(s * 0.16, -0.22, 0.97, W, Ht), [a2, b2] = uvOf(s * 0.24, -0.55, 0.85, W, Ht); g.strokeStyle = ink + '.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(a1, b1); g.quadraticCurveTo(a1 + s * 10, (b1 + b2) / 2, a2, b2); g.stroke();
        for (let k = 0; k < 3; k++) { const [c1, d1] = uvOf(s * 0.5, 0.08 + k * 0.05, 0.86, W, Ht); g.lineWidth = 1; g.beginPath(); g.moveTo(c1, d1); g.lineTo(c1 + s * 14, d1 + (k - 1) * 4); g.stroke(); } });
    }
    // barba poblada pintada sobre mandíbula, mentón y bigote
    if (A.beard) {
      for (let i = 0; i < 26000; i++) {
        const a = (r() - 0.5) * Math.PI * 1.15, yy = -0.32 - r() * 0.66;
        if (yy > -0.5 && Math.abs(a) < 0.5 && !(yy > -0.44 && yy < -0.36 && Math.abs(a) < 0.42)) continue;
        if (yy > -0.56 && yy < -0.44 && Math.abs(a) < 0.3) continue;
        const [x, y] = uvOf(Math.sin(a), yy, Math.cos(a), W, Ht);
        g.strokeStyle = 'rgba(' + (A.old ? '170,165,155' : '25,18,12') + ',' + (0.12 + r() * 0.25) + ')'; g.lineWidth = 1;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 3, y + 2 + r() * 3); g.stroke();
      }
    }
    // barba de varios días
    if (!A.beard && (A.h >>> 13) % 3 === 0) {
      g.fillStyle = 'rgba(30,25,20,.10)';
      for (let i = 0; i < 2600; i++) { const a = r() * Math.PI - Math.PI / 2, yy = -0.4 - r() * 0.55; const [x, y] = uvOf(Math.sin(a) * 0.9, yy, Math.cos(a) * 0.9, W, Ht); g.fillRect(x, y, 1.4, 1.4); }
    }
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
  }

  const IRIS = ['#4a2e1a', '#6b4423', '#3d2b1f', '#5b6b3a', '#4f6b7a', '#6b7a82', '#2a1d14'];
  function eyeTexture(A) {
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 128;
    const g = cv.getContext('2d'), r = rng(A.h ^ 0x77);
    g.fillStyle = '#efe7dc'; g.fillRect(0, 0, 256, 128);
    // venas
    g.strokeStyle = 'rgba(170,40,40,.45)'; g.lineWidth = 0.8;
    for (let i = 0; i < 26; i++) { let x = 64 + (r() - 0.5) * 90, y = 64 + (r() - 0.5) * 70; g.beginPath(); g.moveTo(x, y); for (let k = 0; k < 4; k++) { x += (64 - x) * 0.2 + (r() - 0.5) * 8; y += (64 - y) * 0.2 + (r() - 0.5) * 8; g.lineTo(x, y); } g.stroke(); }
    // iris en la parte delantera (u = 0,25)
    const col = A.iris || IRIS[A.h % IRIS.length], cx = 64, cy = 64;
    const gr = g.createRadialGradient(cx, cy, 4, cx, cy, 17); gr.addColorStop(0, shade(col, 1.35)); gr.addColorStop(0.7, col); gr.addColorStop(1, '#111');
    g.fillStyle = gr; g.beginPath(); g.ellipse(cx, cy, 17, 18, 0, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(0,0,0,.35)'; for (let a = 0; a < Math.PI * 2; a += 0.2) { g.beginPath(); g.moveTo(cx + Math.cos(a) * 6, cy + Math.sin(a) * 6); g.lineTo(cx + Math.cos(a) * 16, cy + Math.sin(a) * 16); g.stroke(); }
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
  }

  /* Construye la cabeza. Devuelve las piezas animables. */
  function build(A, H, mat) {
    const head = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ color: '#ffffff', map: skinTexture(A, H), roughness: 0.72, metalness: 0 });
    const skull = new THREE.Mesh(skullGeometry(A), skinMat); skull.castShadow = true; skull.receiveShadow = true; head.add(skull);
    const flat = new THREE.MeshStandardMaterial({ color: A.skin, roughness: 0.75 });
    // orejas
    [-1, 1].forEach(s => { const ear = new THREE.Mesh(new THREE.SphereGeometry(0.026, 16, 12), flat); ear.scale.set(0.45, 1.05, 0.75); ear.position.set(s * 0.11, 0.0, -0.005); head.add(ear); });
    // ojos
    const eyeMat = new THREE.MeshStandardMaterial({ map: eyeTexture(A), roughness: 0.12, metalness: 0 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: '#050505' });
    const lidMat = new THREE.MeshStandardMaterial({ color: A.skin, roughness: 0.7, side: THREE.DoubleSide });
    const eyes = [], lids = [], lowLids = [], pupils = [];
    [-1, 1].forEach(s => {
      const socket = new THREE.Group(); socket.position.set(s * 0.041, 0.017, 0.0955); head.add(socket);
      const ball = new THREE.Group(); socket.add(ball);
      const eb = new THREE.Mesh(new THREE.SphereGeometry(0.0195, 24, 16), eyeMat); ball.add(eb);
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.0044, 16), pupilMat); pupil.position.z = 0.0196; ball.add(pupil);
      const lid = new THREE.Mesh(new THREE.SphereGeometry(0.0208, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), lidMat); socket.add(lid);
      const low = new THREE.Mesh(new THREE.SphereGeometry(0.0205, 24, 8, 0, Math.PI * 2, Math.PI * 0.66, Math.PI * 0.34), lidMat); socket.add(low);
      eyes.push(ball); lids.push(lid); lowLids.push(low); pupils.push(pupil);
    });
    // cejas
    const browCol = A.old ? '#8f8a82' : A.hair;
    const brows = [-1, 1].map(s => {
      const piv = new THREE.Group(); piv.position.set(s * 0.066, 0.048, 0.114); head.add(piv);
      const thick = 0.0028 + ((A.h >>> 5) % 3) * 0.0008;
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, -0.002, -0.004), new THREE.Vector3(-s * 0.024, 0.009, 0.004), new THREE.Vector3(-s * 0.048, 0.001, 0.006));
      const b = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, thick, 6, false), new THREE.MeshStandardMaterial({ color: browCol, roughness: 1 }));
      b.scale.y = 1.6; piv.add(b);
      return { piv, s };
    });
    // boca: interior oscuro y labios
    const mouth = new THREE.Group(); mouth.position.set(0, -0.067, 0.111); head.add(mouth);
    const inside = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 10), new THREE.MeshBasicMaterial({ color: '#1a0606' })); inside.scale.set(1.2, 0.05, 0.4); inside.position.z = 0.002; mouth.add(inside);
    const lipMat = new THREE.MeshStandardMaterial({ color: shade(A.skin, 0.68), roughness: 0.45 });
    const lip = (y, z, sag, r) => new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-0.019, y + 0.001, z - 0.006), new THREE.Vector3(0, y + sag, z + 0.003), new THREE.Vector3(0.019, y + 0.001, z - 0.006)), 14, r, 6, false), lipMat);
    mouth.add(lip(0.0035, 0.004, 0.0015, 0.0034));
    const jaw = new THREE.Group(); mouth.add(jaw);
    jaw.add(lip(-0.004, 0.004, -0.0025, 0.0042));
    // fosas nasales
    [-1, 1].forEach(s => { const n = new THREE.Mesh(new THREE.SphereGeometry(0.004, 8, 6), new THREE.MeshBasicMaterial({ color: '#1f0d08' })); n.position.set(s * 0.0085, -0.034, 0.134); n.scale.set(1.3, 0.6, 1); head.add(n); });
    return { head, skinMat, eyes, lids, lowLids, pupils, brows, mouth, inside, jaw, lidOpen: 0.36 + ((H.confianza || 50) / 100) * 0.14 };
  }

  /* Pone el párpado superior: 0 = cerrado, 1 = muy abierto (se ve blanco sobre el iris). */
  function setLids(F, open) {
    const a = open >= 0.4 ? -0.25 - (open - 0.4) / 0.6 * 0.5 : 1.62 - open / 0.4 * 1.87;
    F.lids.forEach(l => { l.rotation.x = a; });
  }

  E0.face3d = { build, setLids };
})();
