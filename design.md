# Codeleap — UI Redesign Design Brief

**Version:** 1.0  
**Date:** May 2026  
**Audience:** Stitch (mockup generation), frontend implementation  
**Reference:** SaaS landing page aesthetic (dark hero, light sections, blue/indigo accents, product mockup, integrations ring, pricing cards, testimonials)

---

## 1. Brand & Voice

| Attribute | Specification |
|-----------|---------------|
| **Product name** | Codeleap |
| **Tagline (hero)** | Master Coding Interviews · Crack Problems Faster · Land the Job |
| **One-liner** | A modern coding practice platform with curated problems, sheets, and a polished IDE experience. |
| **Tone** | Confident, developer-first, approachable — not corporate-stiff, not playful-childish |
| **Voice** | Short sentences. Action verbs. Avoid jargon unless speaking to engineers (e.g. "runtime", "test cases" are fine) |

**Positioning vs. current UI:**  
Replace the all-dark + neon-yellow (`#F4FF54`) hacker aesthetic with a **premium SaaS** look: dark navy hero band, white/light body sections, **blue/indigo** as primary CTA color. Yellow becomes a **secondary spark** accent (badges, highlights, "new" pills) — not the dominant brand color.

---

## 2. Design Principles

1. **Clarity over decoration** — Every section has one job; no competing gradients on the same viewport.
2. **Depth via layering** — Cards float on `surface-muted` backgrounds with soft shadows (`shadow-md` / `shadow-xl`), not heavy borders everywhere.
3. **Developer-grade polish** — Mono fonts for code, crisp tab bars, predictable hit targets (min 44×44px on touch).
4. **Rhythm** — Alternate section backgrounds: `hero-dark` → `surface` → `surface-muted` → `surface` → `hero-dark` (footer CTA) → `footer-dark`.
5. **Product-led marketing** — Hero and mid-page sections show **real UI chrome** (problem panel + editor + hint panel), not abstract illustrations.
6. **Accessible by default** — WCAG AA contrast on text; focus rings on all interactive elements.

---

## 3. Color Tokens

Use these exact values in Stitch and implementation (CSS variables recommended).

### 3.1 Core palette

| Token | Hex | Usage |
|-------|-----|--------|
| `ink-900` | `#0B1220` | Hero background, footer, Pro pricing card |
| `ink-800` | `#111827` | Dark panels, IDE dark mode chrome |
| `ink-700` | `#1F2937` | Secondary dark surfaces |
| `ink-500` | `#6B7280` | Muted body text on light |
| `ink-400` | `#9CA3AF` | Placeholders, captions |
| `surface` | `#FFFFFF` | Primary light background |
| `surface-muted` | `#F4F7FB` | Section alternates, card wells |
| `surface-subtle` | `#E8EEF7` | Hover states, input backgrounds |
| `border` | `#E5E7EB` | Card borders, dividers |
| `border-strong` | `#D1D5DB` | Focused inputs |

### 3.2 Brand accents

| Token | Hex | Usage |
|-------|-----|--------|
| `primary-600` | `#2563EB` | Primary buttons, links, active tabs |
| `primary-500` | `#3B82F6` | Hover on primary |
| `primary-400` | `#60A5FA` | Icons, rings, integration nodes |
| `gradient-hero` | `linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #4F46E5 100%)` | Hero glow, CTA cards |
| `gradient-card` | `linear-gradient(180deg, #DBEAFE 0%, #FFFFFF 40%)` | Testimonial card headers |
| `spark-400` | `#F4FF54` | Secondary accent — badges, streak, "popular" sparkle (use sparingly) |
| `spark-glow` | `0 0 24px rgba(244, 255, 84, 0.35)` | Optional glow on spark elements |

### 3.3 Semantic colors

| Token | Hex | Usage |
|-------|-----|--------|
| `success-600` | `#059669` | Accepted, Easy difficulty |
| `success-bg` | `#D1FAE5` | Easy pill background |
| `warning-600` | `#D97706` | Medium difficulty, WA |
| `warning-bg` | `#FEF3C7` | Medium pill background |
| `error-600` | `#DC2626` | Hard difficulty, errors |
| `error-bg` | `#FEE2E2` | Hard pill background |
| `info-600` | `#0284C7` | Info banners |

