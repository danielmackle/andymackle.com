# Responsive Design Implementation Spec
**Date:** 2026-08-28  
**Project:** andymackle.com  
**Goal:** Enable full mobile, tablet, and desktop responsiveness with touch-optimized interactions  

---

## 1. Overview

This spec implements a hybrid responsive system using CSS media queries for layout + Framer Motion for gesture interactions. The system supports 4 device tiers (mobile: 320px, tablet: 768px, small-desktop: 1024px, desktop: 1440px+) with fluid typography and mobile-first gesture support.

**Key outcomes:**
- Portfolio functions perfectly on phones, tablets, and desktops
- Large (48px+) touch targets on mobile
- Swipe navigation for video gallery
- Pinch-to-zoom support for images
- Drawer navigation that hides on mobile, shows on desktop
- Smooth animations maintained across all devices

---

## 2. Architecture

### 2.1 Three-Layer System

**Layer 1: CSS (Responsive Layout & Typography)**
- Media queries at 4 breakpoints: 320px, 768px, 1024px, 1440px
- Fluid typography using CSS `clamp()` — no breakpoint-specific font sizes
- Responsive grids using CSS Grid with `repeat(auto-fit, minmax())`
- Touch optimization: `touch-action: manipulation`, 48px minimum touch targets

**Layer 2: React (State & Conditional Rendering)**
- Sidebar visibility: hidden mobile/tablet, visible desktop (1024px+)
- Menu toggle button: visible mobile/tablet, hidden desktop
- Drawer animation state via existing `isSidebarOpen` state
- No new React hooks or state needed — leverage existing patterns

**Layer 3: Framer Motion (Gestures)**
- Gallery swipe detection via `drag="x"` + `onDragEnd` callback
- Pinch-to-zoom for modal images (via react-use-gesture library)
- Drawer slide animation (`initial={{ x: -300 }}` → `animate={{ x: 0 }}`)
- Maintained for all existing page animations

### 2.2 Device Breakpoints

| Breakpoint | Device | Layout | Sidebar | Gallery |
|-----------|--------|--------|---------|---------|
| 320px-767px | Mobile Phone | Single column, drawer nav | Hidden, drawer overlay | 1 column grid |
| 768px-1023px | Tablet | 2-column layouts, drawer nav | Hidden, drawer overlay | 2 column grid |
| 1024px-1439px | Small Desktop | 3-column layouts | Visible always | 3 column grid |
| 1440px+ | Desktop | Full layouts | Visible always | 3 column grid |

---

## 3. CSS Responsive System

### 3.1 Fluid Typography

Replace all fixed font sizes with `clamp(min, preferred, max)`:

```css
h1 { font-size: clamp(2rem, 6vw, 4rem); }
h2 { font-size: clamp(1.4rem, 4vw, 2.8rem); }
h3 { font-size: clamp(1.1rem, 3vw, 1.8rem); }
body { font-size: clamp(0.95rem, 1vw, 1.1rem); }
```

Benefits: Scales smoothly across all viewports without discrete breakpoints.

### 3.2 Mobile Breakpoint (320px - 767px)

```css
@media (max-width: 767px) {
  /* Hide sidebar, show menu toggle */
  .sidebar { display: none; }
  .menu-toggle-btn { display: block; }
  
  /* Section spacing */
  .section { 
    padding: 2rem 1.5rem; 
    padding-top: 4rem; 
  }
  
  /* Title sizing */
  .section-title { font-size: clamp(1.4rem, 4vw, 2rem); }
  
  /* Gallery: single column */
  .gallery-grid { grid-template-columns: 1fr; }
  
  /* Flex layouts stack vertically */
  [style*="flex-wrap: wrap"] { flex-direction: column; }
  
  /* Touch targets */
  button, a, input, textarea {
    min-height: 48px;
    touch-action: manipulation;
  }
  
  .jagged-btn { padding: 1.5rem 2rem !important; }
  
  /* Modal adjustments */
  .modal-content { padding: 2rem 1.5rem; }
}
```

### 3.3 Tablet Breakpoint (768px - 1023px)

