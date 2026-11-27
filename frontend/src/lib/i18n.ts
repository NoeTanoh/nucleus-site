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
    nav: { poles: "Pôles", about: "Le collectif", audiences: "Pour qui", contact: "Contact", system: "Système de design", switch: "English", switchShort: "EN" },
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
    polesSection: {
      title: "Les sept pôles",
      lead: "Sept disciplines autour d'un même noyau. Chaque projet mobilise celles dont il a besoin.",
      open: "Voir le pôle",
    },
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
      form: {
        name: "Nom",
        email: "E-mail",
        organisation: "Organisation (facultatif)",
        poles: "Pôles concernés (facultatif)",
        message: "Votre besoin",
        messageHint: "Au moins 20 caractères.",
        submit: "Envoyer la demande",
        sending: "Envoi…",
        sent: "Demande envoyée. Nous vous répondons par e-mail.",
        another: "Envoyer une autre demande",
        invalid: "Vérifiez les champs signalés.",
        required: "Champ obligatoire.",
        badEmail: "Adresse e-mail invalide.",
        tooShort: "Message trop court : 20 caractères minimum.",
        rateLimited: "Trop de demandes envoyées. Réessayez dans une heure.",
        failed: "La demande n'a pas pu être envoyée. Réessayez dans quelques minutes.",
      },
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
    nav: { poles: "Practices", about: "The collective", audiences: "Who we serve", contact: "Contact", system: "Design system", switch: "Français", switchShort: "FR" },
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
    polesSection: {
      title: "The seven practices",
      lead: "Seven disciplines around one nucleus. Each project draws on the ones it needs.",
      open: "View practice",
    },
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
      form: {
        name: "Name",
        email: "Email",
        organisation: "Organisation (optional)",
        poles: "Practices involved (optional)",
        message: "What you need",
        messageHint: "At least 20 characters.",
        submit: "Send request",
        sending: "Sending…",
        sent: "Request sent. We'll reply by email.",
        another: "Send another request",
        invalid: "Check the highlighted fields.",
        required: "Required field.",
        badEmail: "Invalid email address.",
        tooShort: "Message too short: 20 characters minimum.",
        rateLimited: "Too many requests sent. Try again in an hour.",
        failed: "The request could not be sent. Try again in a few minutes.",
      },
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
