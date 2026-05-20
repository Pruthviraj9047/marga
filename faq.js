/**
 * Marga FAQ accordion — single-open, accessible, pathname-scoped persistence.
 */
(function () {
  'use strict';

  var STORAGE_PREFIX = 'faq:';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function storageKey() {
    return STORAGE_PREFIX + location.pathname;
  }

  function scrollToItem(item) {
    if (!item) return;
    item.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  function closeItem(item) {
    var trigger = item.querySelector('.faq-trigger');
    var panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');

    function finish() {
      if (!item.classList.contains('is-open')) {
        panel.setAttribute('hidden', '');
      }
    }

    if (reducedMotion) {
      finish();
      return;
    }

    function onEnd(e) {
      if (e.target !== panel) return;
      if (e.propertyName !== 'max-height' && e.propertyName !== 'opacity') return;
      panel.removeEventListener('transitionend', onEnd);
      finish();
    }

    panel.addEventListener('transitionend', onEnd);
    window.setTimeout(finish, 450);
  }

  function openItem(item, accordion, options) {
    var opts = options || {};
    var items = accordion.querySelectorAll('.faq-item');

    items.forEach(function (other) {
      if (other !== item && other.classList.contains('is-open')) {
        closeItem(other);
      }
    });

    var trigger = item.querySelector('.faq-trigger');
    var panel = item.querySelector('.faq-panel');
    var inner = panel && panel.querySelector('.faq-panel-inner');
    if (!trigger || !panel || !inner) return;

    panel.removeAttribute('hidden');
    panel.setAttribute('aria-hidden', 'false');

    var measured = inner.scrollHeight;
    if (measured > 0) {
      panel.style.setProperty('--faq-panel-max', measured + 'px');
    }

    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');

    if (opts.save !== false && item.id) {
      try {
        sessionStorage.setItem(storageKey(), item.id);
      } catch (err) { /* ignore */ }
    }

    if (opts.scroll) {
      if (reducedMotion) {
        scrollToItem(item);
      } else {
        window.requestAnimationFrame(function () {
          scrollToItem(item);
        });
      }
    }

    if (opts.focus) {
      trigger.focus({ preventScroll: true });
    }
  }

  function resolveTargetId(accordion) {
    var hash = location.hash ? location.hash.slice(1) : '';
    if (hash) {
      var byHash = document.getElementById(hash);
      if (byHash && accordion.contains(byHash)) {
        return hash;
      }
    }
    try {
      var legacyKey = 'marga-faq:' + location.pathname;
      var legacy = sessionStorage.getItem(legacyKey);
      if (legacy && !sessionStorage.getItem(storageKey())) {
        sessionStorage.setItem(storageKey(), legacy);
        sessionStorage.removeItem(legacyKey);
      }
      var stored = sessionStorage.getItem(storageKey());
      if (stored) {
        var byStore = document.getElementById(stored);
        if (byStore && accordion.contains(byStore)) {
          return stored;
        }
      }
    } catch (err) { /* ignore */ }
    return null;
  }

  function setHash(id, replace) {
    if (!id) return;
    var url = location.pathname + location.search + '#' + id;
    if (replace) {
      history.replaceState(null, '', url);
    } else {
      history.pushState(null, '', url);
    }
  }

  function initAccordion(accordion) {
    var items = Array.prototype.slice.call(accordion.querySelectorAll('.faq-item'));
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector('.faq-trigger');
      var panel = item.querySelector('.faq-panel');
      if (!trigger || !panel) return;

      panel.setAttribute('hidden', '');
      panel.setAttribute('aria-hidden', 'true');

      trigger.addEventListener('click', function () {
        if (item.classList.contains('is-open')) {
          closeItem(item);
          try {
            sessionStorage.removeItem(storageKey());
          } catch (err) { /* ignore */ }
        } else {
          openItem(item, accordion, { scroll: false });
          if (item.id) {
            setHash(item.id, true);
          }
        }
      });

      trigger.addEventListener('keydown', function (e) {
        var idx = items.indexOf(item);
        var target = null;

        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          trigger.click();
          return;
        }

        if (e.key === 'Enter') {
          e.preventDefault();
          trigger.click();
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          target = items[Math.min(idx + 1, items.length - 1)];
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          target = items[Math.max(idx - 1, 0)];
        } else if (e.key === 'Home') {
          e.preventDefault();
          target = items[0];
        } else if (e.key === 'End') {
          e.preventDefault();
          target = items[items.length - 1];
        }

        if (target) {
          var t = target.querySelector('.faq-trigger');
          if (t) t.focus();
        }
      });
    });

    var targetId = resolveTargetId(accordion);
    if (targetId) {
      var target = document.getElementById(targetId);
      if (target) {
        var fromHash = location.hash && location.hash.slice(1) === targetId;
        openItem(target, accordion, {
          save: !fromHash,
          scroll: fromHash,
          focus: false
        });
      }
    }
  }

  var accordions = document.querySelectorAll('[data-faq-accordion]');
  accordions.forEach(initAccordion);

  window.addEventListener('hashchange', function () {
    var id = location.hash ? location.hash.slice(1) : '';
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    accordions.forEach(function (accordion) {
      if (!accordion.contains(el)) return;
      openItem(el, accordion, { save: false, scroll: true, focus: false });
    });
  });
})();
