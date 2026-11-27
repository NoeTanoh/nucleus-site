import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { getPole } from "@/content/poles";
import { training } from "@/content/site";
import { CtaBand, EmptyState, PageHead } from "@/components/Sections";

export const generateMetadata = ({ params }: PageProps<"/[lang]/training">) =>
  pageMeta(params, "training", training.lead);

export default async function TrainingPage({ params }: PageProps<"/[lang]/training">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pole = getPole("training-capacity-building")!;
  return (
    <>
      <PageHead lang={lang} page="training" index="05" title={training.title[lang]} lead={training.lead[lang]} />
      <section className="section">
        <div className="wrap grid-12 split">
          <h2 className="heading">{training.formatsTitle[lang]}</h2>
          <div>
            <ul className="plain-list">
              {training.formats.map((f) => (
                <li key={f.en}>{f[lang]}</li>
              ))}
            </ul>
            <p>
              <Link className="link" href={`/${lang}/poles/${pole.slug}`}>
                {pole.code} · {pole.label[lang]}
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <EmptyState lang={lang} text={training.calendar[lang]} />
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
