# Semantic CSS vs Bootstrap: A Comprehensive Comparison

This document compares the Semantic CSS attribute-based framework with Bootstrap 5, the most popular CSS framework.

## Philosophy Comparison

| Aspect | Semantic CSS | Bootstrap |
|--------|--------------|-----------|
| **Approach** | Semantic HTML elements + attribute selectors | Class-based utility and component system |
| **Syntax** | `<button variant="primary">` | `<button class="btn btn-primary">` |
| **Learning curve** | Lower (HTML-native feel) | Moderate (memorize class names) |
| **File size** | ~25KB (CSS only) | ~230KB (CSS + JS bundle) |
| **JavaScript** | Optional enhancement | Required for many components |
| **Customization** | CSS variables | Sass variables + CSS variables |
| **Browser support** | Modern only | Broader legacy support |

## Syntax Comparison

### Buttons

```html
<!-- Semantic CSS -->
<button>Primary</button>
<button variant="secondary">Secondary</button>
<button variant="danger" size="lg">Large Danger</button>
<button disabled>Disabled</button>

<!-- Bootstrap -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-danger btn-lg">Large Danger</button>
<button class="btn btn-primary" disabled>Disabled</button>
```

### Grid Layout

```html
<!-- Semantic CSS -->
<section layout="grid" cols="3" gap="md">
  <article>Card 1</article>
  <article>Card 2</article>
  <article>Card 3</article>
</section>

<!-- Bootstrap -->
<div class="container">
  <div class="row g-3">
    <div class="col-md-4"><div class="card">Card 1</div></div>
    <div class="col-md-4"><div class="card">Card 2</div></div>
    <div class="col-md-4"><div class="card">Card 3</div></div>
  </div>
</div>
```

### Forms

```html
<!-- Semantic CSS -->
<form layout="stack">
  <label>Email
    <input type="email" required>
  </label>
  <button type="submit">Submit</button>
</form>

<!-- Bootstrap -->
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" required>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Cards

```html
<!-- Semantic CSS -->
<article variant="elevated">
  <h3>Card Title</h3>
  <p>Card content here.</p>
</article>

<!-- Bootstrap -->
<div class="card shadow">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content here.</p>
  </div>
