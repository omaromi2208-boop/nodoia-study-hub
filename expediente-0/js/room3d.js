/* EXPEDIENTE 0 — sala de interrogatorio en 3D (Three.js r128).
 * Mesa, sillas, lámpara colgante, espejo unidireccional y la persona interrogada,
 * con el mismo aspecto que su retrato. Los gestos dependen solo de su carácter
 * (miedo, autocontrol, confianza), nunca de si miente: no delatan la solución.
 * También define E0.appearance, que comparten el retrato 2D y la figura 3D. */
(function () {
  /* ---------- Aspecto de cada persona (determinista) ---------- */
  function appearance(p) {
    let h = 0; for (const ch of p.id + p.name) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
    const pick = (arr, k) => arr[(h >>> k) % arr.length];
    const old = p.age >= 55;
    return {
      h, old,
      skin: pick(['#f1d3b8', '#e2b896', '#c99470', '#a8734f', '#7d5236', '#5b3a26'], 1),
      hair: old ? pick(['#b9b5ad', '#d6d2ca', '#8f8a82'], 3) : pick(['#1d1612', '#3b2617', '#6b4423', '#a8783f', '#2b2b2b', '#5a2e1c'], 3),
      cloth: pick(['#2f3a4a', '#4a2f2f', '#2f4a3c', '#3c3c46', '#4a432f', '#1f2833'], 5),
      style: (h >>> 7) % 4,
      glasses: (h >>> 9) % 3 === 0,
      beard: (h >>> 11) % 5 === 0
    };
  }
  window.E0 = window.E0 || {};
  E0.appearance = appearance;

  let RR = null;
  const available = () => !!(E0.scene3d && E0.scene3d.available());

  /* ---------- Piezas ---------- */
  const mats = {};
  function mat(color, opts) {
    const k = color + JSON.stringify(opts || {});
    if (!mats[k]) mats[k] = new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.8, metalness: 0.05 }, opts || {}));
    return mats[k];
  }
  function mesh(geo, color, opts) { const m = new THREE.Mesh(geo, mat(color, opts)); m.castShadow = true; m.receiveShadow = true; return m; }
  const box = (w, h, d, c, o) => mesh(new THREE.BoxGeometry(w, h, d), c, o);
  const cyl = (a, b, h, c, s, o) => mesh(new THREE.CylinderGeometry(a, b, h, s || 16), c, o);
  const sph = (r, c, o) => mesh(new THREE.SphereGeometry(r, 20, 14), c, o);
  const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
  /* Cilindro entre dos puntos (brazos). */
  function limb(a, b, r, color) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
    const m = cyl(r, r * 0.9, A.distanceTo(B), color, 12);
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
    return m;
  }
  function canvasTex(w, h, draw) {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    draw(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 4; return t;
  }

  /* ---------- Sala ---------- */
  function buildRoom() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#07090c');
    scene.fog = new THREE.Fog('#07090c', 5, 11);
    const concrete = canvasTex(256, 256, (g, w, h) => {
      g.fillStyle = '#4a4f55'; g.fillRect(0, 0, w, h);
      for (let i = 0; i < 1400; i++) { g.fillStyle = 'rgba(' + (Math.random() < 0.5 ? '0,0,0' : '255,255,255') + ',' + (Math.random() * 0.06) + ')'; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
    });
    concrete.wrapS = concrete.wrapT = THREE.RepeatWrapping; concrete.repeat.set(3, 2);
    const wallMat = new THREE.MeshStandardMaterial({ color: '#59605f', map: concrete, roughness: 0.95 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshStandardMaterial({ color: '#2a2c30', roughness: 0.9 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const wall = (w, h, x, y, z, ry) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat); m.position.set(x, y, z); m.rotation.y = ry; m.receiveShadow = true; scene.add(m); return m; };
    wall(6, 3, 0, 1.5, -2.2, 0);
    wall(5, 3, -2.4, 1.5, 0, Math.PI / 2);
    wall(5, 3, 2.4, 1.5, 0, -Math.PI / 2);
    // zócalo
    scene.add(at(box(4.8, 0.12, 0.03, '#1d2024'), 0, 0.06, -2.18));
    // espejo unidireccional (pared izquierda)
    const mirror = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.1), new THREE.MeshStandardMaterial({ color: '#141a22', roughness: 0.08, metalness: 0.95 }));
    mirror.position.set(-2.38, 1.55, -0.5); mirror.rotation.y = Math.PI / 2; scene.add(mirror);
    const frame = at(box(0.04, 1.2, 2.3, '#24282e', { metalness: 0.6, roughness: 0.4 }), -2.39, 1.55, -0.5); scene.add(frame);
    const sheen = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.1), new THREE.MeshBasicMaterial({
      map: canvasTex(256, 128, (g, w, h) => { const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.45, 'rgba(255,255,255,0.08)'); gr.addColorStop(0.55, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); }),
      transparent: true, depthWrite: false
    }));
    sheen.position.set(-2.37, 1.55, -0.5); sheen.rotation.y = Math.PI / 2; scene.add(sheen);
    // puerta (pared derecha)
    scene.add(at(box(0.05, 2.05, 0.95, '#3a3530'), 2.37, 1.03, -1.1));
    scene.add(at(box(0.06, 0.32, 0.26, '#10151b', { metalness: 0.4, roughness: 0.2 }), 2.36, 1.6, -1.1));
    scene.add(at(sph(0.035, '#8b8f94', { metalness: 0.8, roughness: 0.3 }), 2.32, 1.0, -0.72));
    // reloj de pared
    const clock = new THREE.Group();
    clock.add(at(cyl(0.17, 0.17, 0.04, '#d8d4ca', 28), 0, 0, 0));
    clock.children[0].rotation.x = Math.PI / 2;
    const hand1 = at(box(0.012, 0.11, 0.01, '#111'), 0, 0.05, 0.025), hand2 = at(box(0.01, 0.14, 0.01, '#111'), 0, 0.07, 0.03);
    const hh = new THREE.Group(); hh.add(hand1); hh.position.z = 0.0; hh.rotation.z = -2.1;
    const mh = new THREE.Group(); mh.add(hand2); mh.rotation.z = -0.6;
    clock.add(hh, mh); clock.position.set(0.9, 2.15, -2.17); scene.add(clock);
    // cámara de la sala con piloto
    const cam = new THREE.Group();
    cam.add(at(box(0.16, 0.09, 0.09, '#1b1e22'), 0, 0, 0));
    const camLed = at(sph(0.012, '#ff3b3b', { emissive: '#ff2020', emissiveIntensity: 1 }), 0.06, 0.02, 0.05);
    cam.add(camLed); cam.position.set(2.2, 2.55, -2.05); cam.rotation.y = -0.7; scene.add(cam);

    // mesa
    const table = new THREE.Group();
    table.add(at(box(1.7, 0.05, 0.95, '#8b9096', { metalness: 0.55, roughness: 0.35 }), 0, 0.75, 0));
    [[-0.78, -0.4], [0.78, -0.4], [-0.78, 0.4], [0.78, 0.4]].forEach(([x, z]) => table.add(at(cyl(0.025, 0.025, 0.73, '#5d6268', 10, { metalness: 0.6 }), x, 0.37, z)));
    table.add(at(cyl(0.05, 0.05, 0.03, '#b9bec4', 16, { metalness: 0.9 }), 0.0, 0.78, -0.3)); // argolla
    scene.add(table);
    // objetos de la mesa
    const folder = at(box(0.32, 0.02, 0.24, '#b48a4a'), 0.42, 0.785, 0.22); folder.rotation.y = 0.15; scene.add(folder);
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.05), new THREE.MeshBasicMaterial({ map: canvasTex(256, 64, (g, w, h) => { g.fillStyle = '#efe6d2'; g.fillRect(0, 0, w, h); g.fillStyle = '#7a1f1f'; g.font = '700 30px monospace'; g.fillText('EXPEDIENTE', 22, 42); }) }));
    label.rotation.x = -Math.PI / 2; label.rotation.z = 0.15; label.position.set(0.42, 0.797, 0.22); scene.add(label);
    const cup = at(cyl(0.035, 0.03, 0.09, '#e8e4dc', 16), -0.55, 0.82, 0.18); scene.add(cup);
    const recorder = at(box(0.14, 0.03, 0.07, '#22262b'), 0.05, 0.79, 0.12); scene.add(recorder);
    const recLed = at(sph(0.008, '#ff3333', { emissive: '#ff1a1a', emissiveIntensity: 1 }), 0.1, 0.81, 0.12); scene.add(recLed);
    // sillas
    function chair(z, rotY) {
      const g = new THREE.Group();
      g.add(at(box(0.46, 0.04, 0.44, '#2c3036', { metalness: 0.4 }), 0, 0.46, 0));
      g.add(at(box(0.46, 0.5, 0.04, '#2c3036', { metalness: 0.4 }), 0, 0.72, -0.21));
      [[-0.2, -0.19], [0.2, -0.19], [-0.2, 0.19], [0.2, 0.19]].forEach(([x, zz]) => g.add(at(cyl(0.015, 0.015, 0.45, '#5d6268', 8, { metalness: 0.6 }), x, 0.22, zz)));
      g.position.z = z; g.rotation.y = rotY; scene.add(g); return g;
    }
    chair(-0.82, 0);
    chair(1.0, Math.PI);

    // luces
    scene.add(new THREE.HemisphereLight('#8aa0b8', '#1c1712', 0.38));
    const lamp = new THREE.Group();
    lamp.position.set(0, 2.9, 0.12);
    lamp.add(at(cyl(0.006, 0.006, 0.95, '#111', 6), 0, -0.47, 0));
    const shade = at(cyl(0.07, 0.3, 0.2, '#1f2a24', 24, { metalness: 0.5, roughness: 0.5, side: THREE.DoubleSide }), 0, -1.0, 0);
    shade.castShadow = false; lamp.add(shade);
    lamp.add(at(sph(0.06, '#fff4d6', { emissive: '#ffe9b0', emissiveIntensity: 2 }), 0, -1.08, 0));
    const spot = new THREE.SpotLight('#ffe7bd', 1.25, 6, 0.8, 0.6, 1.4);
    spot.position.set(0, -1.05, 0);
    spot.castShadow = true; spot.shadow.mapSize.set(1024, 1024); spot.shadow.bias = -0.0005;
    lamp.add(spot);
    scene.add(lamp);
    spot.target.position.set(0, 0.75, -0.2); scene.add(spot.target);
    const fill = new THREE.PointLight('#5f86a8', 0.35, 6); fill.position.set(-2, 1.6, 1.5); scene.add(fill);
    // luz suave desde el lado de quien interroga, para que se lea la cara
    const key = new THREE.DirectionalLight('#dfe6ee', 0.5); key.position.set(0.6, 1.9, 2.4); key.target.position.set(0, 1.4, -0.8);
    scene.add(key, key.target);
    return { scene, lamp, recLed, camLed, mh };
  }

  /* ---------- Persona sentada ---------- */
  function buildPerson(p) {
    const A = appearance(p);
    const H = p.hidden || {};
    const g = new THREE.Group();
    g.position.set(0, 0, -0.8);
    const torso = new THREE.Group(); g.add(torso);
    // tronco con hombros redondeados (perfil de revolución)
    const prof = [[0.001, 0], [0.15, 0], [0.165, 0.12], [0.18, 0.3], [0.205, 0.44], [0.2, 0.5], [0.15, 0.56], [0.06, 0.6], [0.001, 0.6]].map(([x, y]) => new THREE.Vector2(x, y));
    const body = mesh(new THREE.LatheGeometry(prof, 24), A.cloth); body.scale.set(1.18, 1, 0.66); at(body, 0, 0.7, 0); torso.add(body);
    // cuello de la camisa
    const collar = cyl(0.07, 0.085, 0.05, A.cloth, 16); torso.add(at(collar, 0, 1.3, 0));
    torso.add(at(cyl(0.05, 0.055, 0.1, A.skin, 12), 0, 1.31, 0));
    // brazos sobre la mesa
    const arms = new THREE.Group(); torso.add(arms);
    [-1, 1].forEach(sx => {
      arms.add(at(sph(0.062, A.cloth), sx * 0.215, 1.17, 0));
      arms.add(limb([sx * 0.225, 1.17, 0], [sx * 0.255, 0.93, 0.17], 0.055, A.cloth));
      arms.add(at(sph(0.05, A.cloth), sx * 0.255, 0.93, 0.17));
      arms.add(limb([sx * 0.255, 0.93, 0.17], [sx * 0.13, 0.8, 0.44], 0.046, A.cloth));
      const wrist = at(cyl(0.036, 0.036, 0.03, A.skin, 12), sx * 0.125, 0.8, 0.455); wrist.rotation.x = Math.PI / 2; arms.add(wrist);
    });
    const handL = at(sph(0.045, A.skin), -0.11, 0.8, 0.5), handR = at(sph(0.045, A.skin), 0.11, 0.8, 0.5);
    handL.scale.set(1, 0.6, 1.3); handR.scale.set(1, 0.6, 1.3);
    arms.add(handL, handR);
    // cabeza
    const head = new THREE.Group(); head.position.set(0, 1.47, 0.01); torso.add(head);
    const skull = sph(0.13, A.skin); skull.scale.set(0.9, 1.08, 0.95); head.add(skull);
    [-1, 1].forEach(s => { const ear = sph(0.025, A.skin); ear.scale.set(0.5, 1, 0.8); head.add(at(ear, s * 0.118, 0, 0)); });
    const eyes = new THREE.Group(); head.add(eyes);
    [-1, 1].forEach(s => {
      eyes.add(at(sph(0.02, '#f3efe8', { roughness: 0.3 }), s * 0.042, 0.018, 0.105));
      eyes.add(at(sph(0.011, '#1a1612', { roughness: 0.2 }), s * 0.042, 0.018, 0.122));
      const brow = at(box(0.05, 0.009, 0.012, A.old ? '#8f8a82' : A.hair), s * 0.044, 0.056, 0.115);
      brow.rotation.z = -s * 0.08; head.add(brow);
    });
    const nose = sph(0.02, A.skin); nose.scale.set(0.8, 1.2, 1); head.add(at(nose, 0, -0.012, 0.125));
    const mouth = at(box(0.052, 0.008, 0.012, '#5b2f2a'), 0, -0.058, 0.122); head.add(mouth);
    // pelo
    const hairMat = { roughness: 0.95 };
    const capLen = [0.42, 0.5, 0.46, 0.36][A.style];
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.138, 26, 16, 0, Math.PI * 2, 0, Math.PI * capLen), mat(A.hair, hairMat));
    cap.scale.set(0.92, 1.08, 0.98); cap.rotation.x = -0.32; cap.castShadow = true; head.add(cap);
    if (A.style === 1) { const back = box(0.24, 0.32, 0.06, A.hair, hairMat); head.add(at(back, 0, -0.12, -0.1)); }
    if (A.style === 2) [-1, 1].forEach(s => head.add(at(box(0.02, 0.09, 0.08, A.hair, hairMat), s * 0.118, 0.02, -0.01)));
    if (A.beard) {
      const beard = new THREE.Mesh(new THREE.SphereGeometry(0.136, 22, 12, Math.PI * 0.1, Math.PI * 0.8, Math.PI * 0.64, Math.PI * 0.24), mat(A.hair, hairMat));
      beard.scale.set(0.92, 1.08, 0.97); head.add(beard);
    }
    if (A.glasses) {
      const gm = { metalness: 0.6, roughness: 0.3 };
      [-1, 1].forEach(s => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.0045, 6, 20), mat('#1a1d22', gm)); head.add(at(r, s * 0.044, 0.018, 0.128)); });
      head.add(at(box(0.026, 0.004, 0.004, '#1a1d22', gm), 0, 0.022, 0.13));
    }
    const fear = (H.miedo || 50) / 100, self = (H.autocontrol || 50) / 100, conf = (H.confianza || 50) / 100;
    return {
      g, torso, head, eyes, mouth, handR, handL,
      traits: { fear, self, conf },
      breath: 1.5 + fear * 1.6,
      sway: 0.03 + (1 - self) * 0.07,
      fidget: self < 0.5,
      avert: fear > 0.55,
      nextBlink: 1.5, blinkT: 0, nextAvert: 4 + (A.h % 5), avertT: 0
    };
  }

  /* ---------- Cámara ---------- */
  function camUpdate() {
    const o = RR.orbit;
    const t = new THREE.Vector3(0, 1.12, -0.6);
    RR.camera.position.set(t.x + o.r * Math.sin(o.yaw) * Math.cos(o.pitch), t.y + o.r * Math.sin(o.pitch), t.z + o.r * Math.cos(o.yaw) * Math.cos(o.pitch));
    RR.camera.lookAt(t);
  }
  function bindControls(el) {
    let down = null;
    el.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, yaw: RR.orbit.yaw, pitch: RR.orbit.pitch }; try { el.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ } });
    el.addEventListener('pointermove', e => {
      if (!down) return;
      RR.orbit.yaw = Math.max(-0.75, Math.min(0.75, down.yaw - (e.clientX - down.x) * 0.006));
      RR.orbit.pitch = Math.max(0.02, Math.min(0.5, down.pitch + (e.clientY - down.y) * 0.004));
    });
    const up = () => { down = null; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('wheel', e => { e.preventDefault(); RR.orbit.r = Math.max(1.3, Math.min(3.6, RR.orbit.r * (e.deltaY > 0 ? 1.08 : 0.92))); }, { passive: false });
  }

  /* ---------- Animación ---------- */
  const ease = x => x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x);
  function animate(s, dt) {
    const P = RR.person; if (!P) return;
    const T = P.traits;
    // la tensión (carácter + presión del interrogatorio) acelera la respiración y los gestos
    RR.tensionNow += ((RR.tension || 0) - RR.tensionNow) * Math.min(1, dt * 1.5);
    const tn = RR.tensionNow;
    const br = P.breath * (1 + tn * 0.9);
    RR.breathPh = (RR.breathPh || 0) + dt * br;
    P.torso.scale.y = 1 + Math.sin(RR.breathPh) * (0.012 + tn * 0.01);
    P.torso.position.y = Math.sin(RR.breathPh) * 0.004;
    const sway = P.sway * (1 + tn * 1.2);
    let yaw = Math.sin(s * 0.45) * sway, pitch = Math.sin(s * 0.31) * sway * 0.4;
    // mirar hacia otro lado (rasgo de carácter, no indicio de mentira)
    if (P.avert || tn > 0.7) {
      P.nextAvert -= dt;
      if (P.nextAvert <= 0) { P.avertT = 1.4; P.nextAvert = 5 + Math.random() * 5; }
      if (P.avertT > 0) { P.avertT -= dt; yaw += Math.sin(Math.min(1, P.avertT / 1.4) * Math.PI) * 0.35; pitch += 0.08 * Math.sin(Math.min(1, P.avertT / 1.4) * Math.PI); }
    }
    // reacción a una confrontación
    let lean = 0;
    if (RR.react > 0) {
      RR.react -= dt;
      const k = Math.sin(ease(1 - RR.react / 2.2) * Math.PI);
      lean = (T.conf > 0.6 ? 0.08 : -0.14) * (1.2 - T.self * 0.7) * k;
      yaw += (1 - T.self) * 0.18 * k;
    }
    P.torso.rotation.x = lean;
    // hablar
    const talking = RR.talkUntil > s;
    if (talking) { pitch += Math.sin(s * 5.5) * 0.025; P.mouth.scale.y = 1 + Math.abs(Math.sin(s * 13)) * 3.2 * (0.6 + 0.4 * Math.sin(s * 3.1)); }
    else P.mouth.scale.y += (1 - P.mouth.scale.y) * 0.3;
    P.head.rotation.y = yaw; P.head.rotation.x = pitch;
    // parpadeo
    P.nextBlink -= dt;
    if (P.nextBlink <= 0) { P.blinkT = 0.13; P.nextBlink = (1.2 + Math.random() * 3.5) * (1.3 - T.fear * 0.6); }
    if (P.blinkT > 0) P.blinkT -= dt;
    P.eyes.scale.y = P.blinkT > 0 ? 0.12 : 1;
    // dedos inquietos
    if (P.fidget || tn > 0.55) { const burst = Math.sin(s * 0.7) > 0.3; P.handR.position.y = 0.8 + (burst ? Math.abs(Math.sin(s * 9)) * 0.012 : 0); }
    // prueba sobre la mesa
    if (RR.card) {
      const k = ease(Math.min(1, (s - RR.card.t0) / 0.7));
      RR.card.mesh.position.z = 0.75 - k * 0.55;
      RR.card.mesh.rotation.z = (1 - k) * 0.5 - 0.06;
      RR.card.mesh.position.y = 0.79 + (1 - k) * 0.06;
    }
    if (RR.lawyerFig) { const L = RR.lawyerFig; L.torso.scale.y = 1 + Math.sin(s * 1.4) * 0.008; L.head.rotation.y = -0.25 + Math.sin(s * 0.3) * 0.08; }
    // texto de la burbuja
    if (RR.typing && RR.bubble && RR.bubble.isConnected) {
      const tp = RR.typing, n = Math.min(tp.text.length, Math.ceil((s - tp.start) * tp.cps));
      if (n !== tp.n) { tp.n = n; RR.bubble.textContent = tp.text.slice(0, n); }
      if (n >= tp.text.length) RR.typing = null;
    }
  }
  function loop(t) {
    if (!RR || !RR.container || !RR.container.isConnected) { if (RR) RR.raf = null; return; }
    RR.raf = requestAnimationFrame(loop);
    if (document.hidden) return;
    const s = t / 1000, dt = Math.min(0.05, s - (RR.last || s)); RR.last = s;
    RR.clock = s;
    RR.room.lamp.rotation.z = Math.sin(s * 0.6) * 0.035;
    RR.room.lamp.rotation.x = Math.sin(s * 0.43) * 0.02;
    const on = Math.sin(s * 3) > 0;
    RR.room.recLed.material.emissiveIntensity = on ? 1.4 : 0.1;
    RR.room.camLed.material.emissiveIntensity = Math.sin(s * 1.3) > 0 ? 1.2 : 0.2;
    RR.room.mh.rotation.z = -0.6 - s * 0.002;
    animate(s, dt);
    camUpdate();
    RR.renderer.render(RR.scene, RR.camera);
  }
  function resize() {
    if (!RR || !RR.container) return;
    const w = RR.container.clientWidth, h = RR.container.clientHeight;
    if (!w || !h) return;
    RR.renderer.setSize(w, h, false);
    RR.camera.aspect = w / h;
    RR.camera.fov = w / h < 1.2 ? 52 : 40;
    RR.camera.updateProjectionMatrix();
  }

  /* opts: { c, person, line: {q, a, kind}, lineNo } */
  function mount(container, opts) {
    if (!available()) return false;
    if (!RR) {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.className = 'scene3d-canvas';
      const room = buildRoom();
      RR = { renderer, room, scene: room.scene, camera: new THREE.PerspectiveCamera(40, 1.6, 0.05, 30), orbit: { yaw: 0, pitch: 0.12, r: 2.35 }, talkUntil: 0, react: 0, raf: null, tension: 0, tensionNow: 0 };
      bindControls(renderer.domElement);
      window.addEventListener('resize', resize);
    }
    const key = opts.c.id + '|' + opts.person.id;
    if (RR.key !== key) {
      if (RR.person) { RR.scene.remove(RR.person.g); RR.person.g.traverse(o => { if (o.geometry) o.geometry.dispose(); }); }
      RR.person = buildPerson(opts.person);
      RR.scene.add(RR.person.g);
      RR.key = key; RR.lineNo = opts.lineNo; RR.typing = null; RR.talkUntil = 0; RR.react = 0; RR.tensionNow = opts.tension || 0;
      placeCard(null);
      RR.orbit = { yaw: 0, pitch: 0.12, r: 2.35 };
    }
    RR.container = container;
    container.insertBefore(RR.renderer.domElement, container.firstChild);
    RR.bubble = container.querySelector('.room-bubble-a');
    if (opts.line && opts.lineNo > RR.lineNo) {
      const s = RR.clock || 0;
      const fast = 0.85 + (RR.person.traits.fear) * 0.45;
      RR.typing = { text: opts.line.a, start: s, cps: 34 * fast, n: -1 };
      RR.talkUntil = s + Math.min(9, 0.6 + opts.line.a.length / (16 * fast));
      if (opts.line.kind === 'c') { RR.react = 2.2; placeCard(opts.line.q.replace(/^Le muestras:\s*/, '')); }
      if (RR.bubble) RR.bubble.textContent = '';
    } else if (RR.typing && RR.bubble) RR.bubble.textContent = RR.typing.text.slice(0, Math.max(0, RR.typing.n));
    RR.lineNo = opts.lineNo;
    RR.tension = opts.tension || 0;
    setLawyer(opts.lawyer === 'presente');
    resize();
    camUpdate();
    if (!RR.raf) RR.raf = requestAnimationFrame(loop);
    return true;
  }
  /* Ficha de la prueba que se pone sobre la mesa al confrontar. */
  function placeCard(text) {
    if (RR.card) { RR.scene.remove(RR.card.mesh); RR.card.mesh.geometry.dispose(); RR.card.mesh.material.map.dispose(); RR.card.mesh.material.dispose(); RR.card = null; }
    if (!text) return;
    const tex = canvasTex(512, 360, (g, w, h) => {
      g.fillStyle = '#f2ece0'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#7a1f1f'; g.font = '700 30px monospace'; g.fillText('PRUEBA', 28, 52);
      g.strokeStyle = '#7a1f1f'; g.lineWidth = 3; g.strokeRect(14, 14, w - 28, h - 28);
      g.fillStyle = '#1d1d1d'; g.font = '500 30px sans-serif';
      const words = text.split(/\s+/); let line = '', y = 110;
      for (const wd of words) { if (g.measureText(line + wd).width > w - 70) { g.fillText(line, 28, y); y += 40; line = ''; if (y > h - 40) break; } line += wd + ' '; }
      if (y <= h - 40) g.fillText(line, 28, y);
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.21), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }));
    mesh.rotation.x = -Math.PI / 2; mesh.receiveShadow = true;
    mesh.position.set(-0.08, 0.79, 0.75);
    RR.scene.add(mesh);
    RR.card = { mesh, t0: RR.clock || 0 };
  }
  /* Abogado sentado al lado cuando la persona vuelve a declarar asistida. */
  function setLawyer(on) {
    if (on && !RR.lawyerFig) {
      const L = buildPerson({ id: 'letrado-' + RR.key, name: 'Letrado', age: 52, hidden: { miedo: 10, autocontrol: 95, confianza: 70 } });
      L.g.position.set(0.68, 0, -0.85); L.g.rotation.y = -0.35;
      L.g.add(at(box(0.46, 0.04, 0.44, '#2c3036', { metalness: 0.4 }), 0, 0.46, -0.02), at(box(0.46, 0.5, 0.04, '#2c3036', { metalness: 0.4 }), 0, 0.72, -0.23));
      const pad = at(box(0.22, 0.012, 0.3, '#e9e4d8'), 0.05, 0.786, 0.32); pad.rotation.y = 0.2; L.g.add(pad);
      RR.scene.add(L.g); RR.lawyerFig = L;
    } else if (!on && RR.lawyerFig) {
      RR.scene.remove(RR.lawyerFig.g); RR.lawyerFig.g.traverse(o => { if (o.geometry) o.geometry.dispose(); }); RR.lawyerFig = null;
    }
  }

  /* Mueve la boca mientras suena la voz sintetizada. */
  function talk(seconds) { if (RR) RR.talkUntil = (RR.clock || 0) + seconds; }
  function stopTalk() { if (RR) RR.talkUntil = 0; }

  E0.room3d = { available, mount, talk, stopTalk };
})();
