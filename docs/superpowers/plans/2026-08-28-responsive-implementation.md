# Responsive Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make andymackle.com fully responsive across mobile (320px), tablet (768px), small-desktop (1024px), and desktop (1440px+) devices with touch-optimized interactions.

**Architecture:** Hybrid system combining CSS media queries for responsive layout + Framer Motion for gesture interactions. CSS handles all layout, typography (via clamp()), and spacing at 4 breakpoints. React manages sidebar drawer visibility and state. Gestures implemented via Framer Motion's drag detection and react-use-gesture for pinch events.

**Tech Stack:** React 19, Vite 8, Framer Motion 12, react-use-gesture (new dependency)

**Spec:** `docs/superpowers/specs/2026-08-28-responsive-design.md`

## Global Constraints

- **Target breakpoints:** 320px, 768px, 1024px, 1440px (exact)
- **Minimum touch target:** 48px height/width (mobile)
- **Typography method:** CSS clamp() — no breakpoint-specific font-size rules
- **Sidebar behavior:** Hidden mobile/tablet (320-1023px), visible desktop (1024px+)
- **Drawer nav:** Slides from left, overlay backdrop, Framer Motion animation
- **Gallery gestures:** Swipe left/right for navigation, pinch-to-zoom in modals
- **Browser support:** Modern browsers (Chrome 79+, Safari 13.4+, Firefox recent)
- **No breaking changes:** Desktop experience unchanged; mobile is new

---

## File Structure Overview

| File | Responsibility |
|------|-----------------|
| `src/index.css` | Responsive typography (clamp), media queries (4 breakpoints), grid layouts, touch optimization, spacing rules |
| `package.json` | Add `react-use-gesture` dependency |
| `src/components/Sidebar.jsx` | Add drawer slide animation with Framer Motion |
| `src/components/GallerySection.jsx` | Convert flex to CSS Grid, implement swipe detection, add pinch handler |
| `src/components/HomeSection.jsx` | Update flex layout for responsive wrapping |
| `src/components/AboutSection.jsx` | Update flex layout for responsive wrapping |
| `src/components/ContactSection.jsx` | No code changes (CSS handles responsiveness) |

---

## Phase 1: CSS Foundation

### Task 1: Add Fluid Typography with Clamp

**Files:**
- Modify: `src/index.css:39-43` (headings), `src/index.css:31-37` (body)

**Interfaces:**
- Produces: CSS font-size rules using clamp() for all heading and body text

**Steps:**

- [ ] **Step 1: Update h1, h2, h3 font sizes with clamp()**

Replace the existing heading styles in `src/index.css` at line 39-43 with:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--color-white);
  text-transform: uppercase;
}

h1 { font-size: clamp(2rem, 6vw, 4rem); }
h2 { font-size: clamp(1.4rem, 4vw, 2.8rem); }
h3 { font-size: clamp(1.1rem, 3vw, 1.8rem); }
h4 { font-size: clamp(1rem, 2.5vw, 1.5rem); }
```

- [ ] **Step 2: Update body font size**

In `src/index.css` around line 34, change the body rule to include font-size:

```css
body {
  font-family: var(--font-body);
  color: var(--color-text-main);
  line-height: 1.6;
  overflow-x: hidden;
  background-color: var(--color-bg-dark);
  font-size: clamp(0.95rem, 1vw, 1.1rem);
}
```

- [ ] **Step 3: Add .section-title class with fluid sizing**

Add after the heading styles:

```css
.section-title {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  margin-bottom: 2rem;
}
```

- [ ] **Step 4: Test in browser at multiple viewport widths**

Run: `npm run dev` then open `http://localhost:5173` and resize browser to 320px, 768px, 1024px, 1440px.

Expected: Text scales smoothly without jumping.

- [ ] **Step 5: Commit**

```bash
cd /tmp/andymackle.com && git add src/index.css && git commit -m "feat: add fluid typography with CSS clamp()

Replace fixed font sizes with clamp() for smooth scaling
across all viewport sizes (320px to 1440px+). Maintains
visual hierarchy while eliminating breakpoint-specific rules."
```

---

### Task 2: Add Mobile Breakpoint (320px - 767px)

**Files:**
- Modify: `src/index.css:320-331` (replace existing media query)

**Interfaces:**
- Produces: Complete mobile layout media query at `@media (max-width: 767px)`

**Steps:**

- [ ] **Step 1: Replace existing 900px media query with 767px mobile query**

Find the existing `@media (max-width: 900px)` at line 320 and replace the entire block with the complete mobile media query (see detailed spec).

- [ ] **Step 2: Verify syntax**

Run: `npm run lint` to check CSS is valid.

Expected: No linting errors.

