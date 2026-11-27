import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Symbol } from "@/components/Symbol";

export const metadata: Metadata = { title: "Design system", robots: { index: false } };

const colors = [
  { name: "Bleu marine", token: "--navy", hex: "#133360", role: { fr: "Texte, boutons, bande inversée", en: "Text, buttons, inverted band" } },
  { name: "Orange", token: "--orange", hex: "#FC5E02", role: { fr: "Accent, filets, grands titres", en: "Accent, rules, large headings" } },
  { name: "Ambre", token: "--amber", hex: "#FDB022", role: { fr: "Accent sur fond marine", en: "Accent on navy" } },
  { name: "Bleu ciel", token: "--sky", hex: "#3D8FD6", role: { fr: "Données, reflets 3D", en: "Data, 3D highlights" } },
  { name: "Brume", token: "--mist", hex: "#DFE6ED", role: { fr: "Surfaces, survol", en: "Surfaces, hover" } },
  { name: "Pêche", token: "--blush", hex: "#FEEDE2", role: { fr: "Fond chaud secondaire", en: "Warm secondary background" } },
  { name: "Blanc", token: "--white", hex: "#FFFFFF", role: { fr: "Fond principal", en: "Main background" } },
  { name: "Orange texte", token: "--accent-text", hex: "#C44900", role: { fr: "Orange lisible en petit sur blanc", en: "Readable small orange on white" } },
];

const type = [
  { token: "--t-3xl", sample: "Intelligence.", cls: "display", note: "Times New Roman 400" },
  { token: "--t-2xl", sample: "Research & Data Collection", cls: "display", note: "Times New Roman 400" },
  { token: "--t-xl", sample: "Les sept pôles", cls: "heading", note: "Times New Roman 400" },
  { token: "--t-lg", sample: "Business Intelligence & Reporting", cls: "pole-name", note: "Times New Roman 400" },
  { token: "--t-md", sample: "Concevoir les études et ramener des données fiables.", cls: "lede", note: "Times New Roman 400" },
  { token: "--t-base", sample: "Texte courant, 16 à 18 px, interligne 1,6.", cls: "", note: "Times New Roman 400" },
  { token: "--t-sm", sample: "Navigation, boutons, légendes.", cls: "", note: "Times New Roman 600" },
  { token: "--t-xs", sample: "Pôle 03 / 07", cls: "meta", note: "Times New Roman, interlettrage 0,08em" },
];

const spacing = [
  ["--s-1", 4],
  ["--s-2", 8],
  ["--s-3", 12],
  ["--s-4", 16],
  ["--s-5", 24],
  ["--s-6", 32],
  ["--s-7", 48],
  ["--s-8", 64],
  ["--s-9", 96],
  ["--s-10", 128],
] as const;

