# CRIVORRA

CRIVORRA is a Vite and React site for digital growth, AI, technology, and branding services.

## Local development

Prerequisites: Node.js 20 or newer.

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

## Production checks

```bash
npm run lint
npm run build
npm run preview
```

The static production output is written to `dist/` and is ready for Vercel.

## Deployment

Vercel detects this Vite project automatically. The repository includes `vercel.json` to make the build command and SPA fallback explicit. No environment variables are required by the current client-only build.