### 3.4 Dark mode (ProblemPage + optional global)

| Token | Hex | Usage |
|-------|-----|--------|
| `dm-bg` | `#0F1419` | Page background |
| `dm-surface` | `#18181B` | Panels, editor surround |
| `dm-border` | `#27272A` | Borders |
| `dm-text` | `#F4F4F5` | Primary text |
| `dm-muted` | `#A1A1AA` | Secondary text |
| `dm-primary` | `#3B82F6` | Active tab, primary actions |

---

## 4. Typography

| Role | Font | Weight | Size (desktop) | Line height |
|------|------|--------|----------------|-------------|
| **Display / H1** | Parkinsans | 700–800 | 56–72px | 1.05 |
| **H2 section** | Parkinsans | 700 | 40–48px | 1.15 |
| **H3 card** | Inter | 600 | 20–24px | 1.3 |
| **Body** | Inter | 400–500 | 16–18px | 1.6 |
| **Small / caption** | Inter | 400 | 13–14px | 1.5 |
| **Nav links** | Inter | 500 | 15px | 1 |
| **Code / mono** | JetBrains Mono | 400–500 | 13–14px | 1.5 |
| **Button** | Inter | 600 | 14–16px | 1 |

**Letter-spacing:** Display headlines `-0.02em`; buttons `0.01em` uppercase only for micro-labels (e.g. "MOST POPULAR").

**Stitch note:** Load Parkinsans + Inter + JetBrains Mono from Google Fonts.

---

## 5. Spacing & Grid

| Token | Value |
|-------|--------|
| Base unit | 8px |
| Section padding Y | 80px desktop / 48px mobile |
| Container max-width | 1200px (`max-w-7xl`) |
| Container padding X | 24px mobile / 40px tablet / 48px desktop |
| Grid | 12 columns, 24px gutter |
| Card radius | `16px` (`rounded-2xl`) |
| Button radius | `9999px` (pill) for marketing; `10px` for IDE/toolbar |
| Input radius | `10px` |
| Navbar height | 64px |
| ProblemPage top bar | 56px |

---

## 6. Core Components

### 6.1 Buttons

| Variant | Background | Text | Border | Height | Notes |
|---------|------------|------|--------|--------|-------|
| **Primary** | `primary-600` | white | none | 44px | Pill on marketing; slight shadow `0 4px 14px rgba(37,99,235,0.35)` |
| **Primary hover** | `primary-500` | white | — | — | — |
| **Secondary** | white | `ink-800` | `border` | 44px | "Watch demo", ghost CTAs |
| **Secondary hover** | `surface-muted` | — | `border-strong` | — | — |
| **Ghost** | transparent | `ink-700` | none | 40px | Nav, icon toolbars |
| **Dark CTA** | `ink-900` | white | none | 44px | Footer CTA inverse |
| **Spark** | `spark-400` | `ink-900` | none | 40px | Rare — streak badge, highlight chip |

**Disabled:** 50% opacity, no shadow, `cursor-not-allowed`.

### 6.2 Inputs

- Height: 44px; padding `12px 16px`
- Background: `surface` on light; `dm-surface` on dark
- Border: 1px `border`; focus: 2px ring `primary-400`
- Newsletter (footer): input + primary button inline, pill shape

### 6.3 Cards

- Background: `surface`
- Border: 1px `border` OR shadow-only (`0 4px 24px rgba(15,23,42,0.08)`)
- Padding: 24–32px
- Hover (clickable): `translateY(-2px)` + stronger shadow (150ms ease)

### 6.4 Pills / Chips

| Type | Example |
|------|---------|
| Difficulty Easy | `success-bg` + `success-600` text, `rounded-full`, px-3 py-1, text-xs font-semibold |
| Difficulty Medium | `warning-bg` + `warning-600` |
| Difficulty Hard | `error-bg` + `error-600` |
| Tag | `surface-subtle` + `ink-500`, no border |
| Status dot | 8px circle: green / amber / red beside test case tab |

