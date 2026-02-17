# Kreativwerkstatt — Project Context

## Overview
Static HTML website for **Kreativgården Sydals** — an open creative workshop for children and families in southern Denmark (Lysabild). Originally extracted from a React app (Medienhafen), now pure vanilla HTML/CSS/JS with no build tools.

- **Domain**: `basteln.kreativ.schule` (GitHub Pages via CNAME)
- **Repo**: `Gerber-Media/kreativwerkstatt` on GitHub (SSH)
- **Branch**: `main`
- **Hosting**: GitHub Pages with custom domain + HTTPS

## Tech Stack
- **Pure HTML/CSS/JS** — no frameworks, no build step
- **Trilingual**: German (DE, default), English (EN), Danish (DA)
- **Fonts**: Self-hosted Quicksand (WOFF2 + TTF fallback) in `fonts/`
- **No cookies** — only `localStorage` for language preference (`kreativwerkstatt_lang`)
- **GDPR compliant** — no Google Fonts CDN, no tracking, no analytics

## File Structure

```
├── index.html          # Main landing page (single-page with sections)
├── cookies.html        # Cookie & Storage Policy (trilingual, noindex)
├── datenschutz.html    # Privacy Policy / Datenschutz (trilingual, noindex)
├── impressum.html      # Imprint / Legal notice (trilingual, noindex)
├── style.css           # All styles, responsive, WCAG AA compliant
├── i18n.js             # Main page i18n + burger menu + music player logic
├── legal.js            # Legal pages i18n (separate from main i18n)
├── sitemap.xml         # Sitemap for Google
├── robots.txt          # Crawl rules + sitemap reference
├── CNAME               # basteln.kreativ.schule
├── fonts/
│   ├── quicksand-{400,500,600,700}.woff2   # Primary (small)
│   └── quicksand-{400,500,600,700}.ttf     # Fallback
├── audio/
│   └── ambient.mp3     # Background music (~5.5MB, royalty-free)
└── img/
    ├── logo.png        # Site logo/favicon
    ├── workshop-lake.jpg   # Hero image (OG image)
    └── workshop-fox.jpg    # About section image
```

## i18n Architecture

### Main page (`index.html` + `i18n.js`)
- Uses `data-i18n="key"` attributes on HTML elements
- `translations` object in `i18n.js` with keys for `de`, `en`, `da`
- `detectLang()`: checks `localStorage` → `navigator.languages` → fallback `de`
- `setLang(lang)`: updates all `data-i18n` elements, alt texts, share links, lang switcher, Danish notice, player labels
- Music player wraps `setLang` via `origSetLang` pattern to update player aria-labels on language change

### Legal pages (`cookies/datenschutz/impressum.html` + `legal.js`)
- Each page has 3 `<article>` blocks: `id="content-de"`, `id="content-en"`, `id="content-da"`
- `legal.js` toggles `hidden` attribute to show the correct language
- Footer uses `data-legal-i18n="key"` attributes (separate from main page `data-i18n`)
- Same `detectLang()` logic as main page

## Key Design Decisions
- **Accent color**: `#cb155e` (pink/magenta from freilernen.dk)
- **Text tertiary**: `#767676` (WCAG AA compliant, was #999)
- **Touch targets**: min 44×44px (lang buttons, player button)
- **Sticky header**: `position: sticky` — requires parent `overflow-x: clip` (NOT `hidden`!)
- **External link indicator**: CSS `a[target="_blank"]::after { content: " ↗"; }` 
- **Music player**: flat 44×44px button, `role="switch"`, SVG play/pause/EQ icons, `preload="none"`, volume 0.3, EQ animation with `prefers-reduced-motion` support
- **No cookie banner needed** — site uses zero cookies

## SEO Features
- JSON-LD: `Event` with `Schedule` (recurring Wednesday workshop)
- Open Graph + Twitter Cards with absolute image URLs
- Canonical URLs on all pages → `basteln.kreativ.schule`
- `sitemap.xml` + `robots.txt`
- Legal pages are `noindex, follow`
- `meta description` on every page
- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`

## Accessibility (WCAG 2.1 AA)
- Skip link on every page
- ARIA: `aria-pressed`, `aria-expanded`, `aria-live="polite"`, `aria-label`, `role="switch"`, `role="group"`
- `.sr-only` utility class for screen-reader-only text
- Color contrast ratios meet AA
- Burger menu: closes on anchor click, focus management
- `prefers-reduced-motion`: disables EQ animation

## Contact Info (in legal pages)
- **Email**: hallo@kreativ.schule
- **Phone**: +49 176 81928820
- **Address**: Nedervej 12, 6470 Lysabild, Denmark
- **CVR**: 46109562
- **Telegram**: https://t.me/+BkaxBXB3HuBhMjM0

## External Links in Footer
- freilernen.dk
- kreativ.schule

## Known Considerations
- JS-based i18n means Google primarily sees German content (acceptable for target audience)
- `ambient.mp3` is 5.5MB — could be compressed further if bandwidth is a concern
- Google Maps iframe on index.html requires GDPR disclosure (already in Datenschutz section 5 and Cookies page)
