import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { routes, type RouteKey } from "@/content/site";

/** Title, description and fr/en alternates for one inner page. */
export async function pageMeta(
  params: Promise<{ lang: string }>,
  key: RouteKey,
  description: Record<Locale, string>,
): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const path = routes[key].path;
  return {
    title: routes[key].label[lang],
    description: description[lang],
    alternates: { languages: { fr: `/fr/${path}`, en: `/en/${path}` } },
  };
}
