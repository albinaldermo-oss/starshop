/* Star Shop – engagemangs-popups: köpnotiser, flash sale, snurra & vinn,
 * "stanna kvar"-erbjudande, live-räknare och nedräknande lagersaldo.
 * Rent visuella/dekorativa. */

const FAKE_NAMES = ['Erik', 'Anna', 'Johan', 'Sara', 'Oscar', 'Emma', 'Viktor', 'Elin', 'Marcus', 'Julia', 'Adam', 'Lina', 'Filip', 'Wilma'];
const FAKE_CITIES = ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Linköping', 'Örebro', 'Helsingborg', 'Umeå', 'Jönköping', 'Västerås'];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isAnyModalOpen() {
  return (
    document.getElementById('cart-drawer').classList.contains('open') ||
    document.getElementById('checkout-modal').classList.contains('open') ||
    document.getElementById('flash-sale-modal').classList.contains('open') ||
    document.getElementById('exit-intent-modal').classList.contains('open') ||
    document.getElementById('spin-modal').classList.contains('open')
  );
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
  }, 4000);
}

function schedulePurchaseNotifications() {
  showPurchaseNotification();
  setTimeout(schedulePurchaseNotifications, 3000 + Math.random() * 3000);
}

/* Flash sale-popup som återkommer med jämna mellanrum */
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
  }, 20000 + Math.random() * 15000);
}

/* Snurra & vinn – visas en gång tidigt i besöket */
const SPIN_PRIZES = ['5% rabatt', '10% rabatt', '15% rabatt', 'Fri frakt', '20% rabatt', '10% rabatt', '5% rabatt', 'Fri frakt'];
let spinning = false;
let spinRotation = 0;

function showSpinModal() {
  if (isAnyModalOpen()) return;
  document.getElementById('spin-overlay').classList.add('open');
  document.getElementById('spin-modal').classList.add('open');
}

function closeSpinModal() {
  document.getElementById('spin-overlay').classList.remove('open');
  document.getElementById('spin-modal').classList.remove('open');
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  const prize = randomFrom(SPIN_PRIZES);
  spinRotation += 5 * 360 + Math.floor(Math.random() * 360);
  const wheel = document.getElementById('spin-wheel');
  wheel.style.transform = `rotate(${spinRotation}deg)`;
  document.getElementById('spin-btn').hidden = true;

  setTimeout(() => {
    const resultEl = document.getElementById('spin-result');
    resultEl.textContent = `🎉 Du vann: ${prize}!`;
    resultEl.hidden = false;
    document.getElementById('spin-claim-btn').hidden = false;
    spinning = false;
  }, 3600);
}

document.getElementById('spin-btn').addEventListener('click', spinWheel);
document.getElementById('spin-close').addEventListener('click', closeSpinModal);
document.getElementById('spin-overlay').addEventListener('click', closeSpinModal);
document.getElementById('spin-claim-btn').addEventListener('click', () => {
  closeSpinModal();
  showToast('Din vinst har lagts till på ditt konto ✅');
});

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

/* Live-räknare nere till höger, uppdateras med jämna mellanrum */
function tickLiveCounter() {
  const el = document.getElementById('live-counter-num');
  el.textContent = 80 + Math.floor(Math.random() * 220);
  setTimeout(tickLiveCounter, 4000 + Math.random() * 3000);
}

/* Lagersaldo som räknas ner för att skapa brådska */
function tickStockCountdown() {
  let changed = false;
  PRODUCTS.forEach((p) => {
    if (p.stockLeft !== null && p.stockLeft > 1 && Math.random() < 0.5) {
      p.stockLeft -= 1;
      changed = true;
    }
  });
  if (changed && typeof renderProducts === 'function') {
    renderProducts();
  }
  setTimeout(tickStockCountdown, 15000 + Math.random() * 8000);
}

setTimeout(showSpinModal, 1800);
setTimeout(showFlashSalePopup, 10000);
scheduleFlashSalePopups();
setTimeout(schedulePurchaseNotifications, 3000);
tickLiveCounter();
setTimeout(tickStockCountdown, 15000);
