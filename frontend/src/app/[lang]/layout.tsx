import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/jost";
import "../globals.css";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0a1c3b",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    title: { default: t.meta.title, template: "%s · NUCLÉUS" },
    description: t.meta.description,
    alternates: { languages: { fr: "/fr", en: "/en" } },
    openGraph: { title: t.meta.title, description: t.meta.description, siteName: "NUCLÉUS", locale: lang },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang}>
      <body>
        <a className="skip" href="#main">
          {lang === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <SiteHeader lang={lang} t={t} />
        <main id="main">{children}</main>
        <SiteFooter t={t} />
      </body>
    </html>
  );
}
