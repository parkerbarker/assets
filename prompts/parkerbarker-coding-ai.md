# ParkerBarker (class stack) — coding assistant instructions

Use this text as a **system or user prompt** when generating or editing HTML/CSS/JS that should follow the ParkerBarker **class-based** system (`pb-*` utilities and components). The live reference is [parkerbarker-guide.html](../parkerbarker-guide.html). Stylesheets: [css/parkerbarker.css](../css/parkerbarker.css) (imports [css/variables.css](../css/variables.css) for tokens and webfonts). JavaScript: [js/ui-core.js](../js/ui-core.js) (shared `ParkerBarkerCore`) then [js/parkerbarker.js](../js/parkerbarker.js). CDN paths and a class overview are in [README.md](../README.md).

---

## Your role

When building or changing pages for this design system:

- Use **semantic HTML** for structure and meaning (`header`, `nav`, `main`, `section`, `article`, `footer`, proper heading levels, labels tied to inputs).
- Use **`pb-*` classes** for layout, spacing, typography helpers, and components defined in `parkerbarker.css`. This stack is **class-first**, unlike the separate **Semantic CSS** stack (which uses HTML attributes for styling).
- **Do not invent** arbitrary class names for visuals; compose documented `pb-*` patterns from the guide and README. When you need a one-off, prefer **`var(--pb-…)`** or **`var(--core-…)`** in a small scoped rule rather than new global classes.

---

## Required setup

```html
<!-- In <head> -->
<link rel="stylesheet" href="css/parkerbarker.css">
<!-- parkerbarker.css @imports variables.css (second request for unminified local dev).
     parkerbarker.min.css inlines tokens on the CDN. -->

<!-- Before </body>, in order: -->
<script src="js/ui-core.js"></script>
<script src="js/parkerbarker.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    ParkerBarker.init();
  });
</script>
```

Adjust `href` / `src` if the page lives in a subdirectory. For production CDN URLs, use the table in [README.md](../README.md).

Optional: `ParkerBarker.init({ enableFontLoading: false })` if you are not coordinating the `html.fonts-ready` fade-in.

---

## Non-negotiables

1. **Layout shell**: Use **`pb-container`** (or `pb-container-sm` … `pb-container-2xl`, `pb-container-fluid`) for centered content. A typical page uses **`pb-nav`** (or your own header) plus sections wrapped in **`pb-container`**.