### 6.5 Avatar pile (social proof)

- 4–5 overlapping circles, 32px, 2px white border
- Offset `-8px` margin-left per avatar after first
- Caption: "Join **10,000+** developers" — bold the number

### 6.6 Code block (marketing + problem examples)

- Background: `#F8FAFC` light / `#27272A` dark
- Border-radius: 12px
- Padding: 16px
- Font: JetBrains Mono 13px
- Optional top-right: copy icon button (ghost)

### 6.7 Pricing card

- White card + border; **Pro** card: `ink-900` bg, white text, `primary-400` checkmarks
- Badge: "Most Popular" — pill, `primary-600` bg, white text, above card (-12px offset)
- Price: 48px bold; "/month" 16px muted
- Feature list: check icon + 14px text, 12px gap between rows
- CTA full-width at bottom

### 6.8 Testimonial card

- Top 40%: `gradient-card` blue fade
- Quote: 16px italic or regular, `ink-700`
- Bottom: avatar 40px + name 14px semibold + role 13px muted
- Optional: 5 gold stars row above quote

### 6.9 Product mockup frame (hero)

- Outer: `rounded-2xl`, `shadow-2xl`, 1px `border`
- Three columns inside:
  - **Left 28%:** problem list / description (white)
  - **Center 44%:** Monaco-style editor (dark `#1E1E1E` or light `#FAFAFA`)
  - **Right 28%:** AI hint panel (`primary-600` header bar, white/light body, input at bottom)
- Window chrome: 3 dots top-left optional (mac style), subtle title bar `surface-muted`

---

## 7. Landing Page — Section-by-Section

**Page:** Home (`/`)  
**Global:** Light page background except hero + footer CTA band.

---

### 7.1 Navbar

**Purpose:** Persistent navigation; feels floating and premium.

| Property | Value |
|----------|--------|
| Position | Fixed top, `z-50`, centered container |
| Style | Pill bar: `surface` 90% opacity + `backdrop-blur-md`, `rounded-2xl`, shadow `0 8px 32px rgba(0,0,0,0.08)`, max-width 1100px |
| Height | 64px |
| Logo | Codeleap logo left, ~128×40px |
| Links (center) | Problems · Sheets · Pricing · FAQ · About — Inter 500, `ink-700`, hover `primary-600` |
| Right | "Sign In" ghost link + **Get Started** primary pill button |
| Auth state | Avatar dropdown replaces Sign In/Register when logged in |
| Mobile | Hamburger → full-width sheet below navbar, same links |

**Stitch prompt snippet:**  
> Floating white glass navbar, rounded 16px, logo left, 5 nav links center, Sign in + blue Get Started pill right.

---

### 7.2 Hero

**Purpose:** Convert visitors; show product immediately.

| Property | Value |
|----------|--------|
| Background | Full-width `ink-900` with soft `gradient-hero` orb top-right (blur 120px, 40% opacity) |
| Layout | Centered text block → CTAs → social proof → **large product mockup** (3-pane) |
| Min height | 90vh desktop / auto mobile |

**Content:**

- **Headline (H1):**  
  `Write Better Code.` (line 1)  
  `Fix Bugs Instantly.` (line 2, optional `primary-400` or white)  
  `Ship 10x Faster.` (line 3)  
  *Codeleap variant:*  
  `Master Coding Interviews.` / `Crack Problems Faster.` / `Land the Job.`

- **Subhead:** 18px, `ink-400` on dark (`#CBD5E1`), max-width 560px, centered:  
  *"Practice curated interview questions, run code instantly, and track progress — all in one beautiful workspace."*

- **CTAs:**  
  - Primary: "Get Started" → `/problems`  
  - Secondary: "Watch Demo" → outline white/20% border

- **Social proof row:** Avatar pile + "Join 10,000+ developers" + 5 stars + "4.9/5"

- **Product mockup:** See §6.9 — show realistic "Two Sum" problem, JS editor, right panel titled **"Ask Codeleap"** with sample hint message and input "Ask anything…"

