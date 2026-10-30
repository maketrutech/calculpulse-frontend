# CalculPulse

Calculatrices et conversions gratuites en français — https://calculpulse.maketru.com

Stack : React 18, Vite 5, Tailwind 3, react-router 6, prerendu SSR + hydratation, Firebase Hosting.

```bash
npm ci
npm run build   # build + prerendu + sitemap
npm test
PORT=4173 node scripts/serve.mjs
```

Publicité : AdSense chargé uniquement si `VITE_ADSENSE_CLIENT` est défini et après consentement (Consent Mode v2, refus par défaut).
