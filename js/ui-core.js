/**
 * ParkerBarkerCore — shared primitives for parkerbarker.js and semantic.js
 *
 * Load before either entry script:
 *   <script src="js/ui-core.js"></script>
 *   <script src="js/parkerbarker.js"></script>
 */

(function(global) {
  'use strict';

  var env = {
    iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    hasNotch: window.innerWidth > 0 && window.screen.width / window.innerWidth > 1,
    standalone: window.navigator.standalone ||
      window.matchMedia('(display-mode: standalone)').matches,
    supportsDialog: typeof HTMLDialogElement !== 'undefined'
  };

  var fonts = {
    readyClass: 'fonts-ready',

    init: function() {
      var root = document.documentElement;
      if (root.classList.contains(this.readyClass)) {
        return;
      }

      var self = this;
      function markReady() {
        root.classList.add(self.readyClass);
      }

      if (!document.fonts || typeof document.fonts.load !== 'function') {
        markReady();
        return;
      }

      var specs = [
        '300 16px "GT Ultra Standard"',
        '700 16px "GT Ultra Standard"',
        '300 16px "GT Ultra Fine"',
        '700 16px "GT Ultra Fine"'
      ];

      var loads = specs.map(function(spec) {
        return document.fonts.load(spec).catch(function() {
          return [];
        });
      });

      Promise.all(loads).then(markReady, markReady);
    }
  };

  /**
   * Delegation uses Element.closest (matches nested targets).
   * Signatures: on(el, event, handler[, capture])
   *             on(el, event, selector, handler[, capture])
   */
  function on(element, event, arg3, arg4, arg5) {
    var handler;
    var selector;
    var capture;

    if (typeof arg3 === 'function') {
      handler = arg3;
      capture = !!arg4;
      element.addEventListener(event, handler, capture);
      return;
    }

    selector = arg3;
    handler = arg4;
    capture = !!arg5;

    element.addEventListener(event, function(e) {
      var target = e.target.closest(selector);
      if (target && element.contains(target)) {
        handler.call(target, e);
      }
    }, capture);
  }

  function debounce(fn, wait) {
    var timeout;
    return function() {
      var ctx = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        fn.apply(ctx, args);
      }, wait);
    };
  }

  function storageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * @param {object} base — mutated in place
   * @param {object} patch
   * @param {{ restrictToBaseKeys?: boolean }} opts
   */
  function mergeConfig(base, patch, opts) {
    if (!patch) {
      return base;
    }
    opts = opts || {};
    for (var key in patch) {
      if (!Object.prototype.hasOwnProperty.call(patch, key)) {
        continue;
      }
      if (opts.restrictToBaseKeys && !Object.prototype.hasOwnProperty.call(base, key)) {
        continue;
      }
      base[key] = patch[key];
    }
    return base;
  }

  global.ParkerBarkerCore = {
    version: '1.0.0',
    env: env,
    fonts: fonts,
    on: on,
    debounce: debounce,
    storageGet: storageGet,
    storageSet: storageSet,
    mergeConfig: mergeConfig
  };
})(typeof window !== 'undefined' ? window : this);
