(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => "$" + n.toFixed(0);
  const CAT_LABEL = { sneakers: "Sneakers", loafers: "Loafers", heels: "Heels", boots: "Boots", bags: "Bags" };
  const HEART = '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9-9.6C2 7.5 4.2 5 7 5c1.9 0 3.5 1 5 3 1.5-2 3.100-3 5-3 2.800 0 5 2.500 4 5.900-1.500 5-9 9.600-9 9.600z"/></svg>';

  /* favorites (saved in the browser) */
  let favs = [];
  try { favs = JSON.parse(localStorage.getItem("covery-favs") || "[]"); } catch (e) {}
  const saveFavs = () => { try { localStorage.setItem("covery-favs", JSON.stringify(favs)); } catch (e) {} };
  const isFav = id => favs.includes(id);

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function toggleFav(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (isFav(id)) { favs = favs.filter(x => x !== id); toast("Removed from favorites"); }
    else { favs.push(id); toast("Added to favorites ♥  " + p.name); }
    saveFavs(); refreshFavUI();
  }

  function refreshFavUI() {
    const c = $("#favCount"); c.textContent = favs.length; c.dataset.n = favs.length;
    $$(".heart").forEach(h => h.classList.toggle("on", isFav(+h.dataset.id)));
    const fa = $(".fav-add"); if (fa) setFavBtn(fa, +fa.dataset.id);
    renderDrawer();
  }

  /* cards */
  function cardHTML(p) {
    const pct = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    const badge = p.badge === "sale" ? `<span class="badge sale">−${pct}%</span>`
      : p.badge === "new" ? `<span class="badge">New</span>`
      : p.badge === "best" ? `<span class="badge best">Bestseller</span>` : "";
    const alt = p.images[1] ? `<img class="alt" src="${p.images[1]}" alt="" loading="lazy">` : "";
    return `<article class="card" data-id="${p.id}" tabindex="0">
      <div class="card-img">
        ${badge}
        <button class="heart ${isFav(p.id) ? "on" : ""}" data-id="${p.id}" aria-label="Add to favorites">${HEART}</button>
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">${alt}
        <div class="quick">Quick view</div>
      </div>
      <div class="card-info">
        <div class="cat-name">${CAT_LABEL[p.cat]}</div>
        <h3>${p.name}</h3>
        <div class="price">${p.old ? `<span class="now sale">${money(p.price)}</span><span class="old">${money(p.old)}</span>` : `<span class="now">${money(p.price)}</span>`}</div>
      </div>
    </article>`;
  }

  /* categories */
  $("#catGrid").innerHTML = CATEGORIES.map(c =>
    `<a class="cat ${c.link ? "is-sale" : ""}" href="${c.link || "#shop"}" data-cat="${c.id}">
      <img src="${c.img}" alt="${c.name}" loading="lazy">
      <div class="cat-label"><h3>${c.name}</h3><span>${c.note}</span></div>
    </a>`).join("");

  /* filters */
  const FILTERS = [["all", "All"], ["new", "New"], ["sneakers", "Sneakers"], ["loafers", "Loafers"], ["heels", "Heels"], ["boots", "Boots"], ["bags", "Bags"]];
  $("#filters").innerHTML = FILTERS.map(([id, l]) => `<button class="chip" data-f="${id}">${l}</button>`).join("");
  let filter = "all", query = "";

  function renderGrid() {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter(p => {
      const okF = filter === "all" || (filter === "new" ? p.badge === "new" : p.cat === filter);
      const okQ = !q || (p.name + " " + p.cat + " " + p.colors.join(" ") + " " + p.desc + " " + (window.i18nSearchText ? window.i18nSearchText(p) : "")).toLowerCase().includes(q);
      return okF && okQ;
    });
    $("#grid").innerHTML = list.map(cardHTML).join("");
    $("#empty").hidden = list.length > 0;
    $$(".chip").forEach(c => c.classList.toggle("active", c.dataset.f === filter));
  }
  function setFilter(f, scroll) {
    filter = f; renderGrid();
    if (scroll) $("#shop").scrollIntoView({ behavior: "smooth" });
  }

  $("#filters").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) setFilter(c.dataset.f); });
  $("#catGrid").addEventListener("click", e => {
    const a = e.target.closest(".cat"); if (!a || a.dataset.cat === "sale") return;
    e.preventDefault(); setFilter(a.dataset.cat, true);
  });
  $$("[data-filter]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault(); setFilter(a.dataset.filter, true); $("#nav").classList.remove("open");
  }));
  $("#nav .sale-link").addEventListener("click", () => $("#nav").classList.remove("open"));

  /* sale grid */
  $("#saleGrid").innerHTML = PRODUCTS.filter(p => p.old).map(cardHTML).join("");

  /* card clicks (delegated, both grids) */
  document.addEventListener("click", e => {
    const h = e.target.closest(".heart");
    if (h) { e.stopPropagation(); toggleFav(+h.dataset.id); return; }
    const c = e.target.closest(".card");
    if (c) openModal(+c.dataset.id);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.classList.contains("card")) openModal(+e.target.dataset.id);
  });

  /* search */
  $("#searchBtn").addEventListener("click", () => {
    const bar = $("#searchbar"); bar.classList.toggle("open");
    if (bar.classList.contains("open")) $("#searchInput").focus();
  });
  $("#searchInput").addEventListener("input", e => {
    query = e.target.value; if (query) filter = "all"; renderGrid();
    if (query) $("#shop").scrollIntoView({ behavior: "smooth" });
  });

  $("#menuBtn").addEventListener("click", () => $("#nav").classList.toggle("open"));

  /* modal */
  let cur = null, idx = 0;
  function openModal(id) {
    cur = PRODUCTS.find(p => p.id === id); idx = 0;
    const p = cur;
    $("#stage").innerHTML = p.images.map((src, i) => `<img src="${src}" alt="${p.name} view ${i + 1}" class="${i === 0 ? "show" : ""}">`).join("");
    const multi = p.images.length > 1;
    $("#prev").style.display = $("#next").style.display = multi ? "" : "none";
    $("#dots").innerHTML = multi ? p.images.map((_, i) => `<button data-i="${i}" class="${i === 0 ? "on" : ""}" aria-label="Picture ${i + 1}"></button>`).join("") : "";
    const pct = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    $("#details").innerHTML = `
      <div class="cat-name">${CAT_LABEL[p.cat]}</div>
      <h2>${p.name}</h2>
      <div class="price">${p.old ? `<span class="now sale">${money(p.price)}</span><span class="old">${money(p.old)}</span><span class="save-note">Save ${pct}%</span>` : money(p.price)}</div>
      <p class="desc">${p.desc}</p>
      <div class="opt-title">Color: &nbsp;<span id="colorName" style="letter-spacing:.05em;text-transform:none;font-size:.85rem;margin-right:auto">${p.colors[0]}</span></div>
      <div class="opts" id="colorOpts">${p.colors.map((c, i) => `<button class="opt ${i === 0 ? "on" : ""}" data-c="${c}">${c}</button>`).join("")}</div>
      <div class="opt-title">Size <a href="#">Size guide</a></div>
      <div class="opts" id="sizeOpts">${p.sizes.map((s, i) => `<button class="opt ${p.sizes.length === 1 ? "on" : ""}" data-s="${s}">${s}</button>`).join("")}</div>
      <button class="fav-add" data-id="${p.id}"></button>
      <div class="perks">
        <span><b>Free delivery</b> on orders over $150</span>
        <span><b>Free returns</b> within 30 days</span>
        <span><b>Buy 2 pairs</b> and get an extra 10% off</span>
      </div>`;
    setFavBtn($(".fav-add"), p.id);
    const m = $("#modal"); m.classList.add("open"); m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function setFavBtn(btn, id) {
    btn.dataset.id = id;
    btn.classList.toggle("on", isFav(id));
    btn.innerHTML = HEART + (isFav(id) ? "In your favorites" : "Add to favorites");
  }
  function closeModal() {
    $("#modal").classList.remove("open"); $("#modal").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function go(n) {
    const imgs = $$("#stage img"); if (imgs.length < 2) return;
    idx = (idx + n + imgs.length) % imgs.length;
    imgs.forEach((im, i) => im.classList.toggle("show", i === idx));
    $$("#dots button").forEach((d, i) => d.classList.toggle("on", i === idx));
  }
  $("#prev").addEventListener("click", () => go(-1));
  $("#next").addEventListener("click", () => go(1));
  $("#dots").addEventListener("click", e => { const b = e.target.closest("button"); if (b) go(+b.dataset.i - idx); });
  $("#modal").addEventListener("click", e => { if (e.target.hasAttribute("data-close")) closeModal(); });
  $("#details").addEventListener("click", e => {
    const o = e.target.closest(".opt");
    if (o) {
      o.parentElement.querySelectorAll(".opt").forEach(x => x.classList.remove("on")); o.classList.add("on");
      if (o.dataset.c) $("#colorName").textContent = o.dataset.c;
      return;
    }
    const f = e.target.closest(".fav-add"); if (f) toggleFav(+f.dataset.id);
    if (e.target.closest(".opt-title a")) e.preventDefault();
  });

  /* swipe on gallery */
  let sx = null;
  $("#stage").addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
  $("#stage").addEventListener("touchend", e => {
    if (sx === null) return; const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); sx = null;
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeModal(); closeDrawer(); }
    if ($("#modal").classList.contains("open")) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
  });

  /* favorites drawer */
  function renderDrawer() {
    const body = $("#drawerBody");
    if (!favs.length) { body.innerHTML = `<p class="drawer-empty">No favorites yet.<br>Tap the heart on any product to save it here.</p>`; return; }
    body.innerHTML = favs.map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      return `<div class="fav-item" data-id="${id}">
        <img src="${p.images[0]}" alt="">
        <div><h4>${p.name}</h4><small>${money(p.price)}${p.old ? ` · was ${money(p.old)}` : ""}</small></div>
        <button data-rm="${id}" aria-label="Remove">×</button></div>`;
    }).join("");
  }
  function openDrawer() { $("#drawer").classList.add("open"); $("#drawerBackdrop").classList.add("open"); }
  function closeDrawer() { $("#drawer").classList.remove("open"); $("#drawerBackdrop").classList.remove("open"); }
  $("#favBtn").addEventListener("click", openDrawer);
  $("#drawerClose").addEventListener("click", closeDrawer);
  $("#drawerBackdrop").addEventListener("click", closeDrawer);
  $("#drawerBody").addEventListener("click", e => {
    const rm = e.target.closest("[data-rm]");
    if (rm) { e.stopPropagation(); toggleFav(+rm.dataset.rm); return; }
    const it = e.target.closest(".fav-item"); if (it) { closeDrawer(); openModal(+it.dataset.id); }
  });

  /* countdown (resets to 3 days from first visit) */
  let end = Date.now() + 3 * 864e5 - 1;
  try {
    const s = +localStorage.getItem("covery-sale-end");
    if (s > Date.now()) end = s; else localStorage.setItem("covery-sale-end", end);
  } catch (e) {}
  function tick() {
    let d = Math.max(0, end - Date.now());
    const parts = [["Days", 864e5], ["Hours", 36e5], ["Min", 6e4], ["Sec", 1e3]].map(([l, ms]) => {
      const v = Math.floor(d / ms); d -= v * ms;
      return `<div><b>${String(v).padStart(2, "0")}</b><span>${l}</span></div>`;
    });
    $("#countdown").innerHTML = parts.join("");
  }
  tick(); setInterval(tick, 1000);

  const nf = $("#newsForm"); if (nf) nf.addEventListener("submit", e => { e.preventDefault(); e.target.reset(); toast("Thank you! Your 10% code is on its way."); });

  window.openProduct = openModal;
  renderGrid(); refreshFavUI();
})();