**Stitch prompt snippet:**  
> Dark navy hero, large white headline 3 lines, blue gradient glow top right, two pill buttons, avatar stack, below a large rounded screenshot of a 3-column coding app with editor and blue AI sidebar.

---

### 7.3 Features — "The Fastest Way to Go From Idea to Offer"

**Purpose:** Explain core value with visual cards (matches reference mid-page).

| Property | Value |
|----------|--------|
| Background | `surface-muted` |
| Section title | H2 centered: "The Fastest Way to Go From Idea to Offer" |
| Subtitle | One line muted, max-width 600px centered |

**Layout:**

```
Row 1: [ Card A — 50% ] [ Card B — 50% ]   (gap 24px)
Row 2: [ Full-width blue panel — Code Explorations preview ]
```

**Card A — Smart Practice**
- Icon: code brackets in `primary-600` circle
- Title: "Curated Problem Sets"
- Body: Sheets organized by company, topic, and difficulty.
- Mini UI: list of 3 problems with difficulty pills

**Card B — Team / Community**
- Icon: users
- Title: "Learn With Peers"
- Body: Share solutions, discuss approaches (future-friendly copy).
- Mini UI: avatar row + comment snippet

**Full-width panel — "Code Explorations"**
- Background: `primary-600` or `gradient-hero`
- White text title: "See How Others Solved It"
- Embedded light card showing solution walkthrough + complexity tags `O(n)` `O(1)`

---

### 7.4 Why Developers Choose Codeleap

**Purpose:** Feature bullets + visual interest (radial diagram).

| Property | Value |
|----------|--------|
| Background | `surface` |
| Layout | 2 columns: 50/50 desktop, stack mobile |

**Left column:**
- H2: "Why Developers Choose Codeleap"
- 4 feature rows, each:
  - Icon in colored circle (blue, purple, green, orange)
  - Title 18px semibold
  - Description 15px muted
- Features:
  1. **Instant Code Execution** — Run against hidden tests in seconds.
  2. **Company-Tagged Problems** — FAANG-style curated lists.
  3. **Progress Tracking** — Heatmap, streaks, submission history.
  4. **Playlist Sheets** — Striver-style structured paths.

**Right column:**
- Radial / hub diagram: center Codeleap logo node, 6 orbiting tool icons (see §7.5 icons)
- Light `surface-muted` circle behind, subtle connecting lines

---

### 7.5 Integrations — "Works With Your Favorite Tools"

**Purpose:** Trust + ecosystem feel.

| Property | Value |
|----------|--------|
| Background | `surface-muted` |
| Title | H2 centered: "Works With Your Favorite Tools" |
| Subtitle | "Codeleap fits into the workflow you already use." |

**Visual:** Circular orbit layout — center logo, 8 nodes on ring:
- GitHub · Discord · VS Code · Google Sign-In · Monaco Editor · Judge0 · LeetCode-style import · Email notifications

Each node: 48px circle, white bg, brand icon, label below 12px.

---

### 7.6 Testimonials — "What Developers Are Saying"

**Purpose:** Social proof.

| Property | Value |
|----------|--------|
| Background | `surface` |
| Layout | 3 equal cards, grid, gap 24px |

**Per card:**
- Top gradient blue header area (empty or quote marks)
- Quote text (2–3 sentences)
- 5 stars gold
- Avatar + Name + Role (e.g. "Software Engineer @ Google")

**Sample quotes (placeholder):**
1. "Codeleap's IDE feels premium. I switched from spreadsheets to daily practice here."
2. "The problem sheets mirror real interview loops. Landed offers after 6 weeks."
3. "Clean UI, fast runs, no clutter. Exactly what I wanted from a LeetCode alternative."

---

### 7.7 Pricing — "Simple, Transparent Pricing"

**Purpose:** Monetization clarity (replaces orange gradient cards).

| Property | Value |
|----------|--------|
| Background | `surface-muted` |
| Title | H2: "Simple, Transparent Pricing" |
| Subtitle | "Start free. Upgrade when you're serious." |
| Toggle | Optional Monthly / Annual pill (annual shows "Save 20%") |

