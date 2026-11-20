(() => {
  // endless row of brand logos, about 40 pixels per second
  const track = document.getElementById("brandsTrack");
  if (!track) return;
  const sets = track.querySelectorAll(".brand-set");
  const first = sets[0], second = sets[1];
  const original = first.innerHTML;
  const SPEED = 40; // px per second

  function build() {
    first.innerHTML = original;
    // repeat the logos until one set is wider than the screen, so there is never a gap
    let guard = 0;
    while (first.offsetWidth < window.innerWidth * 1.15 && guard++ < 8) first.insertAdjacentHTML("beforeend", original);
    second.innerHTML = first.innerHTML;
    track.style.animationDuration = Math.max(20, Math.round(first.offsetWidth / SPEED)) + "s";
  }
  build();
  window.addEventListener("load", build);
  let t; window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(build, 200); });
  // a logo that cannot be loaded is simply left out (no broken icon)
  track.addEventListener("error", e => { if (e.target.tagName === "IMG") e.target.closest(".brand").remove(); }, true);
})();
