"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { Symbol } from "./Symbol";

export function SiteHeader({ lang, t }: { lang: Locale; t: Dict }) {
  const pathname = usePathname() ?? `/${lang}`;
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const other: Locale = lang === "fr" ? "en" : "fr";
  const switched = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${other}`);
  const home = `/${lang}`;

  return (
    <header className="site-header" data-solid={solid}>
      <div className="wrap">
        <Link href={home} className="brand" aria-label="NUCLÉUS">
          <Symbol />
          <span aria-hidden>NUCLÉUS</span>
        </Link>
        <nav className="nav" aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}>
          <Link href={`${home}#poles`}>{t.nav.poles}</Link>
          <Link className="nav-secondary" href={`${home}#collectif`}>
            {t.nav.about}
          </Link>
          <Link className="nav-secondary" href={`${home}#contact`}>
            {t.nav.contact}
          </Link>
          <Link className="lang" href={switched} hrefLang={other} lang={other} aria-label={t.nav.switch}>
            {t.nav.switchShort}
          </Link>
        </nav>
      </div>
    </header>
  );
}
