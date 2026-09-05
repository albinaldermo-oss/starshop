/* Star Shop – produktdata
 * Genererar ett stort sortiment av billiga klädesplagg, med tonvikt på herrmode.
 *
 * BYTA BILDER SJÄLV – två sätt:
 *
 * 1) En specifik produkt (t.ex. bara den svarta T-shirten):
 *    Lägg till en rad i CUSTOM_IMAGES nedan med produktens exakta namn och
 *    din bild-URL. Detta vinner alltid över allt annat.
 *
 * 2) Alla färger av en hel plaggtyp på en gång:
 *    Varje rad i MEN_BASE/WOMEN_BASE/KIDS_BASE/ACCESSORIES_BASE längre ner har
 *    ett fjärde fält (t.ex. 'tshirt,man'). Byt ut det mot din egen bild-URL
 *    (måste börja med http:// eller https://) så används den för alla färger
 *    av just det plagget.
 */

const CUSTOM_IMAGES = {
  // 'Oversized T-shirt – Svart': 'https://din-sida.se/bilder/svart-tshirt.jpg',
  // 'Hoodie med luva – Vit': 'https://din-sida.se/bilder/vit-hoodie.jpg',
};

const COLORS = ['Svart', 'Vit', 'Grå', 'Marinblå', 'Khaki', 'Beige', 'Röd', 'Militärgrön', 'Brun'];

function imageForKeyword(keyword, lockId) {
  if (/^https?:\/\//i.test(keyword)) {
    return keyword;
  }
  return `https://loremflickr.com/500/650/${keyword}/all?lock=${lockId}`;
}

function discountForIndex(i) {
  const table = [40, 50, 55, 60, 65, 70, 75, 80, 45, 50];
  return table[i % table.length];
}

function soldForIndex(i) {
  return 300 + ((i * 137) % 9700);
}

function ratingForIndex(i) {
  const table = [4.3, 4.5, 4.6, 4.7, 4.8, 4.9, 4.4];
  return table[i % table.length];
}

function stockLeftForIndex(i) {
  return i % 3 === 0 ? 2 + ((i * 7) % 8) : null;
}

function viewersForIndex(i) {
  return 3 + ((i * 11) % 40);
}

let __id = 1;

function makeVariants(baseName, category, basePrice, badge, colorCount, keyword) {
  const items = [];
  for (let c = 0; c < colorCount; c++) {
    const color = COLORS[c % COLORS.length];
    const name = `${baseName} – ${color}`;
    const index = __id;
    const discount = discountForIndex(index);
    const price = basePrice;
    const oldPrice = Math.round(price / (1 - discount / 100));
    items.push({
      id: __id++,
      name,
      category,
      price,
      oldPrice,
      discount,
      image: CUSTOM_IMAGES[name] || imageForKeyword(keyword, index),
      rating: ratingForIndex(index),
      sold: soldForIndex(index),
      stockLeft: stockLeftForIndex(index),
      viewers: viewersForIndex(index),
      badge: badge || null,
    });
  }
  return items;
}

const MEN_BASE = [
  ['Oversized T-shirt', 19, 'BÄST SÄLJANDE', 'tshirt,man'],
  ['Grafisk T-shirt', 25, null, 'tshirt,graphic'],
  ['Linne', 15, null, 'tanktop,man'],
  ['Hoodie med luva', 59, null, 'hoodie,man'],
  ['Zip-hoodie', 65, null, 'hoodie,zipper'],
  ['Basic Sweatshirt', 45, null, 'sweatshirt,man'],
  ['Cargobyxor', 75, 'TRENDIGT', 'cargopants'],
  ['Joggingbyxor', 55, null, 'joggers,pants'],
  ['Slim Fit Jeans', 89, null, 'jeans,man'],
  ['Straight Fit Jeans', 95, null, 'jeans,denim'],
  ['Chinos', 69, null, 'chinos,pants'],
  ['Shorts', 35, null, 'shorts,man'],
  ['Badshorts', 29, null, 'swimshorts'],
  ['Bomberjacka', 119, null, 'bomberjacket'],
  ['Vindjacka', 109, null, 'windbreaker'],
  ['Vinterjacka', 159, 'NYHET', 'winterjacket'],
  ['Piké-tröja', 39, null, 'poloshirt'],
  ['Flanellskjorta', 55, null, 'flannel,shirt'],
  ['Stickad tröja', 65, null, 'sweater,knit'],
  ['Träningsset', 95, null, 'tracksuit'],
];