```css
@media (min-width: 768px) and (max-width: 1023px) {
  /* Still hide sidebar on tablet (drawer nav) */
  .sidebar { display: none; }
  .menu-toggle-btn { display: block; }
  
  /* Section spacing */
  .section { 
    padding: 3rem 2rem; 
    padding-top: 5rem; 
  }
  
  /* Gallery: two columns */
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  
  /* Contact section: side-by-side on larger tablets */
  .contact-flex { flex-wrap: wrap; }
}
```

### 3.4 Desktop Breakpoint (1024px+)

```css
@media (min-width: 1024px) {
  /* Show sidebar, hide menu toggle */
  .sidebar { display: flex; }
  .menu-toggle-btn { display: none; }
  
  /* Gallery: three columns */
  .gallery-grid { grid-template-columns: repeat(3, 1fr); }
  
  /* Section spacing */
  .section { 
    padding: 4rem 2rem; 
    padding-top: 6rem; 
  }
}
```

### 3.5 Touch & Accessibility

```css
/* Mobile-specific touch optimization */
@media (max-width: 768px) {
  /* Prevent zoom on double-tap */
  button, a { touch-action: manipulation; }
  
  /* Minimum 48px touch targets (WCAG guideline) */
  button, a, input, textarea, [role="button"] {
    min-height: 48px;
    min-width: 48px;
  }
  
  /* Notch support for modern phones */
  body { 
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
}
```

---

## 4. Component Changes

### 4.1 App.jsx

**Changes:**
- Menu toggle button already exists — no changes needed
- Sidebar visibility controlled by existing `.sidebar { display: none }` at mobile breakpoints

**Result:** Desktop shows sidebar always; mobile/tablet hides it until menu button clicked.

### 4.2 Sidebar.jsx

**Add drawer slide animation:**
```jsx
<motion.div
  initial={{ x: -300 }}
  animate={isSidebarOpen ? { x: 0 } : { x: -300 }}
  transition={{ type: 'spring', damping: 25 }}
  className="sidebar"
>
  {/* sidebar content */}
</motion.div>
```

On desktop (1024px+), sidebar is always visible (CSS `display: flex`), so animation doesn't run.

### 4.3 GallerySection.jsx

**Layout changes:**
- Replace flex layout with CSS Grid: `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));`
- Maintains responsive 1-2-3 column layout automatically

**Add swipe detection:**
```jsx
<motion.div
  drag="x"
  dragElastic={0.2}
  onDragEnd={(e, info) => {
    if (info.offset.x > 100) previousItem();  // swiped right
    if (info.offset.x < -100) nextItem();     // swiped left
  }}
  className="gallery-grid"
>
  {/* gallery items */}
</motion.div>
```

**Pinch-to-zoom for modal images:**
- Add `react-use-gesture` library (npm install react-use-gesture)
- Wrap image in modal with pinch handler:
```jsx
const bind = useGesture({
  onPinch: ({ offset: [scale] }) => setImageZoom(Math.min(scale, 3)),
});
<motion.img {...bind()} style={{ scale: imageZoom }} />
```

### 4.4 ContactSection.jsx

**Responsive form layout:**
- Form inputs already use `width: 100%` — scales automatically
- Adjust modal padding at breakpoints (already covered in CSS)
- Two-column form layout on tablet/desktop, single-column on mobile (already handled by flex-wrap)

### 4.5 HomeSection.jsx & AboutSection.jsx

**Layout adjustments:**
- Change flex layouts to use `flex-wrap: wrap` with responsive `flex-basis` values
- Example: `flex: 1 1 100%` on mobile (full width), `flex: 1 1 350px` on tablet/desktop

---

## 5. Gesture Support

### 5.1 Gallery Swipe Navigation

**Implementation:**
- Framer Motion's `drag="x"` detects horizontal swipes on touch devices
- `onDragEnd` calculates swipe velocity and offset
- If offset > 100px: navigate to previous item
- If offset < -100px: navigate to next item
- Arrow buttons remain visible on all devices (for mouse users on desktop)

**Behavior:**
- Mobile/tablet: Primary navigation via swipe
- Desktop: Arrow buttons or swipe both work

### 5.2 Pinch-to-Zoom (Modal Images)