</div>
```

---

## Feature Comparison Matrix

### Layout & Grid

| Feature | Semantic CSS | Bootstrap | Notes |
|---------|:------------:|:---------:|-------|
| Flexbox utilities | ✅ | ✅ | Both have comprehensive flex support |
| CSS Grid | ✅ | ✅ | Bootstrap added in v5.1 |
| 12-column grid | ✅ | ✅ | Semantic uses `cols="12"` |
| Auto-fit/fill grid | ✅ | ❌ | Semantic has `cols="auto"` |
| Responsive breakpoints | ⚠️ Partial | ✅ | Bootstrap has more breakpoint variants |
| Container variants | ✅ | ✅ | Both have sized containers |
| Gutters/Gap | ✅ | ✅ | Semantic uses `gap`, Bootstrap uses `g-*` |

### Typography

| Feature | Semantic CSS | Bootstrap | Notes |
|---------|:------------:|:---------:|-------|
| Heading styles | ✅ | ✅ | Both style h1-h6 |
| Display headings | ❌ | ✅ | Bootstrap has `.display-1` through `.display-6` |
| Lead paragraph | ❌ | ✅ | Bootstrap has `.lead` |
| Text utilities | ✅ | ✅ | Alignment, weight, transform |
| Lists | ✅ | ✅ | Both style ul/ol |
| Blockquotes | ✅ | ✅ | Semantic uses native element |
| Inline elements | ✅ | ✅ | mark, code, small, etc. |

### Components

| Component | Semantic CSS | Bootstrap | Notes |
|-----------|:------------:|:---------:|-------|
| Buttons | ✅ | ✅ | Semantic uses `variant` attribute |
| Button groups | ❌ | ✅ | Bootstrap has `.btn-group` |
| Cards | ✅ | ✅ | Semantic uses `<article>` |
| Alerts | ❌ | ✅ | Not in Semantic |
| Badges | ❌ | ✅ | Not in Semantic |
| Breadcrumbs | ❌ | ✅ | Not in Semantic |
| Dropdowns | ❌ | ✅ | Not in Semantic (no custom components) |
| Modals/Dialogs | ✅ | ✅ | Semantic uses native `<dialog>` |
| Navbars | ⚠️ Basic | ✅ | Bootstrap has full responsive navbar |
| Navigation | ✅ | ✅ | Both style nav elements |
| Pagination | ❌ | ✅ | Not in Semantic |
| Progress bars | ❌ | ✅ | Not in Semantic |
| Spinners | ⚠️ Loading only | ✅ | Semantic has button loading state |
| Toasts | ✅ | ✅ | Both support toast notifications |
| Tooltips | ❌ | ✅ | Not in Semantic |
| Popovers | ❌ | ✅ | Not in Semantic |
| Collapse | ✅ | ✅ | Semantic uses native `<details>` |
| Accordion | ✅ | ✅ | Semantic uses `<details group="name">` |
| Tabs | ❌ | ✅ | Not in Semantic |
| Carousel | ❌ | ✅ | Not in Semantic |
| Offcanvas | ❌ | ✅ | Not in Semantic |
| List groups | ❌ | ✅ | Not in Semantic |
| Close button | ❌ | ✅ | Not in Semantic |

### Forms

| Feature | Semantic CSS | Bootstrap | Notes |
|---------|:------------:|:---------:|-------|
| Input styling | ✅ | ✅ | Both style inputs |
| Select styling | ✅ | ✅ | Both style selects |
| Checkbox/Radio | ⚠️ Native | ✅ | Bootstrap has custom styling |
| Range inputs | ✅ | ✅ | Both style range |
| File inputs | ✅ | ✅ | Both style file inputs |
| Input groups | ❌ | ✅ | Bootstrap has `.input-group` |
| Floating labels | ❌ | ✅ | Bootstrap has floating labels |
| Validation states | ✅ | ✅ | Both have valid/invalid styling |
| Form layouts | ✅ | ✅ | Stack, inline, grid |

### Utilities

| Utility | Semantic CSS | Bootstrap | Notes |
|---------|:------------:|:---------:|-------|
| Spacing (margin/padding) | ✅ | ✅ | Different syntax |
| Colors (text/bg) | ✅ | ✅ | Semantic has fewer color options |
| Borders | ✅ | ✅ | Both have border utilities |
| Shadows | ✅ | ✅ | Both have shadow utilities |
| Sizing (width/height) | ✅ | ✅ | Both have sizing utilities |
| Display | ✅ | ✅ | Both have display utilities |
| Position | ✅ | ✅ | Both have position utilities |
| Visibility | ✅ | ✅ | Both have visibility utilities |
| Overflow | ✅ | ✅ | Both have overflow utilities |
| Z-index | ✅ | ✅ | Both have z-index utilities |
| Opacity | ✅ | ✅ | Both have opacity utilities |
| Object-fit | ❌ | ✅ | Not in Semantic |
| Vertical align | ❌ | ✅ | Not in Semantic |
| Interactions | ⚠️ Basic | ✅ | Bootstrap has more cursor/pointer utilities |

### JavaScript Features

| Feature | Semantic CSS | Bootstrap | Notes |
|---------|:------------:|:---------:|-------|
| Theme toggle | ✅ | ✅ | Both support dark mode |
| Toast API | ✅ | ✅ | Both have JS toast API |
| Modal/Dialog API | ✅ | ✅ | Semantic uses native dialog |
| Form validation | ✅ | ⚠️ | Bootstrap relies on HTML5, Semantic enhances |
| Accordion control | ✅ | ✅ | Semantic uses details groups |
| Dropdown control | ❌ | ✅ | Not in Semantic |
| Collapse control | ❌ | ✅ | Semantic uses native details |
| Scrollspy | ❌ | ✅ | Not in Semantic |
| Tab control | ❌ | ✅ | Not in Semantic |

---

## What's Missing in Semantic CSS

### Summary Table

| # | Component | Approach | Complexity | Notes |
|---|-----------|----------|------------|-------|
| 1 | Alert/Callout | ✅ Semantic | Easy | Use `<aside role="alert">` |
| 2 | Badge/Pill | ✅ Semantic | Easy | Use `<data>` or `<output>` |
| 3 | Tabs | ⚠️ Semantic + JS | Medium | CSS-only limited, JS for full UX |
| 4 | Button Groups | ✅ Semantic | Easy | Use `<nav role="group">` |
| 5 | Input Groups | ✅ Semantic | Easy | Use flex layout on label |
| 6 | Breadcrumbs | ✅ Semantic | Easy | Use `<nav>` + `<ol>` |
| 7 | Pagination | ✅ Semantic | Easy | Use `<nav>` + `<ol>` |
| 8 | List Groups | ✅ Semantic | Easy | Use `<menu>` or `<ul>` |
| 9 | Progress Bars | ✅ Semantic | Easy | Native `<progress>` / `<meter>` |
| 10 | Tooltips | ⚠️ Semantic + JS | Medium | CSS position, JS for smart placement |
| 11 | Display Headings | ✅ Semantic | Easy | Attribute on h1-h6 |
| 12 | Lead Paragraph | ✅ Semantic | Easy | Attribute on `<p>` |
| 13 | Responsive Navbar | ⚠️ Semantic + JS | Medium | `<details>` or JS toggle |
| 14 | Floating Labels | ✅ Semantic | Medium | CSS `:placeholder-shown` trick |
| 15 | Custom Checkbox/Radio | ✅ Semantic | Medium | CSS `appearance: none` |
| 16 | Carousel | 🔧 Custom Component | Hard | Too complex for attributes |
| 17 | Offcanvas | ✅ Semantic | Medium | Use `<dialog>` with positioning |
| 18 | Popovers | 🔧 Custom Component | Hard | Needs JS positioning + dismiss |
| 19 | Scrollspy | 📜 JS Only | Medium | No element needed, pure JS |
| 20 | Close Button | ✅ Semantic | Easy | Just styled `<button>` |

**Legend:**
- ✅ Semantic = Pure HTML elements + CSS attributes
- ⚠️ Semantic + JS = Semantic HTML with JavaScript enhancement
- 🔧 Custom Component = Requires `<pb-*>` custom web component
- 📜 JS Only = JavaScript feature, no specific element

---

### Detailed Recommendations

#### 1. Alert/Callout Component ✅ Semantic

**Recommendation:** Use `<aside>` with `role="alert"` and type attribute.

```html
<!-- Proposed syntax -->
<aside role="alert" type="warning">
  <strong>Warning!</strong> Please check your input.
