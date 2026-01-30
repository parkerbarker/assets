# Semantic CSS Complete Reference

## Design Tokens (CSS Variables)

### Spacing

| Variable | Value |
|----------|-------|
| `--space-xs` | 0.25rem |
| `--space-sm` | 0.5rem |
| `--space-md` | 1rem |
| `--space-lg` | 1.5rem |
| `--space-xl` | 2rem |
| `--space-2xl` | 3rem |

### Typography

| Variable | Value |
|----------|-------|
| `--text-xs` | 0.75rem |
| `--text-sm` | 0.875rem |
| `--text-base` | 1rem |
| `--text-lg` | 1.125rem |
| `--text-xl` | 1.25rem |
| `--text-2xl` | 1.5rem |
| `--text-3xl` | 2rem |
| `--text-4xl` | 2.5rem |

### Colors

| Variable | Description |
|----------|-------------|
| `--primary` | Primary brand color |
| `--primary-light` | Light primary variant |
| `--secondary` | Secondary color |
| `--success` | Success/positive color |
| `--warning` | Warning color |
| `--danger` | Error/danger color |
| `--text` | Main text color |
| `--muted` | Muted/secondary text |
| `--surface` | Surface/card background |
| `--background` | Page background |
| `--border` | Border color |

### Radius & Shadows

| Variable | Description |
|----------|-------------|
| `--radius-sm` | Small radius (0.25rem) |
| `--radius-md` | Medium radius (0.5rem) |
| `--radius-lg` | Large radius (1rem) |
| `--radius-full` | Full/pill radius (9999px) |
| `--shadow-sm` | Small shadow |
| `--shadow-md` | Medium shadow |
| `--shadow-lg` | Large shadow |

---

## Layout Attributes

### `layout`

| Value | CSS Output |
|-------|------------|
| `row` | `display: flex; flex-direction: row` |
| `column` | `display: flex; flex-direction: column` |
| `stack` | `display: flex; flex-direction: column` |
| `center` | `display: flex; justify-content: center; align-items: center` |
| `grid` | `display: grid` |

### `cols` (with layout="grid")

| Value | CSS Output |
|-------|------------|
| `2` | `grid-template-columns: repeat(2, 1fr)` |
| `3` | `grid-template-columns: repeat(3, 1fr)` |
| `4` | `grid-template-columns: repeat(4, 1fr)` |
| `auto` | `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` |

### `justify`

| Value | CSS Output |
|-------|------------|
| `start` | `justify-content: flex-start` |
| `end` | `justify-content: flex-end` |
| `center` | `justify-content: center` |
| `between` | `justify-content: space-between` |
| `around` | `justify-content: space-around` |
| `evenly` | `justify-content: space-evenly` |

### `align`

| Value | CSS Output |
|-------|------------|
| `start` | `align-items: flex-start` |
| `end` | `align-items: flex-end` |
| `center` | `align-items: center` |
| `stretch` | `align-items: stretch` |
| `baseline` | `align-items: baseline` |

### `gap`

| Value | CSS Output |
|-------|------------|
| `xs` | `gap: var(--space-xs)` |
| `sm` | `gap: var(--space-sm)` |
| `md` | `gap: var(--space-md)` |
| `lg` | `gap: var(--space-lg)` |
| `xl` | `gap: var(--space-xl)` |
| `2xl` | `gap: var(--space-2xl)` |

### Other Layout

| Attribute | Description |
|-----------|-------------|
| `wrap` | `flex-wrap: wrap` |
| `responsive` | Makes grid single-column on mobile |
| `container` | Centers content with max-width |
| `full-width` | `width: 100%` |

---

## Spacing Attributes

### Padding

| Attribute | Description |
|-----------|-------------|
| `p="xs\|sm\|md\|lg\|xl\|2xl"` | All sides |
| `px="..."` | Left and right |
| `py="..."` | Top and bottom |
| `pt="..."` | Top only |
| `pb="..."` | Bottom only |
| `pl="..."` | Left only |
| `pr="..."` | Right only |

### Margin

| Attribute | Description |
|-----------|-------------|
| `m="xs\|sm\|md\|lg\|xl\|2xl"` | All sides |
| `mx="..."` | Left and right (supports `auto`) |
| `my="..."` | Top and bottom |
| `mt="..."` | Top only |
| `mb="..."` | Bottom only |
| `ml="..."` | Left only |
| `mr="..."` | Right only |

---

## Typography Attributes

### `size`

