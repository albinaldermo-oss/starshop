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
  ['Oversized T-shirt', 49, 'BÄST SÄLJANDE', 'tshirt,man'],
  ['Grafisk T-shirt', 55, null, 'tshirt,graphic'],
  ['Linne', 39, null, 'tanktop,man'],
  ['Hoodie med luva', 129, null, 'hoodie,man'],
  ['Zip-hoodie', 139, null, 'hoodie,zipper'],
  ['Basic Sweatshirt', 99, null, 'sweatshirt,man'],
  ['Cargobyxor', 159, 'TRENDIGT', 'cargopants'],
  ['Joggingbyxor', 119, null, 'joggers,pants'],
  ['Slim Fit Jeans', 179, null, 'jeans,man'],
  ['Straight Fit Jeans', 189, null, 'jeans,denim'],
  ['Chinos', 149, null, 'chinos,pants'],
  ['Shorts', 79, null, 'shorts,man'],
  ['Badshorts', 69, null, 'swimshorts'],
  ['Bomberjacka', 249, null, 'bomberjacket'],
  ['Vindjacka', 229, null, 'windbreaker'],
  ['Vinterjacka', 349, 'NYHET', 'winterjacket'],
  ['Piké-tröja', 89, null, 'poloshirt'],
  ['Flanellskjorta', 119, null, 'flannel,shirt'],
  ['Stickad tröja', 139, null, 'sweater,knit'],
  ['Träningsset', 199, null, 'tracksuit'],
];

const MEN_BASE2 = [
  ['Kortärmad Skjorta', 89, null, 'shirt,man'],
  ['Långärmad Skjorta', 99, null, 'shirt,formal'],
  ['Kostym Blazer', 399, 'NYHET', 'blazer,suit'],
  ['Kostymbyxor', 249, null, 'suitpants'],
  ['Väst', 179, null, 'vest,man'],
  ['Fleecetröja', 149, null, 'fleece,jacket'],
  ['Softshelljacka', 279, null, 'softshell,jacket'],
  ['Parkas', 399, 'NYHET', 'parka'],
  ['Skinnjacka', 349, 'TRENDIGT', 'leatherjacket'],
  ['Jeansjacka', 299, null, 'denimjacket'],
  ['Sportjacka', 199, null, 'trackjacket'],
  ['Regnjacka', 229, null, 'raincoat'],
  ['Träningsjacka', 189, null, 'trackjacket,sport'],
  ['Träningsbyxor', 149, null, 'sweatpants,sport'],
  ['Muscle Fit T-shirt', 59, 'BÄST SÄLJANDE', 'tshirt,fitness'],
  ['Långärmad Tröja', 79, null, 'longsleeve'],
  ['Termotröja', 99, null, 'thermal,shirt'],
  ['Underställ Set', 149, null, 'thermal,underwear'],
  ['Boxershorts Single', 49, null, 'boxershorts'],
  ['Linnetröja', 189, null, 'linen,shirt'],
  ['Denimskjorta', 159, null, 'denim,shirt'],
  ['Ledig Skjorta', 129, null, 'shirt,casual'],
  ['Sweatpants Set', 219, null, 'sweatpants,man'],
  ['Vindtät Väst', 199, null, 'vest,windproof'],
  ['Cargo Shorts', 99, null, 'cargoshorts'],
  ['Träningströja Mesh', 89, null, 'sportshirt,mesh'],
  ['Kofta', 179, null, 'cardigan'],
  ['Rugbytröja', 139, null, 'rugbyshirt'],
  ['Termobyxor', 129, null, 'thermalpants'],
  ['Höstjacka', 259, 'NYHET', 'autumnjacket'],
];

const WOMEN_BASE = [
  ['Sommarklänning', 129, 'NYHET', 'dress,summer'],
  ['Croppad tröja', 59, null, 'croptop'],
  ['High Waist Jeans', 179, null, 'jeans,woman'],
  ['Leggings', 89, null, 'leggings'],
  ['Oversized Hoodie', 139, null, 'hoodie,woman'],
  ['Kjol', 99, null, 'skirt'],
  ['Blus', 89, null, 'blouse'],
  ['Linne', 45, null, 'tanktop,woman'],
];

const KIDS_BASE = [
  ['Barn T-shirt', 39, null, 'tshirt,kid'],
  ['Barn Joggingbyxor', 69, null, 'pants,kid'],
  ['Barn Hoodie', 99, null, 'hoodie,kid'],
  ['Barn Klänning', 89, null, 'dress,kid'],
];

const ACCESSORIES_BASE = [
  ['Keps', 49, null, 'cap'],
  ['Mössa', 39, null, 'beanie'],
  ['Bälte', 59, null, 'belt'],
  ['Solglasögon', 69, 'TRENDIGT', 'sunglasses'],
  ['Strumpor 7-pack', 79, null, 'socks'],
  ['Boxershorts 5-pack', 99, null, 'boxershorts'],
  ['Axelremsväska', 149, null, 'bag,shoulder'],
  ['Armbandsur', 199, null, 'wristwatch'],
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
