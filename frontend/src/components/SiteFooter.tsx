import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { footer, href, menuNav, routes } from "@/content/site";
import { ContactDetails } from "./ContactDetails";
import { Symbol } from "./Symbol";

export function SiteFooter({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <footer className="site-footer">
      <div className="wrap grid-12">
        <div className="foot-brand">
          <span className="brand">
            <Symbol />
            NUCLÉUS
          </span>
          <span className="signature">Intelligence. Technology. Creativity.</span>
        </div>
        <nav className="foot-nav" aria-label={footer.navTitle[lang]}>
          <p className="meta">{footer.navTitle[lang]}</p>
          <ul>
            {menuNav.map((k) => (
              <li key={k}>
                <Link href={href(lang, k)}>{routes[k].label[lang]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="foot-contact">
          <p className="meta">{footer.contactTitle[lang]}</p>
          <ContactDetails lang={lang} compact />
        </div>
        <div className="foot-legal">
          <span>
            © {new Date().getFullYear()} NUCLÉUS. {t.footer.rights}
          </span>
          <Link className="link" href={href(lang, "legal")}>
            {routes.legal.label[lang]}
          </Link>
          <Link className="link" href={`/${lang}/design-system`}>
            {t.nav.system}
          </Link>
        </div>
      </div>
    </footer>
  );
}
