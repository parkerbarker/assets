/**
 * ParkerBarker.js - Standalone Vanilla Version
 * A user-friendly JavaScript library
 * Provides consistent UX across browsers with special optimizations for iOS WebViews
 * 
 * Usage:
 *   <script src="parkerbarker/js/parkerbarker.js"></script>
 *   <script>ParkerBarker.init();</script>
 */

(function(global) {
  'use strict';

  // ==================================================
  // Configuration
  // ==================================================
  
  var config = {
    enableIOSOptimizations: true,
    enableDarkMode: true,
    enableFormEnhancements: true,
    enableAccessibility: true,
    toastDuration: 3000
  };

  // ==================================================
  // Environment Detection
  // ==================================================
  
  var env = {
    iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    hasNotch: (window.innerWidth > 0) && (window.screen.width / window.innerWidth > 1),
    standalone: window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches
  };

  // ==================================================
  // DOM Utilities
  // ==================================================
  
  var dom = {
    /**
     * Find all elements matching a selector
     */
    find: function(selector, context) {
      context = context || document;
      return Array.prototype.slice.call(context.querySelectorAll(selector));
    },
    
    /**
     * Find a single element matching a selector
     */
    findOne: function(selector, context) {
      context = context || document;
      return context.querySelector(selector);
    },
    
    /**
     * Attach event listener with optional delegation
     */
    on: function(element, event, selector, handler) {
      if (typeof selector === 'function') {
        element.addEventListener(event, selector);
        return;
      }
      
      element.addEventListener(event, function(e) {
        var target = e.target;
        if (target.matches && target.matches(selector)) {
          handler.call(target, e);
        } else {
          var current = target;
          while (current && current !== element) {
            if (current.matches && current.matches(selector)) {
              handler.call(current, e);
              break;
            }
            current = current.parentNode;
          }
        }
      });
    },
    
    /**
     * Remove event listener
     */
    off: function(element, event, handler) {
      element.removeEventListener(event, handler);
    },
    
    /**
     * Add class to element
     */
    addClass: function(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += ' ' + className;
      }
    },
    
    /**
     * Remove class from element
     */
    removeClass: function(element, className) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        element.className = element.className.replace(
          new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), 
          ' '
        );
      }
    },
    
    /**
     * Toggle class on element
     */
    toggleClass: function(element, className, force) {
      if (element.classList) {
        if (typeof force !== 'undefined') {
          element.classList.toggle(className, force);
        } else {
          element.classList.toggle(className);
        }
      } else {
        var classes = element.className.split(' ');
        var existingIndex = classes.indexOf(className);
        
        if (existingIndex >= 0 && (typeof force === 'undefined' || !force)) {
          classes.splice(existingIndex, 1);
        } else if (existingIndex < 0 && (typeof force === 'undefined' || force)) {
          classes.push(className);
        }
        
        element.className = classes.join(' ');
      }
    },
    
    /**
     * Check if element has class
     */
    hasClass: function(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
      }
    },
    
    /**
     * Get or set attribute
     */
    attr: function(element, name, value) {
      if (typeof value !== 'undefined') {
        element.setAttribute(name, value);
      } else {
        return element.getAttribute(name);
      }
    },
    
    /**
     * Remove attribute
     */
    removeAttr: function(element, name) {
      element.removeAttribute(name);
    },
    
    /**
     * Get computed style property
     */
    getStyle: function(element, prop) {
      return window.getComputedStyle(element).getPropertyValue(prop);
    },
    
    /**
     * Set CSS style property
     */
    setStyle: function(element, prop, value) {
      element.style[prop] = value;
    },
    
    /**
     * Create element with attributes
     */
    create: function(tag, attrs) {
      var el = document.createElement(tag);
      if (attrs) {
        for (var key in attrs) {
          if (attrs.hasOwnProperty(key)) {
            if (key === 'class') {
              el.className = attrs[key];
            } else {
              el.setAttribute(key, attrs[key]);
            }
          }
        }
      }
      return el;
    }
  };

  // ==================================================
  // Theme Module
  // ==================================================
  
  var theme = {
    init: function() {
      var self = this;
      
      // Listen for system dark mode changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (config.enableDarkMode) {
          self.setDarkMode(e.matches);
        }
      });
      
      // Add event listener for theme toggles
      dom.on(document, 'click', '[data-pb-theme-toggle]', function(e) {
        self.toggleDarkMode();
      });
      
      // Restore saved preference if available
      if (window.localStorage) {
        var savedPreference = localStorage.getItem('pb-dark-mode');
        if (savedPreference !== null) {
          this.setDarkMode(savedPreference === 'true');
        }
      }
    },
    
    isDarkMode: function() {
      return document.body.classList.contains('pb-dark-mode');
    },
    
    setDarkMode: function(enable) {
      dom.toggleClass(document.body, 'pb-dark-mode', enable);
      dom.removeClass(document.body, 'pb-light-mode');
      
      // Save preference
      if (window.localStorage) {
        localStorage.setItem('pb-dark-mode', enable ? 'true' : 'false');
      }
      
      // Dispatch event
      document.dispatchEvent(new CustomEvent('pb-theme-change', { 
        detail: { darkMode: enable } 
      }));
    },
    
    toggleDarkMode: function() {
      this.setDarkMode(!this.isDarkMode());
    }
  };

  // ==================================================
  // Toast Module
  // ==================================================
  
  var toast = {
    init: function() {
      // Create toast container if it doesn't exist
      if (!dom.findOne('.pb-toast-container')) {
        var container = document.createElement('div');
        container.className = 'pb-toast-container';
        document.body.appendChild(container);
      }
    },
    
    show: function(message, options) {
      options = options || {};
      var type = options.type || 'info';
      var duration = typeof options.duration !== 'undefined' ? options.duration : config.toastDuration;
      var closable = typeof options.closable !== 'undefined' ? options.closable : true;
      var self = this;
      
      // Ensure container exists
      this.init();
      
      // Create toast element
      var toastEl = document.createElement('div');
      toastEl.className = 'pb-toast pb-toast-' + type;
      toastEl.innerHTML = message;
      
      // Add close button if closable
      if (closable) {
        var closeBtn = document.createElement('button');
        closeBtn.className = 'pb-toast-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', function() {
          self.hide(toastEl);
        });
        toastEl.appendChild(closeBtn);
      }
      
      // Add to container
      var container = dom.findOne('.pb-toast-container');
      container.appendChild(toastEl);
      
      // Trigger animation
      setTimeout(function() {
        dom.addClass(toastEl, 'pb-toast-visible');
      }, 10);
      
      // Auto-hide after duration
      if (duration > 0) {
        setTimeout(function() {
          self.hide(toastEl);
        }, duration);
      }
      
      return toastEl;
    },
    
    hide: function(toastEl) {
      dom.removeClass(toastEl, 'pb-toast-visible');
      toastEl.addEventListener('transitionend', function() {
        if (toastEl.parentNode) {
          toastEl.parentNode.removeChild(toastEl);
        }
      });
    }
  };

  // ==================================================
  // Forms Module
  // ==================================================
  
  var forms = {
    init: function() {
      this.initValidation();
      this.enhanceSelects();
      this.enhanceCheckboxesRadios();
    },
    
    initValidation: function() {
      // Add validation class when form field changes
      dom.on(document, 'blur', 'input, select, textarea', function() {
        var isValid = this.checkValidity();
        dom.toggleClass(this, 'is-invalid', !isValid);
        dom.toggleClass(this, 'is-valid', isValid && this.value.length > 0);
        
        // Update validation message if available
        var errorContainer = this.parentNode.querySelector('.pb-form-error');
        if (errorContainer) {
          errorContainer.textContent = this.validationMessage;
          errorContainer.style.display = isValid ? 'none' : 'block';
        }
      });
      
      dom.on(document, 'change', 'input, select, textarea', function() {
        var isValid = this.checkValidity();
        dom.toggleClass(this, 'is-invalid', !isValid);
        dom.toggleClass(this, 'is-valid', isValid && this.value.length > 0);
      });
      
      // Custom form submission handling
      dom.on(document, 'submit', 'form', function(e) {
        // Mark all fields as touched when form submits
        var fields = this.querySelectorAll('input, select, textarea');
        fields.forEach(function(field) {
          field.dispatchEvent(new Event('blur'));
        });
        
        // If any fields are invalid, prevent submission
        if (!this.checkValidity()) {
          e.preventDefault();
          
          // Focus the first invalid field
          var firstInvalid = this.querySelector(':invalid');
          if (firstInvalid) {
            firstInvalid.focus();
          }
        }
      });
    },
    
    enhanceSelects: function() {
      // Find all selects that don't have the enhanced class
      var selects = dom.find('select:not(.pb-select-enhanced)');
      
      selects.forEach(function(select) {
        // Mark as enhanced to avoid double processing
        dom.addClass(select, 'pb-select-enhanced');
        
        // Add ARIA attributes for accessibility
        select.setAttribute('aria-label', select.getAttribute('placeholder') || 'Select an option');
        
        // Handle change events to update any visual wrappers
        select.addEventListener('change', function() {
          var selectedOption = this.options[this.selectedIndex];
          var wrapper = this.closest('.pb-select-wrapper');
          if (wrapper) {
            var displayElement = wrapper.querySelector('.pb-select-display');
            if (displayElement) {
              displayElement.textContent = selectedOption.text;
            }
          }
        });
      });
    },
    
    enhanceCheckboxesRadios: function() {
      // Process checkboxes and radios without the pb-checkbox/pb-radio wrapper
      var regularInputs = dom.find('input[type="checkbox"], input[type="radio"]');
      
      regularInputs.forEach(function(input) {
        // Skip if already in a custom wrapper
        if (input.closest('.pb-checkbox, .pb-radio')) return;
        
        // Find the associated label
        var id = input.id;
        if (!id) return;
        
        var label = dom.findOne('label[for="' + id + '"]');
        if (!label) return;
        
        // Create wrapper with our custom classes
        var wrapper = dom.create('div', {
          class: input.type === 'checkbox' ? 'pb-checkbox' : 'pb-radio'
        });
        
        // Move the input inside the wrapper
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        // Add the custom label class
        dom.addClass(label, input.type === 'checkbox' ? 'pb-checkbox-label' : 'pb-radio-label');
        
        // Move the label inside the wrapper
        wrapper.appendChild(label);
      });
    }
  };

  // ==================================================
  // iOS Module
  // ==================================================
  
  var ios = {
    init: function() {
      if (!env.iOS) return;
      
      this.applySafeAreas();
      this.fixInputFocus();
      this.fixKeyboardScroll();
      this.enableFastClicks();
    },
    
    applySafeAreas: function() {
      var updateSafeAreas = function() {
        if (!CSS.supports('padding-top: env(safe-area-inset-top)')) {
          var style = document.createElement('style');
          style.innerHTML = '\n            :root {\n              --pb-safe-area-top: ' + (env.hasNotch ? '44px' : '20px') + ';\n              --pb-safe-area-right: 0px;\n              --pb-safe-area-bottom: ' + (env.hasNotch ? '34px' : '0px') + ';\n              --pb-safe-area-left: 0px;\n            }\n          ';
          document.head.appendChild(style);
        }
      };
      
      updateSafeAreas();
      
      window.addEventListener('orientationchange', function() {
        setTimeout(updateSafeAreas, 100);
      });
    },
    
    fixInputFocus: function() {
      document.addEventListener('focus', function(e) {
        var target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {
          if (target.scrollIntoViewIfNeeded) {
            target.scrollIntoViewIfNeeded();
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, true);
      
      document.addEventListener('touchend', function(e) {
        var activeElement = document.activeElement;
        if (activeElement && 
            (activeElement.tagName === 'INPUT' || 
             activeElement.tagName === 'TEXTAREA' || 
             activeElement.tagName === 'SELECT')) {
          if (!activeElement.contains(e.target)) {
            activeElement.blur();
          }
        }
      });
    },
    
    fixKeyboardScroll: function() {
      var inputs = document.querySelectorAll('input, textarea, select');
      
      inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
          document.body.classList.add('pb-keyboard-visible');
        });
        
        input.addEventListener('blur', function() {
          document.body.classList.remove('pb-keyboard-visible');
        });
      });
    },
    
    enableFastClicks: function() {
      document.addEventListener('touchstart', function() {}, {passive: true});
    }
  };

  // ==================================================
  // Date Picker Module
  // ==================================================
  
  var datePicker = {
    init: function() {
      var self = this;
      var dateInputs = dom.find('input[type="date"]');
      
      dateInputs.forEach(function(input) {
        var isTouchDevice = self.isTouchDevice();
        var isWebView = self.isWebView();
        
        if (isWebView || isTouchDevice) {
          input.setAttribute('inputmode', 'none');
          input.setAttribute('readonly', 'readonly');
        } else {
          self.setupCustomPicker(input);
        }
      });
    },
    
    isTouchDevice: function() {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0));
    },
    
    isWebView: function() {
      var userAgent = navigator.userAgent.toLowerCase();
      return (
        (userAgent.includes('wv') && userAgent.includes('safari')) ||
        (userAgent.includes('wv') && userAgent.includes('chrome')) ||
        userAgent.includes('webview') ||
        !window.chrome ||
        (window.webkit && window.webkit.messageHandlers)
      );
    },
    
    setupCustomPicker: function(input) {
      var wrapper = dom.create('div', {
        class: 'pb-date-picker-wrapper pb-relative'
      });
      
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);
      
      wrapper.addEventListener('click', function(e) {
        if (e.target === input) return;
        if (input.showPicker) {
          input.showPicker();
        }
      });
    }
  };

  // ==================================================
  // Core Module
  // ==================================================
  
  var core = {
    init: function(options) {
      options = options || {};
      
      // Merge options with defaults
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          config[key] = options[key];
        }
      }
      
      // Apply environment-specific classes to body
      var body = document.body;
      
      if (env.iOS) dom.addClass(body, 'pb-ios');
      if (env.touch) dom.addClass(body, 'pb-touch');
      if (env.reducedMotion) dom.addClass(body, 'pb-reduced-motion');
      if (env.standalone) dom.addClass(body, 'pb-standalone');
      
      // Initialize all modules
      this.initModules();
      
      // Add dark mode if enabled and detected
      if (config.enableDarkMode && env.darkMode) {
        theme.setDarkMode(true);
      }
      
      // iOS-specific initializations
      if (config.enableIOSOptimizations && env.iOS) {
        ios.init();
      }
      
      // Form enhancements
      if (config.enableFormEnhancements) {
        forms.init();
      }
      
      // Dispatch initialization event
      document.dispatchEvent(new CustomEvent('pb-init'));
      
      return this;
    },
    
    initModules: function() {
      theme.init();
      toast.init();
    }
  };

  // ==================================================
  // Create Global ParkerBarker Object
  // ==================================================
  
  global.ParkerBarker = {
    init: core.init.bind(core),
    config: config,
    env: env,
    dom: dom,
    theme: theme,
    ios: ios,
    forms: forms,
    toast: toast,
    datePicker: datePicker,
    
    // Version
    version: '1.0.0'
  };

  // Auto-initialize when DOM is ready (optional)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Don't auto-init, let user call ParkerBarker.init()
      console.log('ParkerBarker.js loaded. Call ParkerBarker.init() to initialize.');
    });
  }

})(typeof window !== 'undefined' ? window : this);