export default async function DesignSystem({ params }: PageProps<"/[lang]/design-system">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const fr = lang === "fr";

  return (
    <>
      <section className="wrap ds-intro">
        <span className="meta">NUCLEUS Prime</span>
        <h1 className="display" style={{ fontSize: "var(--t-2xl)", marginTop: "var(--s-4)" }}>
          {fr ? "Système de design" : "Design system"}
        </h1>
        <p className="lede">
          {fr
            ? "Les règles visuelles du site NUCLÉUS, rendues avec les composants réels. Toute nouvelle page part d'ici."
            : "The visual rules of the NUCLÉUS site, rendered with the real components. Every new page starts here."}
        </p>
      </section>

      <div className="wrap">
        <section className="ds-block">
          <h2 className="heading">{fr ? "Couleurs" : "Colour"}</h2>
          <div className="ds-swatches">
            {colors.map((c) => (
              <div className="swatch" key={c.token}>
                <i style={{ background: c.hex }} />
                <b>{c.name}</b>
                <span>{c.hex}</span>
                <span>{c.token}</span>
                <span>{c.role[lang]}</span>
              </div>
            ))}
          </div>
          <p className="ds-note">
            {fr
              ? "Équilibre visé : environ 80 % de blanc et de brume, 15 % de bleu marine, 5 % d'orange. L'orange vient de la charte NUCLEUS Prime ; il marque ce qui est actif, et passe en orange foncé pour le petit texte."
              : "Target balance: about 80% white and mist, 15% navy, 5% orange. Orange comes from the NUCLEUS Prime guidelines; it marks what is active, and turns dark orange for small text."}
          </p>
        </section>

        <section className="ds-block">
          <h2 className="heading">{fr ? "Typographie" : "Typography"}</h2>
          <div className="ds-type">
            {type.map((r) => (
              <div key={r.token}>
                <span className="meta">
                  {r.token}
                  <br />
                  {r.note}
                </span>
                <span className={r.cls} style={{ fontSize: `var(${r.token})` }}>
                  {r.sample}
                </span>
              </div>
            ))}
          </div>
          <p className="ds-note">
            {fr
              ? "Échelle modulaire 1,25 (tierce majeure). Une seule famille, Times New Roman, pour les titres et le texte ; la hiérarchie vient de la taille, de la graisse et de l'italique. Les codes de pôle sont en italique orange."
              : "Modular scale 1.25 (major third). One family, Times New Roman, for headings and text; hierarchy comes from size, weight and italics. Pôle codes are set in orange italics."}
          </p>
        </section>

        <section className="ds-block">
          <h2 className="heading">{fr ? "Espacements" : "Spacing"}</h2>
          <div className="ds-spacing">
            {spacing.map(([tok, px]) => (
              <div key={tok}>
                <span>{tok}</span>
                <span>{px}px</span>
                <span className="bar" style={{ width: px }} />
              </div>
            ))}
          </div>
        </section>

        <section className="ds-block">
          <h2 className="heading">{fr ? "Grille" : "Grid"}</h2>
          <div className="grid-12 ds-grid" aria-hidden>
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <p className="ds-note">
            {fr
              ? "12 colonnes, largeur max 1440 px, gouttière latérale de 16 à 56 px. Les sections ne réutilisent pas la même découpe : manifeste en 11/4/4, pôles en index pleine largeur, publics en 4/8, contact en 5/6."
              : "12 columns, 1440px max width, 16–56px side gutter. Sections never reuse the same split: manifesto 11/4/4, practices as a full-width index, audiences 4/8, contact 5/6."}
          </p>
        </section>

        <section className="ds-block">
          <h2 className="heading">{fr ? "Boutons et liens" : "Buttons and links"}</h2>
          <div className="ds-row">
            <button className="btn" type="button">
              {fr ? "Envoyer la demande" : "Send request"}
            </button>
            <button className="btn btn-outline" type="button">
              {fr ? "Voir le pôle" : "View practice"}
            </button>
            <button className="btn" type="button" disabled>
              {fr ? "Envoi…" : "Sending…"}
            </button>
            <a className="link" href="#top">
              {fr ? "Lien de texte" : "Text link"}
            </a>
          </div>
          <p className="ds-note">
            {fr
              ? "Primaire : fond bleu marine, texte blanc ; survol : orange foncé. Secondaire : contour marine, orange au survol. Désactivé : contour seul. Focus clavier : filet orange de 1 px décalé de 4 px, sur tous les éléments."
              : "Primary: navy fill, white text; hover: dark orange. Secondary: navy outline, orange on hover. Disabled: outline only. Keyboard focus: 1px orange outline offset by 4px, on every element."}
          </p>
        </section>

        <section className="ds-block">
          <h2 className="heading">{fr ? "Navigation" : "Navigation"}</h2>
          <div className="ds-row" style={{ justifyContent: "space-between", padding: "var(--s-4)", border: "1px solid var(--line)" }}>
            <span className="brand">
              <Symbol />
              NUCLÉUS
            </span>
            <nav className="nav" aria-label="Demo">
              <a href="#top" aria-current="page">
                {fr ? "Pôles" : "Practices"}
              </a>
              <a href="#top">{fr ? "Le collectif" : "The collective"}</a>
              <a className="lang" href="#top">
                {fr ? "EN" : "FR"}
              </a>
            </nav>
          </div>
          <p className="ds-note">
            {fr
              ? "Liens en bleu secondaire ; la page active et le survol passent en marine avec un point orange. L'en-tête devient opaque avec un filet dès que la page défile."
              : "Links in secondary blue; the active page and hover turn navy with an orange dot. The header turns opaque with a hairline once the page scrolls."}
          </p>
        </section>

        <section className="ds-block">
          <h2 className="heading">{fr ? "Formulaire" : "Form"}</h2>
          <div className="contact-form ds-demo-form">
            <div className="field">
              <label htmlFor="ds-a">{fr ? "Champ au repos" : "Field at rest"}</label>
              <input id="ds-a" defaultValue="Awa Koné" />
            </div>
            <div className="field" data-invalid="true">
              <label htmlFor="ds-b">{fr ? "Champ en erreur" : "Field with error"}</label>
              <input id="ds-b" defaultValue="awa@" aria-invalid="true" aria-describedby="ds-b-msg" />
              <span id="ds-b-msg" className="field-msg">
                {fr ? "Adresse e-mail invalide." : "Invalid email address."}
              </span>
            </div>
            <fieldset className="field">
              <legend>{fr ? "Puces de sélection" : "Selection chips"}</legend>
              <div className="chips">
                <label className="chip">
                  <input type="checkbox" defaultChecked />
                  <span>{fr ? "Sélectionnée" : "Selected"}</span>
                </label>
                <label className="chip">
                  <input type="checkbox" />
                  <span>{fr ? "Disponible" : "Available"}</span>
                </label>
              </div>
            </fieldset>
          </div>
        </section>

        <section className="ds-block">
          <h2 className="heading">{fr ? "Index des pôles" : "Practice index"}</h2>
          <p className="ds-note" style={{ marginTop: 0 }}>
            {fr
              ? "Les pôles ne sont jamais présentés en grille de cartes : c'est un index typographique. Code officiel en italique orange, nom en grand, résumé en texte courant. Au survol, le nom passe en orange et une flèche apparaît."
              : "Practices are never shown as a card grid: they form a typographic index. Official code in orange italics, name set large, summary in body text. On hover the name turns orange and an arrow appears."}
          </p>
        </section>
      </div>
    </>
  );
}
