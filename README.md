# Spark AI Flow — site + deploy guide

Static marketing site. No build step locally — open `site/index.html` to preview.
Docker build handles CSS/JS minification automatically.

```
site/
├── index.html
├── styles.css
├── site.js
├── favicon.svg
├── og-image.svg
├── assets/
│   └── brain-cut.png
└── fonts/          ← self-hosted Google Fonts (no third-party requests)
    ├── fonts.css
    └── *.woff2
Dockerfile
nginx.conf
```

## Before you go live

- **Client logos** — search the HTML for `<!-- TODO:` to find all three placeholder logos (Atlas Coaching / Brightpath Academy / Northcourse). Swap in real client names + logo SVGs.
- **OG image** — `site/og-image.svg` is an SVG placeholder. Twitter/X requires a PNG for reliable previews; export or redraw `og-image.png` at 1200×630 and update the meta tag `og:image` URLs in `index.html`.

---

## Deploy to Dokploy (your Hetzner server)

Dokploy manages routing and SSL via Traefik — you do **not** set up nginx or certbot manually. Everything below runs once; future deploys are a single `git push`.

### Step 1 — push this repo to GitHub

```bash
git remote add origin https://github.com/speter229/sparkaiwebsite2026jan.git
git push -u origin main
```

### Step 2 — create the Dokploy application

1. Open your Dokploy dashboard.
2. Click **Create application**.
3. Choose **Git provider → GitHub**, select the repo `sparkaiwebsite2026jan`.
4. Branch: `main`.
5. Build type: **Dockerfile** (Dokploy auto-detects the `Dockerfile` in the root).
6. Port: **80**.
7. Click **Deploy**.

### Step 3 — point the domain

1. In Dokploy, open the application → **Domains** tab.
2. Add `sparkaiflow.com` and `www.sparkaiflow.com`.
3. Enable **HTTPS / Let's Encrypt** — Dokploy/Traefik handles the certificate automatically.
4. Make sure your DNS A records (at your registrar) point both names to your Hetzner server IP.

### Step 4 — swap out the WordPress site

In Dokploy, find the existing WordPress application for `sparkaiflow.com`:

- Either **delete** it (if you no longer need WordPress), or
- **Remove** the `sparkaiflow.com` domain from WordPress and assign it to the new static-site application instead.

Traefik routes by domain, so once the domain is on the new app, traffic goes to this site.

### Deploying updates later

Every `git push origin main` triggers a Dokploy rebuild (if you set up the webhook — see the **Webhooks** tab in Dokploy). Or trigger a rebuild manually from the Dokploy dashboard.

```bash
git add -p          # stage your changes
git commit -m "..."
git push origin main
```
