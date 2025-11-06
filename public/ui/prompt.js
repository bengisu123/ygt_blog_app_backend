(function () {
  var tooltip = document.createElement('div');
  var textContainer = document.createElement('span');
  var style = tooltip.style;
  var typingIndex = 0;
  var message = 'Test UI Active';
  var fadeTimeout = null;
  var lastX = 0, lastY = 0;

  tooltip.setAttribute('aria-hidden', 'true');
  tooltip.className = 'cursor-prompt';
  style.position = 'fixed';
  style.left = '0px';
  style.top = '0px';
  style.transform = 'translate(16px, 16px)';
  style.pointerEvents = 'none';
  style.padding = '8px 10px';
  style.borderRadius = '10px';
  style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", sans-serif';
  style.fontSize = '12px';
  style.letterSpacing = '0.3px';
  style.color = '#cfe6ff';
  style.background = 'rgba(17, 34, 60, 0.6)';
  style.border = '1px solid rgba(127, 209, 255, 0.35)';
  style.backdropFilter = 'blur(8px)';
  style.webkitBackdropFilter = 'blur(8px)';
  style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.35)';
  style.zIndex = '999999';
  style.opacity = '0';
  style.transition = 'opacity 220ms ease, transform 120ms ease';

  tooltip.appendChild(textContainer);
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(tooltip);
    startTyping();
  });

  function startTyping() {
    typingIndex = 0;
    textContainer.textContent = '';
    typeNext();
  }

  function typeNext() {
    if (typingIndex <= message.length) {
      textContainer.textContent = message.slice(0, typingIndex);
      typingIndex += 1;
      setTimeout(typeNext, 60);
    }
  }

  function show() {
    tooltip.style.opacity = '1';
  }

  function scheduleFade() {
    if (fadeTimeout) clearTimeout(fadeTimeout);
    fadeTimeout = setTimeout(function () {
      tooltip.style.opacity = '0';
    }, 900);
  }

  function onMove(e) {
    var x = e.clientX;
    var y = e.clientY;
    if (x !== lastX || y !== lastY) {
      lastX = x; lastY = y;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
      show();
      scheduleFade();
    }
  }

  window.addEventListener('mousemove', onMove, { passive: true });
})();


