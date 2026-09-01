# Lana Eve Photography — project context

Static marketing site for a Kirkcaldy, Fife (Scotland) photographer offering
seven session types: Baby & Newborn, Cakesmash 'n' Splash, Family, Twins,
School, Weddings, and Christmas mini sessions. Read this before making
changes.

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
gallery-twins.html        12-photo gallery + lightbox, Twins
gallery-school.html       12-photo gallery + lightbox, School Sessions
gallery-weddings.html     12-photo gallery + lightbox, Weddings
gallery-christmas.html    12-photo gallery + lightbox, Christmas Sessions
backdrops.html            PRIVATE, unlisted backdrop chooser for booked
                          clients only — see "Private pages" below
styles.css                All styling for every page (one shared stylesheet)
script.js                 Mobile hamburger menu + gallery lightbox (vanilla JS)
images/                   Homepage photos: hero-photo.jpg, about-lana.jpg,
                          and one <session>-card.jpg (4:3) per service —
                          baby-card.jpg, cakesmash-card.jpg, family-card.jpg
                          are real photos; twins-card.jpg, school-card.jpg,
                          weddings-card.jpg, christmas-card.jpg are still
                          placeholders
images/<session>/01.jpg..12.jpg   12 gallery photos per session (4:5), one
                          subfolder per service: baby, cakesmash, family,
                          twins, school, weddings, christmas
images/backdrops/01.jpg..10.jpg   10 square (1:1) backdrop swatches used
                          only by backdrops.html
README.md                 Handover notes, incl. open TODOs also listed below
```

Every HTML page links the same `styles.css` and `script.js` — there is no
per-page stylesheet or script. New pages should follow the same pattern:
copy the header/footer markup from an existing page rather than inventing a
new nav. The seven gallery pages are generated from a consistent template
(same header/footer, breadcrumb + Back button, `.gallery-grid` of 12
`<button><img></button>` items, cross-links to the other six galleries at
the bottom) — if you add an 8th service later, follow that same shape
rather than improvising a new layout.

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
- **Grids that must not orphan a card**: `.four-col-grid` is still a CSS
  grid (`repeat(4, minmax(0,1fr))`) that jumps straight from 4 columns to
  2 to 1 at defined breakpoints — do NOT switch it to `auto-fit`/`minmax`,
  it leaves a lone card stranded on its own row at tablet widths. That was
  a real bug, fixed once already; don't reintroduce it.
- **`.three-col-grid` is flexbox, not CSS grid** — changed when the 7th
  service (Twins) made the card count stop being a multiple of 3. It's
  `display:flex; flex-wrap:wrap; justify-content:center` with each child
  sized to `calc((100% - 56px) / 3)` (3 per row, 28px gaps) so it still
  *looks* like a 3-column grid, but any remainder card centers itself on
  its own row at full card width instead of sitting left-aligned with
  empty space beside it, which is what a plain `grid-template-columns:
  repeat(3,...)` would do. At ≤900px each child goes to `flex-basis:100%`
  for the single-column stack (same visual result as before). It's used
  only inside the Services section now (Pricing switched to a table — see
  below), once per `.services-group` (see next bullet), so it never has
  to absorb all seven cards' remainder in one row.
- **Services are split into two `.services-group` blocks**, each with an
  `<span class="eyebrow">` label and its own `.three-col-grid`: "For
  Little Ones" (Baby, Cakesmash, Family, Twins — 4 cards) and "Milestones
  & Occasions" (School, Weddings, Christmas — 3 cards). This replaced one
  flat 7-card grid because seven same-shaped cards in a row read as messy
  and hard to scan. `.services-group .eyebrow { margin-bottom: 22px }`
  and `.services-group + .services-group { margin-top: ... }` handle the
  spacing — don't add margin directly to the cards or grid for this.
  Adding an 8th service means deciding which group it belongs to (or
  whether a third group is warranted) rather than defaulting to the end
  of one list.
- **Pricing is a `<table>` now, not cards** (`.pricing-table` inside
  `.pricing-table-wrap.card`) — seven near-identical pricing cards (most
  showing the same `[Add your price]` placeholder) read as far more
  repetitive than seven table rows do. Columns: Session, Duration,
  Images, Price, and a CTA cell ("Enquire →" / "Get a quote →" for
  Weddings). The "Private online gallery, digital delivery" line that
  used to repeat on every card was dropped — the section's existing lede
  paragraph already says sessions are all-inclusive and digitally
  delivered, so it doesn't need repeating seven times; there's also one
  shared `.pricing-note` below the table for the "home studio in
  Kirkcaldy" fact instead of repeating it per row. On mobile (≤700px) the
  table becomes stacked cards via the classic `data-label`/`::before`
  technique (`<thead>` is visually hidden, each `<td>` shows a small caps
  label except `.session-name`, which is the card's own heading and
  overrides back to `display:block` so it doesn't get pulled right by
  the row's `justify-content:space-between`). If you add an 8th service,
  add one `<tr>` — no card, no icon, no separate CSS.
- **Breakpoints**: 900px is the main nav/layout breakpoint (desktop nav
  links hide, hamburger appears, 3-col grids go to 1 col); 620px is the
  secondary mobile breakpoint (4-col "how it works" grid goes to 1 col).
- **Icons**: inline SVG only, stroke-based, one consistent style (stroke
  width 1.5, 24×24 viewBox, no fill except small accent dots), no icon
  font, no emoji. Each service card has one distinct icon: swaddled-baby
  outline (Baby), cake (Cakesmash), two people (Family), two small
  swaddled-baby bundles side by side (Twins — deliberately echoes the Baby
  icon at smaller scale rather than reusing Weddings' rings or Family's
  people shapes), graduation cap (School), interlocking rings (Weddings),
  simple 3-line snowflake (Christmas).
- **Mobile nav**: hamburger toggle is vanilla JS (`script.js`), toggling
  `.is-open` classes on `#nav-toggle` and `#mobile-menu` — no framework
  state, no external menu library. The nav is deliberately short —
  **Services / Pricing / About / Contact** — rather than one link per
  session; it used to link each session individually but that stopped
  scaling once there were six. Services (and their galleries) are reached
  via the cards in the `#services` section, not the top nav.
