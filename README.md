# NUCLÉUS

Site web de NUCLÉUS — *Intelligence. Technology. Creativity.*

## Structure
- `frontend/` — Next.js 16 (App Router), React 19.3, TypeScript 6, Three.js + React Three Fiber + Drei, GSAP.
- `DESIGN.md` — direction artistique tirée de la charte graphique.
- `backend/` — à venir : Django 6.1 + Django REST Framework (formulaire de contact, contenus).

## Lancer le site
```bash
cd frontend
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr ou /en
npm run build      # build de production (pages statiques)
npm run lint
npm run typecheck
```

## Contenu
- Textes FR/EN de l'interface : `frontend/src/lib/i18n.ts`
- Les sept pôles et leurs prestations : `frontend/src/content/poles.ts`

React est épinglé en `~19.3` : React Three Fiber 9 exige React < 19.4.
