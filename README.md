# NUCLÉUS

Site web de NUCLÉUS — *Intelligence. Technology. Creativity.*

## Structure
- `frontend/` — Next.js 16 (App Router), React 19.3, TypeScript 6, Three.js + React Three Fiber + Drei, GSAP.
- `DESIGN.md` — direction artistique tirée de la charte graphique.
- `backend/` — Django 6.1 + Django REST Framework : API du formulaire de contact et administration des demandes.

## Lancer le site
```bash
cd frontend
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr ou /en
npm run build      # build de production (pages statiques)
npm run lint
npm run typecheck
```

## Lancer le backend
```bash
cd backend
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
export DJANGO_DEBUG=1
python manage.py migrate
python manage.py createsuperuser   # accès à /admin
python manage.py runserver         # http://127.0.0.1:8000
python manage.py test
```
Le site Next.js transmet `/api/*` au backend (`BACKEND_URL`, par défaut `http://127.0.0.1:8000`) :
le navigateur ne parle qu'au domaine du site, sans CORS. Variables de production : `backend/.env.example`.

### API
| Méthode | Route | Rôle |
|---|---|---|
| POST | `/api/contact/` | Enregistre une demande (nom, e-mail, organisation, pôles, message, langue). Champ piège anti-robot, limite de 5 envois par heure et par IP. Envoie un e-mail à `CONTACT_NOTIFY_EMAILS` s'il est défini. |
| GET | `/api/health/` | Vérification de disponibilité. |

Les demandes se consultent et se suivent (statut nouveau, en cours, clôturé) dans `/admin`.

## Contenu
- Textes FR/EN de l'interface : `frontend/src/lib/i18n.ts`
- Les sept pôles et leurs prestations : `frontend/src/content/poles.ts`

React est épinglé en `~19.3` : React Three Fiber 9 exige React < 19.4.
