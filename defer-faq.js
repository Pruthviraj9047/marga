(function () {
  'use strict';
  function loadFaqScript() {
    if (!document.querySelector('[data-faq-accordion]') || window._margaFaqLoaded) return;
    window._margaFaqLoaded = true;
    var s = document.createElement('script');
    s.src = '/faq.js';
    s.defer = true;
    document.body.appendChild(s);
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadFaqScript, { timeout: 2500 });
  } else {
    window.addEventListener('DOMContentLoaded', loadFaqScript, { once: true });
  }
})();
