import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;

export type Service = { title: L; detail: L };

export type Pole = {
  slug: string;
  code: string; // official pôle number from the brief (01–07)
  name: string; // official English pôle name, used in both languages
  label: L; // short local name
  hue: string; // node colour in the 3D nucleus (gold, ivory or light steel)
  lead: L;
  services: Service[];
  outcomes: L[];
};

export const poles: Pole[] = [
  {
    slug: "research-data-collection",
    code: "01",
    name: "Research & Data Collection",
    label: { fr: "Recherche & collecte", en: "Research & collection" },
    hue: "#FC5E02",
    lead: {
      fr: "Concevoir les études, aller sur le terrain et ramener des données fiables, prêtes à être analysées.",
      en: "Designing studies, going into the field and bringing back reliable data that is ready for analysis.",
    },
    services: [
      {
        title: { fr: "Études quantitatives et qualitatives", en: "Quantitative and qualitative studies" },
        detail: {
          fr: "Protocole, échantillonnage, questionnaires et guides d'entretien adaptés à la question posée.",
          en: "Protocol, sampling, questionnaires and interview guides built around the question at hand.",
        },
      },
      {
        title: { fr: "Enquêtes de terrain", en: "Field surveys" },
        detail: {
          fr: "Organisation logistique, déploiement des équipes et suivi de l'avancement.",
          en: "Logistics, team deployment and progress tracking.",
        },
      },
      {
        title: { fr: "Collecte mobile avec KoboToolbox et ODK", en: "Mobile data collection with KoboToolbox and ODK" },
        detail: {
          fr: "Programmation des formulaires, contrôles de saisie et synchronisation des données.",
          en: "Form programming, entry validation and data synchronisation.",
        },
      },
      {
        title: { fr: "Supervision des enquêteurs", en: "Enumerator supervision" },
        detail: {
          fr: "Formation des équipes, encadrement quotidien et remontée des incidents.",
          en: "Team training, daily supervision and incident reporting.",
        },
      },
      {
        title: { fr: "Contrôle qualité des données", en: "Data quality control" },
        detail: {
          fr: "Vérifications de cohérence, détection des doublons et des valeurs aberrantes en cours de collecte.",
          en: "Consistency checks, duplicate and outlier detection while collection is under way.",
        },
      },
      {
        title: { fr: "Études de marché et sondages", en: "Market research and polls" },
        detail: {
          fr: "Mesure des attentes, des usages et des perceptions d'un public cible.",
          en: "Measuring the expectations, habits and perceptions of a target audience.",
        },
      },
    ],
    outcomes: [
      { fr: "Bases de données propres et documentées", en: "Clean, documented datasets" },
      { fr: "Rapports de collecte et de qualité", en: "Collection and quality reports" },
    ],
  },
  {
    slug: "statistics-data-analytics",
    code: "02",
    name: "Statistics & Data Analytics",
    label: { fr: "Statistique & analyse", en: "Statistics & analytics" },
    hue: "#133360",
    lead: {
      fr: "Transformer des données brutes en résultats chiffrés, testés et lisibles par ceux qui décident.",
      en: "Turning raw data into tested, quantified findings that decision-makers can read.",
    },
    services: [
      {
        title: { fr: "Analyse statistique", en: "Statistical analysis" },
        detail: {
          fr: "Choix des méthodes adaptées aux données et à la question de recherche.",
          en: "Choosing methods that fit the data and the research question.",
        },
      },
      {
        title: { fr: "Économétrie", en: "Econometrics" },
        detail: {
          fr: "Modélisation, estimation d'effets et évaluation d'impact.",
          en: "Modelling, effect estimation and impact evaluation.",
        },
      },
      {
        title: { fr: "Traitement et nettoyage des bases", en: "Data processing and cleaning" },
        detail: {
          fr: "Recodage, fusion, gestion des valeurs manquantes et documentation des variables.",
          en: "Recoding, merging, missing-value handling and variable documentation.",
        },
      },
      {
        title: { fr: "Analyse descriptive et inférentielle", en: "Descriptive and inferential analysis" },
        detail: {
          fr: "Tableaux, indicateurs, tests et intervalles de confiance.",
          en: "Tables, indicators, tests and confidence intervals.",
        },
      },
      {
        title: { fr: "Rapports statistiques", en: "Statistical reports" },
        detail: {
          fr: "Résultats rédigés, interprétés et mis en forme pour leur public.",
          en: "Findings written up, interpreted and formatted for their audience.",
        },
      },
      {
        title: { fr: "Visualisation des données", en: "Data visualisation" },
        detail: {
          fr: "Graphiques qui montrent l'essentiel sans déformer les chiffres.",
          en: "Charts that show what matters without distorting the numbers.",
        },
      },
    ],
    outcomes: [
      { fr: "Rapports d'analyse et annexes statistiques", en: "Analysis reports and statistical annexes" },
      { fr: "Scripts reproductibles", en: "Reproducible scripts" },
    ],
  },
  {
    slug: "business-intelligence-reporting",
    code: "03",
    name: "Business Intelligence & Reporting",
    label: { fr: "BI & reporting", en: "BI & reporting" },
    hue: "#3D8FD6",
    lead: {
      fr: "Mettre les indicateurs à jour automatiquement et les rendre consultables en un coup d'œil.",
      en: "Keeping indicators up to date automatically and readable at a glance.",
    },
    services: [
      {
        title: { fr: "Power BI", en: "Power BI" },
        detail: {
          fr: "Modèles de données, mesures et rapports publiés pour vos équipes.",
          en: "Data models, measures and published reports for your teams.",
        },
      },
      {
        title: { fr: "R Shiny", en: "R Shiny" },
        detail: {
          fr: "Applications d'analyse interactives construites sur R.",
          en: "Interactive analysis applications built on R.",
        },
      },
      {
        title: { fr: "Excel avancé", en: "Advanced Excel" },
        detail: {
          fr: "Classeurs structurés, tableaux croisés et formules robustes.",
          en: "Structured workbooks, pivot tables and robust formulas.",
        },
      },
      {
        title: { fr: "Python et R", en: "Python and R" },
        detail: {
          fr: "Traitements automatisés et connexions aux sources de données.",
          en: "Automated processing and connections to data sources.",
        },
      },
      {
        title: { fr: "Tableaux de bord interactifs", en: "Interactive dashboards" },
        detail: {
          fr: "Filtres, comparaisons et vues adaptées à chaque niveau de décision.",
          en: "Filters, comparisons and views for each level of decision.",
        },
      },
      {
        title: { fr: "Automatisation du reporting", en: "Reporting automation" },
        detail: {
          fr: "Des rapports qui se régénèrent sans ressaisie manuelle.",
          en: "Reports that rebuild themselves without manual re-entry.",
        },
      },
      {
        title: { fr: "Suivi des indicateurs de performance", en: "Performance indicator tracking" },
        detail: {
          fr: "Définition des KPI, cibles et alertes de suivi.",
          en: "Defining KPIs, targets and monitoring alerts.",
        },
      },
    ],
    outcomes: [
      { fr: "Tableaux de bord en ligne", en: "Online dashboards" },
      { fr: "Chaînes de reporting automatisées", en: "Automated reporting pipelines" },
    ],
  },
  {
    slug: "artificial-intelligence-automation",
    code: "04",
    name: "Artificial Intelligence & Automation",
    label: { fr: "IA & automatisation", en: "AI & automation" },
    hue: "#FC5E02",
    lead: {
      fr: "Utiliser l'intelligence artificielle là où elle fait gagner du temps ou de la précision, et nulle part ailleurs.",
      en: "Using artificial intelligence where it saves time or adds precision, and nowhere else.",
    },
    services: [
      {
        title: { fr: "Solutions basées sur l'IA", en: "AI-based solutions" },
        detail: {
          fr: "Outils conçus autour d'un besoin précis de votre organisation.",
          en: "Tools designed around a specific need in your organisation.",
        },
      },
      {
        title: { fr: "Automatisation intelligente", en: "Intelligent automation" },
        detail: {
          fr: "Suppression des tâches répétitives dans vos processus.",
          en: "Removing repetitive tasks from your processes.",
        },
      },
      {
        title: { fr: "Analyse assistée par IA", en: "AI-assisted analysis" },
        detail: {
          fr: "Classement de textes, extraction d'information et aide à l'interprétation.",
          en: "Text classification, information extraction and help with interpretation.",
        },
      },
      {
        title: { fr: "Intégration d'outils d'IA", en: "AI tool integration" },
        detail: {
          fr: "Mise en place et paramétrage d'outils existants dans vos flux de travail.",
          en: "Setting up and configuring existing tools inside your workflows.",
        },
      },
    ],
    outcomes: [
      { fr: "Processus automatisés et documentés", en: "Automated, documented processes" },
      { fr: "Prototypes testés sur vos données", en: "Prototypes tested on your data" },
    ],
  },
  {
    slug: "technology-software-development",
    code: "05",
    name: "Technology & Software Development",
    label: { fr: "Technologie & logiciel", en: "Technology & software" },
    hue: "#133360",
    lead: {
      fr: "Construire et maintenir les sites, applications et plateformes dont vos équipes ont besoin.",
      en: "Building and maintaining the websites, applications and platforms your teams need.",
    },
    services: [
      {
        title: { fr: "Développement web", en: "Web development" },
        detail: {
          fr: "Sites et interfaces rapides, accessibles et responsives.",
          en: "Fast, accessible and responsive websites and interfaces.",
        },
      },
      {
        title: { fr: "WordPress", en: "WordPress" },
        detail: {
          fr: "Création, thèmes et extensions sur mesure.",
          en: "Builds, themes and custom plugins.",
        },
      },
      {
        title: { fr: "Webmastering", en: "Webmastering" },
        detail: {
          fr: "Mises à jour de contenu, sauvegardes et suivi technique.",
          en: "Content updates, backups and technical monitoring.",
        },
      },
      {
        title: { fr: "Applications et plateformes", en: "Applications and platforms" },
        detail: {
          fr: "Outils métier, espaces membres et plateformes de données.",
          en: "Business tools, member areas and data platforms.",
        },
      },
      {
        title: { fr: "Maintenance et accompagnement numérique", en: "Maintenance and digital support" },
        detail: {
          fr: "Corrections, évolutions et conseil dans la durée.",
          en: "Fixes, improvements and ongoing advice.",
        },
      },
    ],
    outcomes: [
      { fr: "Sites et applications en production", en: "Websites and applications in production" },
      { fr: "Documentation technique", en: "Technical documentation" },
    ],
  },
  {
    slug: "communication-creative-studio",
    code: "06",
    name: "Communication & Creative Studio",
    label: { fr: "Communication & studio", en: "Communication & studio" },
    hue: "#3D8FD6",
    lead: {
      fr: "Donner une forme claire et une voix cohérente à ce que votre organisation fait.",
      en: "Giving what your organisation does a clear form and a consistent voice.",
    },
    services: [
      {
        title: { fr: "Communication institutionnelle", en: "Institutional communication" },
        detail: {
          fr: "Supports de présentation, rapports annuels et prises de parole.",
          en: "Presentation materials, annual reports and public statements.",
        },
      },
      {
        title: { fr: "Stratégie de communication", en: "Communication strategy" },
        detail: {
          fr: "Publics, messages, canaux et calendrier.",
          en: "Audiences, messages, channels and calendar.",
        },
      },
      {
        title: { fr: "Graphisme", en: "Graphic design" },
        detail: {
          fr: "Affiches, infographies, publications et supports imprimés.",
          en: "Posters, infographics, publications and print materials.",
        },
      },
      {
        title: { fr: "Identité visuelle", en: "Visual identity" },
        detail: {
          fr: "Logo, charte graphique et déclinaisons.",
          en: "Logo, brand guidelines and applications.",
        },
      },
      {
        title: { fr: "Photographie", en: "Photography" },
        detail: {
          fr: "Prises de vue institutionnelles, portraits et événements.",
          en: "Institutional shoots, portraits and events.",
        },
      },
      {
        title: { fr: "Reportage", en: "Reportage" },
        detail: {
          fr: "Récits de terrain en images et en texte.",
          en: "Field stories told in images and words.",
        },
      },
      {
        title: { fr: "Production audiovisuelle", en: "Audiovisual production" },
        detail: {
          fr: "Vidéos institutionnelles, capsules et montage.",
          en: "Institutional videos, short clips and editing.",
        },
      },
    ],
    outcomes: [
      { fr: "Identités et chartes graphiques", en: "Identities and brand guidelines" },
      { fr: "Contenus photo, vidéo et imprimés", en: "Photo, video and print content" },
    ],
  },
  {
    slug: "training-capacity-building",
    code: "07",
    name: "Training & Capacity Building",
    label: { fr: "Formation", en: "Training" },
    hue: "#FC5E02",
    lead: {
      fr: "Transmettre les méthodes et les outils pour que vos équipes travaillent seules ensuite.",
      en: "Passing on methods and tools so your teams can carry on by themselves.",
    },
    services: [
      {
        title: { fr: "Formation en statistiques", en: "Statistics training" },
        detail: {
          fr: "Des bases jusqu'aux méthodes avancées, selon le niveau du groupe.",
          en: "From the basics to advanced methods, matched to the group's level.",
        },
      },
      {
        title: { fr: "Logiciels statistiques", en: "Statistical software" },
        detail: {
          fr: "Prise en main pratique sur des données réelles.",
          en: "Hands-on practice with real data.",
        },
      },
      {
        title: { fr: "Analyse de données", en: "Data analysis" },
        detail: {
          fr: "Du nettoyage à l'interprétation des résultats.",
          en: "From cleaning to interpreting results.",
        },
      },
      {
        title: { fr: "Power BI", en: "Power BI" },
        detail: {
          fr: "Construire et publier ses propres tableaux de bord.",
          en: "Building and publishing your own dashboards.",
        },
      },
      {
        title: { fr: "Excel", en: "Excel" },
        detail: {
          fr: "Formules, tableaux croisés et automatisation simple.",
          en: "Formulas, pivot tables and simple automation.",
        },
      },
      {
        title: { fr: "Collecte et gestion des données", en: "Data collection and management" },
        detail: {
          fr: "Concevoir un formulaire, collecter, stocker et sécuriser.",
          en: "Designing a form, collecting, storing and securing data.",
        },
      },
      {
        title: { fr: "Visualisation et reporting", en: "Visualisation and reporting" },
        detail: {
          fr: "Choisir le bon graphique et rédiger un rapport lisible.",
          en: "Choosing the right chart and writing a readable report.",
        },
      },
    ],
    outcomes: [
      { fr: "Sessions en présentiel ou à distance", en: "On-site or remote sessions" },
      { fr: "Supports et exercices remis aux participants", en: "Materials and exercises for participants" },
    ],
  },
];

export const getPole = (slug: string) => poles.find((p) => p.slug === slug);
