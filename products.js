// Product data. Pictures live in /images. The first picture is the card photo;
// the others appear in the product gallery (left / right arrows).
const SHOE_SIZES = ["36", "37", "38", "39", "40", "41"];
const BAG_SIZES = ["One size"];

const CATEGORIES = [
  { id: "sneakers", name: "Sneakers", img: "images/p03.jpg", note: "Everyday comfort" },
  { id: "loafers",  name: "Loafers",  img: "images/p05.jpg", note: "Suede & gold detail" },
  { id: "heels",    name: "Heels",    img: "images/p07.jpg", note: "Evening elegance" },
  { id: "boots",    name: "Boots",    img: "images/p10.jpg", note: "Ankle, tall & combat" },
  { id: "bags",     name: "Bags",     img: "images/p04.jpg", note: "Totes, crossbody, mini" },
  { id: "sale",     name: "Sale",     img: "images/p12.jpg", note: "Up to 40% off", link: "#sale" }
];

const PRODUCTS = [
  {
    id: 1, name: "Camel Suede Loafer", cat: "loafers", price: 89, old: 119, badge: "sale",
    images: ["images/p01.jpg", "images/p06.jpg", "images/p05.jpg"],
    colors: ["Camel", "Black"], sizes: SHOE_SIZES, tag: "Bestseller",
    desc: "Soft suede loafer with a flexible sole and a delicate metal detail. Light enough to wear all day, smart enough for the office."
  },
  {
    id: 2, name: "Horsebit Suede Loafer", cat: "loafers", price: 99, badge: "best",
    images: ["images/p05.jpg", "images/p06.jpg", "images/p01.jpg"],
    colors: ["Beige", "Black", "Chocolate"], sizes: SHOE_SIZES,
    desc: "A timeless loafer with a polished gold horsebit and soft stitched toe. Lined in black leather for a clean finish."
  },
  {
    id: 3, name: "Retro Stripe Sneaker", cat: "sneakers", price: 109, badge: "new",
    images: ["images/p02.jpg", "images/p03.jpg"],
    colors: ["Cream & Brown"], sizes: SHOE_SIZES,
    desc: "Retro-inspired suede sneaker with chocolate stripes and a cushioned cream platform sole. Pairs with everything."
  },
  {
    id: 4, name: "Taupe Suede Sneaker", cat: "sneakers", price: 109, badge: "new",
    images: ["images/p03.jpg", "images/p02.jpg"],
    colors: ["Taupe & Ivory"], sizes: SHOE_SIZES,
    desc: "Understated taupe suede with ivory stripes and a soft platform sole. A neutral you will reach for every day."
  },
  {
    id: 5, name: "Chunky Runner — Grey", cat: "sneakers", price: 129, old: 159, badge: "sale",
    images: ["images/p04.jpg", "images/p00.jpg"],
    colors: ["Grey & Chocolate"], sizes: SHOE_SIZES,
    desc: "Layered suede and mesh with a sculpted white sole. Built for comfort on long days out."
  },
  {
    id: 6, name: "Chunky Runner — White", cat: "sneakers", price: 129, badge: "best",
    images: ["images/p00.jpg", "images/p04.jpg"],
    colors: ["White & Silver"], sizes: SHOE_SIZES,
    desc: "Clean white runner with silver accents and a sculpted sole. Light, breathable and easy to style."
  },
  {
    id: 7, name: "Satin Ankle-Strap Pump", cat: "heels", price: 94, badge: "new",
    images: ["images/p07.jpg", "images/p08.jpg"],
    colors: ["Espresso"], sizes: SHOE_SIZES,
    desc: "Pointed satin pump with an adjustable ankle strap and a sculpted heel. Made for dinners and special evenings."
  },
  {
    id: 8, name: "Block-Heel Ankle Boot", cat: "boots", price: 119, old: 149, badge: "sale",
    images: ["images/p08.jpg", "images/p11.jpg", "images/p10.jpg"],
    colors: ["Chocolate"], sizes: SHOE_SIZES,
    desc: "Smooth leather-look ankle boot with a pointed toe and a comfortable block heel. Side zip for easy wear."
  },
  {
    id: 9, name: "Knee-High Riding Boot", cat: "boots", price: 159, badge: "best",
    images: ["images/p09.jpg", "images/p10.jpg"],
    colors: ["Brown", "Black"], sizes: SHOE_SIZES,
    desc: "Tall riding boot with a side zip and a grippy lug sole. Polished and practical all winter."
  },
  {
    id: 10, name: "Gold-Eyelet Combat Boot", cat: "boots", price: 129, badge: "new",
    images: ["images/p10.jpg", "images/p09.jpg"],
    colors: ["Chocolate"], sizes: SHOE_SIZES,
    desc: "Lace-up boot with gold eyelets, a side zip and a chunky sole. A statement piece for cooler days."
  },
  {
    id: 11, name: "Stiletto Sock Boot", cat: "boots", price: 134,
    images: ["images/p11.jpg", "images/p08.jpg"],
    colors: ["Espresso"], sizes: SHOE_SIZES,
    desc: "Close-fitting stretch ankle boot with a slim stiletto heel. Sleek from every angle."
  },
  {
    id: 12, name: "Slouch Suede Boot — Taupe", cat: "boots", price: 124, old: 169, badge: "sale",
    images: ["images/p12.jpg", "images/p13.jpg"],
    colors: ["Taupe"], sizes: SHOE_SIZES,
    desc: "Soft suede boot with a relaxed slouch shaft, stitched trim and a pointed kitten heel."
  },
  {
    id: 13, name: "Slouch Suede Boot — Chocolate", cat: "boots", price: 124, badge: "new",
    images: ["images/p13.jpg", "images/p12.jpg"],
    colors: ["Chocolate"], sizes: SHOE_SIZES,
    desc: "Rich chocolate suede with a relaxed slouch and delicate stitched edge. Easy to dress up or down."
  },
  {
    id: 14, name: "Quilted Crossbody Bag", cat: "bags", price: 79, old: 99, badge: "sale",
    images: ["images/p04.jpg", "images/p00.jpg"],
    colors: ["Grey"], sizes: BAG_SIZES,
    desc: "Soft quilted bag with a gold clasp and an adjustable strap. Wear it across the body or on the shoulder."
  },
  {
    id: 15, name: "Mini Top-Handle Tote", cat: "bags", price: 85, badge: "new",
    images: ["images/p02.jpg", "images/p03.jpg"],
    colors: ["Brown", "Beige"], sizes: BAG_SIZES,
    desc: "Compact grained-leather tote with contrast handles and a snap flap. Fits your essentials, nothing more."
  },
  {
    id: 16, name: "Structured Flap Bag", cat: "bags", price: 82, badge: "best",
    images: ["images/p00.jpg", "images/p04.jpg"],
    colors: ["White"], sizes: BAG_SIZES,
    desc: "Clean white flap bag with a slim shoulder strap and a silver detail. Pairs with the white runner."
  },
  {
    id: 17, name: "Suede Handbag Set", cat: "bags", price: 110, old: 140, badge: "sale",
    images: ["images/p06.jpg", "images/p01.jpg"],
    colors: ["Chocolate", "Black"], sizes: BAG_SIZES,
    desc: "Textured handbag with matching chain clutch. Wear them together or separately."
  },
  {
    id: 18, name: "Buckle Shoulder Bag", cat: "bags", price: 76,
    images: ["images/p08.jpg", "images/p07.jpg"],
    colors: ["Chocolate"], sizes: BAG_SIZES,
    desc: "Suede and leather-look baguette with a gold buckle and a rolled shoulder strap."
  }
];
