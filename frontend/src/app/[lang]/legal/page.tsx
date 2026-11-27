import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { legal, ui } from "@/content/site";
import { PageHead } from "@/components/Sections";

export const generateMetadata = async ({ params }: PageProps<"/[lang]/legal">) => ({
  ...(await pageMeta(params, "legal", legal.privacy)),
  robots: { index: false },
});

export default async function LegalPage({ params }: PageProps<"/[lang]/legal">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <PageHead lang={lang} page="legal" index="09" title={legal.title[lang]} lead={legal.privacy[lang]} />
      <section className="section">
        <div className="wrap">
          <dl className="ledger">
            {legal.sections.map((s) => (
              <div key={s.en}>
                <dt className="heading">{s[lang]}</dt>
                <dd>
                  <span className="placeholder">{ui.toBeProvided[lang]}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
