/* EXPEDIENTE 0 — escena 3D (Three.js r128, incluido en vendor/).
 * Construye la escena a partir de los planos del caso (scene.plans): suelos, paredes en
 * corte tipo "casa de muñecas", mobiliario según la estancia y un objeto 3D por evidencia.
 * Un único renderer y un único bucle de animación; se re-engancha al DOM en cada render. */
(function () {
  const W = 16, D = 10, WALL_H = 1.15;
  let R = null;

  function webgl() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { return false; }
  }
  let ok = null;
  function available() { if (ok === null) ok = !!window.THREE && webgl(); return ok; }

  const norm = t => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const toWorld = (px, py) => ({ x: px / 100 * W - W / 2, z: py / 100 * D - D / 2 });
  function cssColor(name, fallback) {
    const v = getComputedStyle(document.body).getPropertyValue(name).trim();
    try { return new THREE.Color(v || fallback); } catch (e) { return new THREE.Color(fallback); }
  }
  function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }

  /* ---------- Materiales y piezas básicas ---------- */
  const matCache = {};
  function mat(color, opts) {
    const key = color + JSON.stringify(opts || {});
    if (!matCache[key]) matCache[key] = new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.75, metalness: 0.05 }, opts || {}));
    return matCache[key];
  }
  function box(w, h, d, color, opts) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opts)); m.castShadow = true; m.receiveShadow = true; return m; }
  function cyl(rt, rb, h, color, seg, opts) { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 18), mat(color, opts)); m.castShadow = true; return m; }
  function sph(r, color, opts) { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat(color, opts)); m.castShadow = true; return m; }
  function at(o, x, y, z) { o.position.set(x, y, z); return o; }
  function group() { return new THREE.Group(); }

  function textTexture(text, color) {
    const cv = document.createElement('canvas');
    cv.width = 512; cv.height = 96;
    const g = cv.getContext('2d');
    g.font = '600 46px "IBM Plex Mono", monospace';
    g.fillStyle = color;
    g.textBaseline = 'middle';
    g.fillText(String(text).toUpperCase(), 10, 48);
    const t = new THREE.CanvasTexture(cv);
    t.anisotropy = 4;
    return t;
  }
  function checker(n) {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128;
    const g = cv.getContext('2d'); const s = 128 / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { g.fillStyle = (i + j) % 2 ? '#2a2d33' : '#d9d4c7'; g.fillRect(i * s, j * s, s, s); }
    return new THREE.CanvasTexture(cv);
  }

  /* ---------- Modelos de evidencias ---------- */
  const MODELS = {
    body() {
      const g = group(); const cloth = 0x3a4250, skin = 0xc9a487;
      g.add(at(new THREE.Mesh(new THREE.CircleGeometry(0.75, 28), mat(0x3b0d10, { roughness: 0.3 })), 0.25, 0.012, -0.55)).children[0].rotation.x = -Math.PI / 2;
      const torso = at(box(0.42, 0.22, 0.75, cloth), 0, 0.13, 0); g.add(torso);
      g.add(at(sph(0.13, skin), 0, 0.14, -0.55));
      const legL = at(cyl(0.08, 0.07, 0.8, 0x23272f), -0.11, 0.09, 0.75); legL.rotation.x = Math.PI / 2; g.add(legL);
      const legR = at(cyl(0.08, 0.07, 0.8, 0x23272f), 0.13, 0.09, 0.72); legR.rotation.x = Math.PI / 2; legR.rotation.z = 0.15; g.add(legR);
      const armL = at(cyl(0.055, 0.05, 0.62, cloth), -0.36, 0.08, -0.1); armL.rotation.z = Math.PI / 2.4; armL.rotation.x = Math.PI / 2; g.add(armL);
      const armR = at(cyl(0.055, 0.05, 0.62, cloth), 0.38, 0.08, 0.05); armR.rotation.x = Math.PI / 2; armR.rotation.z = -0.4; g.add(armR);
      g.rotation.y = 0.5; return g;
    },
    glass() {
      const pts = [[0, 0], [0.09, 0], [0.09, 0.01], [0.012, 0.02], [0.012, 0.16], [0.07, 0.22], [0.085, 0.32], [0.08, 0.33]].map(p => new THREE.Vector2(p[0], p[1]));
      const g = group();
      const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 24), mat(0xdfe8ee, { transparent: true, opacity: 0.45, roughness: 0.05, metalness: 0.1 }));
      m.castShadow = true; g.add(m);
      g.add(at(cyl(0.06, 0.05, 0.03, 0x5a0f1a), 0, 0.235, 0));
      g.scale.setScalar(1.8); return g;
    },
    bottle() {
      const g = group(); const c = 0x1e3b26;
      g.add(at(cyl(0.08, 0.08, 0.42, c, 18, { roughness: 0.2 }), 0, 0.21, 0));
      g.add(at(cyl(0.03, 0.06, 0.12, c, 18, { roughness: 0.2 }), 0, 0.48, 0));
      g.add(at(cyl(0.032, 0.032, 0.06, 0x7a1c22), 0, 0.57, 0));
      g.add(at(cyl(0.082, 0.082, 0.14, 0xe9e2cf), 0, 0.2, 0));
      g.scale.setScalar(1.5); return g;
    },
    laptop() {
      const g = group();
      g.add(at(box(0.62, 0.03, 0.42, 0x8d939c, { metalness: 0.5, roughness: 0.35 }), 0, 0.015, 0));
      const lid = group(); lid.add(at(box(0.62, 0.42, 0.02, 0x8d939c, { metalness: 0.5, roughness: 0.35 }), 0, 0.21, 0));
      lid.add(at(box(0.56, 0.36, 0.005, 0x10202c, { emissive: 0x0c2a3a, emissiveIntensity: 0.9 }), 0, 0.21, 0.012));
      lid.position.set(0, 0.03, -0.2); lid.rotation.x = -0.25; g.add(lid);
      g.add(at(box(1.2, 0.05, 0.7, 0x4a3426), 0, -0.025, 0.05));
      return g;
    },
    phone() {
      const g = group();
      g.add(at(box(0.16, 0.02, 0.32, 0x111418, { metalness: 0.4, roughness: 0.3 }), 0, 0.01, 0));
      g.add(at(box(0.14, 0.004, 0.29, 0x0b1a26, { emissive: 0x0d3550, emissiveIntensity: 0.8 }), 0, 0.022, 0));
      g.scale.setScalar(1.6); return g;
    },
    tablet() {
      const g = group();
      g.add(at(box(0.36, 0.02, 0.5, 0x22262c, { metalness: 0.4, roughness: 0.3 }), 0, 0.01, 0));
      g.add(at(box(0.32, 0.004, 0.45, 0x0b1a26, { emissive: 0x0d3550, emissiveIntensity: 0.7 }), 0, 0.022, 0));
      g.add(at(box(1.1, 0.05, 0.65, 0x4a3426), 0, -0.025, 0));
      return g;
    },
    keys() {
      const g = group(); const metal = { metalness: 0.9, roughness: 0.25 };
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 8, 24), mat(0xb9bec6, metal)); ring.castShadow = true; g.add(at(ring, 0, 1.1, 0));
      g.add(at(box(0.03, 0.16, 0.008, 0xc8a24a, metal), -0.03, 0.98, 0));
      g.add(at(box(0.03, 0.14, 0.008, 0xb9bec6, metal), 0.03, 0.99, 0));
      const small = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.006, 6, 16), mat(0xb9bec6, metal)); g.add(at(small, 0.07, 1.06, 0));
      g.add(at(box(0.3, 0.05, 0.05, 0x3b2a1e), 0, 1.18, -0.02));
      g.scale.setScalar(1.6); g.position.y = -1.2; return g;
    },
    shelf() {
      const g = group(); const wood = 0x3d2c20;
      g.add(at(box(1.6, 1.6, 0.04, wood), 0, 0.8, -0.18));
      [0.02, 0.55, 1.1, 1.58].forEach(y => g.add(at(box(1.6, 0.04, 0.36, wood), 0, y, 0)));
      const cols = [0x6b2b2b, 0x2b4a6b, 0x6b5a2b, 0x2b6b4f, 0x4a2b6b, 0x7a7065];
      for (let i = 0; i < 9; i++) { const b = box(0.07, 0.36 + (i % 3) * 0.04, 0.26, cols[i % cols.length]); at(b, -0.55 + i * 0.09, 0.78, 0); g.add(b); }
      for (let i = 0; i < 4; i++) { const b = box(0.07, 0.34, 0.26, cols[(i + 2) % cols.length]); b.rotation.z = 0.5 + i * 0.1; at(b, 0.5 + i * 0.06, 0.66, 0); g.add(b); }
      g.add(at(box(0.08, 0.24, 0.16, 0xa57a3a, { metalness: 0.8, roughness: 0.35 }), -0.68, 0.7, 0));
      return g;
    },
    door() {
      const g = group();
      g.add(at(box(0.08, 2.0, 0.95, 0x5a4636), 0, 1.0, 0));
      g.add(at(box(0.12, 0.04, 0.16, 0xc9ced6, { metalness: 0.9, roughness: 0.2 }), 0.08, 1.0, 0.32));
      return g;
    },
    window() {
      const g = group();
      g.add(at(box(0.1, 1.2, 1.2, 0xd8d8d0), 0, 1.3, 0));
      g.add(at(box(0.04, 1.05, 0.5, 0x9fc4d8, { transparent: true, opacity: 0.35, roughness: 0.05 }), 0.12, 1.3, -0.28));
      const open = at(box(0.04, 1.05, 0.5, 0x9fc4d8, { transparent: true, opacity: 0.35, roughness: 0.05 }), 0.2, 1.3, 0.25); open.rotation.y = 0.35; g.add(open);
      return g;
    },
    drawer() {
      const g = group();
      g.add(at(box(0.9, 0.8, 0.45, 0x4e3a2c), 0, 0.4, 0));
      g.add(at(box(0.8, 0.18, 0.4, 0x5d4636), 0, 0.62, 0.22));
      g.add(at(box(0.12, 0.03, 0.03, 0xc9ced6, { metalness: 0.9 }), 0, 0.62, 0.43));
      return g;
    },
    car() {
      const g = group(); const c = 0xe8e6e0;
      g.add(at(box(1.9, 0.45, 0.85, c, { metalness: 0.4, roughness: 0.4 }), 0, 0.42, 0));
      g.add(at(box(1.0, 0.38, 0.78, 0x1b2430, { metalness: 0.3, roughness: 0.2 }), -0.1, 0.82, 0));
      [[-0.62, 0.42], [0.62, 0.42], [-0.62, -0.42], [0.62, -0.42]].forEach(([x, z]) => { const w = cyl(0.2, 0.2, 0.14, 0x111111, 20); w.rotation.x = Math.PI / 2; g.add(at(w, x, 0.2, z)); });
      g.add(at(box(0.05, 0.08, 0.2, 0xffa53a, { emissive: 0xff8a00, emissiveIntensity: 1.2 }), 0.96, 0.5, 0.3));
      g.add(at(box(0.05, 0.08, 0.2, 0xffa53a, { emissive: 0xff8a00, emissiveIntensity: 1.2 }), 0.96, 0.5, -0.3));
      return g;
    },
    shoe() {
      const g = group();
      g.add(at(box(0.12, 0.08, 0.3, 0xe7e7e7), 0, 0.04, 0));
      g.add(at(box(0.12, 0.1, 0.12, 0xe7e7e7), 0, 0.09, -0.08));
      g.add(at(box(0.13, 0.025, 0.31, 0x2a2a2a), 0, 0.0125, 0));
      g.scale.setScalar(1.8); return g;
    },
    railing() {
      const g = group(); const steel = { metalness: 0.8, roughness: 0.4 };
      g.add(at(box(2.6, 0.06, 0.06, 0x7d848c, steel), 0, 1.2, 0));
      g.add(at(box(2.6, 0.04, 0.04, 0x7d848c, steel), 0, 0.6, 0));
      for (let i = 0; i <= 6; i++) g.add(at(box(0.05, 1.2, 0.05, 0x7d848c, steel), -1.3 + i * 0.433, 0.6, 0));
      return g;
    },
    tiremarks() {
      const g = group();
      [-0.35, 0.35].forEach(x => { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 1.4), mat(0x3a2e22, { roughness: 1 })); p.rotation.x = -Math.PI / 2; g.add(at(p, x, 0.012, 0)); });
      return g;
    },
    bag() {
      const g = group();
      g.add(at(box(0.36, 0.26, 0.14, 0x5a2a20), 0, 0.13, 0));
      const h = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.015, 8, 20, Math.PI), mat(0x3a1a14)); g.add(at(h, 0, 0.26, 0));
      g.scale.setScalar(1.4); return g;
    },
    papers() {
      const g = group();
      for (let i = 0; i < 5; i++) { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.29), mat(0xece6d6, { side: THREE.DoubleSide })); p.rotation.x = -Math.PI / 2; p.rotation.z = (i - 2) * 0.35; g.add(at(p, (i - 2) * 0.09, 0.02 + i * 0.002, (i % 2) * 0.06)); }
      g.add(at(cyl(0.16, 0.13, 0.36, 0x2f3338), 0.35, 0.18, -0.1));
      g.scale.setScalar(1.6); return g;
    },
    wardrobe() {
      const g = group();
      g.add(at(box(1.4, 2.1, 0.6, 0x4e3a2c), 0, 1.05, 0));
      g.add(at(box(0.02, 2.0, 0.02, 0x2a2018), 0, 1.05, 0.31));
      g.add(at(box(0.5, 0.3, 0.4, 0x2b2f36), -0.35, 2.3, 0));
      return g;
    },
    chess() {
      const g = group();
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.5), [mat(0x3b2a1e), mat(0x3b2a1e), new THREE.MeshStandardMaterial({ map: checker(8), roughness: 0.6 }), mat(0x3b2a1e), mat(0x3b2a1e), mat(0x3b2a1e)]);
      b.castShadow = true; g.add(at(b, 0, 0.45, 0));
      for (let i = 0; i < 7; i++) g.add(at(cyl(0.018, 0.024, 0.07, i % 2 ? 0x111111 : 0xeeeeee), -0.2 + i * 0.065, 0.5, (i % 3 - 1) * 0.12));
      g.add(at(box(0.8, 0.04, 0.8, 0x3d2c20), 0, 0.42, 0));
      [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]].forEach(([x, z]) => g.add(at(box(0.04, 0.42, 0.04, 0x3d2c20), x, 0.21, z)));
      return g;
    },
    jewelry() {
      const g = group();
      g.add(at(box(0.6, 0.5, 0.4, 0x4e3a2c), 0, 0.25, 0));
      g.add(at(box(0.18, 0.08, 0.14, 0x6b2b3b), -0.1, 0.54, 0));
      g.add(at(box(0.16, 0.03, 0.1, 0x2a1d14), 0.15, 0.515, 0.02));
      return g;
    },
    camera() {
      const g = group();
      g.add(at(box(0.16, 0.12, 0.24, 0x1d2126), 0, 2.2, 0));
      const lens = cyl(0.05, 0.05, 0.06, 0x0b0d10); lens.rotation.x = Math.PI / 2; g.add(at(lens, 0, 2.2, 0.14));
      g.add(at(sph(0.015, 0xff2a2a, { emissive: 0xff0000, emissiveIntensity: 1.5 }), 0.05, 2.25, 0.12));
      g.add(at(box(0.04, 0.3, 0.04, 0x1d2126), 0, 2.4, -0.05));
      return g;
    },
    stairs() {
      const g = group();
      for (let i = 0; i < 6; i++) g.add(at(box(1.0, 0.16, 0.28, 0x6d6a64), 0, 0.08 + i * 0.16, -i * 0.28));
      return g;
    },
    desk() {
      const g = group(); const steel = { metalness: 0.7, roughness: 0.35 };
      g.add(at(box(1.4, 0.05, 0.7, 0x80878f, steel), 0, 0.74, 0));
      [[-0.65, -0.3], [0.65, -0.3], [-0.65, 0.3], [0.65, 0.3]].forEach(([x, z]) => g.add(at(box(0.05, 0.74, 0.05, 0x5c636b, steel), x, 0.37, z)));
      g.add(at(sph(0.025, 0x5a0f12), -0.68, 0.76, 0.33));
      return g;
    },
    trashbag() {
      const g = group();
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3, 1), mat(0x111214, { roughness: 0.35 })); m.scale.y = 0.85; m.castShadow = true; g.add(at(m, 0, 0.26, 0));
      return g;
    },
    trace() {
      const g = group();
      const m = new THREE.Mesh(new THREE.TorusKnotGeometry(0.05, 0.006, 48, 6, 2, 3), mat(0xb08a5a)); g.add(at(m, 0, 0.06, 0));
      return g;
    },
    elevator() {
      const g = group();
      g.add(at(box(1.1, 2.2, 1.1, 0x5d646c, { metalness: 0.7, roughness: 0.3 }), 0, 1.1, 0));
      g.add(at(box(0.04, 2.0, 0.9, 0x9aa1a9, { metalness: 0.9, roughness: 0.2 }), 0.57, 1.0, 0));
      const cam = MODELS.camera();
      [...cam.children].forEach(ch => g.add(ch));
      return g;
    },
    marker() {
      const g = group();
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.16), mat(0x9aa1a9, { metalness: 0.3 })); m.castShadow = true; g.add(at(m, 0, 0.2, 0));
      return g;
    }
  };

  const KEYWORDS = [
    ['cuerpo', 'body'], ['copa', 'glass'], ['botella', 'bottle'], ['portatil', 'laptop'], ['ordenador', 'laptop'], ['tablet', 'tablet'],
    ['telefono', 'phone'], ['llavero', 'keys'], ['gancho', 'keys'], ['estanteria', 'shelf'], ['manilla', 'door'], ['puerta', 'door'],
    ['ventana', 'window'], ['cajon', 'drawer'], ['plaza', 'car'], ['coche', 'car'], ['zapatilla', 'shoe'], ['barandilla', 'railing'],
    ['marcas', 'tiremarks'], ['bolso', 'bag'], ['carpeta', 'papers'], ['papelera', 'papers'], ['nota', 'papers'], ['libro', 'papers'],
    ['armario', 'wardrobe'], ['ajedrez', 'chess'], ['cartera', 'jewelry'], ['ascensor', 'elevator'], ['camara', 'camera'], ['escalera', 'stairs'],
    ['escritorio', 'desk'], ['basura', 'trashbag'], ['fibra', 'trace'], ['cabello', 'trace']
  ];
  function modelFor(e) {
    if (e.model && MODELS[e.model]) return e.model;
    const n = norm(e.name);
    const k = KEYWORDS.find(([w]) => n.includes(w));
    return k ? k[1] : 'marker';
  }

  /* ---------- Mobiliario de ambiente según la estancia ---------- */
  const DECOR = [
    ['salon', g => { g.add(at(box(2.0, 0.42, 0.8, 0x2f3a46), 0, 0.21, 0)); g.add(at(box(2.0, 0.5, 0.18, 0x2a3440), 0, 0.55, -0.32)); g.add(at(box(0.9, 0.35, 0.5, 0x3d2c20), 0, 0.17, 1.0)); }],
    ['dormitorio', g => { g.add(at(box(1.6, 0.45, 2.0, 0xd6d2c8), 0, 0.22, 0)); g.add(at(box(1.6, 0.8, 0.08, 0x3d2c20), 0, 0.4, -1.0)); }],
    ['cocina', g => { g.add(at(box(2.4, 0.9, 0.6, 0x9aa0a6, { metalness: 0.4 }), 0, 0.45, 0)); g.add(at(box(0.6, 1.8, 0.6, 0xd8d8d8), 1.5, 0.9, 0)); }],
    ['estudio', g => { g.add(at(box(1.3, 0.05, 0.65, 0x4a3426), 0, 0.74, 0)); g.add(at(box(0.5, 0.5, 0.5, 0x22262c), 0, 0.25, 0.6)); }],
    ['despacho', g => { g.add(at(box(0.5, 0.5, 0.5, 0x22262c), 0, 0.25, 0)); g.add(at(box(0.8, 1.8, 0.35, 0x3d2c20), 0.9, 0.9, 0)); }],
    ['bano', g => { g.add(at(box(1.6, 0.55, 0.75, 0xeeeeee), 0, 0.27, 0)); }],
    ['recibidor', g => { g.add(at(box(0.9, 0.05, 0.3, 0x3d2c20), 0, 0.9, 0)); }],
    ['entrada', g => { g.add(at(box(0.9, 0.05, 0.3, 0x3d2c20), 0, 0.9, 0)); }],
    ['plazas', g => { [-1.6, 1.6].forEach(x => { const c = MODELS.car(); c.position.x = x; c.children.forEach(k => { if (k.material && k.material.color && k.material.color.getHex() === 0xe8e6e0) k.material = mat(x < 0 ? 0x3a4a6a : 0x6a3a3a, { metalness: 0.4, roughness: 0.4 }); }); g.add(c); }); }],
    ['calzada', g => { for (let i = -3; i <= 3; i++) { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.1), mat(0xe9e2cf)); p.rotation.x = -Math.PI / 2; g.add(at(p, i * 1.6, 0.04, 0)); } }],
    ['porteria', g => { g.add(at(box(1.6, 1.0, 0.5, 0x4e3a2c), 0, 0.5, 0)); }],
    ['rellano', g => { g.add(at(box(0.6, 0.02, 0.4, 0x6b2b2b), 0, 0.03, 0)); }]
  ];

  /* ---------- Construcción ---------- */
  function build(c, plan) {
    const scene = new THREE.Scene();
    const bg = cssColor('--bg-2', '#0e1520');
    const accent = cssColor('--accent', '#5fd3df');
    scene.background = bg;
    scene.fog = new THREE.Fog(bg, 24, 46);

    const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x1a1f28, 0.9);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xfff1dc, 1.0);
    dir.position.set(-6, 12, 7);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    Object.assign(dir.shadow.camera, { left: -11, right: 11, top: 8, bottom: -8, near: 1, far: 40 });
    scene.add(dir);
    const rim = new THREE.PointLight(accent.getHex(), 0.35, 30);
    rim.position.set(6, 5, -6);
    scene.add(rim);

    const base = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), mat(0x07090d, { roughness: 1 }));
    base.rotation.x = -Math.PI / 2; base.position.y = -0.04; base.receiveShadow = true;
    scene.add(base);

    const floorTones = [0x3a2f27, 0x2f3540, 0x413a33, 0x343a33, 0x3b3538];
    const hotspots = plan.hotspots.map(h => toWorld(h.x, h.y));
    plan.rooms.forEach(r => {
      const a = toWorld(r.x, r.y), b = toWorld(r.x + r.w, r.y + r.h);
      const w = b.x - a.x, d = b.z - a.z, cx = (a.x + b.x) / 2, cz = (a.z + b.z) / 2;
      const fl = box(w - 0.02, 0.06, d - 0.02, floorTones[hash(r.id) % floorTones.length], { roughness: 0.9 });
      fl.castShadow = false; at(fl, cx, 0, cz); scene.add(fl);
      const wallC = 0x59606b;
      [[cx, a.z, w, 0.08], [cx, b.z, w, 0.08], [a.x, cz, 0.08, d], [b.x, cz, 0.08, d]].forEach(([x, z, ww, dd]) => scene.add(at(box(ww, WALL_H, dd, wallC, { roughness: 0.95 }), x, WALL_H / 2, z)));
      const lbl = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.45), new THREE.MeshBasicMaterial({ map: textTexture(r.name, '#8d97a8'), transparent: true, depthWrite: false }));
      lbl.rotation.x = -Math.PI / 2; at(lbl, a.x + 1.35, 0.04, a.z + 0.4); scene.add(lbl);
      if (/(^|[^a-z])rio([^a-z]|$)|barandilla/.test(norm(r.id + ' ' + r.name))) {
        const water = new THREE.Mesh(new THREE.PlaneGeometry(W + 10, 6), mat(0x0c2836, { roughness: 0.12, metalness: 0.35 }));
        water.rotation.x = -Math.PI / 2; water.position.set(0, -0.02, b.z + 3.05); water.receiveShadow = true; scene.add(water);
      }
      const dec = DECOR.find(([k]) => norm(r.id + ' ' + r.name).includes(k));
      if (dec && w > 2 && d > 2) {
        const corners = [[0.28, 0.3], [0.72, 0.3], [0.28, 0.72], [0.72, 0.72], [0.5, 0.5]].map(([fx, fz]) => ({ x: a.x + w * fx, z: a.z + d * fz }));
        let best = corners[0], bestD = -1;
        corners.forEach(p => { const m = Math.min.apply(null, hotspots.map(h => Math.hypot(h.x - p.x, h.z - p.z)).concat([99])); if (m > bestD) { bestD = m; best = p; } });
        const g = group(); dec[1](g); g.position.set(best.x, 0.03, best.z);
        const s = Math.min(1, w / 4.5, d / 3.2); g.scale.setScalar(Math.max(0.55, s));
        g.traverse(o => { o.raycast = () => {}; });
        scene.add(g);
      }
    });

    const props = {};
    plan.hotspots.forEach(h => {
      const e = c.evidence.find(x => x.id === h.ev);
      const p = toWorld(h.x, h.y);
      const g = MODELS[modelFor(e)]();
      g.position.x += p.x; g.position.z += p.z; g.position.y += 0.03;
      g.userData.ev = e.id;
      g.traverse(o => { o.userData.ev = e.id; });
      const marker = new THREE.Mesh(new THREE.OctahedronGeometry(0.13), new THREE.MeshBasicMaterial({ color: accent }));
      marker.position.set(p.x, 1.9, p.z);
      marker.userData.ev = e.id;
      const ringM = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.62, 40), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
      ringM.rotation.x = -Math.PI / 2; ringM.position.set(p.x, 0.05, p.z); ringM.visible = false;
      scene.add(g); scene.add(marker); scene.add(ringM);
      props[e.id] = { group: g, marker, ring: ringM, pos: new THREE.Vector3(p.x, 0.3, p.z) };
    });
    return { scene, props, lights: { hemi, dir, rim }, bg };
  }

  /* ---------- Efectos de herramientas forenses ---------- */
  let glowTex = null;
  function glowTexture() {
    if (glowTex) return glowTex;
    const cv = document.createElement('canvas'); cv.width = cv.height = 64;
    const g = cv.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.35, 'rgba(255,255,255,0.55)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
    glowTex = new THREE.CanvasTexture(cv);
    return glowTex;
  }
  function glow(color, size) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: glowTexture(), color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    m.raycast = () => {};
    return m;
  }
  function applyFx(fx) {
    if (R.fxGroup) { R.scene.remove(R.fxGroup); R.fxGroup = null; }
    const L = R.lights;
    L.hemi.intensity = 0.9; L.hemi.color.set(0xdfe8ff); L.dir.intensity = 1.0; L.rim.intensity = 0.35;
    R.scene.background = R.bg; R.scene.fog.color = R.bg;
    if (!fx || !R.props[fx.ev] || fx.tool === 'lupa') return;
    const p = R.props[fx.ev].pos;
    const g = new THREE.Group();
    let seed = 0; for (const ch of fx.ev) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    if (fx.tool === 'luminol') {
      L.hemi.intensity = 0.07; L.dir.intensity = 0.04; L.rim.intensity = 0;
      R.scene.background = new THREE.Color(0x02040a); R.scene.fog.color = R.scene.background;
      if (fx.pos) {
        const ang = rnd() * Math.PI * 2;
        for (let i = 0; i < 14; i++) {
          const d = i * 0.32 + rnd() * 0.15;
          const b = glow(0x39a8ff, 0.35 + rnd() * 0.45);
          b.rotation.x = -Math.PI / 2;
          b.position.set(p.x + Math.cos(ang) * d + (rnd() - 0.5) * 0.3, 0.07, p.z + Math.sin(ang) * d + (rnd() - 0.5) * 0.3);
          g.add(b);
        }
        const big = glow(0x39a8ff, 1.6); big.rotation.x = -Math.PI / 2; big.position.set(p.x, 0.065, p.z); g.add(big);
      }
    } else if (fx.tool === 'uv') {
      L.hemi.intensity = 0.25; L.hemi.color.set(0x5a3cff); L.dir.intensity = 0.08; L.rim.intensity = 0;
      R.scene.background = new THREE.Color(0x07031a); R.scene.fog.color = R.scene.background;
      const uvl = new THREE.PointLight(0x8a5cff, 1.6, 6); uvl.position.set(p.x, 1.6, p.z); g.add(uvl);
      if (fx.pos) for (let i = 0; i < 6; i++) { const s = glow(0xe6d8ff, 0.18 + rnd() * 0.2); s.position.set(p.x + (rnd() - 0.5) * 0.5, 0.35 + rnd() * 0.5, p.z + (rnd() - 0.5) * 0.5); s.userData.billboard = true; g.add(s); }
    } else if (fx.tool === 'polvo') {
      const n = 220, pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { pos[i * 3] = p.x + (rnd() - 0.5) * 1.2; pos[i * 3 + 1] = 0.1 + rnd() * 1.1; pos[i * 3 + 2] = p.z + (rnd() - 0.5) * 1.2; }
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xf2f2f2, size: 0.025, transparent: true, opacity: 0.8 }));
      pts.raycast = () => {}; pts.userData.dust = true; g.add(pts);
      if (fx.pos) for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.09, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
        ring.position.set(p.x + (rnd() - 0.5) * 0.4, 0.4 + rnd() * 0.5, p.z + (rnd() - 0.5) * 0.4); ring.userData.billboard = true; ring.raycast = () => {}; g.add(ring);
      }
    }
    R.fxGroup = g;
    R.scene.add(g);
  }

  /* ---------- Cámara orbital propia (ratón, rueda y táctil) ---------- */
  function camUpdate() {
    const o = R.orbit;
    const t = R.target;
    R.camera.position.set(t.x + o.r * Math.sin(o.phi) * Math.sin(o.theta), t.y + o.r * Math.cos(o.phi), t.z + o.r * Math.sin(o.phi) * Math.cos(o.theta));
    R.camera.lookAt(t);
  }

  function bindControls(el) {
    const pts = new Map();
    let down = null, pinch = null;
    el.addEventListener('pointerdown', e => {
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
      if (pts.size === 1) down = { x: e.clientX, y: e.clientY, moved: false, theta: R.orbit.theta, phi: R.orbit.phi };
      else if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), r: R.orbit.r }; down = null; }
      R.autoRotate = false;
    });
    el.addEventListener('pointermove', e => {
      if (pts.has(e.pointerId)) pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch && pts.size === 2) {
        const [a, b] = [...pts.values()];
        R.orbit.r = Math.min(28, Math.max(2, pinch.r * pinch.d / Math.max(20, Math.hypot(a.x - b.x, a.y - b.y))));
        camUpdate(); return;
      }
      if (down) {
        const dx = e.clientX - down.x, dy = e.clientY - down.y;
        if (Math.abs(dx) + Math.abs(dy) > 4) down.moved = true;
        if (down.moved) {
          R.orbit.theta = down.theta - dx * 0.008;
          R.orbit.phi = Math.min(1.42, Math.max(0.18, down.phi - dy * 0.006));
          camUpdate();
        }
      } else hover(e);
    });
    const up = e => {
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (down && !down.moved && e.type === 'pointerup') pick(e);
      if (pts.size === 0) down = null;
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', () => { if (R.tip) R.tip.hidden = true; });
    el.addEventListener('wheel', e => {
      e.preventDefault();
      R.orbit.r = Math.min(28, Math.max(2, R.orbit.r * (e.deltaY > 0 ? 1.1 : 0.9)));
      R.autoRotate = false;
      camUpdate();
    }, { passive: false });
  }

  function raycast(e) {
    const rect = R.renderer.domElement.getBoundingClientRect();
    const m = new THREE.Vector2((e.clientX - rect.left) / rect.width * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    R.ray.setFromCamera(m, R.camera);
    const objs = [];
    Object.values(R.props).forEach(p => { objs.push(p.group, p.marker); });
    const hit = R.ray.intersectObjects(objs, true).find(h => h.object.userData.ev);
    return hit ? hit.object.userData.ev : null;
  }
  function pick(e) {
    const ev = raycast(e);
    if (ev && R.onPick) R.onPick(ev);
  }
  let lastHover = 0;
  function hover(e) {
    const now = performance.now();
    if (now - lastHover < 50) return;
    lastHover = now;
    const ev = raycast(e);
    R.renderer.domElement.style.cursor = ev ? 'pointer' : 'grab';
    if (!R.tip) return;
    if (!ev) { R.tip.hidden = true; return; }
    const item = R.c.evidence.find(x => x.id === ev);
    const rect = R.container.getBoundingClientRect();
    R.tip.textContent = item.id + ' · ' + item.name;
    R.tip.style.left = (e.clientX - rect.left + 14) + 'px';
    R.tip.style.top = (e.clientY - rect.top + 10) + 'px';
    R.tip.hidden = false;
  }

  /* ---------- Bucle ---------- */
  function loop(t) {
    if (!R || !R.container || !R.container.isConnected) { if (R) R.raf = null; return; }
    R.raf = requestAnimationFrame(loop);
    if (document.hidden) return;
    const k = 0.12;
    if (R.goal) {
      R.target.lerp(R.goal.target, k);
      R.orbit.r += (R.goal.r - R.orbit.r) * k;
      if (R.target.distanceTo(R.goal.target) < 0.01 && Math.abs(R.goal.r - R.orbit.r) < 0.02) R.goal = null;
    }
    if (R.autoRotate) R.orbit.theta += 0.004;
    camUpdate();
    const s = t / 1000;
    Object.values(R.props).forEach((p, i) => {
      p.marker.position.y = 1.9 + Math.sin(s * 2 + i) * 0.08;
      p.marker.rotation.y = s * 1.5;
      if (p.ring.visible) p.ring.material.opacity = 0.55 + Math.sin(s * 4) * 0.3;
    });
    if (R.fxGroup) R.fxGroup.children.forEach((o, i) => {
      if (o.userData.billboard) o.quaternion.copy(R.camera.quaternion);
      if (o.material && o.material.blending === THREE.AdditiveBlending) o.material.opacity = 0.65 + Math.sin(s * 2.2 + i) * 0.3;
      if (o.userData.dust) o.rotation.y = s * 0.3;
    });
    R.renderer.render(R.scene, R.camera);
  }

  function resize() {
    if (!R || !R.container) return;
    const w = R.container.clientWidth, h = R.container.clientHeight;
    if (!w || !h) return;
    R.renderer.setSize(w, h, false);
    R.camera.aspect = w / h;
    R.camera.updateProjectionMatrix();
  }

  /* opts: { c, cs, planId, sel, inspect, onPick } */
  function mount(container, opts) {
    if (!available()) return false;
    if (!R) {
      const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.className = 'scene3d-canvas';
      R = { renderer, camera: new THREE.PerspectiveCamera(42, 1.6, 0.1, 120), ray: new THREE.Raycaster(), orbit: { r: 17, theta: -0.55, phi: 0.95 }, target: new THREE.Vector3(0, 0, 0), raf: null };
      bindControls(renderer.domElement);
      window.addEventListener('resize', resize);
    }
    const theme = getComputedStyle(document.body).getPropertyValue('--accent').trim();
    const key = opts.c.id + '|' + opts.planId + '|' + theme;
    const plan = opts.c.scene.plans.find(p => p.id === opts.planId);
    if (R.key !== key) {
      if (R.scene) R.scene.traverse(o => { if (o.geometry) o.geometry.dispose(); });
      const b = build(opts.c, plan);
      R.scene = b.scene; R.props = b.props; R.lights = b.lights; R.bg = b.bg; R.key = key; R.fxKey = null; R.fxGroup = null;
      R.orbit = { r: 17, theta: -0.55, phi: 0.95 }; R.target.set(0, 0, 0); R.goal = null; R.sel = null; R.inspect = false;
    }
    R.c = opts.c; R.onPick = opts.onPick; R.container = container;
    container.insertBefore(R.renderer.domElement, container.firstChild);
    R.tip = container.querySelector('.s3-tip');
    Object.entries(R.props).forEach(([id, p]) => {
      p.marker.visible = !opts.cs.examined[id];
      p.ring.visible = opts.sel === id;
    });
    if (opts.sel !== R.sel || !!opts.inspect !== R.inspect) {
      const p = R.props[opts.sel];
      if (p) R.goal = { target: p.pos.clone(), r: opts.inspect ? 2.6 : Math.min(R.orbit.r, 8.5) };
      else if (R.sel) R.goal = { target: new THREE.Vector3(0, 0, 0), r: 17 };
      R.autoRotate = !!(opts.inspect && p);
      R.sel = opts.sel; R.inspect = !!opts.inspect;
    }
    const fxKey = opts.fx ? opts.fx.ev + ':' + opts.fx.tool + ':' + opts.fx.pos : '';
    if (fxKey !== R.fxKey) { applyFx(opts.fx); R.fxKey = fxKey; }
    resize();
    camUpdate();
    if (!R.raf) R.raf = requestAnimationFrame(loop);
    return true;
  }

  function resetView() {
    if (!R) return;
    R.goal = { target: new THREE.Vector3(0, 0, 0), r: 17 };
    R.orbit.phi = 0.95; R.autoRotate = false;
  }

  /* Foto de la evidencia para el muro: el modelo 3D sobre fondo de estudio, con regla. */
  const shots = {};
  let shotR = null;
  function snapshot(e) {
    if (!available()) return null;
    const key = modelFor(e);
    if (shots[key]) return shots[key];
    try {
      if (!shotR) {
        shotR = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        shotR.setPixelRatio(1); shotR.setSize(240, 168, false);
      }
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#d9d6cf');
      scene.add(new THREE.HemisphereLight('#ffffff', '#8a8378', 0.85));
      const dl = new THREE.DirectionalLight('#ffffff', 0.7); dl.position.set(2, 4, 3); scene.add(dl);
      const g = MODELS[key]();
      g.traverse(o => { if (o.userData) delete o.userData.ev; });
      scene.add(g);
      const bb = new THREE.Box3().setFromObject(g), size = bb.getSize(new THREE.Vector3()), ctr = bb.getCenter(new THREE.Vector3());
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: '#cfcbc2', roughness: 1 }));
      floor.rotation.x = -Math.PI / 2; floor.position.y = bb.min.y - 0.001; scene.add(floor);
      const r = Math.max(size.x, size.y, size.z) * 1.35 + 0.05;
      const cam = new THREE.PerspectiveCamera(35, 240 / 168, 0.01, 100);
      cam.position.set(ctr.x + r * 0.75, ctr.y + r * 0.7, ctr.z + r * 0.95); cam.lookAt(ctr);
      shotR.render(scene, cam);
      shots[key] = shotR.domElement.toDataURL('image/jpeg', 0.82);
      scene.traverse(o => { if (o.geometry) o.geometry.dispose(); });
      return shots[key];
    } catch (err) { return null; }
  }

  E0.scene3d = { available, mount, resetView, modelFor, snapshot };
})();
