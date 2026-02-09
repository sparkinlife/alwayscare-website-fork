# Always Care — Arham Animal Ambulance

Project documentation and change log. Anyone taking over should read this first.

---

## Project Overview

**What it is:** Website for Arham Animal Ambulance (branded "Always Care") — India's free animal ambulance network with 43+ ambulances, 4 clinics, and a hospital under construction.

**Tech stack:**
- React 19.2 + TypeScript 5.8
- Vite 6.2 (build tool)
- Tailwind CSS 4.1 (styling)
- React Router 7.13 (client-side routing)
- Lucide React (icons)
- Leaflet (maps, loaded via CDN in index.html)
- Netlify (hosting + serverless functions)

**No animation libraries** — all animations are pure CSS keyframes + vanilla JS `requestAnimationFrame`.

---

## Architecture

### Routes
```
/              → HomePage.tsx (main landing page)
/live-impact   → LiveImpactPage.tsx (full case database with search/sort)
```

### Homepage Component Tree
```
HomePage
├── Hero            — Map with live GPS, ambulance list, live cases feed, donation widget, stats
├── PhotoGallery    — Two-row parallax gallery with SEVA divider
├── FoundationOfCare — Sticky scroll-driven section (ambulance, clinic, hospital)
├── VisionSection   — Param Gurudev portrait with mandala background
├── ArhamYuvaSeva   — Dark section with youth initiative stats
├── DonateSection   — Donation tiers with bank details
└── Volunteer       — Volunteer signup
```

### API Integration
- **Endpoint:** `https://api-alwayscare.arham.org/api/external/cases/recent`
- **Proxy:** Netlify serverless function at `netlify/functions/live-cases.ts`
- **Auth:** Bearer token via `ALWAYSCARE_API_TOKEN` env var
- **Data:** Live rescue cases with animal type, condition, status, photos, treatment details

---

## Key Components

| File | Purpose |
|------|---------|
| `components/Hero.tsx` | Main hero: Leaflet map with live ambulance GPS markers, user location (blue dot), ambulance/clinic cards sorted by distance, live cases feed with time-ago, donation widget overlay (desktop), animated stats with count-up |
| `components/Header.tsx` | Fixed navbar that morphs from full-width solid bar → floating glass pill on scroll. Smooth CSS transitions on all properties. Mobile hamburger menu with glass backdrop |
| `components/PhotoGallery.tsx` | Two gallery rows with auto-scroll (30px/s) + scroll-driven parallax. Row 1 moves left, Row 2 moves right. Videos at index 2 centered via direction-aware init offsets. SEVA letters with staggered reveal, shimmer gradient, hover glow, scroll-driven spacing |
| `components/FoundationOfCare.tsx` | Desktop: sticky viewport-height section with 3 scroll-trigger zones (IntersectionObserver). Shows ambulance → clinic → hospital with crossfade images. Mobile: stacked cards |
| `components/CaseModal.tsx` | Detail modal for rescue cases: medical info, pre-treatment photos (Google Drive), video links |
| `components/CaseCard.tsx` | Case summary card used in both homepage feed and Live Impact grid |
| `components/DonateSection.tsx` | Monthly/one-time donation tiers, bank transfer details, 80G tax exemption badge |
| `components/ArhamYuvaSeva.tsx` | Dark-themed section with stats and photo marquee for the youth initiative |
| `components/VisionSection.tsx` | Split layout: Param Gurudev portrait + mandala background image |
| `components/Footer.tsx` | Contact info and links |

### Hooks

| File | Purpose |
|------|---------|
| `hooks/useLiveCases.ts` | Fetches live cases from serverless function, handles sorting/filtering |
| `hooks/useCountUp.ts` | Animated number counter with ease-out cubic easing |
| `hooks/useScrollReveal.ts` | IntersectionObserver-based visibility detection for scroll-reveal animations |

### Shared Files

| File | Purpose |
|------|---------|
| `constants.ts` | API URL, 26 ambulance locations (lat/lng/phone), 4 clinic locations, nav link definitions |
| `types.ts` | TypeScript interfaces: `LiveCase`, `AmbulanceLocation`, `LoadingState` enum |
| `utils.ts` | `formatTimeAgo()`, `formatStatus()`, Google Drive thumbnail URL helper |

---

## Conventions & Patterns

### Animations
- **Scroll reveal:** Components use `useScrollReveal()` hook → adds `scroll-reveal visible` CSS class → triggers `revealUp` keyframe (0.6s ease-out). Stagger with `animationDelay` style prop.
- **60fps parallax:** PhotoGallery uses `requestAnimationFrame` loop with direct DOM manipulation (`ref.current.style.transform = ...`) to bypass React re-renders.
- **CSS keyframes** defined in `index.css`: `fadeUp`, `shimmer`, `buttonShine`, `borderGlow`, `slowPulse`, `revealUp`, `scaleIn`, `badgeGlow`, `floatSubtle`, `pulseRing`.
- **btn-shine:** Pseudo-element shine overlay used on CTA buttons.

### Responsive Breakpoints
- Mobile: `<768px` (default)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)
- Gallery items: 260px / 320px / 360px wide at each breakpoint

### Navbar Morph
Uses inline styles (not Tailwind class swapping) for smooth CSS transitions: `maxWidth`, `width`, `borderRadius`, `padding`, `backgroundColor`, `boxShadow` all transition on scroll via `all 0.5s cubic-bezier(0.4, 0, 0.2, 1)`. Key insight: `margin: auto` can't be CSS-animated, so `marginLeft/Right` stay at `auto` always.

