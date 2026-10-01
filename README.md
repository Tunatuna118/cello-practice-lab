# Cello Practice Lab

A mobile-first, local-first PWA for advanced cello practice. The MVP connects technical acquisition, performance-tempo transfer, spaced consolidation, cold First Takes, review, and next-session adjustment.

## Architecture

- **Zero-dependency web app:** standards-based ES modules and a tiny Node development server avoid package-registry availability becoming a blocker while keeping the app easy to extend.
- **Local-first state:** the complete practice plan, timestamp-based timers, ratings, and history live in `localStorage`. JSON export/import provides portability without an account.
- **Resilient timing:** active tasks store their start timestamp instead of relying on an in-memory counter, so elapsed time catches up after screen lock, tab changes, or refresh.
- **PWA shell:** web manifest, standalone display mode, install icon, and a cache-first fallback service worker.
- **Domain model:** sessions contain independent tasks; completed tasks can create First Take grades and detailed technique ratings. A future sync layer can persist the same serialized state remotely.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL. To test on an iPhone, use an HTTPS tunnel or deploy the production build, then open it in Safari and choose **Share → Add to Home Screen**.

## Test and build

```bash
npm test
npm run build
npm run preview
```

## Deploy

Run `npm run build` and deploy the generated `dist/` directory to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or an nginx server). Use HTTPS so the service worker and installation work outside localhost. The app has no runtime or build dependencies; `npm install` only creates the lockfile.

### GitHub Pages (recommended free option)

This repository includes `.github/workflows/deploy-pages.yml`. On every push to `main` or `work`, GitHub Actions tests the app, builds `dist/`, and publishes it to GitHub Pages.

1. Push this repository to GitHub as `cello-practice-lab`.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open **Actions → Deploy to GitHub Pages** and run the workflow, or push a commit to `main`.
5. When the workflow is green, its deployment summary contains the HTTPS URL. For a project repository it is normally `https://<username>.github.io/cello-practice-lab/`.

All app and PWA asset URLs are relative, so both a root domain and the `/cello-practice-lab/` GitHub Pages subpath are supported.

### Install on iPhone

1. Open the deployed HTTPS URL in **Safari** (not an in-app browser).
2. Tap the **Share** button in Safari's toolbar.
3. Scroll down and tap **Add to Home Screen**. If it is hidden, tap **Edit Actions** and enable it.
4. Keep the name **Cello Lab**, then tap **Add**.
5. Launch it from the new Home Screen icon. Open it online once after each deployment so the offline cache can update.

Practice data is stored only in that browser installation. Use **Settings → Export JSON** before clearing Safari data, removing the PWA, or changing phones.
