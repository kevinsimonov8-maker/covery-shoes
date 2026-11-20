(() => {
  // ---- change the opening hours here ----
  const OPEN = 8, CLOSE = 20;             // 8:00 to 20:00
  const DAYS = [1, 2, 3, 4, 5];           // Monday to Friday (0 = Sunday)
  const NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const fmt = h => h + ":00";

  // pure function: what is the shop doing at this moment?
  function shopStatus(d) {
    const day = d.getDay(), mins = d.getHours() * 60 + d.getMinutes();
    const works = DAYS.includes(day);
    if (works && mins >= OPEN * 60 && mins < CLOSE * 60) {
      const left = CLOSE * 60 - mins;
      const note = left <= 60 ? `closes in ${left} min` : `closes at ${fmt(CLOSE)}`;
      return { open: true, state: "Open now", note };
    }
    if (works && mins < OPEN * 60) return { open: false, state: "Closed", note: `opens today at ${fmt(OPEN)}` };
    // find the next working day
    for (let i = 1; i <= 7; i++) {
      const nd = (day + i) % 7;
      if (DAYS.includes(nd)) return { open: false, state: "Closed", note: `opens ${i === 1 ? "tomorrow" : NAMES[nd]} at ${fmt(OPEN)}` };
    }
    return { open: false, state: "Closed", note: "" };
  }
  window.shopStatus = shopStatus;

  const box = document.getElementById("aStatus"), st = document.getElementById("aState"), nt = document.getElementById("aNote");
  if (!box) return;
  function paint() {
    const r = shopStatus(new Date());
    box.classList.toggle("open", r.open);
    box.classList.toggle("closed", !r.open);
    st.textContent = r.state;
    nt.textContent = r.note ? "· " + r.note : "";
  }
  paint();
  setInterval(paint, 30000);   // keep it live
})();