### Gallery Positioning Math
- `setWidth = 5 * itemWidth + 4 * gap + padding`
- `videoCenterInSet = 2 * (itemWidth + gap) + itemWidth / 2`
- `ROW1_INIT = videoCenterInSet - viewportCenter` (≈212px on desktop)
- `ROW2_INIT = setWidth + ROW1_INIT` (≈2148px on desktop)
- Row 1: `translateX = -(ROW1_INIT + autoOffset + scrollDriven)` → moves left
- Row 2: `translateX = -(ROW2_INIT - autoOffset - scrollDriven)` → moves right
- Auto-offset wraps at `setWidth` for seamless infinite loop (content tripled)

---

## Change Log

### Phase 1 — Infrastructure & API (Feb 4–5)

- **Initial setup:** Vite + React + Tailwind project scaffolding
- **Netlify deployment:** Added `netlify.toml` with SPA routing, fixed mobile blank screen by removing conflicting CDN importmap
- **Hero section:** Leaflet map integration with live GPS ambulance markers, Plus Jakarta Sans font, stats grid
- **Live cases API:** Created Netlify serverless proxy with Bearer token auth, mapped API fields to `LiveCase` type
- **User location:** Geolocation API for distance-based ambulance sorting (Haversine formula), blue pulsing dot on map

**Files:** `Hero.tsx`, `constants.ts`, `types.ts`, `utils.ts`, `netlify/functions/live-cases.ts`, `netlify.toml`

### Phase 2 — Live Impact Page & Modals (Feb 5–6)

- **React Router:** Added client-side routing (`/` and `/live-impact`)
- **Live Impact page:** Dedicated page showing all rescue cases with search across 13 fields, sort by date, load-more pagination (30/page)
- **Case modal:** Click-to-expand modal with detailed rescue info, pre-treatment photos from Google Drive, post-treatment video folder links
- **Case cards:** Rich cards with condition/status color badges, thumbnails, observation text
- **Removed:** Google Gemini AI chat assistant (no API key)

**Files:** `App.tsx`, `pages/LiveImpactPage.tsx`, `components/CaseModal.tsx`, `components/CaseCard.tsx`, `components/FilterBar.tsx`, `hooks/useLiveCases.ts`

### Phase 3 — Design Overhaul & New Sections (Feb 6–7)

- **Homepage sections:** Added PhotoGallery (two-row CSS marquee with SEVA divider), FoundationOfCare (bento grid), VisionSection (Param Gurudev), ArhamYuvaSeva (dark section with photo marquee), DonateSection (donation tiers)
- **Rebuilt to match Framer reference:** Complete visual redesign of all homepage sections
- **Visual polish:** Staggered fadeUp animations, shimmer gradients, colored borders on stat cards, button shine effects, breathing border glow on live feed
- **Logo & branding:** Local cropped logo, badge changed to "Vision of Param Namramuni Gurudev"
- **User location on map:** Blue pulsing dot + locate-me button

**Files:** `components/PhotoGallery.tsx`, `components/FoundationOfCare.tsx`, `components/VisionSection.tsx`, `components/ArhamYuvaSeva.tsx`, `components/DonateSection.tsx`, `index.css`, `pages/HomePage.tsx`

### Phase 4 — Premium Polish (Feb 8–9)

- **Navbar morph:** Header transitions from full-width solid bar to floating glass pill on scroll, using inline styles for smooth CSS transitions. Fixed jerk on scroll-back (margin: auto can't be animated)
- **Hero premium:** Count-up animations on stats (custom `useCountUp` hook), glassy card effects (`backdrop-blur-sm`), badge glow animation, accent gradient line, premium panel shadows
- **Donation widget:** Added to Hero map overlay (desktop only). Monthly (₹50/₹100) and one-time (₹100/₹500/₹1000) options with mutual exclusivity via TypeScript discriminated union state. Inline custom amount input. Shimmer donate button
- **Foundation of Care redesign:** Rewrote from accordion/bento to sticky scroll-driven storytelling. 300vh section, IntersectionObserver trigger zones, crossfade image transitions. Mobile: stacked cards with scroll-reveal
- **Gallery parallax:** Replaced CSS marquee with hybrid auto-scroll (30px/s) + scroll-driven parallax. Direct DOM manipulation via refs for 60fps. Row 1 left, Row 2 right. Direction-aware init offsets to center videos
- **SEVA text enhancement:** Split into 4 individual letter spans with staggered scroll-reveal, shimmer gradient, hover scale + drop-shadow glow, scroll-driven letter spacing
- **Map adjustments:** Center shifted to lat 26 for better India framing

**Files:** `components/Header.tsx`, `components/Hero.tsx`, `components/FoundationOfCare.tsx`, `components/PhotoGallery.tsx`, `hooks/useCountUp.ts`, `index.css`

---

## Environment & Deployment

### Required Environment Variables
```
ALWAYSCARE_API_TOKEN=<Bearer token for Always Care API>
```

### Build & Run
```bash
npm install        # Install dependencies
npm run dev        # Start dev server (Vite)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

### Netlify Config (`netlify.toml`)
```toml
[build]
  publish = "dist"
  command = "npm run build"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### External Dependencies (CDN in index.html)
- Leaflet CSS + JS (map rendering)
- Plus Jakarta Sans font (Google Fonts)
