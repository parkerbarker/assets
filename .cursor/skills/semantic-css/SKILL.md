---
name: semantic-css
description: Build webpages using semantic HTML elements and attribute selectors instead of classes or IDs. Use when creating HTML pages, styling components, or when the user mentions semantic CSS, semantic HTML, class-free CSS, or the ParkerBarker design system.
---

# Semantic CSS Framework

Build modern webpages using semantic HTML elements and attribute selectors. No classes. No IDs. Just semantic elements and attributes.

## Quick Start

Include these files in your HTML:

```html
<!-- In <head> -->
<link rel="stylesheet" href="css/semantic.css">

<!-- Before </body> -->
<script src="js/semantic.js"></script>
<script>Semantic.init();</script>
```

## Core Philosophy

1. **Semantic elements first**: Use `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<details>`, `<dialog>`, `<menu>`
2. **Attribute selectors**: Style with `[attribute]` or `[attribute="value"]` instead of classes
3. **Native HTML features**: Leverage `<details>` for accordions/dropdowns, `<dialog>` for modals, `<progress>` for bars

## Layout Attributes

```html
<!-- Flexbox -->
<div layout="row">           <!-- flex-direction: row -->
<div layout="column">        <!-- flex-direction: column -->
<div layout="stack">         <!-- flex-direction: column -->
<div layout="center">        <!-- center both axes -->

<!-- Grid -->
<div layout="grid" cols="3"> <!-- 3-column grid -->

<!-- Alignment -->
<div justify="between">      <!-- justify-content: space-between -->
<div align="center">         <!-- align-items: center -->
<div gap="md">               <!-- gap: var(--space-md) -->
```

## Spacing Attributes

```html
<!-- Padding -->
<div p="md">     <!-- padding: var(--space-md) -->
<div px="lg">    <!-- padding-left/right: var(--space-lg) -->
<div py="sm">    <!-- padding-top/bottom: var(--space-sm) -->

<!-- Margin -->
<div m="md">     <!-- margin: var(--space-md) -->
<div mx="auto">  <!-- margin-left/right: auto -->
<div my="xl">    <!-- margin-top/bottom: var(--space-xl) -->

<!-- Sizes: xs, sm, md, lg, xl, 2xl -->
```

## Button Patterns

```html
<button>Primary Button</button>
<button variant="secondary">Secondary</button>
<button variant="ghost">Ghost</button>
<button variant="danger">Danger</button>
<button size="sm">Small</button>
<button size="lg">Large</button>
<button loading>Loading...</button>
<button disabled>Disabled</button>
```

## Form Patterns

```html
<form>
  <label>
    Email
    <input type="email" required>
  </label>
  
  <label>
    Password
    <input type="password" minlength="8">
  </label>
  
  <button type="submit">Submit</button>
</form>
```

## Component Patterns

For detailed component patterns, see [reference.md](reference.md).

### Cards

```html
<article>
  <header>
    <h4 card-title>Card Title</h4>
    <p card-subtitle>Subtitle</p>
  </header>
  <p>Content here...</p>
  <footer layout="row" gap="sm" justify="end">
    <button variant="ghost">Cancel</button>
    <button>Save</button>
  </footer>
</article>
```

### Dropdowns

```html
<details dropdown>
  <summary>Open Menu</summary>
  <menu>
    <li><a href="#">Action</a></li>
    <li divider></li>
    <li><button>Logout</button></li>
  </menu>
</details>
```

### Dialogs/Modals

```html
<dialog id="my-dialog">
  <header layout="row" justify="between" align="center">
    <h3>Dialog Title</h3>
    <button close aria-label="Close">&times;</button>
  </header>
  <p>Dialog content...</p>
  <footer layout="row" gap="sm" justify="end">
    <button variant="ghost" data-close-dialog>Cancel</button>
    <button>Confirm</button>
  </footer>
</dialog>

<button data-open-dialog="my-dialog">Open Dialog</button>
```

### Alerts

```html
<aside role="alert">
  <span emoji="lg">✅</span>
  <div>
    <strong>Success!</strong>
    <p>Your changes have been saved.</p>
  </div>
  <button close>&times;</button>
</aside>

<aside role="alert" status="warning">Warning message</aside>
<aside role="alert" status="error">Error message</aside>
```

### Tabs

```html
<nav role="tablist">
  <button role="tab" aria-selected="true" aria-controls="tab1">Tab 1</button>
  <button role="tab" aria-controls="tab2">Tab 2</button>
</nav>
<section role="tabpanel" id="tab1">Content 1</section>
<section role="tabpanel" id="tab2" hidden>Content 2</section>
```

## Utility Attributes

```html
<!-- Text -->
<p text="center">Centered text</p>
<p size="lg">Large text</p>
<p color="muted">Muted color</p>
<p font="serif">Serif font</p>

<!-- Visual -->
<div bg="surface">Surface background</div>
<div border rounded>Bordered and rounded</div>
<div shadow="lg">Large shadow</div>

<!-- Display -->
<div hidden>Hidden element</div>
<div hide="mobile">Hide on mobile</div>
<div show="mobile">Show only on mobile</div>

<!-- Images -->
<img src="..." fluid>           <!-- Responsive -->
<img src="..." no-drag>         <!-- Prevent drag -->
<div aspect="video">16:9 ratio</div>

<!-- Links -->
<a href="..." variant="subtle">Subtle link</a>
<a href="..." external>External ↗</a>
<a href="..." disabled>Disabled link</a>

<!-- Loading -->
<div loading>Shows spinner</div>
<article loading="lg">Large spinner</article>
```

## JavaScript API

```javascript
// Initialize
Semantic.init();

// Theme
Semantic.theme.toggle();
Semantic.theme.set('dark');
Semantic.theme.isDark();

// Toast notifications
Semantic.toast.success('Saved!');
Semantic.toast.error('Failed!');
Semantic.toast.warning('Warning');
Semantic.toast.info('Info');

// Dialog
Semantic.dialog.open('#my-dialog');
Semantic.dialog.close('#my-dialog');

// Dropdown
Semantic.dropdown.toggle('details[dropdown]');
```

## Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="css/semantic.css">
</head>
<body>
  <header layout="row" justify="between" align="center" p="md" sticky>
    <nav layout="row" gap="lg" align="center">
      <a href="/" no-underline><strong font="serif">Brand</strong></a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
    <button variant="ghost" data-theme-toggle>Toggle Theme</button>
  </header>

  <main p="lg" container>
    <h1>Page Title</h1>
    <p>Content here...</p>
  </main>

  <footer p="lg" text="center" border="top">
    <p color="muted">&copy; 2025 Your Name</p>
  </footer>

  <script src="js/semantic.js"></script>
  <script>Semantic.init();</script>
</body>
</html>
```

## Do's and Don'ts

### Do

- Use semantic HTML elements (`<article>`, `<section>`, `<nav>`, `<aside>`)
- Use attribute selectors for styling (`[variant="secondary"]`)
- Use native features (`<details>`, `<dialog>`, `<progress>`)
- Use CSS custom properties for theming
- Keep markup clean and readable

### Don't

- Use classes or IDs for styling
- Create custom web components when semantic HTML suffices
- Add unnecessary wrapper divs
- Use inline styles when attributes exist

## Additional Resources

- For complete attribute reference, see [reference.md](reference.md)
- For live examples, view [semantic-guide.html](../../semantic-guide.html)
