# Lana Eve Photography

Static site for lanaevephotography.co.uk — plain HTML/CSS/JS, no build step, no framework. Deployed on Vercel and (test) Cloudflare Pages.

## Files

- `index.html` — the homepage
- `gallery-baby.html`, `gallery-cakesmash.html`, `gallery-family.html`, `gallery-twins.html`, `gallery-school.html`, `gallery-weddings.html`, `gallery-christmas.html` — a gallery for each of the seven session types, linked from the homepage service cards, each with a click-to-enlarge lightbox and a Back button. Photo counts vary per session (see below) — the grid and lightbox aren't hardcoded to 12.
- `backdrops.html` — **private, not linked anywhere on the site.** A numbered backdrop-chooser page for clients who've already booked — send them the link directly (e.g. in your booking confirmation). It's excluded from search engines too. See "Before you go live" below for the placeholder photos.
- `styles.css` — all styling
- `script.js` — mobile menu + gallery lightbox
- `images/` — homepage photos, plus a subfolder per session (`images/baby/`, `images/cakesmash/`, `images/family/`, `images/twins/`, `images/school/`, `images/weddings/`, `images/christmas/`) and `images/backdrops/` with 10 square backdrop swatches
- `Pics for Lana Eve Photography galleries/` — **gitignored, not deployed.** Full-resolution original photos (uncropped, straight off the camera) that the real gallery photos below were cropped/resized from. Keep this folder; it's the only copy.

## Before you go live

- Pricing is a table (not cards) on the homepage, with real prices for every session: Baby & Newborn £290, Cakesmash £200, Family £180, Twins £350, School £130, Weddings from £800, Christmas Sessions £150, and Christmas Mini Session £100 (a shorter/cheaper tier of the same Christmas session, shown as its own row rather than a separate service). Weddings keeps a "From" price and a "Get a quote" button instead of a flat price, since wedding pricing genuinely varies per booking.
- The contact form at the bottom doesn't send anywhere yet (`action="#"` in `index.html`). It needs a form backend — easiest options are Formspree or Vercel's own form handling — before it will actually deliver enquiries to Lana's inbox.
- **Gallery photos are real for all seven sessions now.** Baby (61 photos), Cakesmash (46), Family (33), Twins (13), School (34), Weddings (58), and Christmas (31) all show real photography, cropped to 4:5 and resized for web from the full-resolution originals in `Pics for Lana Eve Photography galleries/`. Every homepage service-card photo (`images/<session>-card.jpg`) is real too, hand-picked from that session's gallery. If an 8th service is ever added, it starts out with the same 12 gradient placeholder tiles style these all began with, in both the gallery and its card.
- **The 10 backdrop swatches on `backdrops.html` are placeholders too** (plain gradient squares, `images/backdrops/01.jpg`–`10.jpg`). Swap in real photos of your actual backdrops, same filenames, roughly square. Each one is numbered on the page itself so clients can just message you a number — no separate caption to edit.