- **Gallery lightbox**: also vanilla JS in `script.js`, driven purely by
  the `<button>`/`<img>` markup inside `.gallery-grid` — works on any page
  that has both a `.gallery-grid` and a `#lightbox`. Keep new galleries
  consistent with this pattern instead of adding a lightbox library.
- **Gallery Back button**: `.gallery-topbar` holds a "← Back" link
  (`.gallery-back`, links to `index.html#services`) beside the breadcrumb.
  Keep both on new/edited gallery pages.
- **Backdrop grid**: `backdrops.html` reuses the gallery lightbox by giving
  its grid *both* `gallery-grid` and `backdrop-grid` classes — `script.js`
  only looks for `.gallery-grid`, and `.backdrop-grid`'s own rules (later
  in `styles.css`, so they win the cascade) switch it to a 1:1 square
  aspect ratio and a 5/3/2-column layout instead of the 4:5 portrait
  4/3/2/2 layout the session galleries use. Each swatch has a numbered
  `.backdrop-number` badge overlay (`position:absolute`, needs the button
  to be `position:relative`, which `.backdrop-grid button` sets) — the
  numbers are plain HTML text, not baked into the images, so they stay
  crisp and are what clients reference when messaging their pick. If you
  add more backdrop photos, keep filenames sequential (`11.jpg`, `12.jpg`,
  …) and add a matching numbered button block.

## Private pages (not linked from navigation)

- **`backdrops.html`** is a backdrop chooser for clients who have already
  booked — intentionally **not** linked from the homepage, nav, footer, or
  any gallery page. It's reached only by a direct URL that Lana shares
  herself (e.g. in a booking confirmation). It has
  `<meta name="robots" content="noindex, nofollow">` in its `<head>` so
  search engines don't index it either. It still uses the same
  header/footer/fonts as the rest of the site for consistent branding —
  "private" here means unlinked and unlisted, not a login-gated page;
  don't add real authentication to it unless asked.
- If asked to add another page like this (a proofing gallery, a private
  pricing page for a specific client, etc.), follow the same pattern:
  build it, don't link it from anywhere public, add the noindex meta tag,
  and document it in this section so it isn't mistaken for a dead/
  forgotten page later.

## Business facts (don't invent alternatives to these)

