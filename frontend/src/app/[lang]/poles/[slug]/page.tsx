import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { getPole, poles } from "@/content/poles";
import { OrbitMap } from "@/components/OrbitMap";
import { PoleIndex } from "@/components/PoleIndex";
import { ContactBlock } from "@/components/ContactBlock";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => poles.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/poles/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const pole = getPole(slug);
  if (!pole || !isLocale(lang)) return {};
  return {
    title: pole.name,
    description: pole.lead[lang],
    alternates: { languages: { fr: `/fr/poles/${slug}`, en: `/en/poles/${slug}` } },
  };
}

export default async function PolePage({ params }: PageProps<"/[lang]/poles/[slug]">) {
  const { lang, slug } = await params;
  const pole = getPole(slug);
  if (!pole || !isLocale(lang)) notFound();
  const t = getDict(lang);
  const others = poles.filter((p) => p.slug !== slug);

  return (
    <>
      <section className="pole-hero" style={{ "--hue": pole.hue } as React.CSSProperties}>
        <span className="bignum" aria-hidden>
          {pole.code}
        </span>
        <div className="wrap">
          <Link className="crumb link" href={`/${lang}#poles`}>
            {t.pole.back}
          </Link>
          <div className="grid-12">
            <div className="title-col">
              <span className="meta">
                {lang === "fr" ? "Pôle" : "Practice"} {pole.code} / 07
              </span>
              <h1 className="display">{pole.name}</h1>
              <p className="lede">{pole.lead[lang]}</p>
            </div>
            <div className="orbit-col">
              <OrbitMap active={pole.slug} />
            </div>
          </div>
        </div>
      </section>

      <section className="section services" aria-labelledby="services-title">
        <div className="wrap grid-12">
          <h2 id="services-title" className="heading">
            {t.pole.services}
          </h2>
          <div className="body">
            <dl className="service-list">
              {pole.services.map((s) => (
                <div key={s.title.en}>
                  <dt>{s.title[lang]}</dt>
                  <dd>{s.detail[lang]}</dd>
                </div>
              ))}
            </dl>
            <div className="outcomes">
              <h3>{t.pole.outcomes}</h3>
              <ul>
                {pole.outcomes.map((o) => (
                  <li key={o.en}>{o[lang]}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section other-poles" aria-labelledby="others-title">
        <div className="wrap">
          <h2 id="others-title" className="heading">
            {t.pole.others}
          </h2>
          <PoleIndex lang={lang} items={others} />
        </div>
      </section>

      <ContactBlock lang={lang} t={t.contact} title={t.pole.contact} preselect={pole.slug} />
    </>
  );
}
