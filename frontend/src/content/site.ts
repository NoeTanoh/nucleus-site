import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;

/**
 * Every page of the showcase site. One shared slug per page for both languages
 * (/fr/solutions, /en/solutions); only the labels and copy change.
 */
export const routes = {
  home: { path: "", label: { fr: "Accueil", en: "Home" } },
  about: { path: "about", label: { fr: "À propos", en: "About" } },
  expertise: { path: "expertise", label: { fr: "Expertises", en: "Expertise" } },
  solutions: { path: "solutions", label: { fr: "Solutions", en: "Solutions" } },
  work: { path: "work", label: { fr: "Réalisations", en: "Work" } },
  training: { path: "training", label: { fr: "Formations", en: "Training" } },
  resources: { path: "resources", label: { fr: "Ressources", en: "Resources" } },
  contact: { path: "contact", label: { fr: "Contact", en: "Contact" } },
  client: { path: "client", label: { fr: "Espace client", en: "Client area" } },
  legal: { path: "legal", label: { fr: "Mentions légales", en: "Legal notice" } },
} as const satisfies Record<string, { path: string; label: L }>;

export type RouteKey = keyof typeof routes;

export const href = (lang: Locale, key: RouteKey, hash?: string) =>
  `/${lang}${routes[key].path ? `/${routes[key].path}` : ""}${hash ? `#${hash}` : ""}`;

/** Header shows the main entries; the full menu lists every page. */
export const headerNav: RouteKey[] = ["expertise", "solutions", "work", "training", "contact"];
export const menuNav: RouteKey[] = [
  "home",
  "about",
  "expertise",
  "solutions",
  "work",
  "training",
  "resources",
  "contact",
  "client",
];

export const ui = {
  menu: { fr: "Menu", en: "Menu" },
  close: { fr: "Fermer", en: "Close" },
  skipIntro: { fr: "Passer l'introduction", en: "Skip intro" },
  loading: { fr: "Chargement de la scène", en: "Loading the scene" },
  discover: { fr: "Découvrir nos expertises", en: "Discover our expertise" },
  start: { fr: "Démarrer un projet", en: "Start a project" },
  toBeProvided: { fr: "À compléter", en: "To be provided" },
  comingSoon: { fr: "En préparation", en: "In preparation" },
  backHome: { fr: "Retour à l'accueil", en: "Back to home" },
} satisfies Record<string, L>;

export const hero = {
  subtitle: {
    fr: "Transformer les données, les idées et la technologie en impact concret.",
    en: "Transforming data, ideas and technology into meaningful impact.",
  },
} satisfies Record<string, L>;

export const intro = {
  title: { fr: "Un collectif, un même noyau", en: "One collective, one nucleus" },
  vision: {
    label: { fr: "Vision", en: "Vision" },
    text: {
      fr: "Faire de la donnée, de la technologie et de la création des outils de décision au service des organisations d'Afrique francophone et d'ailleurs.",
      en: "Making data, technology and creative work into decision tools for organisations in French-speaking Africa and beyond.",
    },
  },
  approach: {
    label: { fr: "Approche", en: "Approach" },
    text: {
      fr: "Partir de la question que l'organisation se pose, puis réunir les compétences nécessaires pour y répondre : collecte, analyse, outils, communication et formation.",
      en: "Start from the question the organisation is asking, then bring together the skills needed to answer it: collection, analysis, tools, communication and training.",
    },
  },
  value: {
    label: { fr: "Valeur ajoutée", en: "What we add" },
    text: {
      fr: "Une seule équipe pluridisciplinaire du terrain jusqu'au tableau de bord, en français et en anglais, avec des livrables que vos équipes savent ensuite utiliser.",
      en: "One multidisciplinary team from fieldwork to dashboard, in French and English, with deliverables your teams can use on their own afterwards.",
    },
  },
};