- [ ] **Step 3: Test mobile view**

Open browser DevTools, set viewport to 375px.

Expected: Sidebar hidden, menu toggle visible, section padding reduced.

- [ ] **Step 4: Commit**

```bash
cd /tmp/andymackle.com && git add src/index.css && git commit -m "feat: add mobile responsive breakpoint (max-width: 767px)

Hide sidebar, show menu toggle, reduce padding, single-column layouts,
48px+ touch targets, and touch-action optimization for mobile devices."
```

---

### Task 3: Add Tablet Breakpoint (768px - 1023px)

**Files:**
- Modify: `src/index.css` (append new media query after mobile)

**Interfaces:**
- Produces: Tablet layout media query at `@media (min-width: 768px) and (max-width: 1023px)`

**Steps:**

- [ ] **Step 1: Add tablet media query block**

After the mobile query, add the tablet media query.

- [ ] **Step 2: Test tablet view**

Set viewport to 768px.

Expected: Sidebar still hidden, gallery shows 2 columns, padding increased.

- [ ] **Step 3: Commit**

```bash
cd /tmp/andymackle.com && git add src/index.css && git commit -m "feat: add tablet responsive breakpoint (768px-1023px)

Tablet view with drawer nav, 2-column gallery grid,
increased padding and spacing vs mobile."
```

---

### Task 4: Add Desktop Breakpoint (1024px+)

**Files:**
- Modify: `src/index.css` (append new media query after tablet)

**Interfaces:**
- Produces: Desktop layout media query at `@media (min-width: 1024px)`

**Steps:**

- [ ] **Step 1: Add desktop media query**

After the tablet query, add the desktop media query.

- [ ] **Step 2: Test desktop view**

Set viewport to 1024px.

Expected: Sidebar visible, gallery shows 3 columns.

- [ ] **Step 3: Commit**

```bash
cd /tmp/andymackle.com && git add src/index.css && git commit -m "feat: add desktop responsive breakpoint (1024px+)

Show sidebar permanently, 3-column gallery, increased spacing.
Desktop layout stable at all screen sizes 1024px and above."
```

---

### Task 5: Add Touch Optimization & Safe Areas

**Files:**
- Modify: `src/index.css` (add universal touch rules)
- Modify: `index.html` (viewport meta tag)

**Interfaces:**
- Produces: Global touch-friendly CSS rules and safe-area support

**Steps:**

- [ ] **Step 1: Add touch optimization to base styles**

Before the media queries in CSS, add touch optimization rules.

- [ ] **Step 2: Add viewport-fit to HTML head**

Update viewport meta tag in `index.html`.

- [ ] **Step 3: Test on notched device simulator**

Use Chrome DevTools with iPhone 12 Pro preset.

Expected: Content respects safe areas.

- [ ] **Step 4: Commit both files**

```bash
cd /tmp/andymackle.com && git add src/index.css index.html && git commit -m "feat: add touch optimization and safe-area support

Add 48px minimum touch targets for mobile, notch support via
viewport-fit=cover, and CSS safe-area-inset rules for modern phones."
```

---

## Phase 2: Layout Responsiveness

### Task 6: Convert Gallery to CSS Grid

**Files:**
- Modify: `src/components/GallerySection.jsx` (layout section)

**Interfaces:**
- Consumes: `.gallery-grid` class name
- Produces: Grid-based layout that responds to media queries

**Steps:**

- [ ] **Step 1-3: Update gallery layout to CSS Grid**

- [ ] **Step 4: Test at all breakpoints**

Resize browser 320px → 1440px.

Expected: 1 column mobile, 2 tablet, 3 desktop.

- [ ] **Step 5: Commit**

```bash
cd /tmp/andymackle.com && git add src/components/GallerySection.jsx && git commit -m "feat: convert gallery layout to CSS Grid

Use responsive grid with auto-fit and minmax() for
automatic 1-2-3 column layout across breakpoints."
```

---

### Task 7: Update Sidebar Visibility & Add Drawer Animation

**Files:**
- Modify: `src/components/Sidebar.jsx`

**Interfaces:**
- Consumes: `isSidebarOpen` prop
- Produces: Animated drawer on mobile, static sidebar on desktop

**Steps:**

- [ ] **Step 1-3: Add Framer Motion animation**

- [ ] **Step 4: Test on mobile (375px)**

Click menu toggle.

Expected: Sidebar slides in smoothly.

- [ ] **Step 5: Test on desktop (1024px)**

Expected: Sidebar always visible.

- [ ] **Step 6: Commit**

```bash
cd /tmp/andymackle.com && git add src/components/Sidebar.jsx && git commit -m "feat: add drawer animation with Framer Motion

Sidebar slides in from left on mobile when menu opened,
static always-visible on desktop (1024px+)."
```

