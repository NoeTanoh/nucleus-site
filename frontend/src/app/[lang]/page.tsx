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

      <section id="collectif" className="section manifesto" aria-labelledby="about-title">
        <div className="wrap grid-12">
          <h2 id="about-title" className="sr-only">
            {t.about.title}
          </h2>
          <p className="display statement">{t.about.body[0]}</p>
          <p className="col-a">{t.about.body[1]}</p>
          <p className="col-b">{t.about.markets}</p>
        </div>
      </section>

      <section id="poles" className="section" aria-labelledby="poles-title">
        <div className="wrap">
          <div className="grid-12 poles-head">
            <h2 id="poles-title" className="heading">
              {t.polesSection.title}
            </h2>
            <p className="lede">{t.polesSection.lead}</p>
          </div>
          <PoleIndex lang={lang} items={poles} />
        </div>
      </section>

      <section id="publics" className="section audiences" aria-labelledby="aud-title">
        <div className="wrap grid-12">
          <h2 id="aud-title" className="heading">
            {t.audiences.title}
          </h2>
          <ul className="audience-flow">
            {t.audiences.list.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBlock lang={lang} t={t.contact} />
    </>
  );
}
