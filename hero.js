(() => {
  if (!document.getElementById("sideL")) return;   // GUARD: only for the framed-photo hero
  // [photo, product id, label, object-position, zoom]
  const T = [
    ["images/p00.jpg",6,"Chunky Runner — White"],
    ["images/p01.jpg",1,"Camel Suede Loafer"],
    ["images/p02.jpg",3,"Retro Stripe Sneaker"],
    ["images/p03.jpg",4,"Taupe Suede Sneaker"],
    ["images/p04.jpg",5,"Chunky Runner — Grey"],
    ["images/p05.jpg",2,"Horsebit Suede Loafer"],
    ["images/p06.jpg",17,"Suede Handbag Set"],
    ["images/p07.jpg",7,"Satin Ankle-Strap Pump"],
    ["images/p08.jpg",8,"Block-Heel Ankle Boot"],
    ["images/p09.jpg",9,"Knee-High Riding Boot"],
    ["images/p10.jpg",10,"Gold-Eyelet Combat Boot"],
    ["images/p11.jpg",11,"Stiletto Sock Boot"],
    ["images/p12.jpg",12,"Slouch Suede Boot — Taupe"],
    ["images/p13.jpg",13,"Slouch Suede Boot — Chocolate"],
    ["images/p05.jpg",2,"Horsebit Suede Loafer","50% 100%",1.7],
    ["images/p03.jpg",4,"Taupe Suede Sneaker","35% 92%",1.8],
    ["images/p09.jpg",9,"Knee-High Riding Boot","12% 85%",1.6],
    ["images/p04.jpg",5,"Chunky Runner — Grey","25% 88%",1.7]
  ];
  const LEFT  = [[1,5,7],[4,8,12],[6,10,15]];
  const RIGHT = [[0,9,2],[3,11,13],[16,14,17]];
  let n = 0;
  const build = cols => cols.map(col => `<div class="col">` + col.map(k => {
    const [src, id, label, pos, zoom] = T[k];
    const p = (window.PRODUCTS || []).find(x => x.id === id);
    const st = pos ? `object-position:${pos};transform-origin:${pos};transform:scale(${zoom});` : "";
    return `<div class="tile" data-id="${id}" style="--dl:${((n++ * 0.55) % 4).toFixed(2)}s;--z:${zoom ? zoom + 0.06 : 1.06}">
      <div class="ph"><img src="${src}" alt="${label}" style="${st}"><div class="cap"><b>${label}</b>${p ? "$" + p.price : ""}</div></div></div>`;
  }).join("") + `</div>`).join("");
  document.getElementById("sideL").innerHTML = build(LEFT);
  document.getElementById("sideR").innerHTML = build(RIGHT);

  const hero = document.getElementById("hero");
  hero.addEventListener("click", e => {
    const t = e.target.closest(".tile"); if (t && window.openProduct) window.openProduct(+t.dataset.id);
  });

  // every few seconds one picture zooms forward to catch the eye, then glides back
  const wall = hero.querySelector(".mh-wall");
  const tiles = [...hero.querySelectorAll(".tile")];
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let last = -1, side = 0, busy = false, hovering = false, visible = true, timer;

  function zoomOne() {
    if (busy || hovering || !visible || document.hidden) return schedule();
    const pool = tiles.filter(t => t.offsetParent !== null && t.closest(".side").classList.contains(side ? "r" : "l"));
    side = 1 - side;                                         // alternate left / right
    let t; do { t = pool[Math.floor(Math.random() * pool.length)]; } while (t === last && pool.length > 1);
    last = t;
    const hr = hero.getBoundingClientRect(), tr = t.getBoundingClientRect();
    const desktop = window.innerWidth > 880;
    const tx = hero.querySelector(".mh-text").getBoundingClientRect();
    let zw = desktop ? 300 : Math.min(window.innerWidth * 0.62, 290);
    // never cover the headline: stay on our own side of the text
    if (desktop) {
      const leftSide = t.closest(".side").classList.contains("l");
      const room = leftSide ? tx.left - 28 - (hr.left + 16) : hr.right - 16 - (tx.right + 28);
      zw = Math.min(zw, room);
    }
    const zs = Math.max(1.4, Math.min(2.8, zw / tr.width));
    zw = tr.width * zs; const zh = tr.height * zs;
    let cx = tr.left + tr.width / 2, cy = tr.top + tr.height / 2, nx = cx, ny = cy;
    nx = Math.min(Math.max(nx, hr.left + 16 + zw / 2), hr.right - 16 - zw / 2);
    ny = Math.min(Math.max(ny, hr.top + 16 + zh / 2), hr.bottom - 16 - zh / 2);
    if (desktop) {
      const leftSide = t.closest(".side").classList.contains("l");
      if (leftSide) nx = Math.min(nx, tx.left - 28 - zw / 2); else nx = Math.max(nx, tx.right + 28 + zw / 2);
    }
    t.style.setProperty("--zx", (nx - cx) + "px");
    t.style.setProperty("--zy", (ny - cy) + "px");
    t.style.setProperty("--zs", zs.toFixed(3));
    busy = true;
    wall.classList.add("zooming"); t.classList.add("zoom");
    setTimeout(() => {                                       // hold, then glide back
      t.classList.remove("zoom"); wall.classList.remove("zooming");
      setTimeout(() => { busy = false; }, 1000);
      schedule();
    }, 3400);
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(zoomOne, 4200 + Math.random() * 2400); }

  hero.querySelectorAll(".side").forEach(s => {
    s.addEventListener("mouseenter", () => { hovering = true; });
    s.addEventListener("mouseleave", () => { hovering = false; });
  });
  if ("IntersectionObserver" in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0.3 }).observe(hero);
  window.coveryZoomNow = zoomOne;                            // handy for testing
  if (!reduce) timer = setTimeout(zoomOne, 2200);
})();
