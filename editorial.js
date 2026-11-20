(() => {
  const zone = document.getElementById("edZone");
  if (!zone) return;
  const textEl = document.getElementById("edText"), colorsEl = document.getElementById("edColors"), dotsEl = document.getElementById("zDots");

  // Four photos that take turns (every 10 seconds).
  // box = where the sneakers are inside the photo (fractions of its width / height)
  const SLIDES = [
    { src: "images/feat-grey.jpg", w: 1080, h: 1204, box: { x1: 0.113, x2: 0.885, y1: 0.505, y2: 0.995 }, blur: "50% 75%",
      label: "Chunky Runner — Grey",
      text: "Chunky suede-and-mesh runners with a cushioned sole, paired with a soft quilted crossbody bag. Comfort for the whole day, in calm neutral tones.",
      colors: [["#8b8685", "Grey"], ["#4a3a32", "Brown"], ["#fff", "White"]] },
    { src: "images/p00-hd.jpg", w: 1080, h: 1438, box: { x1: 0.075, x2: 0.915, y1: 0.57, y2: 0.99 }, blur: "50% 80%",
      label: "White Chunky Runner",
      text: "Clean white runners with silver and suede details and a sculpted, cushioned sole, paired with a soft white shoulder bag. Light, fresh and easy to wear all day.",
      colors: [["#fff", "White"], ["#c3c6cb", "Silver"], ["#8b8685", "Grey"]] },
    { src: "images/feat-stripe.jpg", w: 1080, h: 1416, box: { x1: 0.115, x2: 0.965, y1: 0.655, y2: 0.975 }, blur: "50% 80%",
      label: "Retro Stripe Sneaker",
      text: "Retro-inspired suede sneakers with chocolate stripes and a cushioned cream platform sole, styled with a grained mini top-handle bag.",
      colors: [["#e7dcc8", "Cream"], ["#4a2d22", "Chocolate"], ["#cbb899", "Beige"]] },
    { src: "images/feat-taupe.jpg", w: 1078, h: 1442, box: { x1: 0.145, x2: 0.945, y1: 0.645, y2: 0.945 }, blur: "50% 80%",
      label: "Taupe Suede Sneaker",
      text: "Soft taupe suede with ivory stripes and a clean platform sole, paired with a structured neutral tote. Understated, easy and made for every day.",
      colors: [["#b9a58d", "Taupe"], ["#f1e9d8", "Ivory"], ["#d9cbb4", "Sand"]] }
  ];
  const INTERVAL_NOTE = 10; // seconds: set in styles.css too (animation: zfill 10s)

  // build the slides and the timer dots
  zone.innerHTML = SLIDES.map((s, i) =>
    `<div class="z-slide" data-i="${i}">
       <img class="z-blur" src="${s.src}" alt="" style="object-position:${s.blur}" ${i ? 'loading="lazy"' : ""}>
       <div class="z-tint"></div>
       <div class="z-box">
         <span class="z-label">In focus &nbsp;·&nbsp; ${s.label}</span>
         <div class="z-clip"><img src="${s.src}" alt="${s.label}"></div>
         <i class="k tl"></i><i class="k tr"></i><i class="k bl"></i><i class="k br"></i>
       </div>
     </div>`).join("");
  zone.setAttribute("aria-label", "Sneakers in sharp focus, shown one after another");
  dotsEl.innerHTML = SLIDES.map((s, i) => `<button type="button" data-i="${i}" aria-label="Show ${s.label}"><i></i></button>`).join("");
  const slides = [...zone.children], dots = [...dotsEl.children];

  // size each focus box so every photo is shown at the same, sharp scale
  function layout() {
    const zw = zone.clientWidth;
    slides.forEach((el, i) => {
      const s = SLIDES[i], b = s.box, bw = b.x2 - b.x1, bh = b.y2 - b.y1;
      const imgW = Math.min(620, 0.82 * zw / bw), imgH = imgW * s.h / s.w;
      const box = el.querySelector(".z-box"), img = el.querySelector(".z-clip img");
      box.style.width = (imgW * bw).toFixed(1) + "px";
      box.style.height = (imgH * bh).toFixed(1) + "px";
      img.style.width = imgW.toFixed(1) + "px";
      img.style.left = (-b.x1 * imgW).toFixed(1) + "px";
      img.style.top = (-b.y1 * imgH).toFixed(1) + "px";
    });
  }

  // switch to a photo: scene, text and timer together
  let cur = -1;
  function show(i, first) {
    i = (i + SLIDES.length) % SLIDES.length;
    if (i === cur) return;
    cur = i;
    slides.forEach((el, k) => el.classList.toggle("on", k === i));
    dots.forEach(d => d.classList.remove("on"));
    void dotsEl.offsetWidth;                       // restart the 10-second bar
    dots[i].classList.add("on");
    const s = SLIDES[i];
    const apply = () => {
      textEl.textContent = s.text;
      colorsEl.innerHTML = s.colors.map(([hex, name]) => `<span><i style="background:${hex}"></i>${name}</span>`).join("");
    };
    if (first) { apply(); return; }
    textEl.classList.add("out"); colorsEl.classList.add("out");
    setTimeout(() => { apply(); textEl.classList.remove("out"); colorsEl.classList.remove("out"); }, 420);
  }

  // when the bar has filled (10 s), show the next photo
  dotsEl.addEventListener("animationend", e => { if (e.animationName === "zfill") show(cur + 1); });
  dotsEl.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const i = +b.dataset.i;
    if (i === cur) { dots[i].classList.remove("on"); void dotsEl.offsetWidth; dots[i].classList.add("on"); }   // restart the timer
    else show(i);
  });
  // pause while the visitor looks at the photo or the dots
  [zone, dotsEl].forEach(el => {
    el.addEventListener("mouseenter", () => dotsEl.classList.add("paused"));
    el.addEventListener("mouseleave", () => dotsEl.classList.remove("paused"));
  });

  // the see-through info row sits over the bottom of the photo: tell the layout how tall it is
  const main = zone.closest(".ed-main"), facts = document.querySelector(".ed-facts");
  function factsHeight() { if (main && facts) main.style.setProperty("--facts", facts.offsetHeight + "px"); }
  window.addEventListener("resize", () => { factsHeight(); layout(); });
  factsHeight();
  layout();
  show(0, true);

  // the sharp box opens up when the section scrolls into view
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { zone.classList.add("in"); io.disconnect(); } }), { threshold: 0.35 });
    io.observe(zone);
  } else zone.classList.add("in");
})();
