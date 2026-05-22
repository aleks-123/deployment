# Movies Web (React + Vite)

Frontend for the movies API. Lives in `/web` so the backend (repo root) and frontend can deploy as two separate services on Render.

## Local development

```bash
# from repo root, start backend on port 3000
npm install
npm start

# in another terminal, start the frontend
cd web
npm install
npm run dev
```

Open `http://localhost:5173`. Vite's dev server proxies `/api/*` to `http://localhost:3000`, so no CORS issues in dev.

## Production build

```bash
cd web
VITE_API_URL=https://your-backend.onrender.com npm run build
# output → web/dist/
```

## Deploy on Render

Deploy as a **Static Site** (separate from the backend Web Service).

1. Render → **New → Static Site** → connect the same repo.
2. **Root Directory:** `web`
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. **Environment Variables:**
   - `VITE_API_URL` = `https://<your-backend-service>.onrender.com` (no trailing slash)
6. **Rewrites/Redirects** (for SPA routing — optional but recommended):
   - Source: `/*` → Destination: `/index.html` → Action: Rewrite

Because the static site lives on a different origin than the backend, the backend's `cors()` middleware is what allows the cross-origin requests to succeed.

## Files

- `vite.config.js` — dev proxy for `/api`
- `src/api.js` — axios instance, uses `VITE_API_URL` in prod, relative paths in dev
- `src/App.jsx` — list + create + delete movies
- `src/styles.css` — dark theme matching the backend EJS view
