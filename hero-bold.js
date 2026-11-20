(() => {
  const hero = document.querySelector(".bold-hero"); if (!hero) return;
  const slides = [...hero.querySelectorAll(".bh-slide")], dots = [...hero.querySelectorAll("#bhDots button")];
  const pad = n => String(n).padStart(2, '0');
  const count = document.createElement('div');
  let cur = 0, timer, paused = false;
  function show(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("on", k === cur));
    dots.forEach((d, k) => d.classList.toggle("on", k === cur));
    count.textContent = pad(cur + 1) + " / " + pad(slides.length);
  }
  function loop() { clearInterval(timer); timer = setInterval(() => { if (!paused && !document.hidden) show(cur + 1); }, 10000); }
  show(0);
  dots.forEach((d, k) => d.addEventListener("click", () => { show(k); loop(); }));
  hero.addEventListener("mouseenter", () => paused = true);
  hero.addEventListener("mouseleave", () => paused = false);
  if (!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) loop();
})();
