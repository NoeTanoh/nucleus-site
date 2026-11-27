# NUCLÉUS — direction artistique

Source : charte graphique « NUCLEUS Prime » (palette p. 08, typographie p. 04, pattern p. 12) et logo fourni.

## Concept : le noyau
NUCLÉUS est un noyau autour duquel gravitent sept pôles. L'accueil le montre littéralement : un cœur
en fusion orange (la donnée brute), une structure géodésique autour (la méthode), un champ de points
(les observations) et sept orbites portant chacune un pôle. Chaque nœud est cliquable et mène à sa page.
C'est le seul moment spectaculaire du site ; le reste est sobre, typographique et lisible.

## Couleurs (charte)
| Rôle | Nom | Hex |
|---|---|---|
| Fond principal, sections sombres | Navy | `#133360` |
| Fond profond (hero, pied de page) | Navy ink | `#0A1C3B` (dérivé du navy) |
| Accent, actions, cœur 3D | Orange | `#FC5E02` |
| Reflet chaud (dégradé du logo) | Amber | `#FDB022` |
| Section claire chaude | Blush | `#FEEDE2` |
| Section claire froide, textes secondaires | Mist | `#DFE6ED` |

Chaque pôle reçoit une teinte de la palette pour son nœud 3D et son code.

## Typographie
La charte impose **MTT Milano** (licence commerciale, non fournie). En attendant le fichier de police,
le site utilise **Jost** (géométrique, même famille de formes que Futura/Milano), auto-hébergée via
`@fontsource-variable/jost`. Remplacement : déposer les fichiers Milano dans `frontend/public/fonts`
et changer `--font` dans `globals.css`.

Échelle modulaire 1,333 (quarte), corps 17–19 px fluide. Titres en 700–800, approche serrée.

## Mise en page
- Texte aligné à gauche, grille 5/6 colonnes sur desktop, une colonne sur mobile.
- Alternance des fonds : navy → blush → navy → mist → orange, comme les déclinaisons de la charte.
- Les pôles sont un index typographique (code officiel 01–07 + nom), pas une grille de cartes.

## Principes
- Une seule audace : le noyau 3D. Le reste se tait.
- Aucun chiffre, client, partenaire ni certification inventé.
- `prefers-reduced-motion` : la scène 3D reste immobile (survol et clic actifs), l'intro GSAP est désactivée.
- Sans WebGL : le symbole vectoriel remplace la scène ; tous les pôles restent accessibles par des liens.
