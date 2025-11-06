(function () {
  if (window.__cursorPromptInitialized) return;
  window.__cursorPromptInitialized = true;

  const MESSAGE = 'Type: run test';
  const TYPING_SPEED_MS = 70;
  const PAUSE_MS = 1200;

  const el = document.createElement('div');
  el.className = 'cursor-prompt';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="dot"></span><span class="text"></span>';
  const textEl = el.querySelector('.text');
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(el);
  });

  // Mouse tracking with a small easing for smoothness
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  const ease = 0.18;

  function onMove(e) {
    targetX = e.clientX + 16;
    targetY = e.clientY + 12;
  }

  window.addEventListener('mousemove', onMove, { passive: true });

  function raf() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    el.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Typing loop
  function typeLoop() {
    let i = 0;
    function typeNext() {
      if (!textEl) return;
      textEl.textContent = MESSAGE.slice(0, i);
      i++;
      if (i <= MESSAGE.length) {
        setTimeout(typeNext, TYPING_SPEED_MS);
      } else {
        setTimeout(eraseLoop, PAUSE_MS);
      }
    }
    typeNext();
  }

  function eraseLoop() {
    let i = MESSAGE.length;
    function eraseNext() {
      if (!textEl) return;
      textEl.textContent = MESSAGE.slice(0, i);
      i--;
      if (i >= 0) {
        setTimeout(eraseNext, 35);
      } else {
        setTimeout(typeLoop, 300);
      }
    }
    eraseNext();
  }

  // Reduce motion preference
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // If reduced motion is preferred, don't animate typing, keep subtle tracking
    if (textEl) textEl.textContent = MESSAGE;
  } else {
    typeLoop();
  }
})();


