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
  // Tabs Module
  // ==================================================
  
  var tabs = {
    init: function() {
      this._initTabs();
      this._initKeyboardNav();
    },
    
    /**
     * Initialize tab click handlers
     */
    _initTabs: function() {
      var self = this;
      
      utils.on(document, 'click', '[role="tab"]', function(e) {
        e.preventDefault();
        self.select(this);
      });
    },
    
    /**
     * Initialize keyboard navigation
     */
    _initKeyboardNav: function() {
      var self = this;
      
      utils.on(document, 'keydown', '[role="tab"]', function(e) {
        var tablist = this.closest('[role="tablist"]');
        if (!tablist) return;
        
        var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
        var currentIndex = tabs.indexOf(this);
        var isVertical = tablist.hasAttribute('vertical');
        
        var nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
        var prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
        
        if (e.key === nextKey) {
          e.preventDefault();
          var nextIndex = (currentIndex + 1) % tabs.length;
          tabs[nextIndex].focus();
          self.select(tabs[nextIndex]);
        } else if (e.key === prevKey) {
          e.preventDefault();
          var prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          tabs[prevIndex].focus();
          self.select(tabs[prevIndex]);
        } else if (e.key === 'Home') {
          e.preventDefault();
          tabs[0].focus();
          self.select(tabs[0]);
        } else if (e.key === 'End') {
          e.preventDefault();
          tabs[tabs.length - 1].focus();
          self.select(tabs[tabs.length - 1]);
        }
      });
    },
    
    /**
     * Select a tab
     */
    select: function(tab) {
      if (typeof tab === 'string') {
        tab = document.querySelector(tab);
      }
      if (!tab) return;
      
      var tablist = tab.closest('[role="tablist"]');
      if (!tablist) return;
      
      // Get all tabs in this tablist
      var allTabs = tablist.querySelectorAll('[role="tab"]');
      
      // Deselect all tabs
      allTabs.forEach(function(t, index) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        
        // Find and hide corresponding panel
        var panelId = t.getAttribute('aria-controls');
        var panel = panelId ? document.getElementById(panelId) : null;
        
        // If no aria-controls, try to find panel by index
        if (!panel) {
          var container = tablist.parentElement;
          var panels = container ? container.querySelectorAll('[role="tabpanel"]') : [];
          panel = panels[index];
        }
        
        if (panel) {
          panel.hidden = true;
        }
      });
      
      // Select clicked tab
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      
      // Show corresponding panel
      var panelId = tab.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : null;
      
      if (!panel) {
        var tabIndex = Array.prototype.indexOf.call(allTabs, tab);
        var container = tablist.parentElement;
        var panels = container ? container.querySelectorAll('[role="tabpanel"]') : [];
        panel = panels[tabIndex];
      }
      
      if (panel) {
        panel.hidden = false;
      }
      
      // Dispatch event
      tab.dispatchEvent(new CustomEvent('semantic:tab-select', {
        bubbles: true,
        detail: { tab: tab, panel: panel }
      }));
    }
  };

  // ==================================================
  // Navbar Module
  // ==================================================
  
  var navbar = {
    init: function() {
      this._initToggles();
    },
    
    /**
     * Initialize navbar toggle buttons
     */
    _initToggles: function() {
      var self = this;
      
      utils.on(document, 'click', '[data-navbar-toggle]', function(e) {
        e.preventDefault();
        var nav = this.closest('[data-navbar]') || this.closest('nav');
        var menu = nav ? nav.querySelector('[data-navbar-menu]') : null;
        
        if (menu) {
          self.toggle(menu, this);
        }
      });
      
      // Close on escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          var openMenus = document.querySelectorAll('[data-navbar-menu][open]');
          openMenus.forEach(function(menu) {
            self.close(menu);
          });
        }
      });
      
      // Close on click outside
      document.addEventListener('click', function(e) {
        var openMenus = document.querySelectorAll('[data-navbar-menu][open]');
        openMenus.forEach(function(menu) {
          var nav = menu.closest('[data-navbar]') || menu.closest('nav');
          if (nav && !nav.contains(e.target)) {
            self.close(menu);
          }
        });
      });
    },
    
    /**
     * Toggle menu visibility
     */
    toggle: function(menu, button) {
      if (menu.hasAttribute('open')) {
        this.close(menu, button);
      } else {
        this.open(menu, button);
      }
    },
    
    /**
     * Open menu
     */
    open: function(menu, button) {
      menu.setAttribute('open', '');
      menu.hidden = false;
      if (button) {
        button.setAttribute('aria-expanded', 'true');
      }
    },
    
    /**
     * Close menu
     */
    close: function(menu, button) {
      menu.removeAttribute('open');
      menu.hidden = true;
      if (button) {
        button.setAttribute('aria-expanded', 'false');
      } else {
        var nav = menu.closest('[data-navbar]') || menu.closest('nav');
        var btn = nav ? nav.querySelector('[data-navbar-toggle]') : null;
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    }
  };

  // ==================================================
  // Tooltip Module
  // ==================================================
  
  var tooltip = {
    _activeTooltip: null,
    
    init: function() {
      this._initTooltips();
    },
    
    /**
     * Initialize tooltips with smart positioning
     */
    _initTooltips: function() {
      var self = this;
      
      // Show on mouseenter
      utils.on(document, 'mouseenter', '[data-tooltip]', function() {
        self.show(this);
      });
      
      // Hide on mouseleave
      utils.on(document, 'mouseleave', '[data-tooltip]', function() {
        self.hide(this);
      });
      
      // Show on focus for accessibility
      utils.on(document, 'focus', '[data-tooltip]', function() {
        self.show(this);
      }, true);
      
      // Hide on blur
      utils.on(document, 'blur', '[data-tooltip]', function() {
        self.hide(this);
      }, true);
      
      // Hide on escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && self._activeTooltip) {
          self.hide(self._activeTooltip._trigger);
        }
      });
    },
    
    /**
     * Show tooltip with smart positioning
     */
    show: function(trigger) {
      var text = trigger.getAttribute('data-tooltip');
      if (!text) return;
      
      // Remove any existing tooltip
      this.hide(trigger);
      
      // Create tooltip element
      var tip = document.createElement('div');
      tip.setAttribute('role', 'tooltip');
      tip.textContent = text;
      tip.style.cssText = 'position:fixed;z-index:10000;background:var(--gray-900);color:white;padding:0.5rem 0.75rem;border-radius:var(--radius-sm);font-size:var(--text-sm);max-width:200px;pointer-events:none;opacity:0;transition:opacity 0.15s;';
      
      document.body.appendChild(tip);
      
      // Calculate position
      var rect = trigger.getBoundingClientRect();
      var tipRect = tip.getBoundingClientRect();
      var position = trigger.getAttribute('data-tooltip-position') || 'top';
      
      var top, left;
      var padding = 8;
      
      // Calculate initial position
      switch (position) {
        case 'bottom':
          top = rect.bottom + padding;
          left = rect.left + (rect.width - tipRect.width) / 2;
          break;
        case 'left':
          top = rect.top + (rect.height - tipRect.height) / 2;
          left = rect.left - tipRect.width - padding;
          break;
        case 'right':
          top = rect.top + (rect.height - tipRect.height) / 2;
          left = rect.right + padding;
          break;
        default: // top
          top = rect.top - tipRect.height - padding;
          left = rect.left + (rect.width - tipRect.width) / 2;
      }
      
      // Smart positioning - flip if off screen
      if (top < 0) {
        top = rect.bottom + padding;
      } else if (top + tipRect.height > window.innerHeight) {
        top = rect.top - tipRect.height - padding;
      }
      
      if (left < 0) {
        left = padding;
      } else if (left + tipRect.width > window.innerWidth) {
        left = window.innerWidth - tipRect.width - padding;
      }
      
      tip.style.top = top + 'px';
      tip.style.left = left + 'px';
      
      // Animate in
      requestAnimationFrame(function() {
        tip.style.opacity = '1';
      });
      
      // Store reference
      trigger._tooltip = tip;
      tip._trigger = trigger;
      this._activeTooltip = tip;
    },
    
    /**
     * Hide tooltip
     */
    hide: function(trigger) {
      if (trigger && trigger._tooltip) {
        var tip = trigger._tooltip;
        tip.style.opacity = '0';
        setTimeout(function() {
          if (tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }
        }, 150);
        trigger._tooltip = null;
        if (this._activeTooltip === tip) {
          this._activeTooltip = null;
        }
      }
    }
  };

  // ==================================================
  // Scrollspy Module
  // ==================================================
  
  var scrollspy = {
    _observers: [],
    
    init: function() {
      this._initFromAttributes();
    },
    
    /**
     * Initialize scrollspy from data attributes
     */
    _initFromAttributes: function() {
      var self = this;
      var spyNavs = document.querySelectorAll('[data-scrollspy]');
      
      spyNavs.forEach(function(nav) {
        var targetSelector = nav.getAttribute('data-scrollspy');
        self.observe(nav, targetSelector);
      });
    },
    
    /**
     * Observe sections for a navigation
     */
    observe: function(nav, sectionSelector) {
      var self = this;
      sectionSelector = sectionSelector || 'section[id]';
      
      var sections = document.querySelectorAll(sectionSelector);
      if (!sections.length) return;
      
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            if (!id) return;
            
            // Update nav links
            var links = nav.querySelectorAll('a');
            links.forEach(function(link) {
              var href = link.getAttribute('href');
              if (href === '#' + id) {
                link.setAttribute('aria-current', 'true');
              } else {
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      });
      
      sections.forEach(function(section) {
        observer.observe(section);
      });
      
      this._observers.push(observer);
      
      return observer;
    },
    
    /**
     * Stop observing
     */
    disconnect: function() {
      this._observers.forEach(function(observer) {
        observer.disconnect();
      });
      this._observers = [];
    }
  };

  // ==================================================
  // Alert Dismiss
  // ==================================================
  
  var alerts = {
    init: function() {
      utils.on(document, 'click', 'aside[role="alert"] button[close]', function() {
        var alert = this.closest('aside[role="alert"]');
        if (alert) {
          alert.style.opacity = '0';
          alert.style.transform = 'translateX(100%)';
          alert.style.transition = 'all 0.3s ease';
          setTimeout(function() {
            if (alert.parentNode) {
              alert.parentNode.removeChild(alert);
            }
          }, 300);
        }
      });
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
      
      // Initialize new modules
      tabs.init();
      navbar.init();
      tooltip.init();
      scrollspy.init();
      alerts.init();
      
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
    
    tabs: {
      select: tabs.select.bind(tabs)
    },
    
    navbar: {
      toggle: navbar.toggle.bind(navbar),
      open: navbar.open.bind(navbar),
      close: navbar.close.bind(navbar)
    },
    
    tooltip: {
      show: tooltip.show.bind(tooltip),
      hide: tooltip.hide.bind(tooltip)
    },
    
    scrollspy: {
      observe: scrollspy.observe.bind(scrollspy),
      disconnect: scrollspy.disconnect.bind(scrollspy)
    },
    
    // Version
    version: '1.1.0'
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
