/* Star Shop – varukorgslogik (localStorage). Detta är den enda funktion i shopen
 * som faktiskt gör något; kassan är endast en attrapp. */

const CART_KEY = 'starshop_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
  showToast('Tillagd i varukorgen ✅');
  openCart();
}

function removeFromCart(productId) {
  saveCart(getCart().filter((item) => item.id !== productId));
}

function setQty(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty = qty;
  if (item.qty <= 0) {
    saveCart(cart.filter((i) => i.id !== productId));
  } else {
    saveCart(cart);
  }
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const countBadge = document.getElementById('cart-count');
  const subtotalEl = document.getElementById('cart-subtotal');

  countBadge.textContent = getCartCount();
  subtotalEl.textContent = `${getCartTotal()} kr`;

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-empty">Din varukorg är tom 🛒<br>Börja handla för att fylla den!</p>`;
    return;
  }

  container.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.id);
      if (!p) return '';
      return `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="cart-item-info">
            <p class="cart-item-name">${p.name}</p>
            <p class="cart-item-price">${p.price} kr</p>
            <div class="qty-controls">
              <button onclick="setQty(${p.id}, ${item.qty - 1})">−</button>
              <span>${item.qty}</span>
              <button onclick="setQty(${p.id}, ${item.qty + 1})">+</button>
            </div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${p.id})" title="Ta bort">🗑️</button>
        </div>
      `;
    })
    .join('');
}
