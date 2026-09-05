/* Star Shop – engagemangs-popups: köpnotiser, flash sale och "stanna kvar"-erbjudande.
 * Rent visuella/dekorativa. */

const FAKE_NAMES = ['Erik', 'Anna', 'Johan', 'Sara', 'Oscar', 'Emma', 'Viktor', 'Elin', 'Marcus', 'Julia', 'Adam', 'Lina', 'Filip', 'Wilma'];
const FAKE_CITIES = ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Linköping', 'Örebro', 'Helsingborg', 'Umeå', 'Jönköping', 'Västerås'];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Köpnotis nere till vänster, dyker upp med jämna mellanrum */
function showPurchaseNotification() {
  const product = randomFrom(PRODUCTS);
  const name = randomFrom(FAKE_NAMES);
  const city = randomFrom(FAKE_CITIES);
  const minutesAgo = 1 + Math.floor(Math.random() * 14);

  const el = document.createElement('div');
  el.className = 'purchase-toast';
  el.innerHTML = `
    <img src="${product.image}" alt="">
    <div class="purchase-toast-text">
      <p><strong>${name}</strong> från ${city} köpte precis</p>
      <p class="purchase-toast-product">${product.name}</p>
      <p class="purchase-toast-time">${minutesAgo} min sedan ✅</p>
    </div>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 4500);
}

function schedulePurchaseNotifications() {
  showPurchaseNotification();
  setTimeout(schedulePurchaseNotifications, 7000 + Math.random() * 6000);
}

/* Flash sale-popup som återkommer med jämna mellanrum */
function isAnyModalOpen() {
  return (
    document.getElementById('cart-drawer').classList.contains('open') ||
    document.getElementById('checkout-modal').classList.contains('open') ||
    document.getElementById('flash-sale-modal').classList.contains('open') ||
    document.getElementById('exit-intent-modal').classList.contains('open')
  );
}

function showFlashSalePopup() {
  if (isAnyModalOpen()) return;
  document.getElementById('flash-sale-overlay').classList.add('open');
  document.getElementById('flash-sale-modal').classList.add('open');
}

function closeFlashSalePopup() {
  document.getElementById('flash-sale-overlay').classList.remove('open');
  document.getElementById('flash-sale-modal').classList.remove('open');
}

function scheduleFlashSalePopups() {
  setTimeout(() => {
    showFlashSalePopup();
    scheduleFlashSalePopups();
  }, 45000 + Math.random() * 20000);
}

/* Exit-intent: rabatt-popup när musen lämnar fönstret uppåt */
let exitIntentShown = false;
document.addEventListener('mouseout', (e) => {
  if (exitIntentShown || isAnyModalOpen()) return;
  if (e.clientY > 0 || e.relatedTarget) return;
  exitIntentShown = true;
  document.getElementById('exit-intent-overlay').classList.add('open');
  document.getElementById('exit-intent-modal').classList.add('open');
});

function closeExitIntentPopup() {
  document.getElementById('exit-intent-overlay').classList.remove('open');
  document.getElementById('exit-intent-modal').classList.remove('open');
}

document.getElementById('flash-sale-close').addEventListener('click', closeFlashSalePopup);
document.getElementById('flash-sale-overlay').addEventListener('click', closeFlashSalePopup);
document.getElementById('flash-sale-cta').addEventListener('click', () => {
  closeFlashSalePopup();
  showToast('Rabattkod STAR15 tillagd ✅');
});

document.getElementById('exit-intent-close').addEventListener('click', closeExitIntentPopup);
document.getElementById('exit-intent-overlay').addEventListener('click', closeExitIntentPopup);
document.getElementById('exit-intent-cta').addEventListener('click', () => {
  closeExitIntentPopup();
  showToast('Rabattkod STANNA10 tillagd ✅');
});

setTimeout(showFlashSalePopup, 4000);
scheduleFlashSalePopups();
setTimeout(schedulePurchaseNotifications, 6000);
