# Lana Eve Photography

Static site for lanaevephotography.co.uk — plain HTML/CSS/JS, no build step, no framework. Deployed on Vercel and (test) Cloudflare Pages.

## Files

- `index.html` — the homepage
- `gallery-baby.html`, `gallery-cakesmash.html`, `gallery-family.html` — full 10-photo galleries for each session type, linked from the homepage service cards, each with a click-to-enlarge lightbox
- `styles.css` — all styling
- `script.js` — mobile menu + gallery lightbox
- `images/` — homepage photos, plus `images/baby/`, `images/cakesmash/`, `images/family/` (10 each) for the galleries

## Before you go live

- Pricing cards still say `[Add your price]` in three places in `index.html` — search for that text and fill in real prices.
- The contact form at the bottom doesn't send anywhere yet (`action="#"` in `index.html`). It needs a form backend — easiest options are Formspree or Vercel's own form handling — before it will actually deliver enquiries to Lana's inbox.
- **The 36 gallery photos are placeholders** (soft gradient tiles labelled "Sample photo 01" etc.) — real photography hasn't been dropped in yet. To swap them in: replace the files in `images/baby/`, `images/cakesmash/`, `images/family/`, keeping the same names (`01.jpg` through `12.jpg` in each folder) and roughly the same 4:5 portrait shape, and the galleries pick them up automatically — no HTML changes needed. Fewer than 12 real photos for a session is fine; just delete the unused numbered files from that folder and remove the matching `<button>` blocks in that `gallery-*.html`.
