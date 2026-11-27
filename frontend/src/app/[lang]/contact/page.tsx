import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { contactPage } from "@/content/site";
import { ContactBlock } from "@/components/ContactBlock";
import { ContactDetails } from "@/components/ContactDetails";
import { PageHead } from "@/components/Sections";

export const generateMetadata = ({ params }: PageProps<"/[lang]/contact">) =>
  pageMeta(params, "contact", contactPage.lead);

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <PageHead lang={lang} page="contact" index="07" title={contactPage.title[lang]} lead={contactPage.lead[lang]} />
      <section className="section" aria-labelledby="details-title">
        <div className="wrap grid-12 split">
          <h2 id="details-title" className="heading">
            {contactPage.details[lang]}
          </h2>
          <ContactDetails lang={lang} />
        </div>
      </section>
      <ContactBlock lang={lang} t={t.contact} />
    </>
  );
}