| Value | CSS Output |
|-------|------------|
| `xs` | `font-size: var(--text-xs)` |
| `sm` | `font-size: var(--text-sm)` |
| `base` | `font-size: var(--text-base)` |
| `lg` | `font-size: var(--text-lg)` |
| `xl` | `font-size: var(--text-xl)` |
| `2xl` | `font-size: var(--text-2xl)` |
| `3xl` | `font-size: var(--text-3xl)` |
| `4xl` | `font-size: var(--text-4xl)` |

### `text`

| Value | CSS Output |
|-------|------------|
| `left` | `text-align: left` |
| `center` | `text-align: center` |
| `right` | `text-align: right` |

### `font`

| Value | CSS Output |
|-------|------------|
| `sans` | Sans-serif font stack |
| `serif` | Serif font stack |
| `mono` | Monospace font stack |

### `weight`

| Value | CSS Output |
|-------|------------|
| `light` | `font-weight: 300` |
| `normal` | `font-weight: 400` |
| `medium` | `font-weight: 500` |
| `semibold` | `font-weight: 600` |
| `bold` | `font-weight: 700` |

### `color`

| Value | CSS Output |
|-------|------------|
| `primary` | `color: var(--primary)` |
| `muted` | `color: var(--muted)` |
| `success` | `color: var(--success)` |
| `warning` | `color: var(--warning)` |
| `danger` | `color: var(--danger)` |

---

## Visual Attributes

### `bg`

| Value | CSS Output |
|-------|------------|
| `surface` | `background-color: var(--surface)` |
| `primary` | `background-color: var(--primary)` |
| `primary-light` | `background-color: var(--primary-light)` |
| `success` | `background-color: var(--success)` |
| `warning` | `background-color: var(--warning)` |
| `danger` | `background-color: var(--danger)` |

### `border`

| Value | CSS Output |
|-------|------------|
| (no value) | All sides border |
| `top` | Top border only |
| `bottom` | Bottom border only |
| `left` | Left border only |
| `right` | Right border only |

### `rounded`

| Value | CSS Output |
|-------|------------|
| (no value) | `border-radius: var(--radius-md)` |
| `sm` | `border-radius: var(--radius-sm)` |
| `lg` | `border-radius: var(--radius-lg)` |
| `full` | `border-radius: var(--radius-full)` |

### `shadow`

| Value | CSS Output |
|-------|------------|
| (no value) | `box-shadow: var(--shadow-md)` |
| `sm` | `box-shadow: var(--shadow-sm)` |
| `lg` | `box-shadow: var(--shadow-lg)` |

---

## Button Attributes

### `variant`

| Value | Description |
|-------|-------------|
| (default) | Primary filled button |
| `secondary` | Secondary/outline button |
| `ghost` | Transparent background |
| `danger` | Red/destructive button |

### `size`

| Value | Description |
|-------|-------------|
| `sm` | Small button |
| (default) | Medium button |
| `lg` | Large button |

### States

| Attribute | Description |
|-----------|-------------|
| `loading` | Shows spinner, disables interaction |
| `disabled` | Grayed out, non-interactive |
| `full-width` | Spans full container width |

---

## Interactive Components

### Dropdown (`details[dropdown]`)

```html
<details dropdown>
  <summary>Trigger</summary>
  <menu>
    <li><a href="#">Link item</a></li>
    <li><button>Button item</button></li>
    <li divider></li>
  </menu>
</details>
```

| Attribute | Description |
|-----------|-------------|
| `dropdown` | Enables dropdown behavior |
| `align="right"` | Right-align the menu |

### Dialog (`<dialog>`)

```html
<dialog id="dialog-id">
  <header>...</header>
  <p>Content</p>
  <footer>...</footer>
</dialog>
```

| Attribute | Description |
|-----------|-------------|
| `data-open-dialog="id"` | Opens dialog on click |
| `data-close-dialog` | Closes parent dialog |
| `close` | Close button styling |

### Tabs

```html
<nav role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Tab</button>
</nav>
<section role="tabpanel" id="panel1">Content</section>
```

### Accordion (`<details>`)

```html
<details>
  <summary>Click to expand</summary>
  <p>Hidden content</p>
</details>
```

---

## Image & Media Attributes

| Attribute | Description |
|-----------|-------------|
| `fluid` | Responsive image (max-width: 100%) |
| `no-drag` | Prevent image dragging |
| `fit="cover\|contain\|fill"` | Object-fit values |
| `aspect="square\|video\|portrait\|landscape"` | Aspect ratio |
| `scroll` | Vertical scroll container |
| `scroll-x` | Horizontal scroll container |

---

## Link Attributes

