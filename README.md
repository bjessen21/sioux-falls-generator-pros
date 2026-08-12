# Sioux Falls Generator Pros

Static rank-and-rent lead gen site for the Sioux Falls, SD generator installation/repair niche — the same market as your Henderson site (`hendersongeneratorpros.com`), simplified down to match the leaner structure of Denver Dance Floors and Norman Container. Plain HTML/CSS/JS, no build step, no framework, no CMS.

## Assumptions made building this (verify before launch)

- **Domain**: `siouxfallsgenerator.com` — not checked for availability. If it's taken, pick an alternate and update it in every `<link rel="canonical">` tag, the JSON-LD block on the homepage, `robots.txt`, `sitemap.xml`, and the `CNAME` file.
- **Business name**: "Sioux Falls Generator Pros" — same City + "Generator Pros" naming pattern as your Henderson site.
- **Phone number**: `(605) 702-6227` is a placeholder, not a real working number. Replace it in `js/config.js` (one place) before launch — see below.
- **Services offered**: Whole-Home Standby Installation, Transfer Switch Installation, and Generator Repair & Maintenance — 3 core services instead of Henderson's 4. Emergency service is folded into the Repair & Maintenance page and hero messaging rather than a separate page, to keep navigation simpler (matching the 2 reference sites you liked).
- **Pricing table** reuses the same general cost bands as your Henderson site (portable/manual, 10–14kW, 17–22kW, 24kW+), since generator equipment pricing doesn't vary much by state — treat as a placeholder until confirmed locally.
- **No fake testimonials** — left out rather than fabricate reviews attributed to made-up people. Swap in real ones once you have a renter.
- **No licensing/insurance/financing claims anywhere on the site.**
- **Contact form has no backend yet** — validates and shows a confirmation message, but doesn't send anywhere (see "Wire up the contact form" below).
- **Images** are hotlinked from Unsplash (free, no attribution required — see `IMAGE-CREDITS.md`). None are actual generator-brand product photos, since Unsplash doesn't have licensed Generac/Kohler imagery — swap for real job-site or manufacturer photos when possible.

## Run it locally

**Important:** start the server *inside this folder*, not your home directory — if you see a plain file/directory listing instead of the site, you're one level too high.

```bash
cd sioux-falls-generator-pros
python3 -m http.server 8000
```

Then open **http://localhost:8000** (use `localhost`, not the `[::]` address Python prints). Click through Home, Services (and the 3 service pages), About, and Contact to review before doing anything else.

## Before you deploy

### 1. Set your real phone number (CallRail)
Open `js/config.js` and update:
```js
phoneDisplay: "(605) 702-6227",   // -> your CallRail tracking number, formatted
phoneTel: "+16057026227",          // -> same number in E.164 format
```
Every phone number on every page is injected from this file — you only have to change it once.

For CallRail's dynamic number insertion (swaps the number per traffic source), get your swap.js snippet from CallRail and drop it into the commented block near the top of each page's `<head>` (search for `TODO: CallRail`).

### 2. Google Analytics 4 — already connected ✅
A GA4 property called "Sioux Falls Generator Pros" was created and wired into every page. Measurement ID: `G-G212NXBPZN`.
- Data stream: `https://siouxfallsgenerator.com`, timezone set to Chicago (Central) time
- Business objectives set to "Generate leads" + "Understand web and/or app traffic"
- Google's dashboard can take up to 48 hours to start showing data once the site is actually live at that domain
- If you ever need to find this again: [analytics.google.com](https://analytics.google.com) → Admin → this property is under the same Google account as `hendersongeneratorpros.com`

### 3. Wire up the contact form
Right now, submitting the quote/contact form just shows a confirmation message — it doesn't send the lead anywhere. Before launch, pick one:
- **Formspree** (simplest) — point the form's `action` at your Formspree endpoint
- **GoHighLevel** — swap the form for an embedded GHL form widget
- **Cloudflare Worker / Pages Function** — write a small serverless function and update `js/main.js`'s submit handler to `fetch()` it

### 4. Buy/confirm the domain, then deploy to GitHub Pages

```bash
# from inside the sioux-falls-generator-pros folder
git init
git add .
git commit -m "Initial site build"
git branch -M main

# create the repo on GitHub first (via github.com or `gh repo create`), then:
git remote add origin https://github.com/<your-username>/sioux-falls-generator-pros.git
git push -u origin main
```

Then on GitHub:
1. Go to the repo → **Settings → Pages**
2. Source: deploy from branch `main`, folder `/ (root)`
3. Under **Custom domain**, enter your domain (this repo already has a `CNAME` file with `siouxfallsgenerator.com` in it — edit that file first if you land on a different domain)
4. At your domain registrar, point DNS at GitHub Pages:
   - `A` records for the apex domain → GitHub's IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`)
   - or a `CNAME` record for `www` → `<your-username>.github.io`
5. Once DNS propagates, check **Enforce HTTPS** in the Pages settings

## File structure

```
sioux-falls-generator-pros/
├── index.html
├── about.html
├── contact.html
├── privacy-policy.html
├── terms.html
├── 404.html
├── services/
│   ├── index.html
│   ├── whole-home-generator-installation.html
│   ├── transfer-switch-installation.html
│   └── generator-repair-maintenance.html
├── css/style.css
├── js/config.js      <- phone number, business name, GA4/CallRail IDs live here
├── js/main.js
├── robots.txt
├── sitemap.xml
├── CNAME
└── .nojekyll
```

## Differentiation from your other sites (per your anti-fingerprinting rule)

- Different CSS naming convention (`sfgp-` component prefix, not BEM)
- Different color palette — cool charcoal/steel-blue with an amber accent, vs. earthy stone/moss/clay on the Sioux Falls retaining wall build and whatever Henderson currently uses
- Different font pairing (Barlow + Karla)
- Different copy voice from your other sites, though it deliberately mirrors Henderson's structure and message since it's the same niche
- FAQ uses native `<details>/<summary>` accordions instead of JS-driven ones
- 3 services instead of Henderson's 4, no dedicated "Emergency Service" page — folded into Repair & Maintenance

## Note on the earlier build

An earlier pass at this folder was built as a **retaining wall** site by mistake (`sioux-falls-retaining-walls/`, right next to this one in your outputs folder). That folder is no longer needed — let me know if you'd like it removed, or just ignore/delete it yourself.
