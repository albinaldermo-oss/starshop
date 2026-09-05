/* Star Shop – falsk kö-skärm som visas direkt vid sidladdning för att kännas
 * överbelastad ("väldigt många handlar just nu"). Rent visuell/dekorativ. */

(function () {
  const startPos = 1200 + Math.floor(Math.random() * 2400);
  const totalDuration = 4500 + Math.random() * 2000;
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
    const rawProgress = Math.min(elapsed / totalDuration, 1);
    const progress = easeOutQuad(rawProgress);
    const remainingPos = Math.max(0, Math.round(startPos * (1 - progress)));
    const remainingSeconds = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));

    posEl.textContent = remainingPos.toLocaleString('sv-SE');
    etaEl.textContent = remainingSeconds <= 1 ? 'Nästan klart...' : remainingSeconds + ' sekunder';
    barEl.style.width = progress * 100 + '%';

    if (rawProgress < 1) {
      requestAnimationFrame(tick);
    } else {
      screenEl.classList.add('fade-out');
      document.documentElement.style.overflow = '';
      setTimeout(() => screenEl.remove(), 600);
    }
  }

  document.documentElement.style.overflow = 'hidden';
  requestAnimationFrame(tick);
})();
