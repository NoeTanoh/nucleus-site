export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const dict = {
  fr: {
    meta: {
      title: "NUCLÉUS — Intelligence. Technology. Creativity.",
      description:
        "Collectif multidisciplinaire en statistique, data science, économétrie, intelligence artificielle, Business Intelligence, développement, communication et formation.",
    },
    nav: { poles: "Pôles", about: "Le collectif", audiences: "Pour qui", contact: "Contact", switch: "English", switchShort: "EN" },
    hero: {
      tagline: "Intelligence. Technology. Creativity.",
      lead: "Un collectif d'experts qui réunit données, technologie et création pour aider les organisations à décider, à construire et à communiquer.",
      explore: "Explorer les sept pôles",
      hint: "Survolez un nœud pour découvrir un pôle",
      noWebgl: "Les sept pôles de NUCLÉUS",
    },
    about: {
      title: "Un noyau, sept disciplines",
      body: [
        "NUCLÉUS rassemble des spécialistes de la statistique, de la data science, de l'économétrie, de l'intelligence artificielle, de la Business Intelligence, du développement informatique, de la communication et de la formation.",
        "Chaque projet mobilise les pôles dont il a besoin : une enquête peut aboutir à un tableau de bord, une formation et une campagne de communication, portés par une seule équipe.",
      ],
      markets: "Afrique francophone et international, en français et en anglais.",
    },
    polesSection: { title: "Les sept pôles", open: "Voir le pôle" },
    audiences: {
      title: "Pour qui nous travaillons",
      list: [
        "ONG et organisations internationales",
        "Institutions publiques",
        "Entreprises privées",
        "Cabinets d'études et de conseil",
        "Projets de développement",
        "Universités et établissements de formation",
        "Entreprises technologiques",
        "Agences de communication",
      ],
    },
    contact: {
      title: "Parlons de votre projet",
      body: "Décrivez votre besoin : nous vous indiquons quels pôles mobiliser et comment nous organiser.",
      cta: "Nous écrire",
      pending: "Le formulaire de contact arrive avec la prochaine version du site.",
    },
    pole: {
      services: "Prestations",
      outcomes: "Ce que vous recevez",
      others: "Les autres pôles",
      back: "Tous les pôles",
      contact: "Parler de ce pôle avec nous",
    },
    footer: { rights: "Tous droits réservés." },
  },
  en: {
    meta: {
      title: "NUCLÉUS — Intelligence. Technology. Creativity.",
      description:
        "A multidisciplinary collective of experts in statistics, data science, econometrics, artificial intelligence, Business Intelligence, software development, communication and training.",
    },
    nav: { poles: "Practices", about: "The collective", audiences: "Who we serve", contact: "Contact", switch: "Français", switchShort: "FR" },
    hero: {
      tagline: "Intelligence. Technology. Creativity.",
      lead: "A collective of experts bringing data, technology and creative work together to help organisations decide, build and communicate.",
      explore: "Explore the seven practices",
      hint: "Hover a node to discover a practice",
      noWebgl: "The seven NUCLÉUS practices",
    },
    about: {
      title: "One nucleus, seven disciplines",
      body: [
        "NUCLÉUS brings together specialists in statistics, data science, econometrics, artificial intelligence, Business Intelligence, software development, communication and training.",
        "Each project draws on the practices it needs: a survey can lead to a dashboard, a training course and a communication campaign, delivered by one team.",
      ],
      markets: "French-speaking Africa and international, in French and English.",
    },
    polesSection: { title: "The seven practices", open: "View practice" },
    audiences: {
      title: "Who we work with",
      list: [
        "NGOs and international organisations",
        "Public institutions",
        "Private companies",
        "Research and consulting firms",
        "Development projects",
        "Universities and training institutions",
        "Technology companies",
        "Communication agencies",
      ],
    },
    contact: {
      title: "Tell us about your project",
      body: "Describe what you need: we'll tell you which practices to bring in and how we'd organise the work.",
      cta: "Write to us",
      pending: "The contact form ships with the next version of the site.",
    },
    pole: {
      services: "Services",
      outcomes: "What you receive",
      others: "Other practices",
      back: "All practices",
      contact: "Talk to us about this practice",
    },
    footer: { rights: "All rights reserved." },
  },
} as const;

export type Dict = (typeof dict)[Locale];
export const getDict = (l: Locale): Dict => dict[l];
