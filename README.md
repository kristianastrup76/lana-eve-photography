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

- Pricing is now a table (not cards) on the homepage — one row per session. Six of the seven rows still say `[Add your price]` in the Price column, plus `[Session length]` and `[Number]` placeholders in the Duration/Images columns for Twins, School Sessions and Christmas Sessions specifically (their duration/inclusions weren't specified yet). Weddings shows "Custom pricing" instead of a flat price, since wedding pricing is normally quoted per booking rather than fixed — search `index.html` for these and fill in real numbers.
- The contact form at the bottom doesn't send anywhere yet (`action="#"` in `index.html`). It needs a form backend — easiest options are Formspree or Vercel's own form handling — before it will actually deliver enquiries to Lana's inbox.
- **Gallery photos are real for five sessions; Weddings and Christmas still need photos.** Baby (61 photos), Cakesmash (46), Family (33), School (34), and Twins (14) now show real photography, cropped to 4:5 and resized for web from the full-resolution originals in `Pics for Lana Eve Photography galleries/`. `images/weddings/` and `images/christmas/` are still the original 12 gradient placeholder tiles each ("Sample photo 01" etc.) — to swap them in, replace the files in `images/<session>/` (any count is fine, doesn't need to be 12) and add/remove `<button>` blocks in that `gallery-*.html` to match. The homepage/service-card photos (`images/<session>-card.jpg`, 4:3 shape) are placeholders too, for Twins, School, Weddings and Christmas specifically — Baby, Cakesmash and Family already use real photos there.
- **The 10 backdrop swatches on `backdrops.html` are placeholders too** (plain gradient squares, `images/backdrops/01.jpg`–`10.jpg`). Swap in real photos of your actual backdrops, same filenames, roughly square. Each one is numbered on the page itself so clients can just message you a number — no separate caption to edit.