2. **Forms**: Scope form fields with **`pb-form`**. Use **`pb-button`**, **`pb-button-secondary`**, **`pb-button-success`**, **`pb-button-danger`**, **`pb-button-text`** as documented. Follow checkbox/radio structure from [parkerbarker-guide.html#forms](../parkerbarker-guide.html#forms) (`pb-checkbox`, `pb-checkbox-label`, etc.).

3. **Theme toggle**: For the built-in dark mode hook, use **`data-pb-theme-toggle`** on a control. That wires to body class **`pb-dark-mode`**. Do **not** use **`data-theme-toggle`** here—that belongs to the **Semantic** stack.

4. **One stack per page (default)**: Do not mix **Semantic CSS** (`semantic.css`, `layout="…"`, `Semantic.init`) with **ParkerBarker classes** on the same page unless the user explicitly wants a hybrid. They share [variables.css](../css/variables.css) tokens but use different markup and JS entrypoints.

5. **Design tokens**: In custom CSS, prefer **`var(--pb-gray-900)`**, **`var(--pb-space-md)`**, **`var(--pb-primary)`**, etc. To change brand values for **both** stacks in this repo, edit **`--core-*`** in [css/variables.css](../css/variables.css).

6. **Buttons**: Primary actions use **`button.pb-button`** (element + class) so base button styles apply correctly.

---

## Style guide map (anchor → topic)

Open [parkerbarker-guide.html](../parkerbarker-guide.html) and jump to these section IDs:

| Anchor | Topic |
|--------|--------|
| `#getting-started` | Setup, `ParkerBarker.init`, CDN note |
| `#tokens` | `variables.css`, `--core-*`, `--pb-*` swatches |
| `#typography` | Headings, `.pb-subtitle`, `.pb-quote`, `.pb-caption`, `.pb-display` |
| `#containers` | `pb-container`, `pb-container-*`, `pb-content-container` |
| `#flex-grid` | `pb-flex`, `pb-grid`, gap, justify, align utilities |
| `#buttons` | `pb-button` and modifiers |
| `#forms` | `pb-form`, inputs, `pb-checkbox` / `pb-radio` |
| `#links` | Default links, `pb-link-subtle`, `pb-link-button` |
| `#alerts` | `pb-alert`, `pb-alert-info`, etc. |
| `#cards` | `pb-card`, header/body/footer, `pb-card-grid`, `pb-card-clickable` |
| `#utilities` | Margins, shadows, `pb-sr-only`, `data-tooltip` |
| `#dark-mode` | `data-pb-theme-toggle`, `pb-dark-mode` |
| `#javascript` | `ParkerBarker` API overview |

---

## JavaScript API and data hooks

After **`ParkerBarker.init()`** (which requires **`ui-core.js`** loaded first):

```javascript
// Theme (body class pb-dark-mode)
ParkerBarker.theme.toggleDarkMode();
ParkerBarker.theme.setDarkMode(true);
ParkerBarker.theme.isDarkMode();

// Toasts — use show(); there are no toast.success / toast.error helpers on this stack
ParkerBarker.toast.show('Saved.', { type: 'success', duration: 3000, closable: true });
ParkerBarker.toast.show('Something went wrong.', { type: 'error' });
// type maps to .pb-toast-{type} (e.g. info, success, warning, error)

// DOM helpers (delegation uses closest-based matching via ParkerBarkerCore)
ParkerBarker.dom.find('.pb-card');
ParkerBarker.dom.findOne('#main');
ParkerBarker.dom.addClass(el, 'pb-shadow-md');
ParkerBarker.dom.on(document, 'click', '.pb-button', handler);

// Environment
ParkerBarker.env.iOS;
ParkerBarker.env.touch;
ParkerBarker.env.darkMode;

// Optional: datePicker.init if you enhance date inputs outside core.init paths
// ParkerBarker.datePicker.init();
```

Common HTML hooks:

- **`data-pb-theme-toggle`** — click to toggle dark mode (see [js/parkerbarker.js](../js/parkerbarker.js) theme module).

Shared primitives used by both JS entry scripts live on **`window.ParkerBarkerCore`** (env, fonts, `on`, debounce, storage helpers, `mergeConfig`).

---

## Documentation exception

Pages like [parkerbarker-guide.html](../parkerbarker-guide.html) may define **page-local** classes (e.g. `.guide-code`, `.sidebar-nav`) in a `<style>` block for documentation chrome. **Product and marketing pages** should rely on **`pb-*`** classes and tokens, not copy that doc-only pattern unless you are building another internal guide shell.

---

## Using this in Cursor or Claude Code

- Attach **`@parkerbarker-guide.html`** or **`@prompts/parkerbarker-coding-ai.md`** when you want class-based ParkerBarker output.
- The **semantic-css** Cursor skill applies to the **attribute-based** Semantic stack; for **`pb-*` / parkerbarker.css**, use this prompt (and the class guide) so the model does not default to Semantic attributes.

---

## Quick sanity check before you finish

- [ ] `parkerbarker.css` linked; aware that unminified source pulls in `variables.css` via `@import`.
- [ ] `ui-core.js` then `parkerbarker.js`; `ParkerBarker.init()` on `DOMContentLoaded` (or later).
- [ ] Main content uses **`pb-container`** (or another documented container variant).
- [ ] Forms wrapped in **`pb-form`**; buttons use **`button.pb-button`** (+ modifiers as needed).
- [ ] Theme control uses **`data-pb-theme-toggle`**, not `data-theme-toggle`.
- [ ] Toasts use **`ParkerBarker.toast.show(…, { type: '…' })`** — not Semantic’s `Semantic.toast.success` helpers.
- [ ] Custom colors/spacing either override **`--core-*`** in `variables.css` (repo) or **`--pb-*`** / **`--core-*`** after the framework link (app).
