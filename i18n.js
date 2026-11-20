// MK / EN language switch.
// English is the original text in the page. When MK is chosen, every English text is looked up
// in the dictionary below and replaced with Macedonian (also text the site builds later,
// like product cards, the favorites drawer, the countdown and the open/closed status).
// To fix or add a translation, edit the dictionary: "English text": "Македонски текст".
(() => {
  const KEY = "covery-lang";
  let lang = "en";
  try { lang = localStorage.getItem(KEY) === "mk" ? "mk" : "en"; } catch (e) {}

  const D = {
    /* top bar + header */
    "Open now": "Отворено", "Closed": "Затворено", "Checking…": "Проверка…",
    "Mon – Fri · 8:00 – 20:00": "Пон – Пет · 8:00 – 20:00",
    "Kočani, North Macedonia": "Кочани, Северна Македонија",
    "New": "Ново", "Sneakers": "Патики", "Loafers": "Мокасини", "Heels": "Потпетици", "Boots": "Чизми", "Bags": "Чанти", "Sale": "Попуст",
    "Menu": "Мени", "Search": "Пребарај", "Favorites": "Омилени",
    "Search shoes and bags — try “loafer”, “black”, “tote”…": "Пребарајте обувки и чанти — пробајте „мокасина“, „црно“, „торба“…",

    /* hero */
    "Light Steps.": "Лесни чекори.", "FRESH": "СВЕЖ", "STYLE.": "СТИЛ.",
    "Clean sneakers and matching bags": "Чисти патики и чанти што се вклопуваат", "for every version of you.": "за секоја твоја верзија.",
    "Everyday Chic.": "Секојдневна елеганција.", "SOFT": "НЕЖНИ", "TONES.": "БОИ.",
    "Grey sneakers and quilted bags,": "Сиви патики и ватирани чанти,", "styled for the city.": "стилизирани за градот.",
    "City Days.": "Градски денови.", "CLASSIC": "КЛАСИК", "STRIPES.": "ПРУГИ.",
    "Cream suede sneakers and tote bags": "Крем велурени патики и торби", "for every day outside.": "за секој ден надвор.",
    "Sleek Lines.": "Елегантни линии.", "SHARP": "ОСТАР",
    "Glossy chocolate ankle boots": "Сјајни чоколадни половинки", "with a sculpted stiletto heel.": "со обликувана тенка потпетица.",
    "Pure Elegance.": "Чиста елеганција.", "BLACK": "ЦРНИ", "BOOTS.": "ЧИЗМИ.",
    "Black leather knee-high boots with": "Црни кожни чизми до колена со", "a polished silver detail.": "углостен сребрен детаљ.",
    "Rich Tones.": "Богати тонови.", "RICH": "БОГАТО", "BROWN.": "КАФЕ.",
    "Warm brown knee-high boots that": "Топли кафеави чизми до колена што", "finish every winter look.": "го заокружуваат секој зимски аутфит.",
    "Western Spirit.": "Каубојски дух.", "COWBOY": "КАУБОЈ", "CHIC.": "ШИК.",
    "Embroidered suede boots with a": "Везени велурени чизми со", "sculpted block heel.": "обликувана дебела потпетица.",
    "Fold & Style.": "Превиткано и стилско.", "FOLDED": "МЕК", "SUEDE.": "ВЕЛУР.",
    "Cuffed ankle boots in black and": "Половинки со превиткан раб во црна и", "brown, with a delicate strap.": "кафеава боја, со нежна каишка.",
    "Easy Elegance.": "Лесна елеганција.", "BELTED": "СО КАИШ",
    "Soft chocolate suede with a": "Мек чоколаден велур со", "buckled strap detail.": "детал со каишка и тока.",
    "Effortless.": "Без напор.", "SLOUCH": "ОПУШТЕН",
    "Black suede knee-high boots with a": "Црни велурени чизми до колена со", "slim kitten heel.": "тенка ниска потпетица.",
    "New Season": "Нова сезона", "Up to": "До", "Limited time": "Ограничено време", "Winter Edit": "Зимска колекција",
    "Selected styles": "Избрани модели", "Just In": "Штотуку пристигнато",
    "Premium Quality": "Врвен квалитет", "Made to last": "Направено да трае",
    "All-Day Comfort": "Удобност цел ден", "Walk with ease": "Чекорете лесно",
    "Secure Shopping": "Безбедно купување", "Shop with confidence": "Купувајте со доверба",
    "Explore collection": "Разгледај колекција", "Free delivery & easy returns": "Бесплатна достава и лесно враќање",

    /* categories + shop */
    "Browse": "Разгледајте", "Shop by category": "Купувајте по категорија",
    "Everyday comfort": "Секој ден удобно", "Suede & gold detail": "Велур и златен детал", "Evening elegance": "Вечерна елеганција",
    "Ankle, tall & combat": "Високи и борбени", "Totes, crossbody, mini": "Торби, мини, рамо", "Up to 40% off": "До 40% попуст",
    "The collection": "Колекцијата", "Shoes & bags": "Обувки и чанти", "All": "Сè",
    "No products found. Try another category or search.": "Нема пронајдени производи. Пробајте друга категорија или пребарување.",
    "Bestseller": "Најпродавано", "Quick view": "Брз преглед",

    /* editorial */
    "White chunky runners in sharp focus, with white bags softly blurred behind": "Бели дебели патики во фокус, со меко заматени бели чанти позади",
    "The Everyday Set": "Секојдневниот сет", "Made to move.": "Направено за движење.", "Styled to match.": "Стилизирано да се вклопува.",
    "Shop sneakers": "Купи патики", "Shop bags": "Купи чанти",
    "Chunky Runner — Grey": "Дебела патика за трчање — сива", "White Chunky Runner": "Бела дебела патика за трчање",
    "Chunky suede-and-mesh runners with a cushioned sole, paired with a soft quilted crossbody bag. Comfort for the whole day, in calm neutral tones.": "Дебели патики од велур и мрежа со амортизирана подметка, во пар со мека ватирана чанта преку рамо. Удобност за цел ден, во смирени неутрални тонови.",
    "Clean white runners with silver and suede details and a sculpted, cushioned sole, paired with a soft white shoulder bag. Light, fresh and easy to wear all day.": "Чисти бели патики со сребрени и велурени детали и обликувана, амортизирана подметка, во пар со мека бела чанта на рамо. Лесни, свежи и удобни за носење цел ден.",
    "Retro-inspired suede sneakers with chocolate stripes and a cushioned cream platform sole, styled with a grained mini top-handle bag.": "Велурени патики инспирирани од ретро стилот со чоколадни пруги и амортизирана крем платформа подметка, стилизирани со мини чанта со рачка од зрнеста кожа.",
    "Soft taupe suede with ivory stripes and a clean platform sole, paired with a structured neutral tote. Understated, easy and made for every day.": "Мек велур во тауп боја со пруги во боја на слонова коска и чиста платформа подметка, во пар со структурирана неутрална торба. Суптилни, лесни и направени за секој ден.",
    "Materials": "Материјали", "Breathable mesh and soft suede-effect uppers, cushioned sole.": "Воздушна мрежа и мек горен дел со велур ефект, амортизирана подметка.",
    "Sizing": "Големини", "Sizes 36–41, true to size. Size up if between sizes.": "Големини 36–41, точни по мерка. Земете поголема ако сте помеѓу две.",
    "Delivery": "Достава", "Free over $150. Arrives in 2–4 working days.": "Бесплатна над $150. Пристигнува за 2–4 работни дена.",
    "Returns": "Враќање", "Free returns within 30 days of delivery.": "Бесплатно враќање во рок од 30 дена по доставата.",
    "Care": "Одржување", "Wipe clean with a damp cloth and brush suede gently.": "Избришете со влажна крпа и четкајте го велурот нежно.",
    "Brands we carry": "Брендови што ги нудиме", "Choose a photo": "Изберете слика",
    "Sneakers in sharp focus, shown one after another": "Патики во фокус, прикажани една по друга",

    /* colours */
    "White": "Бела", "Silver": "Сребрена", "Grey": "Сива", "Brown": "Кафеава", "Cream": "Крем", "Chocolate": "Чоколадна", "Beige": "Беж",
    "Taupe": "Тауп", "Ivory": "Слонова коска", "Sand": "Песочна", "Black": "Црна", "Camel": "Камел", "Espresso": "Еспресо", "One size": "Една големина",

    /* sale */
    "The Winter Sale": "Зимски попуст", "40% off": "40% попуст", "on selected shoes and bags. Offer ends in:": "на избрани обувки и чанти. Понудата истекува за:",
    "Days": "Денови", "Hours": "Часови", "Min": "Мин", "Sec": "Сек",

    /* contact */
    "Visit us": "Посетете не", "Step into our boutique to try on the new collection, get sizing advice and find your perfect pair.": "Дојдете во нашиот бутик да ја пробате новата колекција, да добиете совет за големина и да го најдете вашиот совршен пар.",
    "Call us": "Јавете ни се", "Questions about an order, a size or a delivery? Our team is happy to help, Monday to Saturday.": "Прашања за нарачка, големина или достава? Нашиот тим со задоволство ќе помогне, од понеделник до сабота.",
    "Contact us": "Контактирајте не", "Write to us any time. We reply within one working day, with styling tips and order help.": "Пишете ни во секое време. Одговараме во рок од еден работен ден, со совети за стил и помош за нарачки.",
    "Map showing the Covery Shoes boutique": "Мапа што го прикажува бутикот Covery Shoes",
    "OLD GARDEN": "СТАРА ГРАДИНА", "RIVERSIDE": "КРАЈБРЕЖЈЕ", "MARKET STREET": "ПАЗАРНА УЛИЦА", "BOUTIQUE ROW": "БУТИК РЕД",
    "Zoom in": "Зголеми", "Zoom out": "Намали", "Centre on the boutique": "Центрирај на бутикот",
    "Shoes & bags boutique": "Бутик за обувки и чанти", "Directions": "Насоки", "Call": "Повикај",

    /* footer */
    "Elegant shoes and bags, made to be worn every day.": "Елегантни обувки и чанти, направени за секојдневно носење.",
    "Shop": "Продавница", "Help": "Помош", "Size guide": "Водич за големини", "Company": "Компанија",
    "About Covery": "За Covery", "Craftsmanship": "Занает", "Stores": "Продавници",
    "© 2026 Covery Shoes. All rights reserved.": "© 2026 Covery Shoes. Сите права се задржани.",

    /* product window, favorites, messages */
    "Close": "Затвори", "Previous picture": "Претходна слика", "Next picture": "Следна слика", "Add to favorites": "Додај во омилени",
    "In your favorites": "Во омилени", "Remove": "Отстрани", "Color:": "Боја:", "Size": "Големина",
    "Free delivery": "Бесплатна достава", "on orders over $150": "за нарачки над $150",
    "Free returns": "Бесплатно враќање", "within 30 days": "во рок од 30 дена",
    "Buy 2 pairs": "Купи 2 пара", "and get an extra 10% off": "и добиј дополнителни 10% попуст",
    "Your favorites": "Вашите омилени", "No favorites yet.": "Сè уште нема омилени.",
    "Tap the heart on any product to save it here.": "Допрете го срцето на кој било производ за да го зачувате тука.",
    "Removed from favorites": "Отстрането од омилени",
    "Thank you! Your 10% code is on its way.": "Ви благодариме! Вашиот код за 10% е на пат.",

    /* days */
    "Sunday": "недела", "Monday": "понеделник", "Tuesday": "вторник", "Wednesday": "среда", "Thursday": "четврток", "Friday": "петок", "Saturday": "сабота",

    /* products: names */
    "Camel Suede Loafer": "Велурена мокасина во боја на камила", "Horsebit Suede Loafer": "Велурена мокасина со коњска тока",
    "Retro Stripe Sneaker": "Ретро патика со пруги", "Taupe Suede Sneaker": "Велурена патика во тауп боја",
    "Chunky Runner — White": "Дебела патика за трчање — бела",
    "Satin Ankle-Strap Pump": "Сатенска пумпа со каиш околу глуждот", "Block-Heel Ankle Boot": "Половинка со дебела потпетица",
    "Knee-High Riding Boot": "Јавачка чизма до колена", "Gold-Eyelet Combat Boot": "Борбена чизма со златни алки",
    "Stiletto Sock Boot": "Чизма-чорап со тенка потпетица", "Slouch Suede Boot — Taupe": "Опуштена велурена чизма — тауп",
    "Slouch Suede Boot — Chocolate": "Опуштена велурена чизма — чоколадна", "Quilted Crossbody Bag": "Ватирана чанта преку рамо",
    "Mini Top-Handle Tote": "Мини торба со рачки", "Structured Flap Bag": "Структурирана чанта со преклоп",
    "Suede Handbag Set": "Сет велурени рачни чанти", "Buckle Shoulder Bag": "Чанта на рамо со тока",

    /* products: descriptions */
    "Soft suede loafer with a flexible sole and a delicate metal detail. Light enough to wear all day, smart enough for the office.": "Мека велурена мокасина со флексибилна подметка и нежен метален детал. Доволно лесна за носење цел ден, доволно елегантна за канцеларија.",
    "A timeless loafer with a polished gold horsebit and soft stitched toe. Lined in black leather for a clean finish.": "Бескрајна мокасина со углостена златна тока и мека шиена шпица. Постава од црна кожа за чист финиш.",
    "Retro-inspired suede sneaker with chocolate stripes and a cushioned cream platform sole. Pairs with everything.": "Велурена патика инспирирана од ретро стилот со чоколадни пруги и амортизирана крем платформа подметка. Се вклопува со сè.",
    "Understated taupe suede with ivory stripes and a soft platform sole. A neutral you will reach for every day.": "Суптилен велур во тауп боја со пруги во боја на слонова коска и мека платформа подметка. Неутрална боја што ќе ја облекувате секој ден.",
    "Layered suede and mesh with a sculpted white sole. Built for comfort on long days out.": "Слоеви велур и мрежа со обликувана бела подметка. Создадена за удобност во долги денови надвор.",
    "Clean white runner with silver accents and a sculpted sole. Light, breathable and easy to style.": "Чиста бела патика со сребрени акценти и обликувана подметка. Лесна, воздушна и лесна за комбинирање.",
    "Pointed satin pump with an adjustable ankle strap and a sculpted heel. Made for dinners and special evenings.": "Шилеста сатенска пумпа со прилагодлива каишка околу глуждот и обликувана потпетица. Направена за вечери и посебни прилики.",
    "Smooth leather-look ankle boot with a pointed toe and a comfortable block heel. Side zip for easy wear.": "Мазна половинка со изглед на кожа, шилеста шпица и удобна дебела потпетица. Странично затворање за лесно облекување.",
    "Tall riding boot with a side zip and a grippy lug sole. Polished and practical all winter.": "Висока јавачка чизма со странично затворање и подметка со добро сцепување. Елегантна и практична цела зима.",
    "Lace-up boot with gold eyelets, a side zip and a chunky sole. A statement piece for cooler days.": "Чизма со врзување, златни алки, странично затворање и дебела подметка. Атрактивен комад за поладните денови.",
    "Close-fitting stretch ankle boot with a slim stiletto heel. Sleek from every angle.": "Тесна еластична половинка со тенка потпетица. Елегантна од секој агол.",
    "Soft suede boot with a relaxed slouch shaft, stitched trim and a pointed kitten heel.": "Мека велурена чизма со опуштен горен дел, шиен раб и шилеста ниска потпетица.",
    "Rich chocolate suede with a relaxed slouch and delicate stitched edge. Easy to dress up or down.": "Богат чоколаден велур со опуштен кроj и нежен шиен раб. Лесно се комбинира свечено или секојдневно.",
    "Soft quilted bag with a gold clasp and an adjustable strap. Wear it across the body or on the shoulder.": "Мека ватирана чанта со златна копча и прилагодлива каишка. Носете ја преку рамо или на рамо.",
    "Compact grained-leather tote with contrast handles and a snap flap. Fits your essentials, nothing more.": "Компактна торба од зрнеста кожа со контрастни рачки и преклоп со копче. Собира само најнужното.",
    "Clean white flap bag with a slim shoulder strap and a silver detail. Pairs with the white runner.": "Чиста бела чанта со преклоп, тенка каишка за рамо и сребрен детаљ. Одлично оди со белата патика.",
    "Textured handbag with matching chain clutch. Wear them together or separately.": "Рачна чанта со текстура и соодветна клач-чанта со ланец. Носете ги заедно или одделно.",
    "Suede and leather-look baguette with a gold buckle and a rolled shoulder strap.": "Багет чанта од велур и материјал со изглед на кожа, со златна тока и свиткана каишка за рамо."
  };

  const CATWORDS = { sneakers: "патики патика", loafers: "мокасини мокасина", heels: "потпетици потпетица пумпа", boots: "чизми чизма половинки", bags: "чанти чанта торба торби" };
  const norm = s => s.replace(/\s+/g, " ").trim();

  // translate a (possibly combined) colour like "Cream & Brown"
  const part = s => D[s] || s;
  const RULES = [
    [/^(\d+)% OFF$/, m => m[1] + "% ПОПУСТ"],
    [/^−?(\d+)%$/, null],
    [/^Save (\d+)%$/, m => "Заштедете " + m[1] + "%"],
    [/^Slide (\d+)$/, m => "Слајд " + m[1]],
    [/^Picture (\d+)$/, m => "Слика " + m[1]],
    [/^In focus · (.+)$/, m => "Во фокус · " + tr(m[1])],
    [/^Sneakers from (\$\d+) · Bags from (\$\d+)$/, m => "Патики од " + m[1] + " · Чанти од " + m[2]],
    [/^· closes in (\d+) min$/, m => "· затвора за " + m[1] + " мин"],
    [/^· closes at (.+)$/, m => "· затвора во " + m[1]],
    [/^· opens today at (.+)$/, m => "· отвора денес во " + m[1]],
    [/^· opens tomorrow at (.+)$/, m => "· отвора утре во " + m[1]],
    [/^· opens (\w+) at (.+)$/, m => "· отвора во " + part(m[1]) + " во " + m[2]],
    [/^· was (.+)$/, m => "· беше " + m[1]],
    [/^Added to favorites ♥ (.+)$/, m => "Додадено во омилени ♥ " + tr(m[1])],
    [/^(.+) view (\d+)$/, m => tr(m[1]) + " — слика " + m[2]],
    [/^(.+) & (.+)$/, m => (D[m[1]] || m[1]) + " и " + (D[m[2]] || m[2]).toLowerCase()],
    [/^Show (.+)$/, m => "Прикажи: " + tr(m[1])]
  ].filter(r => r[1]);

  function tr(text) {
    const n = norm(text);
    if (!n) return text;
    if (D[n]) return D[n];
    for (const [re, fn] of RULES) { const m = n.match(re); if (m) return fn(m); }
    return text;
  }
  function trKeep(raw) {          // keep the spaces around the text
    const n = norm(raw);
    if (!n || /[Ѐ-ӿ]/.test(n)) return raw;
    const out = tr(raw);
    if (out === raw) return raw;
    return (raw.match(/^\s*/)[0]) + out + (raw.match(/\s*$/)[0]);
  }

  const ATTRS = ["alt", "placeholder", "aria-label", "title"];
  function fixNode(n) {
    if (n.nodeType === 3) {
      const p = n.parentNode && n.parentNode.nodeName;
      if (p === "SCRIPT" || p === "STYLE") return;
      const out = trKeep(n.nodeValue); if (out !== n.nodeValue) n.nodeValue = out;
    } else if (n.nodeType === 1) {
      ATTRS.forEach(a => {
        if (n.hasAttribute(a)) { const v = n.getAttribute(a), o = trKeep(v); if (o !== v) n.setAttribute(a, o); }
      });
    }
  }
  function walk(root) {
    fixNode(root);
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) fixNode(n);
  }

  /* the switch itself */
  const box = document.getElementById("lang");
  if (box) {
    [...box.querySelectorAll("button")].forEach(b => {
      b.classList.toggle("on", b.dataset.l === lang);
      b.addEventListener("click", () => {
        if (b.dataset.l === lang) return;
        try { localStorage.setItem(KEY, b.dataset.l); } catch (e) {}
        location.reload();
      });
    });
  }

  /* search in Macedonian too: gives app.js extra words for every product */
  window.i18nSearchText = p => lang !== "mk" ? "" :
    [D[p.name] || "", D[p.desc] || "", CATWORDS[p.cat] || "", p.colors.map(c => tr(c)).join(" ")].join(" ");

  if (lang !== "mk") return;
  document.documentElement.lang = "mk";
  document.title = "Covery Shoes — Обувки и чанти";
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", "Covery Shoes: елегантни обувки и чанти за жени и мажи.");

  walk(document.body);
  new MutationObserver(recs => {
    for (const r of recs) {
      if (r.type === "childList") r.addedNodes.forEach(walk);
      else if (r.type === "characterData") fixNode(r.target);
      else if (r.type === "attributes") fixNode(r.target);
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
})();
