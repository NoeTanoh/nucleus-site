import type { Dict, Locale } from "@/lib/i18n";
import { poles } from "@/content/poles";
import { ContactForm } from "./ContactForm";

export function ContactBlock({
  lang,
  t,
  title,
  preselect,
}: {
  lang: Locale;
  t: Dict["contact"];
  title?: string;
  preselect?: string;
}) {
  const options = poles.map((p) => ({ slug: p.slug, label: p.label[lang] }));
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div>
          <h2 id="contact-title" className="section-title">
            {title ?? t.title}
          </h2>
          <p>{t.body}</p>
        </div>
        <ContactForm lang={lang} t={t.form} poles={options} preselect={preselect} />
      </div>
    </section>
  );
}
