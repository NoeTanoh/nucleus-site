"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Dict, Locale } from "@/lib/i18n";
import type { NucleusNode } from "./three/NucleusScene";
import { Symbol } from "./Symbol";

gsap.registerPlugin(useGSAP);

const NucleusScene = dynamic(() => import("./three/NucleusScene"), { ssr: false });

const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let webglCache: boolean | null = null;
const getWebgl = () => {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
};
const noop = () => () => {};

export function Hero({ lang, t, nodes }: { lang: Locale; t: Dict["hero"]; nodes: NucleusNode[] }) {
  const router = useRouter();
  const root = useRef<HTMLElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, getMotion, () => false);
  const webgl = useSyncExternalStore(noop, getWebgl, () => true);

  useGSAP(
    () => {
      if (getMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-title .line > span", { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.25)
        .from(".hero-foot > *", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.1 }, 0.9);
    },
    { scope: root },
  );

  const words = t.tagline.split(" ");

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero-canvas">
        {webgl ? (
          <NucleusScene nodes={nodes} reducedMotion={reduced} onSelect={(slug) => router.push(`/${lang}/poles/${slug}`)} />
        ) : (
          <div className="wrap" style={{ height: "100%", display: "grid", placeItems: "center end" }}>
            <Symbol className="orbit-map" title={t.noWebgl} />
          </div>
        )}
      </div>
      <div className="wrap hero-content">
        <h1 id="hero-title" className="display hero-title">
          <span className="sr-only">NUCLÉUS — </span>
          {words.map((w) => (
            <span className="line" key={w}>
              <span>{w}</span>
            </span>
          ))}
        </h1>
        <div className="hero-foot">
          <p className="lede">{t.lead}</p>
          {webgl ? <span className="hero-hint">{t.hint}</span> : <span />}
          <Link className="btn" href={`/${lang}#poles`}>
            {t.explore}
            <svg viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3v14M4 11l6 6 6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
