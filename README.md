# Lyons Creative website

Static multi-page site for GitHub Pages.

## Files included
- `index.html`
- `services.html`
- `content-creation.html`
- `ecommerce-growth.html`
- `about.html`
- `contact.html`
- `blog.html` (built, but intentionally hidden from the main nav for now)
- `assets/css/styles.css`
- `assets/js/main.js`
- `assets/img/*.svg`

## GitHub Pages upload
1. Upload all files to your repository root.
2. In GitHub repo settings, set Pages to deploy from the main branch root.
3. Wait for the build to finish.

## Forms on GitHub Pages
GitHub Pages is static hosting, so the form needs an external form backend.

Forms are connected to Formspree:

- Homepage contact form: `https://formspree.io/f/xaqabnon`
- Full contact page form: `https://formspree.io/f/mgordjaa`
- Newsletter form in the footer: `https://formspree.io/f/mpqkbgpd`

The site uses plain HTML `POST` forms, which is the simplest option for GitHub Pages.

## Domain / sitemap note
The sitemap currently uses:
`https://trentlyons.github.io/lyonscreatives/`

If you switch to a custom domain later, update:
- `sitemap.xml`
- `robots.txt`

## Imagery
All imagery in `assets/img` is locally generated placeholder artwork made for this build so you can upload the site without licensing issues.

## Optional next refinements
- replace placeholder email address
- replace placeholder blog content
- connect real social profiles
- add analytics / Search Console
- swap in real photography or brand visuals
