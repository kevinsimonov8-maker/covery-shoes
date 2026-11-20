(() => {
  // Real map of Kočani (OpenStreetMap data, standard tiles, softened with a warm tint).
  const el = document.getElementById("leaflet"), pinSrc = document.getElementById("mapPin");
  if (!el || !window.L) return;
  const SHOP = [41.9164, 22.4122];                     // Kočani, North Macedonia: change to the exact shop spot
  const map = L.map(el, { center: SHOP, zoom: 16, zoomControl: false, scrollWheelZoom: false, attributionControl: false, minZoom: 12, maxZoom: 18 });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
  L.control.attribution({ position: "bottomright", prefix: false }).addAttribution('© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>').addTo(map);

  // the shop pin (same look as before), anchored on its circle
  const icon = L.divIcon({ className: "lf-pin", iconSize: [0, 0], html: '<div class="map-pin lf-inner">' + pinSrc.innerHTML + "</div>" });
  L.marker(SHOP, { icon, keyboard: false }).addTo(map);
  pinSrc.style.display = "none";

  // keep the pin clear of the info card: right of centre on wide screens, upper part on phones
  function place(zoom) {
    map.setView(SHOP, zoom || map.getZoom(), { animate: false });
    const s = map.getSize();
    if (window.innerWidth > 760) map.panBy([-s.x * 0.12, 0], { animate: false });
    else map.panBy([0, s.y * 0.16], { animate: false });
  }
  place(16);
  window.addEventListener("resize", () => { map.invalidateSize(); place(); });

  document.getElementById("mZoomIn").addEventListener("click", () => map.zoomIn());
  document.getElementById("mZoomOut").addEventListener("click", () => map.zoomOut());
  document.getElementById("mLocate").addEventListener("click", () => { map.setView(SHOP, 17); setTimeout(() => place(17), 0); });
  // scroll-zoom only after a click on the map, so it never hijacks page scrolling
  map.on("click", () => map.scrollWheelZoom.enable());
  el.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
})();