**Three cards:**

| Plan | Price | Highlight | CTA |
|------|-------|-----------|-----|
| **Starter** | $0/mo | White card | "Sign up free" secondary |
| **Pro** | $12/mo | Dark `ink-900` card, "Most Popular" badge | "Start Pro" primary blue |
| **Team** | $29/mo | White card | "Contact sales" outline |

**Feature bullets (checkmarks):**
- Starter: Public problems, 5 submissions/day, community, 1 playlist
- Pro: Unlimited submissions, all sheets, solutions (when available), priority runners
- Team: Admin dashboard, team progress, custom sheets, SSO (coming soon)

---

### 7.8 Final CTA

**Purpose:** Last conversion push before footer.

| Property | Value |
|----------|--------|
| Container | Large `rounded-3xl` card inside section |
| Background | `gradient-hero` with white text |
| Headline | "Practice Faster. Solve Smarter. Win Interviews." |
| Sub | One line muted white/80% |
| Buttons | Get Started (white bg, blue text) + View Problems (outline white) |

---

### 7.9 Footer

**Purpose:** Navigation, newsletter, legal.

| Property | Value |
|----------|--------|
| Background | `ink-900` |
| Text | White / `ink-400` links |

**Columns:**
1. Logo + 2-line description
2. **Product:** Problems, Sheets, Pricing, FAQ
3. **Company:** About, Blog (optional), Careers (optional)
4. **Legal:** Privacy, Terms
5. **Newsletter:** "Stay in the loop" + email input + Subscribe button

**Bottom bar:** © 2026 Codeleap · social icons (X, GitHub, Discord, LinkedIn)

---

## 8. Problem Page (IDE) — Full Chrome Redesign

**Route:** `/problems/:id`  
**File reference:** `FRONTEND/src/pages/ProblemPage.jsx`  
**Keep:** Resizable 3-zone layout (left description | right editor + bottom tests), Monaco editor, existing API/stores.  
**Change:** All visual chrome to match SaaS design system.

---

### 8.1 Page shell

| Property | Light mode | Dark mode |
|----------|------------|-----------|
| Page bg | `#F1F5F9` (slate-100) | `dm-bg` |
| Panel bg | `surface` | `dm-surface` |
| Panel border | `border` 1px + soft shadow | `dm-border` |
| Panel radius | 12px | 12px |
| Gap between panels | 8px padding around split container | same |

---

### 8.2 Top bar (56px)

```
[ ← Problem List ] [ < ] [ > ] [ shuffle ]     [ Submit — primary ]     [ streak ] [ gems ] [ theme ] [ avatar ]
```

| Element | Spec |
|---------|------|
| Background | `surface` light / `dm-surface` dark, bottom border `border` |
| Breadcrumb | "Problem List" link → `/problems`, Inter 500, hover `primary-600` |
| Nav icons | Ghost 36×36, `ink-500` icons |
| **Submit** | Center or right-aligned `primary-600` pill, Play icon, **not amber** |
| Streak/gems | Small pills: icon + count, `surface-subtle` bg |
| Theme toggle | Sun/Moon ghost button |
| Avatar | 32px circle, ring `border` |

**Remove:** Heavy gray page chrome; yellow active tab accents → replace with `primary-600`.

---

### 8.3 Left panel — Problem content (~42% default width)

**Tab bar:**
- Tabs: Description | Solutions (lock icon, disabled) | Submissions
- Active: `primary-600` text + 2px bottom border `primary-600`
- Inactive: `ink-500`, hover `ink-700`
- Height: 48px; padding horizontal 20px per tab

**Content area (scrollable):**
- Title: 22px Parkinsans bold
- Meta row: Difficulty pill + Tag chips + Companies + Hints (ghost chips with icons)
- Description: Inter 15px, `ink-700`, prose spacing
- Examples: Card per example — labeled Input/Output, mono block, copy button
- Constraints: Card with left border 3px `primary-400`, mono text

