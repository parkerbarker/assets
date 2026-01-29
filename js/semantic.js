/**
 * Semantic.js - Companion JavaScript for Semantic CSS
 * Attribute-based enhancements for semantic HTML
 * 
 * Usage:
 *   <script src="js/semantic.js"></script>
 *   <script>Semantic.init();</script>
 */

(function(global) {
  'use strict';

  // ==================================================
  // Configuration
  // ==================================================
  
  var config = {
    enableTheme: true,
    enableToast: true,
    enableForms: true,
    enableDetails: true,
    enableDialog: true,
    toastDuration: 3000,
    toastPosition: 'bottom' // 'top' or 'bottom'
  };

  // ==================================================
  // Environment Detection
  // ==================================================
  
  var env = {
    iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    standalone: window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches,
    supportsDialog: typeof HTMLDialogElement !== 'undefined'
  };

  // ==================================================
  // Utility Functions
  // ==================================================
  
  var utils = {
    /**
     * Query selector shorthand
     */
    $: function(selector, context) {
      return (context || document).querySelector(selector);
    },
    
    /**
     * Query selector all as array
     */
    $$: function(selector, context) {
      return Array.prototype.slice.call((context || document).querySelectorAll(selector));
    },
    
    /**
     * Add event listener with delegation support
     */
    on: function(element, event, selector, handler) {
      if (typeof selector === 'function') {
        handler = selector;
        element.addEventListener(event, handler);
        return;
      }
      
      element.addEventListener(event, function(e) {
        var target = e.target.closest(selector);
        if (target && element.contains(target)) {
          handler.call(target, e);
        }
      });
    },
    
    /**
     * Set attribute
     */
    setAttr: function(element, name, value) {
      if (value === true) {
        element.setAttribute(name, '');
      } else if (value === false || value === null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value);
      }
    },
    
    /**
     * Check if attribute exists
     */
    hasAttr: function(element, name) {
      return element.hasAttribute(name);
    },
    
    /**
     * Get attribute value
     */
    getAttr: function(element, name) {
      return element.getAttribute(name);
    },
    
    /**
     * Create element with attributes
     */
    create: function(tag, attrs, content) {
      var el = document.createElement(tag);
      if (attrs) {
        for (var key in attrs) {
          if (attrs.hasOwnProperty(key)) {
            this.setAttr(el, key, attrs[key]);
          }
        }
      }
      if (content) {
        el.innerHTML = content;
      }
      return el;
    },
    
    /**
     * Debounce function
     */
    debounce: function(fn, wait) {
      var timeout;
      return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          fn.apply(context, args);
        }, wait);
      };
    }
  };

  // ==================================================
  // Theme Module
  // ==================================================
  
  var theme = {
    _initialized: false,
    
    init: function() {
      if (this._initialized) return;
      this._initialized = true;
      
      var self = this;
      
      // Listen for theme toggle clicks
      utils.on(document, 'click', '[data-theme-toggle]', function(e) {
        e.preventDefault();
        self.toggle();
      });
      
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if no explicit preference is set
        var currentTheme = self.get();
        if (currentTheme === 'system' || !currentTheme) {
          self._applySystemTheme();
        }
      });
      
      // Restore saved preference
      var saved = this._getSaved();
      if (saved && saved !== 'system') {
        this.set(saved);
      }
    },
    
    /**
     * Get current theme
     */
    get: function() {
      return utils.getAttr(document.documentElement, 'theme') || 
             utils.getAttr(document.documentElement, 'data-theme') || 
             'system';
    },
    
    /**
     * Set theme
     */
    set: function(mode) {
      var html = document.documentElement;
      
      if (mode === 'system') {
        html.removeAttribute('theme');
        html.removeAttribute('data-theme');
        this._save('system');
      } else {
        utils.setAttr(html, 'theme', mode);
        utils.setAttr(html, 'data-theme', mode);
        this._save(mode);
      }
      
      // Dispatch event
      document.dispatchEvent(new CustomEvent('semantic:theme-change', {
        detail: { theme: mode }
      }));
    },
    
    /**
     * Toggle between light and dark
     */
    toggle: function() {
      var current = this.get();
      if (current === 'dark') {
        this.set('light');
      } else {
        this.set('dark');
      }
    },
    
    /**
     * Check if dark mode is active
     */
    isDark: function() {
      var current = this.get();
      if (current === 'dark') return true;
      if (current === 'light') return false;
      return env.darkMode;
    },
    
    /**
     * Apply system theme
     */
    _applySystemTheme: function() {
      // Let CSS media query handle it
      var html = document.documentElement;
      html.removeAttribute('theme');
      html.removeAttribute('data-theme');
    },
    
    /**
     * Save theme preference
     */
    _save: function(mode) {
      try {
        localStorage.setItem('semantic-theme', mode);
      } catch (e) {
        // localStorage not available
      }
    },
    
    /**
     * Get saved theme preference
     */
    _getSaved: function() {
      try {
        return localStorage.getItem('semantic-theme');
      } catch (e) {
        return null;
      }
    }
  };

  // ==================================================
  // Toast Module
  // ==================================================
  
  var toast = {
    _container: null,
    _queue: [],
    
    init: function() {
      // Create container if using stacked toasts
      if (!this._container) {
        this._container = utils.create('div', {
          'role': 'log',
          'aria-live': 'polite',
          'aria-label': 'Notifications'
        });
        document.body.appendChild(this._container);
      }
    },
    
    /**
     * Show a toast notification
     */
    show: function(message, options) {
      options = options || {};
      var type = options.type || 'default';
      var duration = typeof options.duration !== 'undefined' ? options.duration : config.toastDuration;
      var closable = options.closable !== false;
      var self = this;
      
      this.init();
      
      // Create toast using semantic output element
      var toastEl = utils.create('output', {
        'role': 'status',
        'type': type
      }, message);
      
      // Add close button if closable
      if (closable) {
        var closeBtn = utils.create('button', {
          'type': 'button',
          'variant': 'ghost',
          'size': 'xs',
          'aria-label': 'Close notification',
          'style': 'color: inherit; min-height: auto; padding: 0.25rem;'
        }, '×');
        
        closeBtn.addEventListener('click', function() {
          self.hide(toastEl);
        });
        
        toastEl.appendChild(closeBtn);
      }
      
      // Add to container
      this._container.appendChild(toastEl);
      
      // Trigger animation
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          utils.setAttr(toastEl, 'visible', true);
        });
      });
      
      // Auto-hide after duration
      if (duration > 0) {
        setTimeout(function() {
          self.hide(toastEl);
        }, duration);
      }
      
      return toastEl;
    },
    
    /**
     * Hide a toast
     */
    hide: function(toastEl) {
      toastEl.removeAttribute('visible');
      
      toastEl.addEventListener('transitionend', function handler() {
        toastEl.removeEventListener('transitionend', handler);
        if (toastEl.parentNode) {
          toastEl.parentNode.removeChild(toastEl);
        }
      });
      
      // Fallback removal if transition doesn't fire
      setTimeout(function() {
        if (toastEl.parentNode) {
          toastEl.parentNode.removeChild(toastEl);
        }
      }, 500);
    },
    
    /**
     * Convenience methods
     */
    success: function(message, options) {
      return this.show(message, Object.assign({}, options, { type: 'success' }));
    },
    
    error: function(message, options) {
      return this.show(message, Object.assign({}, options, { type: 'danger' }));
    },
    
    warning: function(message, options) {
      return this.show(message, Object.assign({}, options, { type: 'warning' }));
    },
    
    info: function(message, options) {
      return this.show(message, Object.assign({}, options, { type: 'info' }));
    }
  };

  // ==================================================
  // Forms Module
  // ==================================================
  
  var forms = {
    init: function() {
      this._initValidation();
      this._initEnhancements();
    },
    
    /**
     * Initialize form validation
     */
    _initValidation: function() {
      // Real-time validation on blur
      utils.on(document, 'blur', 'input, select, textarea', function() {
        this._validateField(this);
      }.bind(this), true);
      
      // Also validate on input for better UX
      utils.on(document, 'input', 'input, textarea', utils.debounce(function(e) {
        var field = e.target;
        // Only validate if field has been touched (has value or was previously invalid)
        if (field.value || field.dataset.touched) {
          field.dataset.touched = 'true';
          this._validateField(field);
        }
      }.bind(this), 300));
      
      // Handle form submission
      utils.on(document, 'submit', 'form', function(e) {
        var form = e.target;
        var isValid = this._validateForm(form);
        
        if (!isValid) {
          e.preventDefault();
          
          // Focus first invalid field
          var firstInvalid = form.querySelector(':invalid');
          if (firstInvalid) {
            firstInvalid.focus();
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }.bind(this));
    },
    
    /**
     * Validate a single field
     */
    _validateField: function(field) {
      var isValid = field.checkValidity();
      
      // Find associated error element
      var errorEl = this._getErrorElement(field);
      
      if (!isValid && field.validationMessage) {
        if (errorEl) {
          errorEl.textContent = field.validationMessage;
          errorEl.hidden = false;
        }
      } else if (errorEl) {
        errorEl.textContent = '';
        errorEl.hidden = true;
      }
      
      return isValid;
    },
    
    /**
     * Validate entire form
     */
    _validateForm: function(form) {
      var fields = form.querySelectorAll('input, select, textarea');
      var isValid = true;
      
      fields.forEach(function(field) {
        field.dataset.touched = 'true';
        if (!this._validateField(field)) {
          isValid = false;
        }
      }.bind(this));
      
      return isValid;
    },
    
    /**
     * Get error element for a field
     */
    _getErrorElement: function(field) {
      // Look for element with matching data-for attribute
      var id = field.id;
      if (id) {
        var errorEl = document.querySelector('[data-error-for="' + id + '"]');
        if (errorEl) return errorEl;
      }
      
      // Look for sibling with data-error attribute
      var parent = field.parentElement;
      if (parent) {
        return parent.querySelector('[data-error]');
      }
      
      return null;
    },
    
    /**
     * Initialize form enhancements
     */
    _initEnhancements: function() {
      // Add aria-describedby for error elements
      utils.$$('[data-error]').forEach(function(errorEl) {
        var field = errorEl.previousElementSibling;
        if (field && (field.tagName === 'INPUT' || field.tagName === 'SELECT' || field.tagName === 'TEXTAREA')) {
          if (!errorEl.id) {
            errorEl.id = 'error-' + Math.random().toString(36).substr(2, 9);
          }
          field.setAttribute('aria-describedby', errorEl.id);
        }
      });
    }
  };

  // ==================================================
  // Details/Accordion Module
  // ==================================================
  
  var details = {
    init: function() {
      this._initAccordionGroups();
      this._initAnimations();
    },
    
    /**
     * Initialize accordion groups (only one open at a time)
     */
    _initAccordionGroups: function() {
      utils.on(document, 'toggle', 'details[group]', function(e) {
        var detail = e.target;
        if (!detail.open) return;
        
        var groupName = detail.getAttribute('group');
        var siblings = utils.$$('details[group="' + groupName + '"]');
        
        siblings.forEach(function(sibling) {
          if (sibling !== detail && sibling.open) {
            sibling.open = false;
          }
        });
      }, true);
    },
    
    /**
     * Initialize smooth animations for details
     */
    _initAnimations: function() {
      if (env.reducedMotion) return;
      
      utils.$$('details[animated]').forEach(function(detail) {
        var summary = detail.querySelector('summary');
        var content = detail.querySelector(':scope > *:not(summary)');
        
        if (!content) return;
        
        // Wrap content for animation
        if (!content.hasAttribute('data-details-content')) {
          var wrapper = utils.create('div', { 'data-details-content': '' });
          while (detail.children.length > 1) {
            wrapper.appendChild(detail.children[1]);
          }
          detail.appendChild(wrapper);
          content = wrapper;
        }
        
        summary.addEventListener('click', function(e) {
          e.preventDefault();
          
          if (detail.open) {
            // Closing
            content.style.height = content.scrollHeight + 'px';
            requestAnimationFrame(function() {
              content.style.height = '0';
              content.style.overflow = 'hidden';
            });
            
            content.addEventListener('transitionend', function handler() {
              content.removeEventListener('transitionend', handler);
              detail.open = false;
              content.style.height = '';
              content.style.overflow = '';
            });
          } else {
            // Opening
            detail.open = true;
            var targetHeight = content.scrollHeight;
            content.style.height = '0';
            content.style.overflow = 'hidden';
            
            requestAnimationFrame(function() {
              content.style.height = targetHeight + 'px';
            });
            
            content.addEventListener('transitionend', function handler() {
              content.removeEventListener('transitionend', handler);
              content.style.height = '';
              content.style.overflow = '';
            });
          }
        });
      });
    }
  };

  // ==================================================
  // Dialog Module
  // ==================================================
  
  var dialog = {
    _stack: [],
    
    init: function() {
      if (!env.supportsDialog) {
        console.warn('Semantic.js: Native dialog not supported. Consider a polyfill.');
        return;
      }
      
      this._initTriggers();
      this._initCloseHandlers();
    },
    
    /**
     * Initialize dialog triggers
     */
    _initTriggers: function() {
      utils.on(document, 'click', '[data-dialog-open]', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-dialog-open');
        var dialogEl = document.getElementById(targetId);
        if (dialogEl) {
          dialog.open(dialogEl);
        }
      });
    },
    
    /**
     * Initialize close handlers
     */
    _initCloseHandlers: function() {
      var self = this;
      
      // Close button
      utils.on(document, 'click', '[data-dialog-close]', function(e) {
        var dialogEl = this.closest('dialog');
        if (dialogEl) {
          self.close(dialogEl);
        }
      });
      
      // Backdrop click
      utils.on(document, 'click', 'dialog', function(e) {
        if (e.target === this) {
          // Clicked on backdrop (dialog element itself, not content)
          var rect = this.getBoundingClientRect();
          var isInDialog = (
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width
          );
          
          if (!isInDialog) {
            self.close(this);
          }
        }
      });
      
      // Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && self._stack.length > 0) {
          var topDialog = self._stack[self._stack.length - 1];
          if (!topDialog.hasAttribute('data-no-escape')) {
            self.close(topDialog);
          }
        }
      });
    },
    
    /**
     * Open a dialog
     */
    open: function(dialogEl) {
      if (typeof dialogEl === 'string') {
        dialogEl = document.getElementById(dialogEl);
      }
      
      if (!dialogEl) return;
      
      // Store previously focused element
      dialogEl._previousFocus = document.activeElement;
      
      // Show modal
      dialogEl.showModal();
      this._stack.push(dialogEl);
      
      // Focus first focusable element
      var focusable = dialogEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) {
        focusable.focus();
      }
      
      // Dispatch event
      dialogEl.dispatchEvent(new CustomEvent('semantic:dialog-open'));
    },
    
    /**
     * Close a dialog
     */
    close: function(dialogEl) {
      if (typeof dialogEl === 'string') {
        dialogEl = document.getElementById(dialogEl);
      }
      
      if (!dialogEl || !dialogEl.open) return;
      
      dialogEl.close();
      
      // Remove from stack
      var index = this._stack.indexOf(dialogEl);
      if (index > -1) {
        this._stack.splice(index, 1);
      }
      
      // Restore focus
      if (dialogEl._previousFocus) {
        dialogEl._previousFocus.focus();
      }
      
      // Dispatch event
      dialogEl.dispatchEvent(new CustomEvent('semantic:dialog-close'));
    }
  };

  // ==================================================
  // iOS Module
  // ==================================================
  
  var ios = {
    init: function() {
      if (!env.iOS) return;
      
      // Add iOS class to body
      document.body.setAttribute('ios', '');
      
      if (env.standalone) {
        document.body.setAttribute('standalone', '');
      }
      
      this._fixInputFocus();
      this._enableFastClicks();
    },
    
    /**
     * Fix input focus scrolling issues
     */
    _fixInputFocus: function() {
      document.addEventListener('focus', function(e) {
        var target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {
          setTimeout(function() {
            if (target.scrollIntoViewIfNeeded) {
              target.scrollIntoViewIfNeeded(true);
            } else {
              target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 300);
        }
      }, true);
    },
    
    /**
     * Enable fast clicks by removing 300ms delay
     */
    _enableFastClicks: function() {
      document.addEventListener('touchstart', function() {}, { passive: true });
    }
  };

  // ==================================================
  // Core Initialization
  // ==================================================
  
  var core = {
    _initialized: false,
    
    init: function(options) {
      if (this._initialized) {
        console.warn('Semantic.js already initialized');
        return Semantic;
      }
      
      this._initialized = true;
      
      // Merge options
      if (options) {
        for (var key in options) {
          if (options.hasOwnProperty(key) && config.hasOwnProperty(key)) {
            config[key] = options[key];
          }
        }
      }
      
      // Initialize modules
      if (config.enableTheme) theme.init();
      if (config.enableToast) toast.init();
      if (config.enableForms) forms.init();
      if (config.enableDetails) details.init();
      if (config.enableDialog) dialog.init();
      
      // iOS optimizations
      if (env.iOS) ios.init();
      
      // Add touch/keyboard detection
      this._initInputDetection();
      
      // Dispatch init event
      document.dispatchEvent(new CustomEvent('semantic:init'));
      
      console.log('Semantic.js initialized');
      
      return Semantic;
    },
    
    /**
     * Detect input method (touch vs keyboard)
     */
    _initInputDetection: function() {
      var usingKeyboard = false;
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          usingKeyboard = true;
          document.body.setAttribute('keyboard-nav', '');
        }
      });
      
      document.addEventListener('mousedown', function() {
        usingKeyboard = false;
        document.body.removeAttribute('keyboard-nav');
      });
      
      document.addEventListener('touchstart', function() {
        usingKeyboard = false;
        document.body.removeAttribute('keyboard-nav');
      }, { passive: true });
    }
  };

  // ==================================================
  // Public API
  // ==================================================
  
  var Semantic = {
    // Core
    init: core.init.bind(core),
    config: config,
    env: env,
    utils: utils,
    
    // Modules
    theme: {
      get: theme.get.bind(theme),
      set: theme.set.bind(theme),
      toggle: theme.toggle.bind(theme),
      isDark: theme.isDark.bind(theme)
    },
    
    toast: {
      show: toast.show.bind(toast),
      hide: toast.hide.bind(toast),
      success: toast.success.bind(toast),
      error: toast.error.bind(toast),
      warning: toast.warning.bind(toast),
      info: toast.info.bind(toast)
    },
    
    dialog: {
      open: dialog.open.bind(dialog),
      close: dialog.close.bind(dialog)
    },
    
    // Version
    version: '1.0.0'
  };

  // Expose globally
  global.Semantic = Semantic;

  // Log availability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Semantic.js loaded. Call Semantic.init() to initialize.');
    });
  } else {
    console.log('Semantic.js loaded. Call Semantic.init() to initialize.');
  }

})(typeof window !== 'undefined' ? window : this);
