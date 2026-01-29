# ParkerBarker Style System

A user-friendly design system prioritizing clarity and accessibility, with special optimizations for iOS WebViews.

**Live at:** [https://assets.parkerbarker.com](https://assets.parkerbarker.com)

## Quick Start

Add these lines to any HTML page to use the style system:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>My App</title>
  
  <!-- ParkerBarker CSS from CDN -->
  <link rel="stylesheet" href="https://assets.parkerbarker.com/css/parkerbarker.css">
</head>
<body>
  <div class="pb-container">
    <h1>Hello ParkerBarker!</h1>
    <button class="pb-button">Click Me</button>
  </div>

  <!-- ParkerBarker JS from CDN -->
  <script src="https://assets.parkerbarker.com/js/parkerbarker.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      ParkerBarker.init();
    });
  </script>
</body>
</html>
```

## CDN URLs

| Asset | URL |
|-------|-----|
| CSS | `https://assets.parkerbarker.com/css/parkerbarker.css` |
| JavaScript | `https://assets.parkerbarker.com/js/parkerbarker.js` |
| Style Guide | `https://assets.parkerbarker.com/styleguide.html` |

## File Structure

```
├── css/
│   └── parkerbarker.css    # All styles consolidated
├── js/
│   └── parkerbarker.js     # All JS consolidated (vanilla, no dependencies)
├── fonts/                   # GT Ultra fonts (woff2, woff, ttf, otf)
├── favicon/                 # Favicon assets for all platforms
├── index.html              # Landing page
├── styleguide.html         # Interactive style guide
├── CNAME                   # Custom domain for GitHub Pages
└── README.md               # This file
```

## Hosting

This repository is hosted on GitHub Pages with a custom domain. The site is automatically deployed when changes are pushed to the main branch.

## Features

- **Vanilla JS** - No dependencies, works in any browser
- **iOS Optimized** - Safe area support, touch-friendly tap targets
- **Dark Mode** - Built-in dark mode with system preference detection
- **Accessible** - WCAG-compliant with screen reader support
- **Custom Fonts** - GT Ultra Fine (serif) and GT Ultra Standard (sans-serif)

## CSS Classes

### Layout
- `.pb-container` - Centered container with max-width
- `.pb-flex`, `.pb-grid` - Flexbox and Grid containers
- `.pb-gap-sm`, `.pb-gap-md`, `.pb-gap-lg` - Gap utilities

### Components
- `.pb-button` - Primary button
- `.pb-card` - Card container
- `.pb-alert` - Alert messages
- `.pb-form` - Form wrapper with styled inputs

### Utilities
- `.pb-mb-0` to `.pb-mb-4` - Margin bottom
- `.pb-text-center`, `.pb-text-bold` - Text utilities
- `.pb-hidden` - Hide element

## JavaScript API

```javascript
// Initialize
ParkerBarker.init();

// Toast notifications
ParkerBarker.toast.show('Hello!', { type: 'success' });

// Theme
ParkerBarker.theme.toggleDarkMode();

// DOM utilities
ParkerBarker.dom.addClass(el, 'my-class');
ParkerBarker.dom.on(document, 'click', '.btn', handler);

// Environment
ParkerBarker.env.iOS      // true on iOS
ParkerBarker.env.touch    // true on touch devices
ParkerBarker.env.darkMode // true if prefers dark
```

## Customization

Override CSS variables in your own stylesheet:

```css
:root {
  --pb-primary: #your-brand-color;
  --pb-font-sans: 'Your Font', sans-serif;
}
```

## Browser Support

- Chrome, Safari, Firefox, Edge (modern versions)
- iOS Safari 12+
- iOS WebViews

## Style Guide

Open `styleguide.html` in a browser to see all components and examples interactively.

---

Made with care for the Parker Barker family.
