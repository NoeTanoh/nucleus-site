import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { getPole } from "@/content/poles";
import { solutions } from "@/content/site";
import { CtaBand, PageHead } from "@/components/Sections";

export const generateMetadata = ({ params }: PageProps<"/[lang]/solutions">) =>
  pageMeta(params, "solutions", solutions.lead);

export default async function SolutionsPage({ params }: PageProps<"/[lang]/solutions">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <PageHead lang={lang} page="solutions" index="03" title={solutions.title[lang]} lead={solutions.lead[lang]} />
      <section className="section">
        <div className="wrap">
          <ol className="solution-list">
            {solutions.items.map((s, i) => (
              <li key={s.title.en}>
                <span className="solution-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="heading">{s.title[lang]}</h2>
                <p>{s.text[lang]}</p>
                <ul className="solution-poles" aria-label={lang === "fr" ? "Pôles mobilisés" : "Practices involved"}>
                  {s.poles.map((slug) => {
                    const p = getPole(slug)!;
                    return (
                      <li key={slug}>
                        <Link className="chip" href={`/${lang}/poles/${slug}`}>
                          <span className="code">{p.code}</span> {p.label[lang]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
