# NUCLÉUS — système de design (charte NUCLEUS Prime, version claire)

Source : la charte graphique NUCLEUS Prime (palette p.08) et le logo. Les tokens vivent dans
`frontend/src/app/globals.css`. Tous les composants sont montrés en direct sur `/fr/design-system`.

## Concept
Une page claire et éditoriale, sur une grille de 12 colonnes. Le bleu marine porte le texte, et l'orange
marque l'action, comme les deux traits du logo. Au centre du hero, un cristal 3D facetté passe du marine
au bleu ciel, avec des anneaux et des reflets orange. Les sections changent de rythme d'une section à
l'autre au lieu de se répéter.

## Couleurs
| Token | Hex | Rôle |
|---|---|---|
| `--navy` | #133360 | Texte, boutons primaires, bande inversée (secteurs) |
| `--orange` | #FC5E02 | Accent : filets, codes, chiffres, grands titres, sélection |
| `--amber` | #FDB022 | Accent sur la bande marine |
| `--sky` | #3D8FD6 | Données, reflets 3D |
| `--mist` | #DFE6ED | Surfaces, survol |
| `--blush` | #FEEDE2 | Fond chaud secondaire |
| `--white` | #FFFFFF | Fond principal |
| `--accent-text` | #C44900 | Orange foncé pour le petit texte sur blanc (contraste 4,6:1) |
| `--ink-2` | #4B5F7D | Texte secondaire (contraste 6,4:1) |

Les rôles (`--bg`, `--ink`, `--accent`, `--blue`, `--surface`) pointent vers ces couleurs. Équilibre visé :
environ 80 % de blanc et de brume, 15 % de marine et 5 % d'orange. L'orange vif (#FC5E02) ne fait que 3:1
sur blanc, donc on le garde pour les aplats, les filets et les grands textes.

## Typographie
- Une seule famille, à la demande du client : **Times New Roman** (repli : Times, Liberation Serif,
  Nimbus Roman). Elle est installée sur les postes, donc il n'y a aucune police à télécharger.
- La hiérarchie vient de la taille, de la graisse et de l'italique. Échelle modulaire 1,25, de `--t-xs`
  à `--t-3xl`, fluide.
- Les codes de pôle sont en italique orange.

## Espacements et grille
- Échelle sur une base de 4 px, de `--s-1` (4 px) à `--s-10` (128 px). Les sections ont un espacement
  `--section` de 64 à 176 px.
- Grille de 12 colonnes (`.grid-12`), largeur maximale de 1 440 px, gouttière latérale de 16 à 56 px.
- Chaque section de l'accueil a sa propre composition :
  - Introduction : trois colonnes en escalier.
  - Pôles : un index pleine largeur.
  - Démarche : un rail numéroté.
  - Réalisations : un cadre en pointillés.
  - Secteurs : une bande marine.
  - Appel à l'action : un grand titre en 8/4.

## Composants et états
- **Boutons** : en forme de pilule, 48 px de haut.
  - Primaire : fond marine, texte blanc ; au survol, il passe en orange foncé.
  - Secondaire : contour marine ; au survol, le contour devient orange.
  - Désactivé : contour seul.
- **Liens** : soulignés à 1 px ; au survol, ils passent à l'orange.
- **Navigation** :
  - Les liens sont en bleu secondaire, avec un point orange sous le lien actif.
  - L'en-tête est transparent, puis devient opaque avec un filet quand la page défile.
  - Le menu plein écran est blanc.
- **Index des pôles** : jamais de grille de cartes. Le code est en italique, le nom en grand, et une
  flèche orange apparaît au survol.
- **Formulaire** :
  - Les champs sont soulignés. Le filet passe à l'orange au focus et en cas d'erreur.
  - Les puces de pôles sont en contour, et passent en marine plein une fois cochées.
- **Contenu à venir** : un cadre en pointillés, et la mention « [ À compléter ] ». Rien n'est inventé.
- **Focus clavier** : un contour orange de 1 px, décalé de 4 px, sur tous les éléments interactifs.

## 3D
- **Matières** : tout est procédural (shaders GLSL, environnement fait de Lightformers). Il n'y a ni
  modèle ni texture, donc rien à compresser.
- **Sur ordinateur** : la scène complète, avec anneaux, coque de verre et environnement en 256 px.
- **Sur téléphone et petites machines** : une version allégée.
- **Performance** : la scène se met en pause hors écran et quand l'onglet est caché.
- **Repli** : en cas d'erreur WebGL, une image SVG fixe remplace la scène.

## Mouvement
- **Intro** : le symbole se dessine pendant le chargement réel. Elle a un bouton « Passer » et ne joue
  qu'une fois par session.
- **Hero** : le titre apparaît ligne par ligne (GSAP), et la caméra avance.
- **Ailleurs** : uniquement des réponses aux actions (survol, focus, envoi).
- **`prefers-reduced-motion`** : l'intro est coupée, la scène reste immobile et les transitions sont
  désactivées.

## À éviter (brief)
Dégradés violets, grilles de cartes répétitives, sections identiques, icônes génériques, halos
lumineux excessifs, animations décoratives, mises en page standardisées.
