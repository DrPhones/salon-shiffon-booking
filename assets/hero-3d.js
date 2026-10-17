import * as THREE from "./vendor/three.module.min.js";

/** A small, local WebGL2 scene. No scroll hijacking, remote assets or postprocessing. */
export function createHero(host, toggle, motion) {
  const small = matchMedia("(max-width: 899px)");
  const coarse = matchMedia("(pointer: coarse)");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.tabIndex = -1;
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
    depth: true,
    stencil: false,
    preserveDrawingBuffer: false,
  });
  if (!gl) throw new Error("WebGL2 unavailable");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context: gl,
    alpha: true,
    antialias: true,
  });
  renderer.setClearColor(0xf4f0e9, 0);
  renderer.setPixelRatio(
    Math.min(devicePixelRatio || 1, coarse.matches ? 1.4 : 1.65),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 60);
  camera.position.set(0, 1.0, 15);
  camera.lookAt(0, 0, 0);
  const geometrySet = new Set(),
    materialSet = new Set();
  const ownGeometry = (g) => {
    geometrySet.add(g);
    return g;
  };
  const ownMaterial = (m) => {
    materialSet.add(m);
    return m;
  };

  // A studio environment supplies broad soft reflections instead of expensive transmission.
  const studio = new THREE.Scene();
  studio.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(25, 24, 12),
      new THREE.MeshBasicMaterial({ color: 0x554958, side: THREE.BackSide }),
    ),
  );
  const panelGeometry = new THREE.PlaneGeometry(1, 1);
  const panels = [
    [-7, 7, 6, 8, 12, 0xffffff, 2.5],
    [5, 5, 2, 4, 9, 0xffecd9, 2],
    [0, 9, -4, 10, 5, 0xffffff, 3],
    [-4, -2, -8, 7, 4, 0xb8a6db, 1.5],
  ];
  panels.forEach(([x, y, z, w, h, color, intensity]) => {
    const panel = new THREE.Mesh(
      panelGeometry,
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
        side: THREE.DoubleSide,
      }),
    );
    panel.position.set(x, y, z);
    panel.scale.set(w, h, 1);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
  });
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.04, 0.1, 100, {
    size: coarse.matches ? 128 : 256,
  });
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.15;
  studio.traverse((o) => {
    o.geometry?.dispose();
    o.material?.dispose();
  });
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xfff6ef, 0xaba0ba, 1.5));
  const key = new THREE.DirectionalLight(0xfff4e9, 2.6);
  key.position.set(-4, 8, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(
    coarse.matches ? 512 : 1024,
    coarse.matches ? 512 : 1024,
  );
  Object.assign(key.shadow.camera, {
    left: -10,
    right: 10,
    top: 8,
    bottom: -8,
    near: 0.1,
    far: 30,
  });
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.0002;
  key.shadow.radius = 3;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd5c4f5, 1.6);
  rim.position.set(4, 1, -3);
  scene.add(rim);

  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const time = { value: 0 };
  const vertexWave = `
    transformed += normal * (sin(position.x * 2.1 + position.y * 1.4 + chiffonTime * 0.55) * 0.035
      + sin(position.y * 3.2 - chiffonTime * 0.45) * 0.018);
  `;
  const silks = [
    { color: 0xd7c5dc, metalness: 0.38, roughness: 0.37, sheenColor: 0xf1dfef },
  ].map((options) => {
    const mat = ownMaterial(
      new THREE.MeshPhysicalMaterial({
        ...options,
        side: THREE.DoubleSide,
        sheen: 1,
        sheenRoughness: 0.5,
        clearcoat: 0.25,
        clearcoatRoughness: 0.25,
        iridescence: 0.16,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [100, 280],
        anisotropy: 0.85,
        envMapIntensity: 1.3,
      }),
    );
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.chiffonTime = time;
      shader.vertexShader =
        "uniform float chiffonTime; varying vec2 chiffonUv;\n" +
        shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nchiffonUv = uv;\n" + vertexWave,
      );
      shader.fragmentShader =
        "varying vec2 chiffonUv;\n" + shader.fragmentShader;
      // Filter the fine weave by pixel footprint, avoiding shimmer at mobile resolutions.
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <roughnessmap_fragment>",
        `
        #include <roughnessmap_fragment>
        vec2 weavePosition = chiffonUv * vec2(420.0, 160.0);
        vec2 weaveFilter = 1.0 - smoothstep(vec2(0.35), vec2(1.2), fwidth(weavePosition));
        float weave = sin(weavePosition.x * 6.283) * sin(weavePosition.y * 6.283) * weaveFilter.x * weaveFilter.y;
        roughnessFactor = clamp(roughnessFactor + 0.07 * weave, 0.16, 0.7);
      `,
      );
    };
    mat.customProgramCacheKey = () => "chiffon-silk-v2";
    return mat;
  });

  function ribbon(phase, width, scale, material, zOffset = 0, open = false) {
    const path = [];
    for (let i = 0; i < 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      path.push(
        new THREE.Vector3(
          3.35 * Math.cos(t) + 0.5 * Math.sin(t * 2),
          2.65 * Math.sin(t) + 0.3 * Math.cos(t * 2),
          0.75 * Math.sin(t * 2 + phase) + 0.6 * Math.cos(t),
        ),
      );
    }
    const drape = [
      [-6, 3.7, 1],
      [-3.8, 2.5, 2.7],
      [-1.2, 1, 3],
      [0.8, -1.3, 2.7],
      [2.3, -2.2, 1.8],
      [4.3, -1.4, 0.2],
      [4.2, 0.8, -2],
      [2, 2, -2.5],
      [-2.8, 3, -2],
      [-6, 4, -1],
    ].map((v) => new THREE.Vector3(...v));
    const curve = new THREE.CatmullRomCurve3(
      open ? drape : path,
      !open,
      "centripetal",
    );
    const segments = coarse.matches ? 160 : 224,
      across = 36;
    const frames = curve.computeFrenetFrames(segments, !open);
    const vertices = [],
      uvs = [],
      indices = [];
    const offset = new THREE.Vector3();
    for (let i = 0; i <= segments; i++) {
      const u = i / segments,
        t = u * Math.PI * 2;
      const center = curve.getPointAt(u);
      const twist = open
        ? phase + u * 1.8 + 0.4 * Math.sin(t)
        : t + phase + 0.6 * Math.sin(t * 2);
      const w =
        width * (0.88 + 0.18 * Math.sin(t + phase) + 0.06 * Math.sin(t * 3));
      for (let j = 0; j <= across; j++) {
        const v = (j / across) * 2 - 1;
        offset.copy(frames.normals[i]).multiplyScalar(Math.cos(twist) * v * w);
        offset.addScaledVector(frames.binormals[i], Math.sin(twist) * v * w);
        // Longitudinal folds have physical geometry; light grazes their actual normals.
        const fold =
          Math.sin(v * 8 + Math.sin(t) * 1.4) * 0.14 +
          Math.sin(v * 20 + t) * 0.045;
        const foldHeight = fold * (0.5 + 0.5 * (1 - v * v));
        offset.addScaledVector(
          frames.normals[i],
          -Math.sin(twist) * foldHeight,
        );
        offset.addScaledVector(
          frames.binormals[i],
          Math.cos(twist) * foldHeight,
        );
        vertices.push(
          center.x + offset.x,
          center.y + offset.y,
          center.z + offset.z,
        );
        uvs.push(u, j / across);
        if (i < segments && j < across) {
          const a = i * (across + 1) + j,
            b = a + across + 1;
          indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
    const g = ownGeometry(new THREE.BufferGeometry());
    g.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices);
    g.computeVertexNormals();
    if (!open) {
      // The closed seam shares a normal as well as a position, so studio highlights stay continuous.
      const normals = g.getAttribute("normal");
      const seamNormal = new THREE.Vector3();
      const lastNormal = new THREE.Vector3();
      for (let j = 0; j <= across; j++) {
        const end = segments * (across + 1) + j;
        seamNormal.fromBufferAttribute(normals, j);
        lastNormal.fromBufferAttribute(normals, end);
        seamNormal.add(lastNormal).normalize();
        normals.setXYZ(j, seamNormal.x, seamNormal.y, seamNormal.z);
        normals.setXYZ(end, seamNormal.x, seamNormal.y, seamNormal.z);
      }
    }
    const mesh = new THREE.Mesh(g, material);
    mesh.scale.setScalar(scale);
    mesh.position.z = zOffset;
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    sculpture.add(mesh);
    return mesh;
  }
  ribbon(0.4, 1.15, 1, silks[0]);
  ribbon(-1.0, 1.2, 1, silks[0], 0, true);

  const pearlGeometry = ownGeometry(new THREE.SphereGeometry(1, 24, 16));
  const pearlMaterial = ownMaterial(
    new THREE.MeshPhysicalMaterial({
      color: 0xf6e6e6,
      metalness: 0.5,
      roughness: 0.14,
      clearcoat: 1,
      iridescence: 0.28,
      envMapIntensity: 1.4,
    }),
  );
  const pearlPositions = [
    [-2.8, -2.3, 0.8, 0.18],
    [-1.1, 1.4, 0.3, 0.25],
    [2.4, 2.7, 0, 0.15],
    [1, -3.1, 1, 0.2],
    [-0.2, 0.8, -0.7, 0.08],
  ];
  const pearls = pearlPositions.map(([x, y, z, r]) => {
    const mesh = new THREE.Mesh(pearlGeometry, pearlMaterial);
    mesh.position.set(x, y, z);
    mesh.scale.setScalar(r);
    mesh.castShadow = true;
    sculpture.add(mesh);
    return { mesh, y };
  });
  const floor = new THREE.Mesh(
    ownGeometry(new THREE.PlaneGeometry(80, 80)),
    ownMaterial(new THREE.ShadowMaterial({ color: 0x706078, opacity: 0.08 })),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.65;
  floor.receiveShadow = true;
  scene.add(floor);

  let raf = 0,
    visible = true,
    paused = false,
    disposed = false,
    lost = false,
    elapsed = 0,
    last = 0;
  let pointerX = 0,
    pointerY = 0,
    rotationX = 0,
    rotationY = 0;
  const stage = host.closest(".hero-stage");
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    const vertical = small.matches ? 8.5 : 9.2;
    const aspect = width / height;
    camera.left = (-vertical * aspect) / 2;
    camera.right = (vertical * aspect) / 2;
    camera.top = vertical / 2;
    camera.bottom = -vertical / 2;
    camera.updateProjectionMatrix();
    sculpture.position.set(
      small.matches ? 0 : -vertical * aspect * 0.19,
      small.matches ? 0 : 0.15,
      0,
    );
    sculpture.scale.setScalar(small.matches ? 0.94 : 1.1);
    if (paused && !lost) renderer.render(scene, camera);
  }
  function render(now) {
    raf = 0;
    if (disposed || lost || !visible || document.hidden || motion.matches)
      return;
    const interval = 1000 / (coarse.matches ? 30 : 45);
    if (now - last >= interval) {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused) elapsed += delta;
      time.value = elapsed;
      rotationX += (pointerY * 0.055 - rotationX) * 0.035;
      rotationY += (pointerX * 0.1 - rotationY) * 0.035;
      sculpture.rotation.set(
        paused
          ? sculpture.rotation.x
          : rotationX + Math.sin(elapsed * 0.12) * 0.025,
        paused
          ? sculpture.rotation.y
          : rotationY + Math.sin(elapsed * 0.1) * 0.06,
        -0.18 + Math.sin(elapsed * 0.15) * 0.015,
      );
      pearls.forEach(
        ({ mesh, y }, i) =>
          (mesh.position.y = y + Math.sin(elapsed * 0.4 + i) * 0.075),
      );
      renderer.render(scene, camera);
      if (host.dataset.scene !== "ready") host.dataset.scene = "ready";
    }
    if (!paused) raf = requestAnimationFrame(render);
  }
  function resume() {
    if (
      !disposed &&
      !lost &&
      visible &&
      !document.hidden &&
      !motion.matches &&
      !raf
    ) {
      last = performance.now() - 100;
      raf = requestAnimationFrame(render);
    }
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }
  function pointer(e) {
    if (coarse.matches || paused) return;
    const b = stage.getBoundingClientRect();
    pointerX = ((e.clientX - b.left) / b.width) * 2 - 1;
    pointerY = ((e.clientY - b.top) / b.height) * 2 - 1;
  }
  function leave() {
    pointerX = 0;
    pointerY = 0;
  }
  function visibility() {
    document.hidden ? stop() : resume();
  }
  function pause() {
    paused = !paused;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.querySelector("span").textContent = paused
      ? "تشغيل الحركة"
      : "إيقاف الحركة";
    toggle.querySelector("img").src = paused
      ? "assets/icons/play.svg"
      : "assets/icons/pause.svg";
    if (paused) stop();
    else resume();
  }
  function contextLost(e) {
    e.preventDefault();
    lost = true;
    stop();
    host.dataset.scene = "fallback";
    toggle.hidden = true;
  }
  function contextRestored() {
    lost = false;
    toggle.hidden = false;
    resume();
  }
  function pageHide(e) {
    if (e.persisted) stop();
    else dispose();
  }
  function pageShow() {
    resume();
  }
  const resizeObserver = new ResizeObserver(resize);
  const intersection = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      visible ? resume() : stop();
    },
    { threshold: 0 },
  );
  canvas.addEventListener("webglcontextlost", contextLost, false);
  canvas.addEventListener("webglcontextrestored", contextRestored, false);
  stage.addEventListener("pointermove", pointer, { passive: true });
  stage.addEventListener("pointerleave", leave, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("pagehide", pageHide);
  window.addEventListener("pageshow", pageShow);
  toggle.addEventListener("click", pause);
  host.append(canvas);
  resize();
  resizeObserver.observe(host);
  intersection.observe(host);
  toggle.hidden = false;
  resume();
  function dispose() {
    if (disposed) return;
    disposed = true;
    stop();
    resizeObserver.disconnect();
    intersection.disconnect();
    stage.removeEventListener("pointermove", pointer);
    stage.removeEventListener("pointerleave", leave);
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("pagehide", pageHide);
    window.removeEventListener("pageshow", pageShow);
    toggle.removeEventListener("click", pause);
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("webglcontextrestored", contextRestored);
    geometrySet.forEach((g) => g.dispose());
    materialSet.forEach((m) => m.dispose());
    environment.dispose();
    key.shadow.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    toggle.hidden = true;
    host.dataset.scene = "poster";
  }
  return { dispose };
}
