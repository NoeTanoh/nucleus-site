import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { poles } from "@/content/poles";
import { href, ui } from "@/content/site";
import { Hero } from "@/components/Hero";
import { PoleIndex } from "@/components/PoleIndex";
import { ApproachSteps, CtaBand, IntroSection, SectorsBand, WorkTeaser } from "@/components/Sections";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  const nodes = poles.map((p) => ({ slug: p.slug, code: p.code, name: p.name, hue: p.hue }));

  return (
    <>
      {/* 1. Intro + 2. Hero */}
      <Hero lang={lang} t={t.hero} nodes={nodes} />

      {/* 3. Introduction */}
      <IntroSection lang={lang} />

      {/* 4. Expertise */}
      <section id="poles" className="section" aria-labelledby="poles-title">
        <div className="wrap">
          <div className="grid-12 poles-head">
            <h2 id="poles-title" className="heading">
              {t.polesSection.title}
            </h2>
            <p className="lede">{t.polesSection.lead}</p>
          </div>
          <PoleIndex lang={lang} items={poles} />
          <p className="section-more">
            <Link className="link" href={href(lang, "expertise")}>
              {ui.discover[lang]}
            </Link>
          </p>
        </div>
      </section>

      {/* 5. Approach */}
      <ApproachSteps lang={lang} />

      {/* 6. Work (real projects only) */}
      <WorkTeaser lang={lang} />

      {/* 7. Sectors */}
      <SectorsBand lang={lang} />

      {/* 8. Call to action; the footer follows from the layout */}
      <CtaBand lang={lang} />
    </>
  );
}