</aside>

<aside role="alert" type="success">
  <strong>Success!</strong> Your changes have been saved.
</aside>

<aside role="alert" type="danger" dismissible>
  <strong>Error!</strong> Something went wrong.
  <button aria-label="Dismiss">×</button>
</aside>
```

```css
aside[role="alert"] {
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border-left: 4px solid;
}
aside[role="alert"][type="warning"] { 
  background: rgba(245, 166, 35, 0.1); 
  border-color: var(--warning); 
}
aside[role="alert"][type="success"] { 
  background: rgba(126, 211, 33, 0.1); 
  border-color: var(--success); 
}
aside[role="alert"][type="danger"] { 
  background: rgba(208, 2, 27, 0.1); 
  border-color: var(--danger); 
}
```

**Why semantic:** `<aside>` represents tangential content, `role="alert"` provides accessibility. No custom component needed.

---

#### 2. Badge/Pill Component ✅ Semantic

**Recommendation:** Use `<data>` element (represents machine-readable value) or `<output>` (result of calculation).

```html
<!-- Proposed syntax -->
<data value="5" variant="primary">5</data>
<data value="new" variant="success">New</data>
<data value="99" variant="danger" pill>99+</data>

<!-- Alternative using output for counts -->
<output variant="primary">12</output>
```

```css
data[variant], output[variant] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25em 0.5em;
  font-size: var(--text-xs);
  font-weight: 700;
  border-radius: var(--radius-sm);
  min-width: 1.5em;
}
data[variant="primary"], output[variant="primary"] { 
  background: var(--primary); 
  color: white; 
}
data[pill], output[pill] { 
  border-radius: var(--radius-full); 
}
```

**Why semantic:** `<data>` is designed for machine-readable values, perfect for counts and status indicators.

---

#### 3. Tabs Component ⚠️ Semantic + JS

**Recommendation:** CSS-only version using radio buttons for basic use; JS enhancement for full accessibility.

```html
<!-- CSS-only approach using radio buttons -->
<nav role="tablist">
  <label>
    <input type="radio" name="tabs" checked hidden>
    <span role="tab">Tab 1</span>
  </label>
  <label>
    <input type="radio" name="tabs" hidden>
    <span role="tab">Tab 2</span>
  </label>
