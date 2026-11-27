import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { work } from "@/content/site";
import { CtaBand, EmptyState, PageHead } from "@/components/Sections";

export const generateMetadata = ({ params }: PageProps<"/[lang]/work">) => pageMeta(params, "work", work.lead);

export default async function WorkPage({ params }: PageProps<"/[lang]/work">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <PageHead lang={lang} page="work" index="04" title={work.title[lang]} lead={work.lead[lang]} />
      <section className="section">
        <div className="wrap">
          <EmptyState lang={lang} text={work.empty[lang]} />
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
