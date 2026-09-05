/* Star Shop – falsk kö-sida som visas innan man släpps in i butiken, för att
 * kännas överbelastad ("väldigt många handlar just nu"). Denna sida (index.html)
 * innehåller ingen butikskod alls, så inga popups kan dyka upp under väntan.
 * Efter WAIT_MS skickas besökaren vidare till shop.html. */

const WAIT_MS = 20000;

(function () {
  const startPos = 1200 + Math.floor(Math.random() * 2400);
  const startTime = Date.now();

  const posEl = document.getElementById('queue-position');
  const etaEl = document.getElementById('queue-eta');
  const barEl = document.getElementById('queue-bar-fill');
  const screenEl = document.getElementById('queue-screen');

  function easeOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
  }

  function tick() {
    const elapsed = Date.now() - startTime;
    const rawProgress = Math.min(elapsed / WAIT_MS, 1);
    const progress = easeOutQuad(rawProgress);
    const remainingPos = Math.max(0, Math.round(startPos * (1 - progress)));
    const remainingSeconds = Math.max(0, Math.ceil((WAIT_MS - elapsed) / 1000));

    posEl.textContent = remainingPos.toLocaleString('sv-SE');
    etaEl.textContent = remainingSeconds <= 1 ? 'Nästan klart...' : remainingSeconds + ' sekunder';
    barEl.style.width = progress * 100 + '%';

    if (rawProgress < 1) {
      requestAnimationFrame(tick);
    } else {
      screenEl.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = 'shop.html';
      }, 500);
    }
  }

  requestAnimationFrame(tick);
})();
