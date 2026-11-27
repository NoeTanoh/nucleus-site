import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource-variable/manrope";
import "../globals.css";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { introGate } from "@/lib/introGate";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#101114",
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
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
        <noscript>
          <style>{".intro-overlay{display:none}"}</style>
        </noscript>
      </head>
      <body>
        <a className="skip" href="#main">
          {lang === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <SiteHeader lang={lang} t={t} />
        <main id="main">{children}</main>
        <SiteFooter lang={lang} t={t} />
      </body>
    </html>
  );
}
