# ParkerBarker Semantic CSS — coding assistant instructions

Use this text as a **system or user prompt** when generating or editing HTML that should follow the ParkerBarker **Semantic CSS** system. The live style guide is [semantic-guide.html](../semantic-guide.html); implementation lives in [css/semantic.css](../css/semantic.css) and [js/semantic.js](../js/semantic.js). Condensed patterns and a full attribute reference live in the repo skill files [.cursor/skills/semantic-css/SKILL.md](../.cursor/skills/semantic-css/SKILL.md) and [.cursor/skills/semantic-css/reference.md](../.cursor/skills/semantic-css/reference.md).

---

## Your role

When building or changing pages for this design system:

- Use **semantic HTML** for structure and meaning.
- Use **HTML attributes** (not classes or IDs) for layout, spacing, and visual variants defined by the framework.
- Prefer **native elements** the framework styles: `<details>` for dropdowns, `<dialog>` for modals, `<progress>` where appropriate.

---

## Required setup

```html
<!-- In <head> -->
<link rel="stylesheet" href="css/semantic.css">

<!-- Before </body> -->
<script src="js/semantic.js"></script>
<script>Semantic.init();</script>
```

Adjust `href`/`src` if the page lives in a subdirectory.

---

## Non-negotiables

1. **Elements**: Prefer `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<details>`, `<dialog>`, `<menu>`, and other appropriate semantic tags.

2. **Styling mechanism**: Use framework attributes such as `layout`, `gap`, `justify`, `align`, `p`, `m`, `variant`, `size`, `text`, `color`, `bg`, `border`, `rounded`, `shadow`, `hide`, `show`, etc. Do **not** add classes or IDs for **visual** styling.

3. **IDs when needed**: IDs are fine when **behavior or linking** requires them—for example `<dialog id="my-dialog">` with `data-open-dialog="my-dialog"`, or fragment links. The anti-pattern is using `#id` or `.class` in CSS for styling, not the mere presence of an `id` on a dialog or anchor target.

4. **Documentation exception**: [semantic-guide.html](../semantic-guide.html) uses classes like `.code-block` and `.sidebar-nav` inside a page-local `<style>` block for the documentation chrome. **Product and marketing pages** should follow Semantic CSS attributes, not copy that doc-only pattern unless you are intentionally building another internal guide shell.

5. **Tokens**: For spacing, type scale, colors, radius, and shadows, use the CSS custom properties documented in [.cursor/skills/semantic-css/reference.md](../.cursor/skills/semantic-css/reference.md) (e.g. `--space-md`, `--text-lg`, `--primary`).

---

## Style guide map (anchor → topic)

Open [semantic-guide.html](../semantic-guide.html) and jump to these fragment IDs (verified against `<section id="…">` in that file):

| Anchor | Topic |
|--------|--------|
| `#getting-started` | Introduction, philosophy, minimal example |
| `#typography` | Headings, prose, display sizes |
| `#layout` | Flex, grid, alignment |
| `#spacing` | Padding and margin attributes |
| `#content-blocks` | Blockquotes, code, tables, etc. |
| `#buttons` | Variants, sizes, loading, disabled |
| `#forms` | Labels, inputs, native form patterns |
| `#interactive` | Dialogs, disclosure, switches (patterns in guide) |
| `#dropdowns` | `<details dropdown>`, `<menu>` |
| `#cards` | Article/card structure |
| `#bottom-nav` | Mobile bottom navigation |
| `#icons` | Icons and emoji attributes |
| `#loading` | Loading states |
| `#images` | Fluid images, aspect ratio |
| `#links` | Link variants, external, disabled |
| `#utilities` | Text, display, responsive helpers |
| `#alerts` | `aside[role="alert"]`, status variants |
| `#badges` | Badge patterns |
| `#navigation` | Nav components |
| `#lists-progress` | Lists, `<progress>` |
| `#enhanced-forms` | Richer form patterns |
| `#tabs` | Tablist / tabpanel |
| `#offcanvas` | Off-canvas panels |
| `#theming` | Theme toggle, dark mode, overrides |

---

## JavaScript API and data hooks

After `Semantic.init()`:

```javascript
Semantic.theme.toggle();
Semantic.theme.set('dark');
Semantic.theme.isDark();

Semantic.toast.success('…');
Semantic.toast.error('…');
Semantic.toast.warning('…');
Semantic.toast.info('…');

Semantic.dialog.open('#my-dialog');
Semantic.dialog.close('#my-dialog');

Semantic.dropdown.toggle('details[dropdown]');
```

Common HTML hooks:

- `data-theme-toggle` — theme switch (often on a header button)
- `data-open-dialog="dialog-id"` — open a `<dialog id="dialog-id">`
- `data-close-dialog` — close control inside a dialog

---

## Using this in Cursor

- Attach **@semantic-guide.html** or **@prompts/semantic-coding-ai.md** when you want the model to match live examples and wording from the guide.
- The **semantic-css** Cursor skill may already apply when you mention semantic CSS, semantic HTML, or class-free styling; keep generated markup aligned with this prompt and the skill.

---

## Quick sanity check before you finish

- [ ] `semantic.css` and `semantic.js` included; `Semantic.init()` called.
- [ ] No new classes/IDs for styling; attributes used for framework styling.
- [ ] Native patterns (`details`, `dialog`, etc.) match examples in the guide for that component.