/** A real sequence, so it is numbered. */
export const approach = {
  title: { fr: "De la question à la solution", en: "From question to solution" },
  lead: {
    fr: "Chaque mission suit le même fil, quelle que soit la combinaison de pôles mobilisée.",
    en: "Every engagement follows the same thread, whichever practices it draws on.",
  },
  steps: [
    {
      title: { fr: "Comprendre", en: "Understand" },
      text: {
        fr: "Clarifier la décision à prendre, les publics concernés et les contraintes du terrain.",
        en: "Clarify the decision to be made, the people involved and the constraints on the ground.",
      },
    },
    {
      title: { fr: "Collecter", en: "Collect" },
      text: {
        fr: "Concevoir les outils, collecter et contrôler la qualité des données.",
        en: "Design the instruments, collect the data and check its quality.",
      },
    },
    {
      title: { fr: "Analyser", en: "Analyse" },
      text: {
        fr: "Traiter, modéliser et interpréter les données avec des méthodes adaptées.",
        en: "Process, model and interpret the data with suitable methods.",
      },
    },
    {
      title: { fr: "Construire", en: "Build" },
      text: {
        fr: "Livrer les rapports, tableaux de bord, applications ou supports de communication.",
        en: "Deliver the reports, dashboards, applications or communication materials.",
      },
    },
    {
      title: { fr: "Transmettre", en: "Hand over" },
      text: {
        fr: "Former les équipes pour qu'elles s'approprient les outils et les méthodes.",
        en: "Train the teams so they can own the tools and methods.",
      },
    },
  ],
};

export const work = {
  title: { fr: "Réalisations", en: "Work" },
  lead: {
    fr: "Des projets réels, avec leur contexte et leurs résultats documentés.",
    en: "Real projects, with their context and documented results.",
  },
  empty: {
    fr: "Les études de cas sont en cours de rédaction. Elles seront publiées ici une fois validées avec les organisations concernées.",
    en: "Case studies are being written. They will be published here once approved by the organisations involved.",
  },
};

export const sectors = {
  title: { fr: "Secteurs d'intervention", en: "Where we work" },
  list: [
    { fr: "ONG et organisations internationales", en: "NGOs and international organisations" },
    { fr: "Institutions publiques", en: "Public institutions" },
    { fr: "Entreprises privées", en: "Private companies" },
    { fr: "Projets de développement", en: "Development projects" },
    { fr: "Technologie", en: "Technology" },
    { fr: "Éducation et formation", en: "Education and training" },
  ],
};

export const cta = {
  title: { fr: "Parlons de votre projet", en: "Let's talk about your project" },
  text: {
    fr: "Décrivez la question que vous vous posez. Nous vous proposons l'équipe et la démarche pour y répondre.",
    en: "Tell us the question you are facing. We will propose the team and the approach to answer it.",
  },
};

export const about = {
  title: { fr: "À propos de NUCLÉUS", en: "About NUCLÉUS" },
  lead: {
    fr: "Un collectif multidisciplinaire d'experts orienté vers les résultats.",
    en: "A multidisciplinary, results-driven collective of experts.",
  },
  blocks: [
    {
      title: { fr: "Qui nous sommes", en: "Who we are" },
      text: {
        fr: "NUCLÉUS réunit des spécialistes de la statistique, de la data science, de l'économétrie, de l'intelligence artificielle, de la Business Intelligence, du développement informatique, de la communication et de la formation.",
        en: "NUCLÉUS brings together specialists in statistics, data science, econometrics, artificial intelligence, Business Intelligence, software development, communication and training.",
      },
    },
    {
      title: { fr: "Où nous intervenons", en: "Where we work" },
      text: {
        fr: "En Afrique francophone et à l'international, en français et en anglais.",
        en: "In French-speaking Africa and internationally, in French and English.",
      },
    },
    {
      title: { fr: "Comment nous travaillons", en: "How we work" },
      text: {
        fr: "Chaque projet mobilise les pôles dont il a besoin, coordonnés par une seule équipe, de la collecte des données jusqu'à la formation des utilisateurs.",
        en: "Each project draws on the practices it needs, coordinated by one team, from data collection through to user training.",
      },
    },
  ],
  signature: {
    fr: "Intelligence. Technology. Creativity. Trois mots pour une même exigence : des résultats utiles et vérifiables.",
    en: "Intelligence. Technology. Creativity. Three words for one standard: useful, verifiable results.",
  },
};

