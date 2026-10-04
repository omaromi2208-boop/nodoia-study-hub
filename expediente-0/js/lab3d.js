/* EXPEDIENTE 0 — mesa de revelado de huellas en 3D (Three.js r128).
 * La superficie de la evidencia descansa en la mesa con una huella latente invisible.
 * La luz rasante la delata por el brillo de los residuos; el polvo se aplica con la
 * brocha arrastrando sobre la superficie y se adhiere a las crestas. Con exceso de
 * polvo la huella se empasta. Cuando está bien revelada se levanta con cinta. */
(function () {
  const TW = 512, TH = 352, LS = 256;
  const SURF = {
    vidrio: { name: 'vidrio', base: [176, 190, 200], dark: false },
    metal: { name: 'metal', base: [146, 150, 156], dark: false },
    oscuro: { name: 'plástico oscuro', base: [30, 32, 37], dark: true },
    madera: { name: 'madera barnizada', base: [128, 88, 56], dark: true },
    papel: { name: 'papel', base: [226, 220, 204], dark: false }
  };
  const POWDER = { negro: [22, 22, 24], aluminio: [214, 217, 222] };
  const MODEL_SURF = { glass: 'vidrio', bottle: 'vidrio', window: 'vidrio', laptop: 'oscuro', phone: 'oscuro', tablet: 'oscuro', camera: 'oscuro', keys: 'metal', door: 'metal', drawer: 'madera', desk: 'madera', shelf: 'madera', chess: 'madera', wardrobe: 'madera', car: 'metal', railing: 'metal', papers: 'papel', stairs: 'metal', elevator: 'metal', jewelry: 'metal', bag: 'oscuro' };
  function surfaceFor(e) {
    const m = E0.scene3d && E0.scene3d.modelFor ? E0.scene3d.modelFor(e) : 'marker';
    if (MODEL_SURF[m]) return SURF[MODEL_SURF[m]];
    const n = (e.name || '').toLowerCase();
    if (/caja fuerte|armero|llave|candelabro|tirador|pasamanos|manilla/.test(n)) return SURF.metal;
    if (/carpeta|papel|nota|libro/.test(n)) return SURF.papel;
    return SURF.metal;
  }

  let LR = null;
  const available = () => !!(E0.scene3d && E0.scene3d.available());

  function build() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.domElement.className = 'scene3d-canvas';
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b0f14');
    const cam = new THREE.PerspectiveCamera(38, 1.6, 0.05, 30);
    scene.add(new THREE.HemisphereLight('#dfe8f0', '#1a1d22', 0.55));
    const key = new THREE.DirectionalLight('#ffffff', 0.55); key.position.set(-1, 3, 2); key.castShadow = true; scene.add(key);
    // mesa de laboratorio
    const table = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 2.2), new THREE.MeshStandardMaterial({ color: '#d9dde2', roughness: 0.6 }));
    table.position.y = -0.04; table.receiveShadow = true; scene.add(table);
    const mat2 = new THREE.MeshStandardMaterial({ color: '#2a2f36', roughness: 0.8 });
    const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.16, 20), mat2); jar.position.set(1.15, 0.08, -0.55); scene.add(jar);
    const tape = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.03, 10, 24), new THREE.MeshStandardMaterial({ color: '#e8e2c8', roughness: 0.4, transparent: true, opacity: 0.8 }));
    tape.rotation.x = Math.PI / 2; tape.position.set(1.15, 0.03, 0.45); scene.add(tape);
    const ruler = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.01, 0.9), new THREE.MeshStandardMaterial({ color: '#f2d24b' })); ruler.position.set(-0.95, 0.06, 0); scene.add(ruler);
    // superficie con la huella (textura pintable)
    const cv = document.createElement('canvas'); cv.width = TW; cv.height = TH;
    const tex = new THREE.CanvasTexture(cv);
    const top = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.45, metalness: 0.1 });
    const side = new THREE.MeshStandardMaterial({ color: '#40454c', roughness: 0.7 });
    const slab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 1.1), [side, side, top, side, side, side]);
    slab.position.y = 0.03; slab.castShadow = true; slab.receiveShadow = true; scene.add(slab);
    // luz rasante
    const graze = new THREE.SpotLight('#fff6dd', 0, 6, 0.5, 0.6, 1);
    graze.position.set(-1.6, 0.16, 0.4); graze.target.position.set(0, 0.06, 0); scene.add(graze, graze.target);
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.18, 16), new THREE.MeshStandardMaterial({ color: '#30353c', emissive: '#000' }));
    lamp.rotation.z = Math.PI / 2; lamp.position.copy(graze.position); scene.add(lamp);
    // brocha
    const brush = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.32, 12), new THREE.MeshStandardMaterial({ color: '#7a4a24', roughness: 0.6 }));
    handle.position.y = 0.24; brush.add(handle);
    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.022, 0.05, 12), new THREE.MeshStandardMaterial({ color: '#b9bec4', metalness: 0.8, roughness: 0.3 }));
    ferrule.position.y = 0.07; brush.add(ferrule);
    const bristles = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.08, 16, 1, true), new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 1, side: THREE.DoubleSide }));
    bristles.rotation.x = Math.PI; bristles.position.y = 0.03; brush.add(bristles);
    brush.rotation.z = -0.35; brush.visible = false; scene.add(brush);
    return { renderer, scene, cam, cv, ctx: cv.getContext('2d'), tex, slab, top, graze, lamp, brush, bristles, ray: new THREE.Raycaster(), orbit: { yaw: 0.0, pitch: 0.95, r: 2.2 } };
  }

  function camUpdate() {
    const o = LR.orbit;
    LR.cam.position.set(Math.sin(o.yaw) * Math.cos(o.pitch) * o.r, Math.sin(o.pitch) * o.r, Math.cos(o.yaw) * Math.cos(o.pitch) * o.r);
    LR.cam.lookAt(0, 0.03, 0);
  }

  /* Recompone la textura: superficie + brillo de residuos (luz rasante) + polvo. */
  function repaint() {
    const J = LR.job; if (!J) return;
    const img = LR.ctx.createImageData(TW, TH), d = img.data;
    const B = J.surf.base, P = POWDER[J.powder];
    for (let y = 0; y < TH; y++) for (let x = 0; x < TW; x++) {
      const i = y * TW + x, o = i * 4;
      const lx = x - J.ox, ly = y - J.oy;
      const r = lx >= 0 && ly >= 0 && lx < LS && ly < LS ? J.ridge[ly * LS + lx] : 0;
      const m = J.mask[i], g = J.grain[i & 4095];
      let a = Math.min(1, m) * (0.1 + 0.9 * r);
      if (m > 1.3) { const sm = Math.min(1, (m - 1.3) / 0.7); a = a + (Math.min(1, m) * 0.75 - a) * sm; }
      a = Math.min(1, a * (0.85 + 0.3 * g));
      const sheen = J.light ? r * 26 * Math.max(0, 1 - m) : 0;
      d[o] = B[0] + (P[0] - B[0]) * a + sheen; d[o + 1] = B[1] + (P[1] - B[1]) * a + sheen; d[o + 2] = B[2] + (P[2] - B[2]) * a + sheen * 0.9; d[o + 3] = 255;
    }
    LR.ctx.putImageData(img, 0, 0);
    LR.tex.needsUpdate = true;
    J.dirty = false;
    report();
  }

  function metrics() {
    const J = LR && LR.job; if (!J) return { coverage: 0, smear: 0 };
    let n = 0, ok = 0, over = 0;
    for (let ly = 0; ly < LS; ly += 2) for (let lx = 0; lx < LS; lx += 2) {
      if (J.ridge[ly * LS + lx] < 0.05) continue;
      n++;
      const m = J.mask[(ly + J.oy) * TW + lx + J.ox];
      if (m >= 0.55 && m <= 1.45) ok++; else if (m > 1.45) over++;
    }
    return { coverage: n ? ok / n : 0, smear: n ? over / n : 0, contrastOk: J.surf.dark === (J.powder === 'aluminio') };
  }
  function report() {
    const M = metrics();
    const c = document.getElementById('lab-cov'), s = document.getElementById('lab-smear');
    if (c) c.textContent = Math.round(M.coverage * 100) + ' %';
    if (s) s.textContent = Math.round(M.smear * 100) + ' %';
  }

  function paint(u, v) {
    const J = LR.job, cx = u * TW, cy = (1 - v) * TH, R = 18;
    for (let y = Math.max(0, Math.floor(cy - R)); y < Math.min(TH, cy + R); y++) for (let x = Math.max(0, Math.floor(cx - R)); x < Math.min(TW, cx + R); x++) {
      const dd = Math.hypot(x - cx, y - cy) / R;
      if (dd < 1) J.mask[y * TW + x] = Math.min(2.2, J.mask[y * TW + x] + 0.07 * (1 - dd * dd));
    }
    J.dirty = true;
  }

  function hit(e) {
    const rect = LR.renderer.domElement.getBoundingClientRect();
    const m = new THREE.Vector2((e.clientX - rect.left) / rect.width * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    LR.ray.setFromCamera(m, LR.cam);
    const h = LR.ray.intersectObject(LR.slab, false)[0];
    return h && h.face && h.face.normal.y > 0.5 ? h : null;
  }
  function bind(el) {
    let mode = null, last = null;
    el.addEventListener('pointerdown', e => {
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
      const h = hit(e);
      if (h && LR.job) { mode = 'brush'; paint(h.uv.x, h.uv.y); last = h.uv.clone(); }
      else mode = { x: e.clientX, y: e.clientY, yaw: LR.orbit.yaw, pitch: LR.orbit.pitch };
    });
    el.addEventListener('pointermove', e => {
      const h = hit(e);
      LR.brush.visible = !!h;
      if (h) { LR.brush.position.set(h.point.x + 0.06, 0.06, h.point.z); }
      if (mode === 'brush' && h) {
        const steps = last ? Math.ceil(h.uv.distanceTo(last) * TW / 6) : 1;
        for (let k = 1; k <= Math.min(steps, 30); k++) { const t = k / steps; paint(last.x + (h.uv.x - last.x) * t, last.y + (h.uv.y - last.y) * t); }
        last = h.uv.clone();
        LR.wiggle = 0.25;
      } else if (mode && mode !== 'brush') {
        LR.orbit.yaw = Math.max(-0.8, Math.min(0.8, mode.yaw - (e.clientX - mode.x) * 0.006));
        LR.orbit.pitch = Math.max(0.35, Math.min(1.35, mode.pitch + (e.clientY - mode.y) * 0.005));
      }
    });
    const up = () => { mode = null; last = null; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', () => { LR.brush.visible = false; });
    el.addEventListener('wheel', e => { e.preventDefault(); LR.orbit.r = Math.max(1.2, Math.min(3.4, LR.orbit.r * (e.deltaY > 0 ? 1.08 : 0.92))); }, { passive: false });
  }

  function loop(t) {
    if (!LR || !LR.container || !LR.container.isConnected) { if (LR) LR.raf = null; return; }
    LR.raf = requestAnimationFrame(loop);
    if (document.hidden) return;
    if (LR.job && LR.job.dirty) repaint();
    if (LR.wiggle > 0) { LR.wiggle -= 0.016; LR.brush.rotation.x = Math.sin(t / 40) * 0.12; } else LR.brush.rotation.x = 0;
    camUpdate();
    LR.renderer.render(LR.scene, LR.cam);
  }
  function resize() {
    if (!LR || !LR.container) return;
    const w = LR.container.clientWidth, h = LR.container.clientHeight;
    if (!w || !h) return;
    LR.renderer.setSize(w, h, false);
    LR.cam.aspect = w / h; LR.cam.fov = w / h < 1.2 ? 52 : 38; LR.cam.updateProjectionMatrix();
  }

  /* opts: { key, L, e, powder, light } */
  function mount(container, opts) {
    if (!available()) return false;
    if (!LR) { LR = build(); bind(LR.renderer.domElement); window.addEventListener('resize', resize); }
    if (!LR.job || LR.job.key !== opts.key) {
      const r = (opts.L.seed % 997) / 997, r2 = (opts.L.seed % 613) / 613;
      const grain = new Float32Array(4096); let a = opts.L.seed >>> 0;
      for (let i = 0; i < 4096; i++) { a = (a * 1664525 + 1013904223) >>> 0; grain[i] = a / 4294967296; }
      LR.job = { key: opts.key, ridge: E0.prints.latentRidge(opts.L, LS), mask: new Float32Array(TW * TH), grain, ox: Math.round(20 + r * (TW - LS - 40)), oy: Math.round(8 + r2 * (TH - LS - 16)), surf: surfaceFor(opts.e), powder: opts.powder || 'negro', light: !!opts.light, dirty: true };
      LR.orbit = { yaw: 0, pitch: 0.95, r: 2.2 };
    }
    const J = LR.job;
    if (J.powder !== (opts.powder || 'negro')) { J.powder = opts.powder || 'negro'; J.mask.fill(0); J.dirty = true; }
    if (J.light !== !!opts.light) { J.light = !!opts.light; J.dirty = true; }
    LR.graze.intensity = J.light ? 2.2 : 0;
    LR.lamp.material.emissive.set(J.light ? '#ffe9b0' : '#000000');
    LR.bristles.material.color.set(J.powder === 'aluminio' ? '#c9ccd1' : '#262626');
    LR.container = container;
    container.insertBefore(LR.renderer.domElement, container.firstChild);
    resize(); camUpdate();
    report();
    if (!LR.raf) LR.raf = requestAnimationFrame(loop);
    return true;
  }
  function clean() { if (LR && LR.job) { LR.job.mask.fill(0); LR.job.dirty = true; } }
  /* Para pruebas automáticas: pasa la brocha por toda la zona de la huella. */
  function autoBrush(passes) {
    const J = LR && LR.job; if (!J) return;
    for (let y = J.oy; y < J.oy + LS; y++) for (let x = J.ox; x < J.ox + LS; x++) J.mask[y * TW + x] = Math.min(2.2, J.mask[y * TW + x] + 0.3 * (passes || 1));
    J.dirty = true;
  }

  E0.lab3d = { available, mount, metrics, clean, surfaceFor, autoBrush };
})();
