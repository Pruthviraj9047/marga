/*
 * Google Analytics bootstrap.
 * Keep the gtag queue available immediately, but wait to download the
 * third-party library until after the page has loaded or the user interacts.
 */
(function (window, document) {
  'use strict';

  var measurementId = 'G-7X112CD0R2';
  var scriptLoaded = false;
  var interactionEvents = ['pointerdown', 'keydown', 'touchstart'];

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  // Queue the same initialization calls as the previous inline snippet.
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  function removeInteractionListeners() {
    interactionEvents.forEach(function (eventName) {
      window.removeEventListener(eventName, loadScript);
    });
  }

  function loadScript() {
    if (scriptLoaded) return;
    scriptLoaded = true;
    removeInteractionListeners();

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  function scheduleAfterLoad() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadScript, { timeout: 4000 });
    } else {
      window.setTimeout(loadScript, 2500);
    }
  }

  interactionEvents.forEach(function (eventName) {
    window.addEventListener(eventName, loadScript, { passive: true, once: true });
  });

  if (document.readyState === 'complete') {
    scheduleAfterLoad();
  } else {
    window.addEventListener('load', scheduleAfterLoad, { once: true });
  }
})(window, document);