</nav>
<section role="tabpanel">Content 1</section>
<section role="tabpanel">Content 2</section>

<!-- With JS enhancement for keyboard nav -->
<nav role="tablist" data-tabs>
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab">Tab 2</button>
</nav>
<section role="tabpanel" id="panel-1">Content 1</section>
<section role="tabpanel" id="panel-2" hidden>Content 2</section>
```

**Why not pure semantic:** Tabs require keyboard navigation (arrow keys), focus management, and ARIA state updates that need JavaScript.

**Alternative:** Use `<details>` accordion as a mobile-friendly alternative to tabs.

---

#### 4. Button Groups ✅ Semantic

**Recommendation:** Use `<nav>` with `role="group"`.

```html
<!-- Proposed syntax -->
<nav role="group">
  <button>Left</button>
  <button>Middle</button>
  <button>Right</button>
</nav>

<nav role="group" vertical>
  <button>Top</button>
  <button>Middle</button>
  <button>Bottom</button>
</nav>
```

```css
nav[role="group"] {
  display: inline-flex;
}
nav[role="group"] button {
  border-radius: 0;
}
nav[role="group"] button:first-child {
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}
nav[role="group"] button:last-child {
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
nav[role="group"][vertical] {
  flex-direction: column;
}
```

**Why semantic:** `<nav>` with `role="group"` clearly indicates a group of related controls.

---

#### 5. Input Groups ✅ Semantic

**Recommendation:** Use flex layout on label wrapper.

```html
<!-- Proposed syntax -->
<label layout="input-group">
  <span>$</span>
  <input type="number" placeholder="0.00">
  <span>.00</span>
</label>

<label layout="input-group">
  <span>https://</span>
  <input type="text" placeholder="example.com">
  <button>Go</button>
</label>
```

```css
label[layout="input-group"] {
  display: flex;
  align-items: stretch;
}
label[layout="input-group"] > span {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background: var(--gray-100);
  border: 1px solid var(--border);
}
label[layout="input-group"] > input {
  flex: 1;
  border-radius: 0;
}
label[layout="input-group"] > *:first-child {
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}
label[layout="input-group"] > *:last-child {
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
```

**Why semantic:** `<label>` naturally wraps form controls; flex layout handles the grouping.

---

#### 6. Breadcrumbs ✅ Semantic

**Recommendation:** Use `<nav>` with `aria-label` and `<ol>`.

```html
<!-- Proposed syntax -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Widget</li>
  </ol>
</nav>
```

```css
nav[aria-label="Breadcrumb"] ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}
nav[aria-label="Breadcrumb"] li + li::before {
  content: "/";
  padding: 0 var(--space-sm);
  color: var(--muted);
}
nav[aria-label="Breadcrumb"] [aria-current="page"] {
  color: var(--muted);
}
```

**Why semantic:** This is the W3C recommended pattern. Pure semantic, perfect accessibility.

---

#### 7. Pagination ✅ Semantic

**Recommendation:** Similar to breadcrumbs, use `<nav>` with `<ol>`.

```html
<!-- Proposed syntax -->
<nav aria-label="Pagination">
  <ol>
    <li><a href="?page=1" aria-label="Previous">←</a></li>
    <li><a href="?page=1">1</a></li>
    <li><a href="?page=2" aria-current="page">2</a></li>
    <li><a href="?page=3">3</a></li>
    <li><a href="?page=3" aria-label="Next">→</a></li>
  </ol>
</nav>
```

```css
nav[aria-label="Pagination"] ol {
  display: flex;
  gap: var(--space-xs);
  list-style: none;
  padding: 0;
}
nav[aria-label="Pagination"] a {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--min-tap-target);
  min-height: var(--min-tap-target);
  padding: var(--space-sm);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}
