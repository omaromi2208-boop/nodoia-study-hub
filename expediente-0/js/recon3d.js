/* EXPEDIENTE 0 — reconstrucción de movimientos en una maqueta 3D.
 * El jugador propone los pasos de una persona (hora, lugar, a pie o en coche). Se
 * comprueba si cada desplazamiento es físicamente posible y si choca con algún
 * registro objetivo; la maqueta muestra los lugares y una figura que recorre la ruta. */
(function () {
  const SPEED = { pie: 6, coche: 80 };
  /* Comprueba los pasos. Devuelve una lista de avisos por tramo y por paso. */
  function check(c, cs, pid, steps) {
    const EN = E0.engine, out = [];
    const sorted = steps.map((s, i) => Object.assign({ i }, s)).filter(s => s.time && s.place).sort((a, b) => EN.minutes(a.time) - EN.minutes(b.time));
    for (let k = 1; k < sorted.length; k++) {
      const A = sorted[k - 1], B = sorted[k];
      const mins = EN.minutes(B.time) - EN.minutes(A.time);
      const km = A.place === B.place ? 0 : EN.placeDistance(c, A.place, B.place);
      if (km === null || km === undefined) { out.push({ seg: [A.i, B.i], level: 'info', text: A.time + ' → ' + B.time + ': distancia no calculable (un lugar está fuera del mapa).' }); continue; }
      const need = mins > 0 ? km / (mins / 60) : (km > 0 ? Infinity : 0);
      const max = SPEED[B.mode || 'pie'];
      if (need > max) out.push({ seg: [A.i, B.i], level: 'bad', text: A.time + ' → ' + B.time + ': ' + km.toFixed(1) + ' km en ' + mins + ' min exige ' + (need === Infinity ? 'estar en dos sitios a la vez' : Math.round(need) + ' km/h') + ' ' + (B.mode === 'coche' ? 'en coche' : 'a pie') + '. Imposible.' });
      else if (km > 0) out.push({ seg: [A.i, B.i], level: 'ok', text: A.time + ' → ' + B.time + ': ' + km.toFixed(1) + ' km en ' + mins + ' min (' + Math.round(need) + ' km/h ' + (B.mode === 'coche' ? 'en coche' : 'a pie') + '). Posible.' });
    }
    // choques con registros objetivos de esa persona
    const recs = EN.knownFacts(c, cs, f => f.person === pid && f.time && f.place && f.kind !== 'statement');
    sorted.forEach(s => {
      const t = EN.minutes(s.time);
      recs.forEach(f => {
        const a = EN.minutes(f.time), b = f.end ? EN.minutes(f.end) : a;
        if (t >= a - 5 && t <= b + 5 && f.place !== s.place) {
          const km = EN.placeDistance(c, f.place, s.place);
          if (km === null || km > 0.15) out.push({ step: s.i, level: 'bad', text: s.time + ' en ' + c.places[s.place].name + ': choca con un registro (' + f.source + '): ' + f.text });
        }
      });
    });
    return { items: out, sorted };
  }

  let VR = null;
  const available = () => !!(E0.scene3d && E0.scene3d.available());
  function label(text) {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 96;
    const g = cv.getContext('2d'); g.fillStyle = 'rgba(10,15,23,.75)'; g.fillRect(0, 0, 512, 96);
    g.fillStyle = '#e6e2d8'; g.font = '600 34px sans-serif'; g.fillText(text.length > 28 ? text.slice(0, 27) + '…' : text, 16, 60);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), depthTest: false, transparent: true }));
    sp.scale.set(2.4, 0.45, 1); return sp;
  }
  const toW = p => new THREE.Vector3((p.x - 50) / 100 * 16, 0, (p.y - 50) / 100 * 10);

  function build(c, pid, res) {
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#0b0f14');
    scene.add(new THREE.HemisphereLight('#dfe8f0', '#1a1d22', 0.8));
    const dl = new THREE.DirectionalLight('#ffffff', 0.6); dl.position.set(-4, 10, 6); scene.add(dl);
    const board = new THREE.Mesh(new THREE.BoxGeometry(17, 0.3, 11), new THREE.MeshStandardMaterial({ color: '#2a3442', roughness: 0.9 }));
    board.position.y = -0.16; scene.add(board);
    const grid = new THREE.GridHelper(16, 16, '#3a4a5e', '#30404f'); grid.scale.z = 10 / 16; scene.add(grid);
    const used = new Set(res.sorted.map(s => s.place));
    Object.entries(c.places).forEach(([k, p]) => {
      if (p.offmap) return;
      const w = toW(p), on = used.has(k);
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, on ? 0.6 : 0.25, 16), new THREE.MeshStandardMaterial({ color: on ? '#5fd3df' : '#6b7a8a' }));
      pin.position.set(w.x, on ? 0.3 : 0.12, w.z); scene.add(pin);
      const lb = label(p.name); lb.position.set(w.x, on ? 1.0 : 0.6, w.z); if (!on) lb.material.opacity = 0.55; scene.add(lb);
    });
    // ruta: tramos imposibles en rojo
    const bad = new Set(res.items.filter(x => x.level === 'bad' && x.seg).map(x => x.seg.join('-')));
    for (let k = 1; k < res.sorted.length; k++) {
      const A = res.sorted[k - 1], B = res.sorted[k];
      const a = toW(c.places[A.place]), b = toW(c.places[B.place]);
      if (a.distanceTo(b) < 0.01) continue;
      const geo = new THREE.BufferGeometry().setFromPoints([a.clone().setY(0.08), new THREE.Vector3((a.x + b.x) / 2, 0.6, (a.z + b.z) / 2), b.clone().setY(0.08)]);
      const curve = new THREE.QuadraticBezierCurve3(a.clone().setY(0.08), new THREE.Vector3((a.x + b.x) / 2, 0.7, (a.z + b.z) / 2), b.clone().setY(0.08));
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.035, 6, false), new THREE.MeshBasicMaterial({ color: bad.has(A.i + '-' + B.i) ? '#e2555d' : '#e7ae4b' }));
      scene.add(tube); geo.dispose();
    }
    // figura
    const person = c.people.find(p => p.id === pid) || c.victim;
    const A = E0.appearance(person);
    const fig = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.55, 14), new THREE.MeshStandardMaterial({ color: A.cloth })); body.position.y = 0.32; fig.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), new THREE.MeshStandardMaterial({ color: A.skin })); head.position.y = 0.72; fig.add(head);
    scene.add(fig);
    return { scene, fig };
  }
  function posAt(c, res, t) {
    const S = res.sorted; if (!S.length) return null;
    const EN = E0.engine;
    if (t <= EN.minutes(S[0].time)) return toW(c.places[S[0].place]);
    for (let k = 1; k < S.length; k++) {
      const a = EN.minutes(S[k - 1].time), b = EN.minutes(S[k].time);
      if (t <= b) { const f = b > a ? (t - a) / (b - a) : 1; return toW(c.places[S[k - 1].place]).lerp(toW(c.places[S[k].place]), f); }
    }
    return toW(c.places[S[S.length - 1].place]);
  }
  function loop() {
    if (!VR || !VR.container || !VR.container.isConnected) { if (VR) VR.raf = null; return; }
    VR.raf = requestAnimationFrame(loop);
    if (VR.playing) { VR.t += VR.step; if (VR.t >= VR.hi) { VR.t = VR.hi; VR.playing = false; } if (VR.onTime) VR.onTime(VR.t); }
    const p = posAt(VR.c, VR.res, VR.t); if (p) VR.b.fig.position.set(p.x, 0, p.z);
    VR.yaw += VR.drag ? 0 : 0.0015;
    VR.camera.position.set(Math.sin(VR.yaw) * 15.5, 12.5, Math.cos(VR.yaw) * 15.5); VR.camera.lookAt(0, -0.5, 0);
    VR.renderer.render(VR.b.scene, VR.camera);
  }
  function mount(container, c, pid, res, onTime) {
    if (!available() || res.sorted.length < 1) return false;
    if (!VR) {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.className = 'scene3d-canvas';
      VR = { renderer, camera: new THREE.PerspectiveCamera(38, 1.6, 0.1, 100), yaw: 0.4, t: 0, raf: null };
      let down = null;
      renderer.domElement.addEventListener('pointerdown', e => { down = { x: e.clientX, yaw: VR.yaw }; VR.drag = true; });
      window.addEventListener('pointermove', e => { if (down) VR.yaw = down.yaw - (e.clientX - down.x) * 0.006; });
      window.addEventListener('pointerup', () => { down = null; VR.drag = false; });
    }
    const key = c.id + '|' + pid + '|' + JSON.stringify(res.sorted.map(s => [s.time, s.place, s.mode])) + '|' + res.items.length;
    if (VR.key !== key) {
      if (VR.b) VR.b.scene.traverse(o => { if (o.geometry) o.geometry.dispose(); });
      VR.b = build(c, pid, res); VR.key = key;
      const EN = E0.engine;
      VR.lo = EN.minutes(res.sorted[0].time); VR.hi = EN.minutes(res.sorted[res.sorted.length - 1].time);
      VR.t = VR.lo; VR.step = Math.max(0.2, (VR.hi - VR.lo) / 300);
    }
    VR.c = c; VR.res = res; VR.onTime = onTime; VR.container = container;
    container.insertBefore(VR.renderer.domElement, container.firstChild);
    const w = container.clientWidth, h = container.clientHeight;
    if (w && h) { VR.renderer.setSize(w, h, false); VR.camera.aspect = w / h; VR.camera.updateProjectionMatrix(); }
    if (!VR.raf) VR.raf = requestAnimationFrame(loop);
    return true;
  }
  function play() { if (VR) { if (VR.t >= VR.hi) VR.t = VR.lo; VR.playing = !VR.playing; } }
  function seek(t) { if (VR) { VR.t = t; VR.playing = false; } }

  E0.recon = { check, mount, play, seek, SPEED };
})();
