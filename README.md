# Lana Eve Photography

Static site for lanaevephotography.co.uk — plain HTML/CSS/JS, no build step, no framework. Deployed on Vercel and (test) Cloudflare Pages.

## Files

- `index.html` — the homepage
- `gallery-baby.html`, `gallery-cakesmash.html`, `gallery-family.html`, `gallery-school.html`, `gallery-weddings.html`, `gallery-christmas.html` — full 12-photo galleries for each of the six session types, linked from the homepage service cards, each with a click-to-enlarge lightbox and a Back button
- `styles.css` — all styling
- `script.js` — mobile menu + gallery lightbox
- `images/` — homepage photos, plus a subfolder per session (`images/baby/`, `images/cakesmash/`, `images/family/`, `images/school/`, `images/weddings/`, `images/christmas/`) with 12 gallery photos each

## Before you go live

- Pricing cards still say `[Add your price]` for five of the six sessions, plus `[Session length]` and `[Number]` placeholders for School Sessions and Christmas Sessions specifically (their duration/inclusions weren't specified yet). Weddings shows "Custom pricing" instead of a flat price/checklist, since wedding pricing is normally quoted per booking rather than fixed — search `index.html` for these and fill in real numbers.
- The contact form at the bottom doesn't send anywhere yet (`action="#"` in `index.html`). It needs a form backend — easiest options are Formspree or Vercel's own form handling — before it will actually deliver enquiries to Lana's inbox.
- **All 72 gallery photos are placeholders** (soft gradient tiles labelled "Sample photo 01" etc.) — real photography hasn't been dropped in yet, for any of the six sessions. To swap them in: replace the files in `images/<session>/`, keeping the same names (`01.jpg` through `12.jpg` in each folder) and roughly the same 4:5 portrait shape, and the galleries pick them up automatically — no HTML changes needed. The six homepage/service-card photos (`images/<session>-card.jpg`, 4:3 shape) are placeholders too, for School, Weddings and Christmas specifically — Baby, Cakesmash and Family already use real photos there. Fewer than 12 real photos for a session is fine; just delete the unused numbered files from that folder and remove the matching `<button>` blocks in that `gallery-*.html`.