**Submissions tab:** Table/list — status pill, language, time ago, runtime; row hover `surface-muted`

---

### 8.4 Vertical resizer

- Width: 4px hit area (16px touch)
- Default: transparent
- Hover/drag: `primary-400` 2px visible line
- Cursor: `col-resize`

---

### 8.5 Right stack — Editor + Test cases

**Editor section (~55% height default):**

**Toolbar (44px):**
- Left: Language dropdown (JS, Python, C++, Java…) — bordered select, `rounded-lg`
- Icons: menu, copy, debug, format, fullscreen — ghost 32px
- Right: **Run** — outline button; loading spinner inline when executing

**Editor body:**
- Monaco theme light: `#FAFAFA` bg; dark: `#18181B` (existing "black" theme OK)
- Font 14px JetBrains Mono
- No minimap

**Horizontal resizer:** Same as vertical, `row-resize`, 4px

**Bottom section — Test cases / Results:**

**Tab bar:** Test Cases | Submission Results (same tab style as left panel)

**Test Cases view:**
- Horizontal scroll row of case chips: "Case 1", "Case 2"…
- Active chip: `primary-600` bg white text (light) / `primary-500` (dark)
- Inactive: `surface-subtle`
- Input/Expected output: labeled mono blocks in cards

**Results view:**
- Summary banner: Accepted (green) / Wrong Answer (amber) / etc.
- Per-case rows: icon + case # + status + runtime ms + memory KB
- Progress-style bars for runtime vs limit (optional)

---

### 8.6 States & feedback

| State | Treatment |
|-------|-----------|
| Loading problem | Centered spinner `primary-600`, "Loading problem…" |
| Running code | Run button disabled + spinner; optional thin progress bar under toolbar |
| Cooldown | Submit/Run disabled, tooltip "Wait Xs" |
| Copy code | Toast: "Code copied" (bottom center, dark pill) |

---

### 8.7 Problem Page — Stitch prompt (single block)

> Design a LeetCode-style coding workspace for "Codeleap". Light gray page background. Top bar: breadcrumb, nav arrows, blue Submit button, user avatar. Left white card: tabs Description/Submissions, problem title, green Easy pill, examples in gray code blocks. Right side split vertically: top is code editor with language dropdown and Run button, bottom is test cases with Case 1/2 chips and input/output. Thin blue resize handles between panels. Modern SaaS aesthetic, Inter font, blue #2563EB accents, 12px rounded panels, subtle shadows. Optional dark mode variant with #18181B panels.

---

## 9. Secondary Pages (Brief Restyle Notes)

Apply design tokens consistently. Do not redesign information architecture.

### 9.1 Problems list (`/problems`)

- Page title H1 + search/filter bar in white card
- Table/cards: title, difficulty pill, acceptance %, status (solved/check)
- Filters: difficulty multi-select, tags chips, sort dropdown
- Background: `surface-muted`; rows `surface` with hover shadow

### 9.2 Playlists / Sheets (`/playlists`, `/playlists/:id`)

- Grid of sheet cards with progress ring, problem count, "Continue" CTA
- Detail page: ordered problem list with checkmarks for completed

### 9.3 Pricing (`/Pricing`)

- Match §7.7 exactly; remove orange-yellow gradients

### 9.4 Auth — Login / Sign Up

- Split layout: left 50% form on `surface`, right 50% `gradient-hero` with product screenshot or pattern
- Form: email, password, primary CTA, OAuth buttons (Google) as outline pills
- Remove heavy dark-only auth if present; support light default

### 9.5 Profile

- Header card: avatar, name, stats (solved, streak, rank)
- Tabs: Submissions, Heatmap (GitHub-style), Settings
- Cards on `surface-muted` background

### 9.6 FAQ & About

- FAQ: accordion items, white cards, `primary-600` chevron
- About: simple hero + team/story + values grid

### 9.7 Navbar visibility

- **ProblemPage:** Optional minimal navbar OR top bar only (current pattern — no marketing navbar)
- **All other app pages:** Use §7.1 navbar

---

## 10. Motion & Micro-interactions