export const solutions = {
  title: { fr: "Solutions", en: "Solutions" },
  lead: {
    fr: "Des réponses complètes qui combinent plusieurs pôles autour d'un même besoin.",
    en: "Complete answers that combine several practices around one need.",
  },
  items: [
    {
      title: { fr: "Études et enquêtes de bout en bout", en: "End-to-end studies and surveys" },
      text: {
        fr: "Du protocole à la base de données propre, puis au rapport d'analyse.",
        en: "From protocol to clean dataset, then to the analysis report.",
      },
      poles: ["research-data-collection", "statistics-data-analytics"],
    },
    {
      title: { fr: "Pilotage par les indicateurs", en: "Indicator-driven management" },
      text: {
        fr: "Définition des KPI, tableaux de bord interactifs et reporting automatisé.",
        en: "KPI definition, interactive dashboards and automated reporting.",
      },
      poles: ["business-intelligence-reporting", "statistics-data-analytics"],
    },
    {
      title: { fr: "Automatisation et IA appliquée", en: "Automation and applied AI" },
      text: {
        fr: "Suppression des tâches répétitives et analyse assistée par IA sur vos données.",
        en: "Removing repetitive tasks and AI-assisted analysis on your data.",
      },
      poles: ["artificial-intelligence-automation", "technology-software-development"],
    },
    {
      title: { fr: "Plateformes et outils numériques", en: "Platforms and digital tools" },
      text: {
        fr: "Sites, applications et plateformes de données, avec leur maintenance.",
        en: "Websites, applications and data platforms, with their maintenance.",
      },
      poles: ["technology-software-development"],
    },
    {
      title: { fr: "Valorisation des résultats", en: "Communicating results" },
      text: {
        fr: "Infographies, rapports mis en forme, vidéos et campagnes pour faire connaître vos résultats.",
        en: "Infographics, designed reports, videos and campaigns to make your results known.",
      },
      poles: ["communication-creative-studio", "statistics-data-analytics"],
    },
    {
      title: { fr: "Renforcement des capacités", en: "Capacity building" },
      text: {
        fr: "Formations sur mesure pour que vos équipes poursuivent le travail seules.",
        en: "Tailored training so your teams can carry on the work themselves.",
      },
      poles: ["training-capacity-building"],
    },
  ],
};

export const training = {
  title: { fr: "Formations", en: "Training" },
  lead: {
    fr: "Des formations pratiques, sur vos données ou sur des cas réels, en français ou en anglais.",
    en: "Hands-on training, on your data or on real cases, in French or English.",
  },
  formatsTitle: { fr: "Formats", en: "Formats" },
  formats: [
    { fr: "Sessions en présentiel", en: "On-site sessions" },
    { fr: "Sessions à distance", en: "Remote sessions" },
    { fr: "Programmes sur mesure pour une organisation", en: "Tailored programmes for one organisation" },
  ],
  calendar: {
    fr: "Le calendrier des sessions et les modalités d'inscription seront publiés ici.",
    en: "The session calendar and registration details will be published here.",
  },
};

export const resources = {
  title: { fr: "Ressources", en: "Resources" },
  lead: {
    fr: "Guides, notes méthodologiques et publications de NUCLÉUS.",
    en: "Guides, methodology notes and publications by NUCLÉUS.",
  },
  empty: {
    fr: "Les premières ressources sont en préparation.",
    en: "The first resources are being prepared.",
  },
  kinds: [
    { fr: "Guides pratiques", en: "Practical guides" },
    { fr: "Notes méthodologiques", en: "Methodology notes" },
    { fr: "Modèles et outils", en: "Templates and tools" },
    { fr: "Publications", en: "Publications" },
  ],
};

export const client = {
  title: { fr: "Espace client", en: "Client area" },
  lead: {
    fr: "Un espace sécurisé pour suivre vos projets, consulter vos livrables et accéder à vos tableaux de bord.",
    en: "A secure area to follow your projects, view your deliverables and open your dashboards.",
  },
  body: {
    fr: "L'espace client ouvrira avec les premiers projets qui en ont besoin. Les accès sont créés par l'équipe NUCLÉUS.",
    en: "The client area will open with the first projects that need it. Accounts are created by the NUCLÉUS team.",
  },
};

export const contactPage = {
  title: { fr: "Contact", en: "Contact" },
  lead: {
    fr: "Décrivez votre besoin : nous revenons vers vous avec une proposition d'équipe et de démarche.",
    en: "Describe what you need: we will come back to you with a proposed team and approach.",
  },
  details: { fr: "Coordonnées", en: "Details" },
  email: { fr: "E-mail", en: "Email" },
  phone: { fr: "Téléphone", en: "Phone" },
  address: { fr: "Adresse", en: "Address" },
  social: { fr: "Réseaux sociaux", en: "Social media" },
};

export const legal = {
  title: { fr: "Mentions légales", en: "Legal notice" },
  sections: [
    { fr: "Éditeur du site", en: "Site publisher" },
    { fr: "Hébergement", en: "Hosting" },
    { fr: "Données personnelles", en: "Personal data" },
  ],
  privacy: {
    fr: "Les informations envoyées par le formulaire de contact servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni cédées.",
    en: "Information sent through the contact form is used only to answer your request. It is never sold or passed on.",
  },
};

export const footer = {
  navTitle: { fr: "Navigation", en: "Navigation" },
  contactTitle: { fr: "Coordonnées", en: "Contact details" },
  socialTitle: { fr: "Réseaux", en: "Social" },
};
