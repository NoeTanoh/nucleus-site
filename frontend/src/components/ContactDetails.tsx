import type { Locale } from "@/lib/i18n";
import { contactPage, ui } from "@/content/site";

/**
 * Official contact details. Values are not known yet, so every line shows a
 * visible placeholder instead of an invented address or number.
 */
export function ContactDetails({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const rows = [contactPage.email, contactPage.phone, contactPage.address, contactPage.social];
  return (
    <dl className={compact ? "details details-compact" : "details"}>
      {rows.map((r) => (
        <div key={r.en}>
          <dt className="meta">{r[lang]}</dt>
          <dd>
            <span className="placeholder">{ui.toBeProvided[lang]}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
