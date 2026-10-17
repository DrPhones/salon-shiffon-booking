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
  const start = async () => {
    if (
      controller ||
      loading ||
      motion.matches ||
      navigator.connection?.saveData
    )
      return;
    loading = true;
    try {
      const { createHero } = await import("./hero-3d.js");
      if (!motion.matches) controller = createHero(host, toggle, motion);
    } catch (_) {
      // Unsupported WebGL, a failed download or context creation must never block booking.
      host.dataset.scene = "fallback";
      toggle.hidden = true;
    } finally {
      loading = false;
    }
  };
  motion.addEventListener("change", () => {
    if (motion.matches) {
      controller?.dispose();
      controller = undefined;
      host.dataset.scene = "poster";
      toggle.hidden = true;
    } else start();
  });
  // Allow the first page paint and the booking controls to initialize first.
  if ("requestIdleCallback" in window)
    requestIdleCallback(start, { timeout: 1500 });
  else setTimeout(start, 200);
})();
