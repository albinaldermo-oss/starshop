/* Star Shop – rendering av produkter, filter, sök och diverse dekorativa UI-effekter. */

let activeCategory = 'alla';
let searchQuery = '';

function starString(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

function matchesFilter(product) {
  const matchesCategory =
    activeCategory === 'alla' ||
    (activeCategory === 'rea' ? product.discount >= 60 : product.category === activeCategory);
  const matchesSearch =
    !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const emptyState = document.getElementById('empty-state');
  const resultsCount = document.getElementById('results-count');

  const filtered = PRODUCTS.filter(matchesFilter);
  resultsCount.textContent = `${filtered.length} produkter`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  grid.innerHTML = filtered
    .map(
      (p) => `
    <article class="product-card">
      ${p.badge ? `<span class="badge badge-tag">${p.badge}</span>` : ''}
      <span class="badge badge-discount">-${p.discount}%</span>
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <p class="product-name">${p.name}</p>
        <div class="product-rating">
          <span class="stars">${starString(p.rating)}</span>
          <span class="sold">${p.sold.toLocaleString('sv-SE')} sålda</span>
        </div>
        <div class="product-price">
          <span class="price-now">${p.price} kr</span>
          <span class="price-old">${p.oldPrice} kr</span>
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${p.id})">+ Lägg i varukorg</button>
      </div>
    </article>
  `
    )
    .join('');
}

const CATEGORY_TITLES = {
  alla: 'Alla produkter',
  herr: '👔 Herrmode',
  dam: '👗 Dammode',
  barn: '🧸 Barnkläder',
  accessoarer: '🕶️ Accessoarer',
  rea: '🔥 Rea – störst rabatt',
};

function setActiveCategory(cat) {
  activeCategory = cat;
  document.getElementById('section-title').textContent = CATEGORY_TITLES[cat] || 'Alla produkter';
  document.querySelectorAll('.cat-chip').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
  renderProducts();
}

document.getElementById('category-nav').addEventListener('click', (e) => {
  const btn = e.target.closest('.cat-chip');
  if (!btn) return;
  setActiveCategory(btn.dataset.cat);
});

document.getElementById('search-input').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

document.getElementById('search-btn').addEventListener('click', () => {
  renderProducts();
});

document.getElementById('cart-toggle').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (getCartCount() === 0) {
    showToast('Din varukorg är tom 🛒');
    return;
  }
  closeCart();
  openCheckout();
});

document.getElementById('checkout-modal-close').addEventListener('click', closeCheckout);
document.getElementById('checkout-overlay').addEventListener('click', closeCheckout);

function openCheckout() {
  renderCheckoutSummary();
  document.getElementById('checkout-overlay').classList.add('open');
  document.getElementById('checkout-modal').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkout-overlay').classList.remove('open');
  document.getElementById('checkout-modal').classList.remove('open');
}

function renderCheckoutSummary() {
  const cart = getCart();
  const body = document.getElementById('checkout-modal-body');
  const subtotal = getCartTotal();
  const shipping = subtotal >= 199 || subtotal === 0 ? 0 : 39;
  const total = subtotal + shipping;

  const linesHtml = cart
    .map((item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.id);
      if (!p) return '';
      return `
        <div class="checkout-line">
          <img src="${p.image}" alt="${p.name}">
          <span class="checkout-line-name">${p.name} × ${item.qty}</span>
          <span class="checkout-line-price">${p.price * item.qty} kr</span>
        </div>`;
    })
    .join('');

  body.innerHTML = `
    <div class="checkout-summary">${linesHtml}</div>
    <div class="checkout-row">
      <span>Frakt</span>
      <span>${shipping === 0 ? 'Gratis' : shipping + ' kr'}</span>
    </div>
    <div class="checkout-row checkout-total">
      <span>Att betala</span>
      <span>${total} kr</span>
    </div>
    <div class="payment-methods">
      <label class="payment-option"><input type="radio" name="payment" checked> 💳 Kort</label>
      <label class="payment-option"><input type="radio" name="payment"> 📱 Swish</label>
      <label class="payment-option"><input type="radio" name="payment"> 🅺 Klarna</label>
    </div>
    <button class="pay-btn" id="pay-btn">Betala ${total} kr</button>
  `;

  document.getElementById('pay-btn').addEventListener('click', handlePayment);
}

function handlePayment() {
  const body = document.getElementById('checkout-modal-body');
  body.innerHTML = `
    <div class="paying">
      <div class="spinner"></div>
      <p>Behandlar din betalning...</p>
    </div>
  `;
  setTimeout(showOrderConfirmation, 1300);
}

function showOrderConfirmation() {
  const orderNumber = 'STAR-' + Math.floor(100000 + Math.random() * 900000);
  const body = document.getElementById('checkout-modal-body');
  body.innerHTML = `
    <div class="confirmation">
      <div class="confirmation-icon">✅</div>
      <h4>Tack för din beställning!</h4>
      <p>Din betalning har genomförts och ordern är bekräftad.</p>
      <p class="order-number">Ordernummer: <strong>${orderNumber}</strong></p>
      <p class="delivery-estimate">Beräknad leverans: 3–5 arbetsdagar</p>
      <button class="continue-btn" id="continue-shopping-btn">Fortsätt handla</button>
    </div>
  `;
  document.getElementById('continue-shopping-btn').addEventListener('click', () => {
    saveCart([]);
    closeCheckout();
  });
}

/* Fejkad nedräkningsklocka för REA-bannern, loopar var 6:e timme */
function startCountdown() {
  const totalSeconds = 6 * 60 * 60;
  let remaining = totalSeconds - (Math.floor(Date.now() / 1000) % totalSeconds);

  function tick() {
    const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
    const mins = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    document.getElementById('cd-hours').textContent = hours;
    document.getElementById('cd-mins').textContent = mins;
    document.getElementById('cd-secs').textContent = secs;
    remaining = remaining <= 0 ? totalSeconds : remaining - 1;
  }
  tick();
  setInterval(tick, 1000);
}

renderProducts();
renderCart();
startCountdown();
