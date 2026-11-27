import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { resources } from "@/content/site";
import { CtaBand, EmptyState, PageHead } from "@/components/Sections";

export const generateMetadata = ({ params }: PageProps<"/[lang]/resources">) =>
  pageMeta(params, "resources", resources.lead);

export default async function ResourcesPage({ params }: PageProps<"/[lang]/resources">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <PageHead lang={lang} page="resources" index="06" title={resources.title[lang]} lead={resources.lead[lang]} />
      <section className="section">
        <div className="wrap">
          <ul className="kinds">
            {resources.kinds.map((k, i) => (
              <li key={k.en}>
                <span className="code">R{i + 1}</span>
                {k[lang]}
              </li>
            ))}
          </ul>
          <EmptyState lang={lang} text={resources.empty[lang]} />
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