const MEN_BASE2 = [
  ['Kortärmad Skjorta', 39, null, 'shirt,man'],
  ['Långärmad Skjorta', 45, null, 'shirt,formal'],
  ['Kostym Blazer', 179, 'NYHET', 'blazer,suit'],
  ['Kostymbyxor', 109, null, 'suitpants'],
  ['Väst', 79, null, 'vest,man'],
  ['Fleecetröja', 69, null, 'fleece,jacket'],
  ['Softshelljacka', 129, null, 'softshell,jacket'],
  ['Parkas', 179, 'NYHET', 'parka'],
  ['Skinnjacka', 159, 'TRENDIGT', 'leatherjacket'],
  ['Jeansjacka', 139, null, 'denimjacket'],
  ['Sportjacka', 89, null, 'trackjacket'],
  ['Regnjacka', 99, null, 'raincoat'],
  ['Träningsjacka', 85, null, 'trackjacket,sport'],
  ['Träningsbyxor', 65, null, 'sweatpants,sport'],
  ['Muscle Fit T-shirt', 25, 'BÄST SÄLJANDE', 'tshirt,fitness'],
  ['Långärmad Tröja', 35, null, 'longsleeve'],
  ['Termotröja', 45, null, 'thermal,shirt'],
  ['Underställ Set', 69, null, 'thermal,underwear'],
  ['Boxershorts Single', 19, null, 'boxershorts'],
  ['Linnetröja', 85, null, 'linen,shirt'],
  ['Denimskjorta', 75, null, 'denim,shirt'],
  ['Ledig Skjorta', 59, null, 'shirt,casual'],
  ['Sweatpants Set', 99, null, 'sweatpants,man'],
  ['Vindtät Väst', 89, null, 'vest,windproof'],
  ['Cargo Shorts', 45, null, 'cargoshorts'],
  ['Träningströja Mesh', 39, null, 'sportshirt,mesh'],
  ['Kofta', 79, null, 'cardigan'],
  ['Rugbytröja', 65, null, 'rugbyshirt'],
  ['Termobyxor', 59, null, 'thermalpants'],
  ['Höstjacka', 119, 'NYHET', 'autumnjacket'],
];

const WOMEN_BASE = [
  ['Sommarklänning', 59, 'NYHET', 'dress,summer'],
  ['Croppad tröja', 25, null, 'croptop'],
  ['High Waist Jeans', 89, null, 'jeans,woman'],
  ['Leggings', 39, null, 'leggings'],
  ['Oversized Hoodie', 65, null, 'hoodie,woman'],
  ['Kjol', 45, null, 'skirt'],
  ['Blus', 39, null, 'blouse'],
  ['Linne', 19, null, 'tanktop,woman'],
];

const KIDS_BASE = [
  ['Barn T-shirt', 15, null, 'tshirt,kid'],
  ['Barn Joggingbyxor', 29, null, 'pants,kid'],
  ['Barn Hoodie', 45, null, 'hoodie,kid'],
  ['Barn Klänning', 39, null, 'dress,kid'],
];

const ACCESSORIES_BASE = [
  ['Keps', 19, null, 'cap'],
  ['Mössa', 15, null, 'beanie'],
  ['Bälte', 25, null, 'belt'],
  ['Solglasögon', 29, 'TRENDIGT', 'sunglasses'],
  ['Strumpor 7-pack', 35, null, 'socks'],
  ['Boxershorts 5-pack', 45, null, 'boxershorts'],
  ['Axelremsväska', 65, null, 'bag,shoulder'],
  ['Armbandsur', 89, null, 'wristwatch'],
];

let PRODUCTS = [];

MEN_BASE.forEach(([name, price, badge, keyword], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'herr', price, badge, 2 + (i % 3), keyword));
});

MEN_BASE2.forEach(([name, price, badge, keyword], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'herr', price, badge, 2 + (i % 4), keyword));
});

WOMEN_BASE.forEach(([name, price, badge, keyword], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'dam', price, badge, 2 + (i % 2), keyword));
});

KIDS_BASE.forEach(([name, price, badge, keyword], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'barn', price, badge, 2, keyword));
});

ACCESSORIES_BASE.forEach(([name, price, badge, keyword], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'accessoarer', price, badge, 1 + (i % 2), keyword));
});