nav[aria-label="Pagination"] [aria-current="page"] {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
```

**Why semantic:** Ordered list represents sequential pages; `aria-label` identifies purpose.

---

#### 8. List Groups ✅ Semantic

**Recommendation:** Use `<menu>` (interactive list) or styled `<ul>`.

```html
<!-- Proposed syntax using menu -->
<menu role="listbox">
  <li>Item 1</li>
  <li aria-selected="true">Item 2 (selected)</li>
  <li disabled>Item 3 (disabled)</li>
</menu>

<!-- With actions -->
<menu role="listbox">
  <li>
    <span>List item with action</span>
    <button size="sm" variant="ghost">Edit</button>
  </li>
</menu>
```

```css
menu[role="listbox"] {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
menu[role="listbox"] li {
  padding: var(--space-md);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
menu[role="listbox"] li:last-child {
  border-bottom: none;
}
menu[role="listbox"] [aria-selected="true"] {
  background: var(--primary-light);
}
```

**Why semantic:** `<menu>` is specifically for interactive lists. Falls back to `<ul>` styling.

---

#### 9. Progress Bars ✅ Semantic

**Recommendation:** Use native `<progress>` and `<meter>` elements.

```html
<!-- Progress (task completion) -->
<progress value="70" max="100">70%</progress>

<!-- With label -->
<label>
  Uploading...
  <progress value="70" max="100"></progress>
</label>

<!-- Meter (gauge/measurement) -->
<meter value="0.7" min="0" max="1" low="0.3" high="0.7" optimum="1">70%</meter>
```

```css
progress {
  width: 100%;
  height: 0.75rem;
  border-radius: var(--radius-full);
  overflow: hidden;
  appearance: none;
}
progress::-webkit-progress-bar {
  background: var(--gray-200);
  border-radius: var(--radius-full);
}
progress::-webkit-progress-value {
  background: var(--primary);
  border-radius: var(--radius-full);
}
progress::-moz-progress-bar {
  background: var(--primary);
  border-radius: var(--radius-full);
}

meter {
  width: 100%;
  height: 0.75rem;
}
```

**Why semantic:** These are the native HTML elements for progress indication. Built-in accessibility.

---

#### 10. Tooltips ⚠️ Semantic + JS

**Recommendation:** CSS for simple tooltips, JS for smart positioning.

```html
<!-- CSS-only (positioning limited) -->
<span data-tooltip="This is helpful info">Hover me</span>

<!-- JS-enhanced for smart positioning -->
<button data-tooltip="Click to save" data-tooltip-position="top">
  Save
</button>
```

```css
/* Already in semantic.css - CSS-only version */
[data-tooltip] {
  position: relative;
}
[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  /* ... styling ... */
  opacity: 0;
  pointer-events: none;
}
[data-tooltip]:hover::after {
  opacity: 1;
}
```

**Why JS needed:** Smart positioning (flip when near edge), show on focus for accessibility, delay timing.

---

#### 11. Display Headings ✅ Semantic

**Recommendation:** Use `display` attribute on headings.

```html
<h1 display>Display Heading</h1>
<h1 display="1">Display 1</h1>
<h1 display="2">Display 2</h1>
```

```css
h1[display], h2[display], h3[display] {
  font-size: var(--text-4xl);
  font-weight: 300;
  line-height: 1.1;
}
[display="1"] { font-size: 5rem; }
[display="2"] { font-size: 4.5rem; }
[display="3"] { font-size: 4rem; }
```

**Why semantic:** Still using heading elements, just with variant styling.

---

#### 12. Lead Paragraph ✅ Semantic

**Recommendation:** Use `lead` attribute on paragraph.

```html
<p lead>This is a lead paragraph with larger, emphasized text 
that introduces the content below.</p>
```

```css
p[lead] {
  font-size: var(--text-xl);
  font-weight: 300;
  line-height: var(--leading-relaxed);
  color: var(--muted);
}
```

**Why semantic:** Still a paragraph, just emphasized. Perfect semantic fit.

---

#### 13. Responsive Navbar ⚠️ Semantic + JS

**Recommendation:** Use `<details>` for CSS-only, or JS toggle for better UX.

```html
<!-- CSS-only using details (limited but works) -->
<header>
  <nav layout="row" justify="between" align="center">
    <a href="/"><strong>Brand</strong></a>
    
    <!-- Desktop nav -->
    <nav layout="row" gap="md" hide="mobile">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
    
    <!-- Mobile nav using details -->
    <details show="mobile" hide="desktop">
      <summary>Menu</summary>
      <nav layout="stack" gap="sm">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </details>
  </nav>
</header>

<!-- JS-enhanced version -->
<header>
  <nav layout="row" justify="between" align="center">
    <a href="/"><strong>Brand</strong></a>
    <button hide="desktop" data-nav-toggle aria-label="Menu">☰</button>
    <nav layout="row" gap="md" data-nav-menu>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </nav>
</header>
```

**Why JS needed:** Smooth animations, focus management, escape key to close, aria-expanded states.

---

#### 14. Floating Labels ✅ Semantic

**Recommendation:** Pure CSS using `:placeholder-shown` and `:focus`.

```html
<!-- Proposed syntax -->
<label floating>
  <input type="email" placeholder=" " required>
  <span>Email address</span>
</label>
```

```css
label[floating] {
  position: relative;
  display: block;
}
label[floating] input {
  padding-top: 1.5rem;
}
label[floating] span {
  position: absolute;
  top: 50%;
  left: var(--space-md);
  transform: translateY(-50%);
  transition: all var(--transition-fast);
  pointer-events: none;
  color: var(--muted);
}
label[floating] input:focus + span,
label[floating] input:not(:placeholder-shown) + span {
  top: 0.5rem;
  transform: translateY(0);
  font-size: var(--text-xs);
  color: var(--primary);
}
```

**Why semantic:** Uses standard `<label>` and `<input>`. CSS handles the visual effect.

---

#### 15. Custom Checkbox/Radio ✅ Semantic

**Recommendation:** CSS using `appearance: none` on native inputs.

```html
<!-- Native inputs styled with CSS -->
<label inline>
  <input type="checkbox" styled>
  Accept terms
</label>

<label inline>
  <input type="radio" name="choice" styled>
  Option A
</label>
```

```css
input[type="checkbox"][styled],
input[type="radio"][styled] {
  appearance: none;
  -webkit-appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border);
  background: var(--surface);
  cursor: pointer;
}
input[type="checkbox"][styled] {
  border-radius: var(--radius-sm);
}
input[type="radio"][styled] {
  border-radius: 50%;
}
input[type="checkbox"][styled]:checked {
  background: var(--primary);
  border-color: var(--primary);
  background-image: url("data:image/svg+xml,..."); /* checkmark */
}
input[type="radio"][styled]:checked {
  border-color: var(--primary);
  background: var(--primary);
  box-shadow: inset 0 0 0 3px var(--surface);
}
```

**Why semantic:** Uses native `<input>` elements, preserving accessibility and form behavior.

---

#### 16. Carousel/Slider 🔧 Custom Component

**Recommendation:** This requires a custom web component.

```html
<!-- Proposed custom component -->
<pb-carousel autoplay interval="5000">
  <img src="slide1.jpg" alt="Slide 1">
  <img src="slide2.jpg" alt="Slide 2">
  <img src="slide3.jpg" alt="Slide 3">
</pb-carousel>
```

**Why custom component needed:**
- Complex state management (current slide, autoplay timer)
- Touch/swipe gestures
- Keyboard navigation
- Focus management
- Pause on hover/focus
- Multiple layout options (fade, slide, etc.)

**Alternatives:**
- Use CSS scroll-snap for a simpler, semantic approach (limited controls)
- Link to third-party library for full-featured carousel

---

#### 17. Offcanvas ✅ Semantic

**Recommendation:** Use `<dialog>` with positioning attributes.

```html
<!-- Proposed syntax -->
<dialog id="sidebar" position="left">
  <nav layout="stack" gap="md">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
  <button data-dialog-close>Close</button>
</dialog>

<button data-dialog-open="sidebar">Open Sidebar</button>
```

```css
dialog[position="left"] {
  margin: 0;
  margin-right: auto;
  height: 100vh;
  max-height: 100vh;
  border-radius: 0;
  animation: slide-in-left var(--transition-slow);
}
dialog[position="right"] {
  margin: 0;
  margin-left: auto;
  height: 100vh;
  max-height: 100vh;
  border-radius: 0;
  animation: slide-in-right var(--transition-slow);
}
@keyframes slide-in-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

**Why semantic:** `<dialog>` provides built-in modal behavior, focus trapping, and accessibility.

---

#### 18. Popovers 🔧 Custom Component

**Recommendation:** This requires a custom web component for proper functionality.

```html
<!-- Proposed custom component -->
<pb-popover trigger="click" position="bottom">
  <button slot="trigger">Click me</button>
  <article slot="content">
    <h4>Popover Title</h4>
    <p>Popover content with more details.</p>
  </article>
</pb-popover>
```

**Why custom component needed:**
- Smart positioning (flip when near viewport edge)
- Multiple trigger types (click, hover, focus)
- Click-outside to dismiss
- Arrow pointing to trigger
- Focus management
- Nested interactive content

**Alternative:** For simpler use cases, use `<details>` positioned absolutely.

---

#### 19. Scrollspy 📜 JS Only

**Recommendation:** Pure JavaScript feature, no specific element needed.

```javascript
// Add to Semantic.js
Semantic.scrollspy = {
  init: function(options) {
    const nav = document.querySelector(options.nav);
    const sections = document.querySelectorAll(options.sections);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          nav.querySelectorAll('a').forEach(a => {
            a.removeAttribute('aria-current');
          });
          nav.querySelector(`a[href="#${id}"]`)?.setAttribute('aria-current', 'true');
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
  }
};

// Usage
Semantic.scrollspy.init({
  nav: 'nav[aria-label="Table of contents"]',
  sections: 'section[id]'
});
```

**Why JS only:** This is purely a behavior, not a component. Uses `IntersectionObserver` for performance.

---

#### 20. Close Button ✅ Semantic

**Recommendation:** Just a styled `<button>` with specific attributes.

```html
<!-- Proposed syntax -->
<button close aria-label="Close">×</button>
<button close aria-label="Dismiss" variant="ghost">×</button>
```

```css
button[close] {
  padding: 0;
  width: 2rem;
  height: 2rem;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  line-height: 1;
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  border-radius: var(--radius-full);
}
button[close]:hover {
  background: var(--gray-200);
  color: var(--text);
}
```

**Why semantic:** It's just a button with specific styling. No need for complexity.

---

## Advantages of Semantic CSS

### 1. **Cleaner HTML**
```html
<!-- Semantic CSS - 47 characters -->
<button variant="primary" size="lg">Click</button>

<!-- Bootstrap - 54 characters -->
<button class="btn btn-primary btn-lg">Click</button>
```

### 2. **Semantic Meaning**
Using `<article>`, `<nav>`, `<header>`, `<footer>`, `<aside>` provides built-in accessibility and SEO benefits.

### 3. **Native Browser Features**
- `<details>` for accordions (no JS needed)
- `<dialog>` for modals (accessibility built-in)
- HTML5 validation for forms

### 4. **Smaller Footprint**
- ~25KB CSS vs ~230KB Bootstrap bundle
- JS is optional, not required

### 5. **No Class Name Memorization**
Attributes are more discoverable and IDE-friendly.

### 6. **CSS Variables Throughout**
Easy to customize without a build step.

---

## Advantages of Bootstrap

### 1. **Comprehensive Component Library**
25+ pre-built components vs ~10 in Semantic CSS.

### 2. **Responsive Breakpoint System**
```html
<!-- Bootstrap responsive classes -->
<div class="col-12 col-md-6 col-lg-4">...</div>

<!-- Semantic CSS - limited responsive -->
<div cols="3" responsive>...</div>
```

### 3. **Extensive Documentation**
Years of documentation, examples, and community resources.

### 4. **Third-Party Ecosystem**
Thousands of themes, templates, and plugins.

### 5. **Browser Compatibility**
Better support for older browsers.

### 6. **Proven at Scale**
Used by millions of sites, battle-tested.

---

## Recommendations

### Use Semantic CSS When:
- Building small to medium projects
- Prioritizing semantic HTML and accessibility
- Wanting minimal JavaScript
- Modern browser support is acceptable
- Teaching HTML/CSS fundamentals
- Building prototypes quickly

### Use Bootstrap When:
- Building large enterprise applications
- Need comprehensive component library
- Team is already familiar with Bootstrap
- Require legacy browser support
- Want extensive documentation and community support
- Need ready-made themes and templates

### Hybrid Approach
Consider using Semantic CSS as your base and adding Bootstrap components as needed via CDN for specific features like carousels or complex navbars.

---

## Roadmap for Semantic CSS

Based on the analysis above, here's a prioritized roadmap organized by implementation approach:

### Phase 1: Pure Semantic (CSS Only) - Easy Wins
These require only CSS additions, no JavaScript:

- [ ] Alert/Callout using `<aside role="alert" type="...">`
- [ ] Badge using `<data variant="...">` or `<output>`
- [ ] Breadcrumbs using `<nav aria-label="Breadcrumb">` + `<ol>`
- [ ] Pagination using `<nav aria-label="Pagination">` + `<ol>`
- [ ] Button groups using `<nav role="group">`
- [ ] List groups using `<menu role="listbox">`
- [ ] Progress bars using native `<progress>` and `<meter>`
- [ ] Display headings using `[display]` attribute
- [ ] Lead paragraph using `[lead]` attribute
- [ ] Close button using `button[close]`

**Estimated effort:** 1-2 days

### Phase 2: Semantic Forms (CSS Only) - Medium
Form enhancements using CSS tricks:

- [ ] Input groups using `label[layout="input-group"]`
- [ ] Floating labels using `:placeholder-shown` trick
- [ ] Custom checkbox/radio using `appearance: none`
- [ ] Switch toggle (styled checkbox)
- [ ] Input sizing variants

**Estimated effort:** 1-2 days

### Phase 3: Semantic + JS Enhancement - Medium
Features that work with CSS but benefit from JavaScript:

- [ ] Responsive navbar using `<details>` or JS toggle
- [ ] Offcanvas using `<dialog position="left|right">`
- [ ] Tabs using radio buttons + JS for keyboard nav
- [ ] Tooltips with smart positioning via JS
- [ ] Scrollspy as pure JS feature

**Estimated effort:** 2-3 days

### Phase 4: Custom Web Components - When Needed
Only create custom elements for truly complex interactions:

- [ ] `<pb-carousel>` - Complex state, gestures, autoplay
- [ ] `<pb-popover>` - Positioning, triggers, nested content

**Estimated effort:** 3-5 days

### Summary by Approach

| Approach | Components | % of Missing |
|----------|------------|--------------|
| ✅ Pure Semantic (CSS) | 14 components | 70% |
| ⚠️ Semantic + JS | 5 components | 25% |
| 🔧 Custom Components | 2 components | 10% |

**Key Insight:** 70% of missing Bootstrap features can be added using pure semantic HTML and CSS. Only 2 components (carousel, popover) truly require custom web components.

---

## Conclusion

Semantic CSS offers a refreshing alternative to class-based frameworks like Bootstrap. While it lacks some advanced components, its emphasis on semantic HTML, smaller footprint, and attribute-based syntax makes it ideal for projects that prioritize accessibility, simplicity, and modern browser support.

For comprehensive applications requiring many pre-built components, Bootstrap remains the more complete solution. However, for smaller projects or developers who value semantic markup, Semantic CSS provides a clean, intuitive approach to styling web applications.
