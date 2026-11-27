import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { approach, cta, href, intro, routes, sectors, ui, work, type RouteKey } from "@/content/site";
import { Symbol } from "./Symbol";

/** Opening block of every inner page: index number, title, lead. */
export function PageHead({
  lang,
  page,
  index,
  title,
  lead,
}: {
  lang: Locale;
  page: RouteKey;
  index: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="page-head">
      <div className="wrap grid-12">
        <p className="meta">
          <span className="code">{index}</span> {routes[page].label[lang]}
        </p>
        <h1 className="display">{title}</h1>
        <p className="lede">{lead}</p>
      </div>
    </header>
  );
}

/** Home §3: one statement, three offset columns. */
export function IntroSection({ lang }: { lang: Locale }) {
  const items = [intro.vision, intro.approach, intro.value];
  return (
    <section className="section intro-split" aria-labelledby="intro-title">
      <div className="wrap grid-12">
        <h2 id="intro-title" className="display statement">
          {intro.title[lang]}
        </h2>
        <dl className="intro-cols">
          {items.map((it, i) => (
            <div key={it.label.en} style={{ "--i": i } as React.CSSProperties}>
              <dt className="meta">
                <span className="code">0{i + 1}</span> {it.label[lang]}
              </dt>
              <dd>{it.text[lang]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Home §5 and the expertise page: a numbered sequence on one rail. */
export function ApproachSteps({ lang, headingLevel = 2 }: { lang: Locale; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <section className="section approach" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="grid-12 approach-head">
          <H id="approach-title" className="heading">
            {approach.title[lang]}
          </H>
          <p className="lede">{approach.lead[lang]}</p>
        </div>
        <ol className="rail">
          {approach.steps.map((s, i) => (
            <li key={s.title.en}>
              <span className="rail-num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.title[lang]}</h3>
              <p>{s.text[lang]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Placeholder used wherever real content is still to come. Never filled with invented items. */
export function EmptyState({ lang, text, label }: { lang: Locale; text: string; label?: string }) {
  return (
    <div className="empty">
      <span className="empty-num" aria-hidden>
        00
      </span>
      <div>
        <p className="meta">{label ?? ui.comingSoon[lang]}</p>
        <p className="empty-text">{text}</p>
      </div>
    </div>
  );
}

/** Home §7: work teaser. Stays empty until real case studies exist. */
export function WorkTeaser({ lang }: { lang: Locale }) {
  return (
    <section className="section work-teaser" aria-labelledby="work-title">
      <div className="wrap grid-12">
        <div className="work-head">
          <h2 id="work-title" className="heading">
            {work.title[lang]}
          </h2>
          <p className="lede">{work.lead[lang]}</p>
          <Link className="link" href={href(lang, "work")}>
            {routes.work.label[lang]}
          </Link>
        </div>
        <EmptyState lang={lang} text={work.empty[lang]} />
      </div>
    </section>
  );
}

/** Home §8: sectors as one continuous line of type on ivory. */
export function SectorsBand({ lang }: { lang: Locale }) {
  return (
    <section className="section audiences" aria-labelledby="sectors-title">
      <div className="wrap grid-12">
        <h2 id="sectors-title" className="heading">
          {sectors.title[lang]}
        </h2>
        <ul className="audience-flow">
          {sectors.list.map((s) => (
            <li key={s.en}>{s[lang]}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Closing call to action, shared by home and inner pages. */
export function CtaBand({ lang }: { lang: Locale }) {
  return (
    <section className="section cta" aria-labelledby="cta-title">
      <div className="wrap grid-12">
        <Symbol className="cta-mark" />
        <h2 id="cta-title" className="display">
          {cta.title[lang]}
        </h2>
        <div className="cta-side">
          <p className="lede">{cta.text[lang]}</p>
          <Link className="btn" href={href(lang, "contact")}>
            {ui.start[lang]}
          </Link>
        </div>
      </div>
    </section>
  );
}
