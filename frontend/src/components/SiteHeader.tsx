"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Dict, Locale } from "@/lib/i18n";
import { headerNav, href, menuNav, routes, ui } from "@/content/site";
import { Symbol } from "./Symbol";

export function SiteHeader({ lang, t }: { lang: Locale; t: Dict }) {
  const pathname = usePathname() ?? `/${lang}`;
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const reduce = useReducedMotion();
  const toggle = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const other: Locale = lang === "fr" ? "en" : "fr";
  const switched = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${other}`);
  const current = (p: string) => (pathname.replace(/\/$/, "") === p ? "page" : undefined);

  return (
    <header className="site-header" data-solid={solid || open} data-open={open}>
      <div className="wrap">
        <Link href={href(lang, "home")} className="brand" aria-label="NUCLÉUS">
          <Symbol />
          <span aria-hidden>NUCLÉUS</span>
        </Link>
        <nav className="nav" aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}>
          {headerNav.map((k) => (
            <Link key={k} className="nav-secondary" href={href(lang, k)} aria-current={current(href(lang, k))}>
              {routes[k].label[lang]}
            </Link>
          ))}
          <Link className="lang" href={switched} hrefLang={other} lang={other} aria-label={t.nav.switch}>
            {t.nav.switchShort}
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span>{open ? ui.close[lang] : ui.menu[lang]}</span>
            <i aria-hidden data-open={open} />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu"
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.2, 1] }}
          >
            <nav className="wrap menu-inner" aria-label={ui.menu[lang]}>
              <ol>
                {menuNav.map((k, i) => (
                  <motion.li
                    key={k}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: [0.22, 0.61, 0.2, 1] }}
                  >
                    <Link href={href(lang, k)} aria-current={current(href(lang, k))}>
                      {routes[k].label[lang]}
                    </Link>
                  </motion.li>
                ))}
              </ol>
              <p className="menu-sig">Intelligence. Technology. Creativity.</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