**Library:** `react-use-gesture` (lightweight, Framer Motion compatible)

**Implementation:**
- Detect pinch events on image containers
- Scale transform between 1x and 3x
- Reset on double-tap or drag outside bounds
- Only activates on touch devices (gesture detection is no-op on mouse)

---

## 6. Performance Considerations

### 6.1 Video Gallery on Mobile

**Issue:** Loading many videos on mobile can cause lag.

**Solutions (Phase 2+):**
- Lazy load video thumbnails (IntersectionObserver)
- Provide lower-bitrate video variant for mobile
- Use video poster images instead of auto-play previews
- Consider native video lazy-load (`loading="lazy"` on video tag)

### 6.2 CSS & JavaScript

- Media queries are performant (no JS cost)
- Framer Motion gestures are optimized (GPU-accelerated transforms)
- Clamp() typography is pure CSS (zero JavaScript)
- No layout thrashing from responsive checks

---

## 7. Testing Strategy

### 7.1 Browser DevTools Testing

Use Chrome/Firefox DevTools device emulation:
- iPhone 12 (390px × 844px)
- iPad (768px × 1024px)
- Desktop (1440px × 900px)

Test flows:
1. Sidebar drawer opens/closes on mobile
2. Gallery swipe works on mobile/tablet
3. Buttons are 48px+ clickable
4. Typography reads well at all breakpoints
5. Contact form submits on all devices

### 7.2 Real Device Testing

**Critical:** Test on actual devices for touch gestures:
- iOS iPhone (Safari)
- Android phone (Chrome)
- iPad/tablet (Safari)

Verify:
- Swipe gestures respond smoothly
- Pinch-to-zoom works
- No layout jank on scroll
- Video playback smooth

### 7.3 Edge Cases

- Landscape orientation on phone (test layout)
- Notched phones (test safe-area insets)
- Slow 3G network (test video loading)
- Very small screens (320px - test mobile extreme)
- Very large screens (1920px+ - test desktop extreme)

---

## 8. Implementation Phases

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| 1 | Add media queries, clamp() typography, mobile spacing | 1-2 hours |
| 2 | Update component layouts (grid, flex-wrap), sidebar visibility | 1-2 hours |
| 3 | Touch optimization (button sizes, touch-action) | 30 min |
| 4 | Gesture support (swipe, pinch-to-zoom) | 1-2 hours |
| 5 | Testing, polish, real device validation | 1-2 hours |

**Total estimated time:** 5-9 hours

---

## 9. Files Modified

| File | Changes |
|------|---------|
| `src/index.css` | Add media queries, clamp() typography, responsive grids, touch optimization |
| `src/components/Sidebar.jsx` | Add drawer slide animation |
| `src/components/GallerySection.jsx` | Convert to CSS Grid, add swipe detection, pinch handler |
| `src/components/HomeSection.jsx` | Update flex layouts for responsiveness |
| `src/components/AboutSection.jsx` | Update flex layouts for responsiveness |
| `src/components/ContactSection.jsx` | Responsive modal padding (CSS handles) |
| `package.json` | Add `react-use-gesture` dependency |

---

## 10. Success Criteria

✅ Portfolio renders correctly on 320px (mobile), 768px (tablet), 1024px (small-desktop), 1440px (desktop)  
✅ All buttons/inputs are ≥48px clickable targets on mobile  
✅ Sidebar drawer opens/closes smoothly on mobile menu tap  
✅ Gallery swipe navigation works on touch devices  
✅ Pinch-to-zoom works on modal images  
✅ Typography scales fluidly (no text overflow)  
✅ Video gallery loads and plays smoothly on mobile  
✅ No layout jank or janky animations on any device  
✅ Contact form is submittable on all devices  
✅ Lighthouse mobile score ≥85  

---

## 11. Notes

- **Backward compatibility:** No breaking changes. Desktop experience unchanged.
- **Browser support:** Works on all modern browsers (Chrome, Firefox, Safari, Edge). Clamp() supported in iOS 13.4+, Chrome 79+.
- **Accessibility:** Touch targets meet WCAG 2.1 Level AA (48px minimum).
- **Future:** Video lazy-loading and bitrate variants can be added in Phase 2 if needed.
