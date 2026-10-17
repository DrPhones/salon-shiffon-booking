/* Navigation works without the decorative WebGL module. */
(() => {
  document.querySelectorAll("[data-service-query]").forEach((link) => {
    link.addEventListener("click", () => {
      const firstCategory = document.querySelector("#chips button");
      if (firstCategory) firstCategory.click();
      const search = document.getElementById("search");
      search.value = link.dataset.serviceQuery;
      search.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  const host = document.getElementById("hero-art");
  const toggle = document.getElementById("motion-toggle");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let controller;
  let loading = false;
  let paused = motion.matches || Boolean(navigator.connection?.saveData);
  let visible = true;
  let disposed = false;
  let posterAnimation;

  // Keep one motion control for both WebGL and the lightweight Safari fallback.
  // Reduced motion is respected initially; an explicit tap can opt into motion.
  function syncPlayback() {
    const playing = !paused && visible && !document.hidden && !disposed;
    controller?.setPlaying(playing);
    if (playing && host.dataset.scene !== "ready") {
      if (!posterAnimation) {
        posterAnimation = host
          .querySelector(".hero-poster")
          .animate(
            [
              {
                transform:
                  "translate3d(-0.8%, 1%, 0) scale(1.04) rotate(-1deg)",
              },
              {
                transform: "translate3d(0.8%, -1%, 0) scale(1.07) rotate(1deg)",
              },
            ],
            {
              duration: 7000,
              iterations: Infinity,
              direction: "alternate",
              easing: "ease-in-out",
            },
          );
      }
      posterAnimation.play();
    } else posterAnimation?.pause();
  }

  function updateControl() {
    toggle.hidden = false;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.querySelector("span").textContent = paused
      ? "تشغيل الحركة"
      : "إيقاف الحركة";
    toggle.querySelector("img").src = paused
      ? "assets/icons/play.svg"
      : "assets/icons/pause.svg";
    syncPlayback();
  }

  const start = async () => {
    if (controller || loading || paused || disposed) return;
    loading = true;
    try {
      const { createHero } = await import("./hero-3d.js?v=20261017-motion");
      if (!paused && !disposed) {
        controller = createHero(host, syncPlayback);
      }
    } catch (_) {
      // Unsupported WebGL, a failed download or context creation must never block booking.
      host.dataset.scene = "fallback";
    } finally {
      loading = false;
      syncPlayback();
    }
  };

  function toggleMotion() {
    paused = !paused;
    updateControl();
    if (!paused) start();
  }
  function motionChanged() {
    paused = motion.matches || Boolean(navigator.connection?.saveData);
    if (motion.matches) {
      controller?.dispose();
      controller = undefined;
      host.dataset.scene = "poster";
    }
    updateControl();
    if (!paused) start();
  }
  function pageHide(event) {
    controller?.setPlaying(false);
    posterAnimation?.pause();
    if (event.persisted) return;
    disposed = true;
    clearTimeout(startTimer);
    if (idleCallback !== undefined) cancelIdleCallback(idleCallback);
    intersection.disconnect();
    motion.removeEventListener("change", motionChanged);
    document.removeEventListener("visibilitychange", syncPlayback);
    window.removeEventListener("pageshow", syncPlayback);
    window.removeEventListener("pagehide", pageHide);
    toggle.removeEventListener("click", toggleMotion);
    controller?.dispose();
    posterAnimation?.cancel();
  }
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncPlayback();
  });
  intersection.observe(host);
  motion.addEventListener("change", motionChanged);
  document.addEventListener("visibilitychange", syncPlayback);
  window.addEventListener("pageshow", syncPlayback);
  window.addEventListener("pagehide", pageHide);
  toggle.addEventListener("click", toggleMotion);
  updateControl();

  // Some mobile browsers defer idle work aggressively. A timer also starts the
  // scene, while the loading guard prevents allocating two WebGL contexts.
  const startTimer = setTimeout(start, 1200);
  let idleCallback;
  if ("requestIdleCallback" in window)
    idleCallback = requestIdleCallback(start, { timeout: 1000 });
  else setTimeout(start, 200);
})();
