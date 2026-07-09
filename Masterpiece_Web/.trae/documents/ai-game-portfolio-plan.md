# AI Game Portfolio Website — Implementation Plan

## Summary
Build a dark, futuristic multi-page static website (HTML/CSS/JS) to showcase 3–4 AI game projects. No frameworks or build tools — pure vanilla stack for maximum simplicity and portability.

## Current State
- Empty workspace — greenfield project, no existing files.

## Design Direction
- **Theme**: Dark, futuristic, tech-AI aesthetic
- **Palette**: Deep blacks/dark grays as base, neon cyan/electric blue accents, subtle purple highlights
- **Typography**: Distinctive display font (e.g. Orbitron or Exo 2 for headings) + clean sans-serif for body (e.g. Rajdhani or Source Sans)
- **Layout**: Top navigation bar with glowing accent, card-based project grid, asymmetric hero sections
- **Effects**: CSS glow effects, subtle grid/matrix background patterns, smooth scroll, hover animations on cards, particle-like decorative elements via CSS

## Architecture

### Tech Stack
- HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- No build tools, no dependencies
- Google Fonts for typography

### File Structure
```
Masterpiece_Web/
├── index.html          # Home page
├── projects.html       # Projects gallery page
├── about.html          # About page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Single shared stylesheet (CSS custom properties for theming)
├── js/
│   └── main.js         # Shared JS (nav toggle, scroll effects, animations)
└── assets/
    └── images/         # Project screenshots/thumbnails (placeholder)
```

### Routes
| Route | Page | Content |
|-------|------|---------|
| `/` or `index.html` | Home | Hero with animated intro, tagline, featured projects preview, CTA |
| `projects.html` | Projects | Full grid of 3–4 AI game project cards with descriptions, tech tags, links |
| `about.html` | About | Bio, skills/tools, journey with AI game dev |
| `contact.html` | Contact | Contact form (front-end only) + social links |

## Implementation Steps

### Step 1: Create `css/style.css`
- CSS custom properties for the dark/futuristic color scheme
- Base reset & typography (Google Fonts import)
- Navigation bar (fixed, glassmorphism style)
- Hero section styles
- Project card grid (CSS Grid)
- About page layout
- Contact form styling
- Responsive breakpoints (mobile-first adaptations)
- Animations: glow effects, hover transitions, fade-in on scroll
- Background effects (subtle grid pattern, gradient overlays)

### Step 2: Create `js/main.js`
- Mobile nav hamburger toggle
- Scroll-triggered fade-in animations (IntersectionObserver)
- Active nav link highlighting based on current page
- Smooth scroll for anchor links
- Contact form front-end validation (basic)

### Step 3: Create `index.html` (Home Page)
- Fixed top nav with links to all pages
- Hero section: large animated title, subtitle about AI games, CTA button
- Featured projects preview (2 cards)
- Brief intro/about snippet
- Footer with social links

### Step 4: Create `projects.html` (Projects Page)
- Same nav + footer
- Page header
- Project grid with 4 cards, each containing:
  - Placeholder image area
  - Project name, description, tech tags
  - "View Project" / "Learn More" link
- Placeholder project data for AI games (e.g. "Neural Maze", "AI Dungeon Master", "Pixel Synth", "Cognitive Clash")

### Step 5: Create `about.html` (About Page)
- Same nav + footer
- Profile/bio section
- Skills/tools grid (AI, game engines, programming languages)
- Journey/timeline section

### Step 6: Create `contact.html` (Contact Page)
- Same nav + footer
- Contact form (name, email, message) with front-end validation
- Social media links / email

### Step 7: Create placeholder images
- Generate placeholder project thumbnails using CSS gradients (no external images needed)
- Or use simple SVG/CSS art for project cards

## Assumptions & Decisions
- **No backend**: Contact form is front-end only (no actual submission)
- **Placeholder content**: Project names and descriptions are sample data — user will replace with real projects
- **No images directory**: Use CSS-generated visuals instead of requiring image assets
- **Single CSS file**: All styles in one file with CSS custom properties for easy theming
- **Desktop-first**: Primary layout for desktop, responsive down to mobile

## Verification
1. Open `index.html` in browser — verify dark futuristic theme loads correctly
2. Navigate to each page via nav bar — all links work
3. Resize browser — responsive layout adapts at mobile breakpoints
4. Hover over project cards — animations trigger
5. Scroll pages — fade-in animations and sticky nav work
6. Submit contact form — validation messages appear for empty fields
