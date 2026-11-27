import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { poles } from "@/content/poles";
import { PoleIndex } from "@/components/PoleIndex";
import { ApproachSteps, CtaBand, PageHead } from "@/components/Sections";

const lead = {
  fr: "Sept pôles complémentaires, mobilisés séparément ou ensemble selon la question à traiter.",
  en: "Seven complementary practices, used on their own or together depending on the question.",
};

export const generateMetadata = ({ params }: PageProps<"/[lang]/expertise">) => pageMeta(params, "expertise", lead);

export default async function ExpertisePage({ params }: PageProps<"/[lang]/expertise">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <PageHead lang={lang} page="expertise" index="02" title={t.polesSection.title} lead={lead[lang]} />
      <section className="section" aria-label={t.polesSection.title}>
        <div className="wrap">
          <PoleIndex lang={lang} items={poles} />
        </div>
      </section>
      <ApproachSteps lang={lang} />
      <CtaBand lang={lang} />
    </>
  );
}
