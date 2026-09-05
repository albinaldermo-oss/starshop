/* Star Shop – produktdata
 * Genererar ett stort sortiment av billiga klädesplagg, med tonvikt på herrmode.
 */

const COLORS = ['Svart', 'Vit', 'Grå', 'Marinblå', 'Khaki', 'Beige', 'Röd', 'Militärgrön', 'Brun'];

const CATEGORY_STYLE = {
  herr: { from: '#2b2f36', to: '#4a5568', emoji: '👔' },
  dam: { from: '#c2477b', to: '#f2709c', emoji: '👗' },
  barn: { from: '#2fa66b', to: '#7be495', emoji: '🧸' },
  accessoarer: { from: '#d1892f', to: '#f5b942', emoji: '🕶️' },
};

function placeholderImage(category, index) {
  const style = CATEGORY_STYLE[category] || CATEGORY_STYLE.herr;
  const angle = (index * 47) % 360;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='650'>` +
    `<defs><linearGradient id='g' gradientTransform='rotate(${angle})'>` +
    `<stop offset='0' stop-color='${style.from}'/><stop offset='1' stop-color='${style.to}'/>` +
    `</linearGradient></defs>` +
    `<rect width='500' height='650' fill='url(#g)'/>` +
    `<text x='50%' y='50%' font-size='170' text-anchor='middle' dominant-baseline='central'>${style.emoji}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
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

function makeVariants(baseName, category, basePrice, badge, colorCount) {
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
      image: placeholderImage(category, index),
      rating: ratingForIndex(index),
      sold: soldForIndex(index),
      badge: badge || null,
    });
  }
  return items;
}

const MEN_BASE = [
  ['Oversized T-shirt', 49, 'BÄST SÄLJANDE'],
  ['Grafisk T-shirt', 55, null],
  ['Linne', 39, null],
  ['Hoodie med luva', 129, null],
  ['Zip-hoodie', 139, null],
  ['Basic Sweatshirt', 99, null],
  ['Cargobyxor', 159, 'TRENDIGT'],
  ['Joggingbyxor', 119, null],
  ['Slim Fit Jeans', 179, null],
  ['Straight Fit Jeans', 189, null],
  ['Chinos', 149, null],
  ['Shorts', 79, null],
  ['Badshorts', 69, null],
  ['Bomberjacka', 249, null],
  ['Vindjacka', 229, null],
  ['Vinterjacka', 349, 'NYHET'],
  ['Piké-tröja', 89, null],
  ['Flanellskjorta', 119, null],
  ['Stickad tröja', 139, null],
  ['Träningsset', 199, null],
];

const WOMEN_BASE = [
  ['Sommarklänning', 129, 'NYHET'],
  ['Croppad tröja', 59, null],
  ['High Waist Jeans', 179, null],
  ['Leggings', 89, null],
  ['Oversized Hoodie', 139, null],
  ['Kjol', 99, null],
  ['Blus', 89, null],
  ['Linne', 45, null],
];

const KIDS_BASE = [
  ['Barn T-shirt', 39, null],
  ['Barn Joggingbyxor', 69, null],
  ['Barn Hoodie', 99, null],
  ['Barn Klänning', 89, null],
];

const ACCESSORIES_BASE = [
  ['Keps', 49, null],
  ['Mössa', 39, null],
  ['Bälte', 59, null],
  ['Solglasögon', 69, 'TRENDIGT'],
  ['Strumpor 7-pack', 79, null],
  ['Boxershorts 5-pack', 99, null],
  ['Axelremsväska', 149, null],
  ['Armbandsur', 199, null],
];

let PRODUCTS = [];

MEN_BASE.forEach(([name, price, badge], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'herr', price, badge, 2 + (i % 3)));
});

WOMEN_BASE.forEach(([name, price, badge], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'dam', price, badge, 2 + (i % 2)));
});

KIDS_BASE.forEach(([name, price, badge], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'barn', price, badge, 2));
});

ACCESSORIES_BASE.forEach(([name, price, badge], i) => {
  PRODUCTS = PRODUCTS.concat(makeVariants(name, 'accessoarer', price, badge, 1 + (i % 2)));
});
