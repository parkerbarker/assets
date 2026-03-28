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
  
  <!-- ParkerBarker CSS (imports shared variables.css for tokens + fonts) -->
  <link rel="stylesheet" href="https://assets.parkerbarker.com/css/parkerbarker.css">
</head>
<body>
  <div class="pb-container">
    <h1>Hello ParkerBarker!</h1>
    <button class="pb-button">Click Me</button>
  </div>

  <!-- Shared JS core first, then ParkerBarker entry -->
  <script src="https://assets.parkerbarker.com/js/ui-core.js"></script>
  <script src="https://assets.parkerbarker.com/js/parkerbarker.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      ParkerBarker.init();
    });
  </script>
</body>
</html>
```

Call `ParkerBarker.init()` (or `Semantic.init()` with the semantic CSS/JS) on `DOMContentLoaded` or later so it lines up with the font-loading CSS: the JS preloads GT Ultra faces via the Font Loading API and adds the class `fonts-ready` to `<html>`. The CSS fades the page in once that class is set. If you use the CSS without calling `init()`, a 3-second CSS fallback still reveals the page.

**Script order:** load `ui-core.js` before `parkerbarker.js` or `semantic.js`. The shared module is exposed as `ParkerBarkerCore` (environment detection, font loading, event delegation, and small helpers).

### Design tokens (`variables.css`)

`parkerbarker.css` and `semantic.css` both `@import` [`css/variables.css`](css/variables.css). Edit **`--core-*`** there to change brand colors, neutrals, spacing, radii, and type scales in one place; **`--pb-*`** and semantic names (`--primary`, `--gray-*`, …) are aliases. Minified CSS bundles inline `variables.css` (no extra request); unminified source triggers a second stylesheet fetch for `variables.css`.

### Web fonts and `fonts-ready`

- **ParkerBarker** (`parkerbarker.css` + `ui-core.js` + `parkerbarker.js`): `@font-face` and design tokens are pulled in from `variables.css` (via `@import`). With `prefers-reduced-motion: no-preference`, `body` stays at `opacity: 0` until `html` has `fonts-ready`, then transitions visible. With `prefers-reduced-motion: reduce`, no hide—content shows immediately.
- **Semantic** (`semantic.css` + `ui-core.js` + `semantic.js`): Same pattern, same `fonts-ready` class name, and the same shared `variables.css` tokens.
- **Disable JS font loading** (keep your own timing or static pages): `ParkerBarker.init({ enableFontLoading: false })` or `Semantic.init({ enableFontLoading: false })`. You may still want `init()` for theme, toasts, and other features.

## CDN URLs

| Asset | URL |
|-------|-----|
| CSS | `https://assets.parkerbarker.com/css/parkerbarker.css` |
| CSS (minified) | `https://assets.parkerbarker.com/css/parkerbarker.min.css` |
| Semantic CSS | `https://assets.parkerbarker.com/css/semantic.css` |
| Semantic CSS (minified) | `https://assets.parkerbarker.com/css/semantic.min.css` |
| Shared tokens + fonts | `https://assets.parkerbarker.com/css/variables.css` — imported by the sheets above; link alone only if you need tokens/fonts without the full frameworks |
| Shared JS (load first) | `https://assets.parkerbarker.com/js/ui-core.js` |
| Shared JS (minified) | `https://assets.parkerbarker.com/js/ui-core.min.js` |
| JavaScript | `https://assets.parkerbarker.com/js/parkerbarker.js` |
| JS (minified) | `https://assets.parkerbarker.com/js/parkerbarker.min.js` |
| Semantic JS | `https://assets.parkerbarker.com/js/semantic.min.js` |

### Images

| Asset | URL |
|-------|-----|
| Logo (White) | `https://assets.parkerbarker.com/img/Logo-White.svg` |
| Logo (Black) | `https://assets.parkerbarker.com/img/Logo-Black.svg` |

### Fonts

`variables.css` (imported by `parkerbarker.css` and `semantic.css`) declares the bundled GT Ultra `@font-face` rules. Use the following only if you are **not** loading those stylesheets and need the fonts alone:

Load the GT Ultra fonts directly with `@font-face`:

```css
/* GT Ultra Fine - Serif (for headings) */
@font-face {
  font-family: 'GT Ultra Fine';
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  src: url('https://assets.parkerbarker.com/fonts/GT-Ultra-Fine-Light.woff2') format('woff2'),
       url('https://assets.parkerbarker.com/fonts/GT-Ultra-Fine-Light.woff') format('woff');
}

@font-face {
  font-family: 'GT Ultra Fine';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url('https://assets.parkerbarker.com/fonts/GT-Ultra-Fine-Bold.woff2') format('woff2'),
       url('https://assets.parkerbarker.com/fonts/GT-Ultra-Fine-Bold.woff') format('woff');
}

/* GT Ultra Standard - Sans-serif (for body text) */
@font-face {
  font-family: 'GT Ultra Standard';
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  src: url('https://assets.parkerbarker.com/fonts/GT-Ultra-Standard-Light.woff2') format('woff2'),
       url('https://assets.parkerbarker.com/fonts/GT-Ultra-Standard-Light.woff') format('woff');
}

@font-face {
  font-family: 'GT Ultra Standard';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url('https://assets.parkerbarker.com/fonts/GT-Ultra-Standard-Bold.woff2') format('woff2'),
       url('https://assets.parkerbarker.com/fonts/GT-Ultra-Standard-Bold.woff') format('woff');
}

/* Usage */
body {
  font-family: 'GT Ultra Standard', system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'GT Ultra Fine', Georgia, serif;
}
```

