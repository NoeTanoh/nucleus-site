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
            <span className="code" aria-hidden>
              {p.code}
            </span>
            <span className="pole-name">{p.name}</span>
            <span className="pole-lead">{p.lead[lang]}</span>
            <span className="pole-arrow" aria-hidden>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M3 10h14M11 4l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
