/* Star Shop – produktdata
 * Genererar ett stort sortiment av billiga klädesplagg, med tonvikt på herrmode.
 * Produktbilder hämtas som riktiga foton från LoremFlickr (Flickr-foton matchade
 * mot sökord, låst per produkt-id så samma bild alltid visas för samma produkt).
 */

const COLORS = ['Svart', 'Vit', 'Grå', 'Marinblå', 'Khaki', 'Beige', 'Röd', 'Militärgrön', 'Brun'];

function imageForKeyword(keyword, lockId) {
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
      image: imageForKeyword(keyword, index),
      rating: ratingForIndex(index),
      sold: soldForIndex(index),
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

WOMEN_BASE.forEach(([name, price, badge, keyword], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'dam', price, badge, 2 + (i % 2), keyword));
});

KIDS_BASE.forEach(([name, price, badge, keyword], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'barn', price, badge, 2, keyword));
});

ACCESSORIES_BASE.forEach(([name, price, badge, keyword], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'accessoarer', price, badge, 1 + (i % 2), keyword));
});
