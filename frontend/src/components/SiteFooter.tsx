import type { Dict } from "@/lib/i18n";
import { Symbol } from "./Symbol";

export function SiteFooter({ t }: { t: Dict }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span className="brand">
          <Symbol />
          NUCLÉUS
        </span>
        <span>Intelligence. Technology. Creativity.</span>
        <span>
          © {new Date().getFullYear()} NUCLÉUS. {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
