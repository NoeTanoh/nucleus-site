import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/pageMeta";
import { client, href, routes } from "@/content/site";
import { EmptyState, PageHead } from "@/components/Sections";

export const generateMetadata = ({ params }: PageProps<"/[lang]/client">) => pageMeta(params, "client", client.lead);

export default async function ClientPage({ params }: PageProps<"/[lang]/client">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <PageHead lang={lang} page="client" index="08" title={client.title[lang]} lead={client.lead[lang]} />
      <section className="section">
        <div className="wrap">
          <EmptyState lang={lang} text={client.body[lang]} />
          <p className="section-more">
            <Link className="link" href={href(lang, "contact")}>
              {routes.contact.label[lang]}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
