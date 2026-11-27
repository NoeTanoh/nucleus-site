import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { Symbol } from "./Symbol";

export function SiteFooter({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span className="brand">
          <Symbol />
          NUCLÉUS
        </span>
        <span className="signature">Intelligence. Technology. Creativity.</span>
        <Link className="link" href={`/${lang}/design-system`}>
          {t.nav.system}
        </Link>
        <span>
          © {new Date().getFullYear()} NUCLÉUS. {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
