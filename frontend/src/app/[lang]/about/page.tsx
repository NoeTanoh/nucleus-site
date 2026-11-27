import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { about } from "@/content/site";
import { CtaBand, PageHead, SectorsBand } from "@/components/Sections";

export const generateMetadata = ({ params }: PageProps<"/[lang]/about">) => pageMeta(params, "about", about.lead);

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <PageHead lang={lang} page="about" index="01" title={about.title[lang]} lead={about.lead[lang]} />
      <section className="section">
        <div className="wrap">
          <dl className="ledger">
            {about.blocks.map((b) => (
              <div key={b.title.en}>
                <dt className="heading">{b.title[lang]}</dt>
                <dd>{b.text[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <blockquote className="display quote">{about.signature[lang]}</blockquote>
        </div>
      </section>
      <SectorsBand lang={lang} />
      <CtaBand lang={lang} />
    </>
  );
}
