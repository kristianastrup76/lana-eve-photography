# Lana Eve Photography — project context

Static marketing site for a home-studio baby/newborn, cake smash, and family
photographer in Kirkcaldy, Fife, Scotland. Read this before making changes.

## Stack — deliberately minimal

Plain HTML, CSS, and vanilla JS. **No framework, no bundler, no build step,
no package.json, no npm dependencies.** Every page is a complete, static
file that works by just opening it in a browser or dropping it on any static
host. Keep it that way — do not introduce React/Vue/Tailwind/a bundler/a CSS
preprocessor without being explicitly asked. If a task seems to need a build
step, look for a plain-CSS/JS way to do it first.

## File structure

```
index.html               Homepage: nav, hero, services, pricing, how-it-works,
                          about, testimonials, contact, footer
gallery-baby.html         12-photo gallery + lightbox, Baby & Newborn session
gallery-cakesmash.html    12-photo gallery + lightbox, Cakesmash 'n' Splash session
gallery-family.html       12-photo gallery + lightbox, Family session
styles.css                All styling for every page (one shared stylesheet)
script.js                 Mobile hamburger menu + gallery lightbox (vanilla JS)
images/                   Homepage photos (hero-photo.jpg, about-lana.jpg,
                          baby-card.jpg, cakesmash-card.jpg, family-card.jpg)
images/baby/01.jpg..12.jpg        Gallery photos per session (see below)
images/cakesmash/01.jpg..12.jpg
images/family/01.jpg..12.jpg
README.md                 Handover notes, incl. open TODOs also listed below
```

Every HTML page links the same `styles.css` and `script.js` — there is no
per-page stylesheet or script. New pages should follow the same pattern:
copy the header/footer markup from an existing page rather than inventing a
new nav.

## Design system

- **Colors** (defined as CSS custom properties at the top of `styles.css`,
  under `:root`): `--accent: #b6553c` (terracotta), `--ink: #3a2b23`,
  `--ink-soft: #33251d`, `--body-text: #5c4a3d`, `--muted: #6b5546`,
  `--cream: #fbf5ef` (page background), `--tan: #f4e5d8` (alternating
  section background), `--card-bg: #fffdfb`, `--border: #efe2d6`,
  `--field-border: #e6d5c6`. Use these tokens, don't hardcode new hex values
  for things that already have a token.
- **Type**: Cormorant Garamond (serif, headings + italic accents) paired
  with Jost (sans, body/UI), both loaded from Google Fonts in each page's
  `<head>`. Headings use Cormorant Garamond at weight 500; body copy is
  Jost.
- **Layout**: `.container` caps content at 1180px with responsive side
  padding via `clamp()`. Cards use `.card` (white background, 1px border,
  18px radius). Buttons are `.btn-primary` (solid pill, accent background)
  and `.btn-secondary` (text link with icon).
- **Grids that must not orphan a card**: `.three-col-grid` and
  `.four-col-grid` jump straight from full columns to a single (or 2-col)
  stack at defined breakpoints — do NOT go back to `auto-fit`/`minmax` for
  a 3- or 4-item grid, it leaves a lone card stranded on its own row at
  tablet widths. This was a real bug, fixed once already; don't reintroduce
  it.
- **Breakpoints**: 900px is the main nav/layout breakpoint (desktop nav
  links hide, hamburger appears, 3-col grids go to 1 col); 620px is the
  secondary mobile breakpoint (4-col "how it works" grid goes to 1 col).
- **Icons**: inline SVG only, stroke-based, no icon font, no emoji.
- **Mobile nav**: hamburger toggle is vanilla JS (`script.js`), toggling
  `.is-open` classes on `#nav-toggle` and `#mobile-menu` — no framework
  state, no external menu library.
- **Gallery lightbox**: also vanilla JS in `script.js`, driven purely by
  the `<button>`/`<img>` markup inside `.gallery-grid` — works on any page
  that has both a `.gallery-grid` and a `#lightbox`. Keep new galleries
  consistent with this pattern instead of adding a lightbox library.

## Business facts (don't invent alternatives to these)

- Business: Lana Eve Photography, home studio in Kirkcaldy, Fife.
- Three sessions only: **Baby & Newborn Photos**, **Cakesmash 'n' Splash**
  (first birthday, mess-friendly, cake + splash), **Family Photos**.
- Contact: lana.astrupnielsen@googlemail.com, 07872 475731,
  @lana_eve_photography (Instagram), Lana Eve Photography (Facebook).
- Tone: warm, boutique, unhurried — "quiet, unhurried moments," "no
  rushing, no stiff poses." Keep new copy in this voice, not generic
  marketing filler.
- Real testimonials are already in `index.html` (Michelle Malcolm, An W.,
  Bobby Sword, Jordan Stark, Neil Williamson, Marin Dunsire) — don't
  paraphrase or invent new ones; only add reviews the user actually
  supplies verbatim.

## Known open items (from the last handover — check before assuming done)

- **Pricing is unset.** All three pricing cards in `index.html` show
  `[Add your price]` as a bracketed placeholder. Don't invent a number —
  leave the placeholder until the user gives a real price.
- **Contact form has no backend.** The form in `index.html` (`action="#"`)
  doesn't send anywhere yet. It needs a real backend (Formspree, or
  similar) wired up before it's live-usable.
- **Gallery photos are placeholders.** All 36 images under `images/baby/`,
  `images/cakesmash/`, `images/family/` are generated gradient placeholder
  tiles labelled "Sample photo NN," not real photography. When the user
  provides real photos, replace files in place keeping the same filenames
  (`01.jpg`–`12.jpg` per folder) — the gallery pages reference them by
  path and need no HTML changes. If fewer than 12 real photos exist for a
  session, delete the unused numbered files AND remove the matching
  `<button>` block in that `gallery-*.html`.
- **Domain is mid-transfer.** The domain is moving from Wix to Namecheap;
  DNS hasn't been pointed at the hosting provider yet. Don't assume a
  custom domain is live — the site is currently only reachable at its
  Vercel/Cloudflare Pages URLs.

## Deployment

- Source of truth is the GitHub repo `kristianastrup76/lana-eve-photography`
  (`main` branch). No CI config, no build step — both hosts deploy the
  repo as-is.
- **Vercel** and **Cloudflare Pages** are both connected to the same repo
  and both auto-deploy on push to `main` (Cloudflare is currently a test
  deployment running alongside Vercel, not yet the final choice).
- Framework preset on both: none / static. Build command: none. Output
  directory: repo root (`/`).
- Because two hosts deploy from the same push, a change that looks fine
  on one can still be checked on the other before calling it done.

## Working conventions

- Keep changes targeted: when asked for a small edit (copy, a color, one
  section), change only that — don't restyle or "improve" untouched
  sections.
- Check responsive behavior (roughly 1440px, 834px, 390px widths) before
  considering a layout change finished — this project has already had
  real bugs at tablet widths that only showed up at in-between sizes.
- Real content only: no lorem ipsum, no fabricated prices/addresses/facts
  — use a bracketed placeholder like `[Add your price]` for anything the
  user hasn't supplied yet, matching the existing placeholder style.