| Element | Animation |
|---------|-----------|
| Page load (marketing) | Fade up 20px, 400ms ease-out, stagger children 80ms |
| Navbar | Slide down on first load only |
| Cards hover | `translateY(-2px)`, shadow increase, 150ms |
| Buttons | Scale 1.02 on hover, 100ms |
| Tab switch | Underline slide 200ms |
| Modal | Fade + scale 0.95→1, 200ms |
| Toast | Slide up from bottom, 300ms |
| Resizer drag | No animation (1:1 follow cursor) |

**Avoid:** Excessive spring bounce, blinking yellow glows, dot-grid backgrounds on entire site.

---

## 11. Imagery & Illustration

| Use | Guidance |
|-----|----------|
| Hero mockup | Real UI screenshot or high-fidelity HTML frame — not generic stock photos |
| Feature cards | Cropped UI snippets (editor, leaderboard, playlist) |
| Icons | Lucide-style outline icons, 20–24px, stroke 1.5 |
| Photography | Avoid unless testimonial avatars (real or realistic placeholders) |
| Logo | Existing `codeleaplogo.webp` — may need light-background variant for navbar |
| Peerlist / third-party badges | Move to footer or press row; not hero center |

---

## 12. Accessibility

- Text contrast: minimum 4.5:1 body, 3:1 large text
- Focus visible: 2px `primary-400` ring, offset 2px
- Keyboard: all tabs, buttons, resizers operable (resizers: provide reset layout button)
- `aria-label` on icon-only buttons
- Don't rely on color alone for difficulty — include text label
- Reduced motion: respect `prefers-reduced-motion` — disable hero stagger

---

## 13. Implementation Mapping (for dev handoff)

| Current file | Redesign scope |
|--------------|----------------|
| `FRONTEND/src/components/navbar.jsx` | §7.1 light glass navbar |
| `FRONTEND/src/components/Hero.jsx` | §7.2 dark hero + product mockup |
| `FRONTEND/src/components/FeatureGrid.jsx` | §7.3 feature cards |
| `FRONTEND/src/components/whyUs.jsx` | §7.4 why + radial diagram |
| New: `IntegrationsSection.jsx` | §7.5 |
| `FRONTEND/src/pages/Reviews.jsx` | §7.6 testimonials |
| `FRONTEND/src/pages/Pricing.jsx` | §7.7 |
| New: `FinalCTA.jsx` | §7.8 |
| `FRONTEND/src/components/Footer.jsx` | §7.9 dark footer |
| `FRONTEND/src/pages/ProblemPage.jsx` | §8 full chrome |
| `FRONTEND/src/index.css` | CSS variables from §3 |

---

## 14. Stitch Usage Guide

**How to use this file:**

1. **Full landing page:** Feed §7.1–7.9 sequentially in one Stitch project; attach reference screenshot if available.
2. **Single section:** Copy the "Stitch prompt snippet" under each section for isolated frames.
3. **Problem page:** Use §8.7 single-block prompt + §8 wireframe tables.
4. **Consistency:** Always specify `primary-600` `#2563EB`, Parkinsans headlines, Inter body, 1200px container.
5. **Variants:** Request "light" and "dark" frames for ProblemPage only.

**Export targets from Stitch:** Desktop 1440×900 primary; mobile 390×844 for hero + navbar + ProblemPage stacked layout.

---

## 15. Reference Comparison

| Aspect | Current Codeleap | New direction |
|--------|------------------|---------------|
| Dominant bg | Black / dark gray | White + navy hero bands |
| Accent | `#F4FF54` yellow everywhere | `#2563EB` blue primary, yellow spark only |
| Navbar | Black glass fixed | White glass pill |
| Hero | Dot grid + yellow gradient text | Navy + product mockup |
| Pricing | Orange-yellow gradients | White/dark cards, blue checks |
| ProblemPage | Amber submit, yellow tabs | Blue submit, blue active tabs |
| Vibe | Hackathon / neon | SaaS / Vercel-Linear hybrid |

---

*End of design brief — Codeleap UI Redesign v1.0*