---

### Task 8: Update HomeSection & AboutSection Responsive Layout

**Files:**
- Modify: `src/components/HomeSection.jsx`
- Modify: `src/components/AboutSection.jsx`
- Modify: `src/index.css` (add flex-layout responsive rules)

**Interfaces:**
- Consumes: `.flex-layout` class
- Produces: Responsive flex layouts that stack on mobile

**Steps:**

- [ ] **Step 1-3: Update layouts with flex-wrap and className**

- [ ] **Step 4: Test at all breakpoints**

Expected: Stack mobile, side-by-side tablet/desktop.

- [ ] **Step 5: Commit**

```bash
cd /tmp/andymackle.com && git add src/components/HomeSection.jsx src/components/AboutSection.jsx src/index.css && git commit -m "feat: add responsive flex layouts to sections

Home and About sections stack vertically on mobile (320-767px),
side-by-side on tablet/desktop (768px+)."
```

---

## Phase 3: Touch Optimization

### Task 9: Increase Button Sizes & Add Touch-Action CSS

**Files:**
- Modify: `src/index.css` (touch optimization rules)

**Interfaces:**
- Produces: Minimum 48px touch targets across all devices

**Steps:**

- [ ] **Step 1-3: Add universal button/input touch rules**

- [ ] **Step 4: Test touch targets**

Inspect buttons in DevTools.

Expected: All buttons show `min-height: 48px`.

- [ ] **Step 5: Commit**

```bash
cd /tmp/andymackle.com && git add src/index.css && git commit -m "feat: optimize touch targets to 48px minimum

Add universal touch-action: manipulation and min-height/width 48px
for all buttons, links, inputs on mobile. Meets WCAG 2.1 AA guidelines."
```

---

## Phase 4: Gesture Support

### Task 10: Add React-Use-Gesture Dependency

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `react-use-gesture` library available

**Steps:**

- [ ] **Step 1-2: Add and install dependency**

- [ ] **Step 3: Verify install**

Run: `npm list react-use-gesture`

Expected: Shows installed version.

- [ ] **Step 4: Commit**

```bash
cd /tmp/andymackle.com && git add package.json package-lock.json && git commit -m "feat: add react-use-gesture dependency

Adds gesture detection library for pinch-to-zoom and advanced
touch handling on mobile devices."
```

---

### Task 11: Implement Gallery Swipe Navigation

**Files:**
- Modify: `src/components/GallerySection.jsx` (swipe detection)

**Interfaces:**
- Produces: Swipe-triggered gallery navigation

**Steps:**

- [ ] **Step 1-2: Add motion imports and drag detection**

- [ ] **Step 3: Test on mobile emulation**

Expected: Swipe left/right navigates gallery.

- [ ] **Step 4: Verify desktop unaffected**

Expected: Arrow buttons work, swipe passive.

- [ ] **Step 5: Commit**

```bash
cd /tmp/andymackle.com && git add src/components/GallerySection.jsx && git commit -m "feat: add swipe gesture navigation to gallery

Detect horizontal swipes on gallery grid: left swipe → next item,
right swipe → previous item. Works on mobile/tablet via Framer Motion."
```

---

### Task 12: Implement Pinch-to-Zoom for Images

**Files:**
- Modify: `src/components/GallerySection.jsx` (modal image section)

**Interfaces:**
- Produces: Pinch-to-zoom gesture on modal images

**Steps:**

- [ ] **Step 1-2: Add gesture handler**

- [ ] **Step 3: Test on real device or mobile simulator**

Expected: Pinch in/out zooms 1x-3x.

- [ ] **Step 4: Verify desktop works**

Expected: No touch handlers on mouse.

- [ ] **Step 5: Commit**

```bash
cd /tmp/andymackle.com && git add src/components/GallerySection.jsx && git commit -m "feat: add pinch-to-zoom gesture for modal images

Implement pinch gesture detection via react-use-gesture with
zoom range constrained 1x-3x. Touch-only, desktop unaffected."
```

---

## Phase 5: Testing & Deployment

### Task 13: Browser & Device Testing

**Files:**
- No code changes; verification only

**Steps:**

- [ ] Test 320px, 768px, 1024px, 1440px viewports
- [ ] Verify sidebar, gallery columns, spacing at each
- [ ] Test swipe gestures
- [ ] Run Lighthouse
- [ ] Document results

---

### Task 14: Build & Final Deployment Test

**Files:**
- No code changes; build verification

**Steps:**

- [ ] Run production build: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Test on mobile
- [ ] Final commit

---

Now I'll execute all tasks. Let me start with Phase 1:
