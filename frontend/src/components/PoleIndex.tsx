import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Pole } from "@/content/poles";

export function PoleIndex({ lang, items }: { lang: Locale; items: Pole[] }) {
  return (
    <ul className="pole-index">
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/${lang}/poles/${p.slug}`}
            className="pole-row"
            style={{ "--hue": p.hue } as React.CSSProperties}
          >
            <span className="pole-code" aria-hidden>
              {p.code}
            </span>
            <span className="pole-name">{p.name}</span>
            <span className="pole-lead">{p.lead[lang]}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
