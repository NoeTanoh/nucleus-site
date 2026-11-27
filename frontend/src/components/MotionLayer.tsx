"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-driven motion for everything below the hero. Elements matching these
 * selectors fade and rise into place as they enter the viewport, staggered
 * within their group. The styles only apply when <html> has the "motion" class,
 * which the layout's inline script sets for JS-enabled, full-motion browsers,
 * so content is never hidden without JavaScript or with reduced motion.
 */
const GROUPS = [
  ".intro-split .statement",
  ".intro-cols > div",
  ".poles-head > *",
  ".pole-index > li",
  ".section-more",
  ".approach-head > *",
  ".rail > li",
  ".work-head",
  ".work-teaser .empty",
  ".audiences .heading",
  ".audience-flow > li",
  ".cta .display",
  ".cta-side",
  ".page-head .meta",
  ".page-head .display",
  ".page-head .lede",
  ".ledger > div",
  ".quote",
  ".solution-list > li",
  ".plain-list > li",
  ".kinds > li",
  ".details > div",
  ".split > .heading",
  ".section > .wrap > .empty",
  ".contact .intro",
  ".contact-form",
  ".foot-brand",
  ".foot-nav",
  ".foot-contact",
  ".pole-hero .title-col > *",
  ".pole-hero .orbit-col",
  ".service-list > div",
  ".outcomes",
];
const LINES = [".rail", ".pole-index"];

export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;

    // Masked headings have no visible area until revealed, so they are watched
    // through their parent instead.
    const proxies = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const targets = proxies.get(e.target) ?? [e.target as HTMLElement];
          targets.forEach((t) => (t.dataset.in = ""));
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    const watch = (el: HTMLElement) => {
      if (!el.matches(".display, .heading, .statement") || !el.parentElement) return io.observe(el);
      const parent = el.parentElement;
      const list = proxies.get(parent);
      if (list) list.push(el);
      else {
        proxies.set(parent, [el]);
        io.observe(parent);
      }
    };

    for (const sel of GROUPS) {
      const els = document.querySelectorAll<HTMLElement>(sel);
      let parent: Element | null = null;
      let i = 0;
      els.forEach((el) => {
        if (el.dataset.reveal !== undefined) return;
        i = el.parentElement === parent ? i + 1 : 0;
        parent = el.parentElement;
        el.dataset.reveal = "";
        el.style.setProperty("--ri", String(Math.min(i, 8)));
        watch(el);
      });
    }
    for (const sel of LINES) {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.dataset.line = "";
        io.observe(el);
      });
    }

    // Scroll progress bar and the slow drift of the closing symbol.
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    const marks = document.querySelectorAll<HTMLElement>(".cta-mark");
    let raf = 0;
    const frame = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      marks.forEach((m) => {
        const r = m.parentElement!.getBoundingClientRect();
        const p = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0 → 1 across the viewport
        m.style.transform = `translate3d(0, ${(0.5 - p) * 80}px, 0) rotate(${(p - 0.5) * 10}deg)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden />;
}
