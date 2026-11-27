# NUCLÉUS — système de design « OBSIDIAN INTELLIGENCE »

Source : brief, partie II (direction artistique). Il remplace la palette marine/orange de la charte
NUCLEUS Prime pour le site. Le symbole du logo est conservé, décliné en deux tons ivoire + or
(la charte prévoit des déclinaisons monochromes, p. 10). Page vivante : `/fr/design-system`.

## Concept
Un cristal d'obsidienne au centre : du verre volcanique noir, taillé en facettes, avec un reflet acier
sur les arêtes et des éclats d'or quand une face prend la lumière. Autour : une structure géodésique
dorée très fine, un champ de points (les observations) et sept orbites, une par pôle. Chaque nœud est
cliquable. C'est le seul moment spectaculaire ; le reste du site est éditorial, typographique et calme.

## Couleurs
| Jeton | Hex | Rôle |
|---|---|---|
| `--obsidian` | `#101114` | Fond principal (≈ 80 % de la surface) |
| `--ivory` | `#E8E6E1` | Texte principal, unique section inversée (« Pour qui ») |
| `--gold` | `#C6A56B` | Action principale, sélection, focus, codes de pôle. Jamais en fond de section |
| `--steel` | `#526C78` | Profondeur : reflets du cristal, halo du hero, barres de données |
| `--obsidian-2` | `#16181C` | Surface surélevée (encadré « Ce que vous recevez », autres pôles) |
| `--ivory-2` | `#A9A8A3` | Texte secondaire sur obsidienne |
| `--steel-2` | `#8AA3AE` | Acier lisible sur obsidienne (métadonnées) |
| `--gold-2` | `#D9BF8F` | Survol des boutons or |
| `--gold-ink` | `#6F5A32` | Or lisible sur ivoire |
| `--line` / `--line-strong` | ivoire 14 % / 32 % | Filets, contours |

## Typographie
- **Bodoni Moda** (didone, axe optique) pour les titres : élégance éditoriale, déliés très fins en
  grand (`opsz` 96), plus robustes en petit (`font-optical-sizing: auto`). Les codes de pôle sont en
  Bodoni italique or.
- **Manrope** pour le texte, la navigation, les boutons et les formulaires.
- Auto-hébergées via `@fontsource-variable` (aucun appel à Google Fonts).
- Échelle modulaire 1,25 : `--t-xs` 13 px → `--t-3xl` 144 px, corps 16–18 px fluide, interligne 1,6.

## Espacements et grille
- Échelle sur base 4 px : `--s-1` 4 px … `--s-10` 128 px ; sections `--section` 64–176 px.
- Grille 12 colonnes (`.grid-12`), largeur max 1 440 px, gouttière latérale 16–56 px.
- Chaque section a sa propre découpe : hero en diagonale descendante, manifeste 11/4/4, index des
  pôles pleine largeur, publics 4/8 sur ivoire, contact 5/6, prestations 4/8 avec titre collant.

## Composants et états
- **Boutons** : primaire or (survol or clair), secondaire contour ivoire (survol or), désactivé contour
  seul. Forme pilule, hauteur 48 px.
- **Liens** : soulignement 1 px qui se retire au survol en passant à l'or.
- **Navigation** : liens ivoire secondaire, point or sous le lien actif ou survolé ; en-tête
  transparent puis opaque avec filet au défilement.
- **Index des pôles** : jamais de grille de cartes. Code italique or, nom Bodoni, résumé Manrope,
  flèche or au survol.
- **Formulaire** : champs soulignés, filet or au focus et en erreur, message d'erreur or ; puces de
  pôles en contour, ivoire plein une fois cochées.
- **Focus clavier** : contour or 1 px décalé de 4 px sur tous les éléments interactifs.

## Mouvement
- Une seule séquence orchestrée : l'intro du hero (titre ligne par ligne avec GSAP, cristal et orbites
  qui se déploient).
- Ailleurs, uniquement des réponses aux actions (survol, focus, envoi).
- `prefers-reduced-motion` : la scène 3D reste immobile, l'intro et les transitions sont coupées.

## À éviter (brief)
Dégradés violets, grilles de cartes répétitives, sections identiques, icônes génériques, halos
lumineux excessifs, animations décoratives, mises en page standardisées.
