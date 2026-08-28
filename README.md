# Lana Eve Photography

Static site for lanaevephotography.co.uk — plain HTML/CSS/JS, no build step, no framework. Ready to deploy on Vercel.

## Files

- `index.html` — the whole page
- `styles.css` — all styling
- `script.js` — the mobile menu toggle
- `images/` — the site's photos

## Before you go live

- Pricing cards still say `[Add your price]` in three places in `index.html` — search for that text and fill in real prices.
- The contact form at the bottom doesn't send anywhere yet (`action="#"` in `index.html`). It needs a form backend — easiest options are Formspree or Vercel's own form handling — before it will actually deliver enquiries to Lana's inbox.