| Attribute | Description |
|-----------|-------------|
| `variant="subtle"` | Muted color, normal weight |
| `variant="muted"` | Muted color |
| `variant="contrast"` | White color (for dark backgrounds) |
| `external` | Adds ↗ indicator |
| `disabled` | Non-interactive, grayed out |
| `block` | Block-level link |
| `no-underline` | Removes underline |

---

## Loading States

| Attribute | Description |
|-----------|-------------|
| `loading` | Default spinner on any element |
| `loading="sm"` | Small spinner |
| `loading="lg"` | Large spinner |
| `loading="overlay"` | Spinner with backdrop |

---

## Visibility Attributes

| Attribute | Description |
|-----------|-------------|
| `hidden` | `display: none` |
| `hide="mobile"` | Hidden on mobile |
| `hide="desktop"` | Hidden on desktop |
| `show="mobile"` | Visible only on mobile |
| `show="desktop"` | Visible only on desktop |

---

## Icon & Emoji Attributes

### `icon`

| Value | Size |
|-------|------|
| `xs` | 0.75em |
| `sm` | 0.875em |
| (default) | 1em |
| `lg` | 1.25em |
| `xl` | 1.5em |
| `2xl` | 2em |

### `emoji`

| Value | Size |
|-------|------|
| `xs` | 1em |
| `sm` | 1.25em |
| `md` | 1.5em |
| `lg` | 2em |
| `xl` | 3em |
| `2xl` | 4em |

---

## Navigation Attributes

### Header/Nav

| Attribute | Description |
|-----------|-------------|
| `sticky` | Fixed to top on scroll |
| `position="bottom"` | Fixed bottom nav (mobile) |

### Bottom Nav

```html
<nav position="bottom">
  <a href="/"><span emoji="lg">🏠</span>Home</a>
  <a href="/search" aria-current="page"><span emoji="lg">🔍</span>Search</a>
</nav>
<body has-bottom-nav>
```

---

## Accessibility

| Attribute | Description |
|-----------|-------------|
| `role="alert"` | Alert/notification |
| `role="tab"` | Tab button |
| `role="tablist"` | Tab container |
| `role="tabpanel"` | Tab content |
| `aria-selected="true"` | Active tab |
| `aria-controls="id"` | Links tab to panel |
| `aria-current="page"` | Current page in nav |
| `skip-link` | Skip to main content link |
| `keyboard-nav` | Enhanced focus styles (auto-applied) |

---

## JavaScript API Reference

### Initialization

```javascript
Semantic.init();           // Initialize with defaults
Semantic.init({ 
  enableTheme: true,       // Enable theme toggle
  enableToast: true,       // Enable toast notifications
  enableForms: true,       // Enable form validation
  enableDetails: true,     // Enable details/accordion
  enableDialog: true       // Enable dialog handling
});
```

### Theme

```javascript
Semantic.theme.get();      // Returns 'light' or 'dark'
Semantic.theme.set('dark'); // Set specific theme
Semantic.theme.toggle();    // Toggle between themes
Semantic.theme.isDark();    // Returns boolean
```

### Toast

```javascript
Semantic.toast.show('Message');
Semantic.toast.show('Message', { 
  type: 'success',         // success, error, warning, info
  duration: 3000,          // Auto-hide delay (ms)
  closable: true           // Show close button
});

// Shorthand methods
Semantic.toast.success('Saved!');
Semantic.toast.error('Failed!');
Semantic.toast.warning('Warning');
Semantic.toast.info('Note');
```

### Dialog

```javascript
Semantic.dialog.open('#dialog-id');
Semantic.dialog.close('#dialog-id');
```

### Dropdown

```javascript
Semantic.dropdown.open('details[dropdown]');
Semantic.dropdown.close('details[dropdown]');
Semantic.dropdown.toggle('details[dropdown]');
```

### Tabs

```javascript
Semantic.tabs.select('[role="tab"]'); // Select specific tab
```

### Scrollspy

```javascript
Semantic.scrollspy.observe('section[id]'); // Watch sections
Semantic.scrollspy.disconnect();           // Stop watching
```

### Tooltip

```javascript
Semantic.tooltip.show(element);
Semantic.tooltip.hide(element);
```

### Date Picker

```javascript
Semantic.datePicker.showPicker('input[type="date"]');
```

---

## Events

| Event | Description |
|-------|-------------|
| `semantic:init` | Fired after initialization |
| `semantic:theme-change` | Theme changed (detail: { theme }) |
| `semantic:toast-show` | Toast displayed |
| `semantic:dialog-open` | Dialog opened |
| `semantic:dialog-close` | Dialog closed |

```javascript
document.addEventListener('semantic:theme-change', (e) => {
  console.log('Theme:', e.detail.theme);
});
```