## File Structure

```
├── css/
│   ├── variables.css           # Shared tokens + @font-face (--core-*, --pb-*, semantic vars)
│   ├── variables.min.css       # Minified tokens-only sheet (optional second link)
│   ├── parkerbarker.css        # Imports variables.css, then component/layout rules
│   ├── parkerbarker.min.css    # Minified bundle (variables inlined via build)
│   ├── semantic.css            # Imports variables.css, then semantic rules
│   └── semantic.min.css        # Minified bundle (variables inlined)
├── js/
│   ├── ui-core.js              # Shared primitives (fonts, env, delegation); load before entry scripts
│   ├── ui-core.min.js          # Minified shared core
│   ├── parkerbarker.js         # Class-based entry (requires ui-core.js)
│   ├── parkerbarker.min.js     # Minified
│   ├── semantic.js             # Semantic entry (requires ui-core.js)
│   └── semantic.min.js         # Minified
├── fonts/                       # GT Ultra fonts (woff2, woff, ttf, otf)
├── img/
│   ├── Logo-White.svg          # Logo for dark backgrounds
│   └── Logo-Black.svg          # Logo for light backgrounds
├── favicon/                     # Favicon assets for all platforms
├── scripts/                     # Build scripts
├── index.html                   # Landing page
├── parkerbarker-guide.html      # Class-based (pb-*) reference
├── semantic-guide.html          # Semantic CSS guide
├── CNAME                        # Custom domain for GitHub Pages
└── README.md                    # This file
```

## Development

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Setup

```bash
pnpm install
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm run build` | Build all minified JS and CSS with source maps |
| `pnpm run build:js` | Build minified JS only |
| `pnpm run build:css` | Build minified CSS only (`postcss-import` inlines `variables.css` into `*.min.css`) |
| `pnpm run lint` | Run ESLint and Stylelint |
| `pnpm run lint:fix` | Auto-fix lint issues |

### Git Hooks

The repo uses Husky for automated quality checks:

**On commit:**
- Runs linters with auto-fix on staged CSS/JS files

**On push:**
- Detects if CSS/JS source files changed
- Builds minified files automatically
- Amends commit to include built files (push again if prompted)

This ensures minified files are always in sync with source files in the same commit.

## Hosting

This repository is hosted on GitHub Pages with a custom domain. The site is automatically deployed when changes are pushed to the main branch.

## Features

- **Vanilla JS** - No npm packages; load `ui-core.js` then the ParkerBarker or Semantic entry script
- **iOS Optimized** - Safe area support, touch-friendly tap targets
- **Dark Mode** - Built-in dark mode with system preference detection
- **Accessible** - WCAG-compliant with screen reader support
- **Custom Fonts** - GT Ultra Fine (serif) and GT Ultra Standard (sans-serif)
- **Font loading** - Optional coordinated CSS/JS flow (`html.fonts-ready`) to reduce flash of unstyled type; respects `prefers-reduced-motion`
- **Shared CSS tokens** - `variables.css` keeps ParkerBarker (`--pb-*`) and Semantic (`--primary`, `--gray-*`, …) aligned via `--core-*` primitives

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

Load `ui-core.js` before `parkerbarker.js` or `semantic.js`. Shared helpers live on `ParkerBarkerCore` if you need them directly.

```javascript
// Initialize (default: enableFontLoading: true — pairs with CSS fonts-ready fade-in)
ParkerBarker.init();
ParkerBarker.init({ enableFontLoading: false }); // skip Font Loading API; optional for CSS-only pages

// Semantic (same option)
Semantic.init();
Semantic.init({ enableFontLoading: false });

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

**Repo / fork:** edit [`css/variables.css`](css/variables.css) and change **`--core-*`** (e.g. `--core-primary`, `--core-font-sans`) so both stacks stay in sync.

**Consuming from CDN:** load your overrides *after* the framework stylesheet so your values win.

```css
:root {
  --core-primary: #your-brand-color;
  --core-font-sans: 'Your Font', system-ui, sans-serif;
}
```

Or override only the public names you use:

```css
:root {
  --pb-primary: #your-brand-color;
  --primary: #your-brand-color;
}
```

## Browser Support

- Chrome, Safari, Firefox, Edge (modern versions)
- iOS Safari 12+
- iOS WebViews

## Style guides

Open [`index.html`](index.html) for the classic landing page, [`parkerbarker-guide.html`](parkerbarker-guide.html) for the class-based (`pb-*`) reference, or [`semantic-guide.html`](semantic-guide.html) for the Semantic CSS reference.

---

Made with care for the Parker Barker family.
