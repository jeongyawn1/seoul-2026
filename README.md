# Seoul 2026 — Interactive Travel Guide

A static, publicly-deployable travel guide for a 5-day / 4-night Seoul trip
**(07–11 November 2026)**, built for companions to open on any device with no
login or install.

**Live demo:** https://jeongyawn1.github.io/seoul-2026/

## Highlights

- **Dashboard (Home)** — trip hero, **NEXT STOP**, **WHAT SHOULD I DO NOW?**,
  **LOCAL PICKS**, **Wander Mode**, and a 5-day intensity overview.
- **Itinerary** — five days with locked **fixed events** (Touch Five, **EXO Seoul
  Concert**, WILD WILD) plus flexible suggested stops, auto-rated by intensity
  (RELAXED / MODERATE / HEAVY).
- **Map** — Leaflet map with approximate coordinates for orientation (exact
  directions via each card's Google Maps / Naver search links).
- **Discover / Food / Shopping** — everything split by area and category.
- **Wishlist** — filter by Want → In trip → Visited → Skipped; statuses persist in
  your browser (`localStorage`).
- **Budget** — travel and shopping/beauty kept as two separate, editable-in-code tracks.
- **Trip Info** — fixed events, a pre-flight checklist, and a privacy note.

## Tech

React 19 · TypeScript · Vite · Tailwind CSS v3 · Leaflet · lucide-react ·
react-router (HashRouter, so deep links work on GitHub Pages).

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview   # preview the production build
```

> On a China network, install with the mirror:
> `npm install --registry=https://registry.npmmirror.com`

## Deploying to GitHub Pages

The project is configured with `base: '/seoul-2026/'` and uses `HashRouter`, so it
works as a project page at `https://<user>.github.io/seoul-2026/`.

### Option A — automatic (recommended)

1. Create a repo named **`seoul-2026`** under your GitHub account.
2. Push this folder to the `main` branch:

   ```bash
   cd seoul-2026
   git init
   git add .
   git commit -m "Seoul 2026 travel guide"
   git branch -M main
   git remote add origin https://github.com/<your-username>/seoul-2026.git
   git push -u origin main
   ```

3. On GitHub, open the repo → **Settings → Pages** and set **Source** to
   **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` builds and publishes on every push to
   `main`. Your site goes live at `https://<your-username>.github.io/seoul-2026/`.

> If the CI build fails to fetch packages (the lockfile was generated against a
> China mirror), run `npm config set registry https://registry.npmjs.org`, then
> `rm package-lock.json && npm install` and re-push.

### Option B — manual

```bash
npm install
npm run build

# push the dist/ folder to a gh-pages branch
npx gh-pages -d dist
```

Then set Pages source to the `gh-pages` branch.

## Data & privacy

- All place data lives in `src/data/` (see `places.ts`, `itinerary.ts`,
  `budget.ts`, `recommendations.ts`). UI and data are fully separated.
- **This site is public, so it deliberately contains no passports, ID numbers,
  phone numbers, private accounts, passwords, booking/payment details, private
  messages, API keys, or tokens.**
- Details that couldn't be confirmed are marked **"Information to confirm"** and
  carry a `lastVerified` timestamp rather than a guessed value.
- No fake reviews, images, addresses, or hours — unverified items say so explicitly.