- Business: Lana Eve Photography, home studio in Kirkcaldy, Fife.
- Seven sessions: **Baby & Newborn Photos**, **Cakesmash 'n' Splash** (first
  birthday, mess-friendly, cake + splash), **Family Photos**, **Twins**
  (extra time built in for two, portraits together and individually),
  **School Sessions** (nursery/school portrait days), **Weddings**
  (documentary-style, custom-quoted — see below), **Christmas Sessions**
  (festive mini sessions).
- Contact: lana.astrupnielsen@googlemail.com, 07872 475731,
  @lana_eve_photography (Instagram), Lana Eve Photography (Facebook).
- Tone: warm, boutique, unhurried — "quiet, unhurried moments," "no
  rushing, no stiff poses." Keep new copy in this voice, not generic
  marketing filler.
- Real testimonials are already in `index.html` (Michelle Malcolm, An W.,
  Bobby Sword, Jordan Stark, Neil Williamson, Marin Dunsire) — don't
  paraphrase or invent new ones; only add reviews the user actually
  supplies verbatim.
- **Weddings pricing is intentionally different**: instead of a flat
  price + inclusions checklist like the other five, its pricing card shows
  "Custom pricing" and a short paragraph pointing to "Get a custom quote."
  Don't collapse it back into the flat-price format unless asked — weddings
  genuinely don't fit that model (variable hours, one vs. two photographers,
  album or not).

## Known open items (from the last handover — check before assuming done)

- **Pricing is unset for 6 of 7 sessions.** In the pricing table, Baby,
  Cakesmash, Family, Twins, School, and Christmas rows show
  `[Add your price]` in the Price column; Twins, School, and Christmas
  also show `[Session length]` / `[Number]` in the Duration/Images
  columns (their duration and image count were never specified, unlike
  Baby/Cakesmash/Family). Weddings shows "Custom pricing" by design (see
  above). Don't invent numbers — leave placeholders until the user gives
  real ones.
- **Contact form has no backend.** The form in `index.html` (`action="#"`)
  doesn't send anywhere yet. It needs a real backend (Formspree, or
  similar) wired up before it's live-usable. Its session dropdown already
  lists all seven options.
- **Gallery photos are placeholders — for all seven sessions.** All 84
  images under `images/<session>/` are generated gradient placeholder
  tiles labelled "Sample photo NN," not real photography (Baby, Cakesmash
  and Family were placeholders too until real photos were dropped in for
  their *card* image only — their *gallery* photos are still all
  placeholders). The four `-card.jpg` files for Twins, School, Weddings
  and Christmas are also still placeholders. When the user provides real
  photos, replace files in place keeping the same filenames (`01.jpg`–
  `12.jpg` per gallery folder, or `<session>-card.jpg` for the homepage
  card) — pages reference them by path and need no HTML changes. If fewer
  than 12 real photos exist for a session, delete the unused numbered
  files AND remove the matching `<button>` block in that `gallery-*.html`.
- **Domain is mid-transfer.** The domain is moving from Wix to Namecheap;
  DNS hasn't been pointed at the hosting provider yet. Don't assume a
  custom domain is live — the site is currently only reachable at its
  Vercel/Cloudflare Pages URLs.
- **Backdrop swatches are placeholders too.** All 10 images in
  `images/backdrops/` are generated plain gradient tiles (no session-style
  label baked in — the number badge in the HTML does that job instead).
  Swap them for real backdrop photos in place, same filenames (`01.jpg`–
  `10.jpg`), same 1:1 square shape works best. Add/remove numbered
  `<button>` blocks in `backdrops.html` to match however many real
  backdrops actually exist.

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
- Adding an 8th service? A service card (icon + copy + "View full
  gallery" + "Enquire" links) in whichever `.services-group` it belongs
  to under `#services` (or a new group, if it doesn't fit "For Little
  Ones" or "Milestones & Occasions"), one `<tr>` in the `#pricing` table,
  a `gallery-<slug>.html` page (12 placeholder photos, Back button,
  cross-links updated on *all* gallery pages, not just the new one), a
  new `<option>` in the contact form's session dropdown, and placeholder
  images generated in the same gradient-tile style so nothing looks
  broken before real photos exist. Both `.three-col-grid` and the pricing
  table already handle any card/row count gracefully — no CSS changes
  needed for the count itself, just the content.
