import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { poles } from "@/content/poles";
import { Hero } from "@/components/Hero";
import { PoleIndex } from "@/components/PoleIndex";
import { ContactBlock } from "@/components/ContactBlock";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  const nodes = poles.map((p) => ({ slug: p.slug, code: p.code, name: p.name, hue: p.hue }));

  return (
    <>
      <Hero lang={lang} t={t.hero} nodes={nodes} />

      <section id="collectif" className="section about" aria-labelledby="about-title">
        <div className="wrap grid">
          <h2 id="about-title" className="section-title">
            {t.about.title}
          </h2>
          <div className="body">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="markets">{t.about.markets}</p>
          </div>
        </div>
      </section>

      <section id="poles" className="section poles" aria-labelledby="poles-title">
        <div className="wrap">
          <h2 id="poles-title" className="section-title">
            {t.polesSection.title}
          </h2>
          <PoleIndex lang={lang} items={poles} />
        </div>
      </section>

      <section id="publics" className="section audiences" aria-labelledby="aud-title">
        <div className="wrap grid">
          <h2 id="aud-title" className="section-title">
            {t.audiences.title}
          </h2>
          <ul className="audience-list">
            {t.audiences.list.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBlock t={t.contact} />
    </>
  );
}
