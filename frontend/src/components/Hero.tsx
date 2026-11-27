"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Component, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Dict, Locale } from "@/lib/i18n";
import { hero, href, ui } from "@/content/site";
import type { NucleusNode, Tier } from "./three/NucleusScene";
import { Intro } from "./Intro";
import { ScenePoster } from "./ScenePoster";

gsap.registerPlugin(useGSAP);

// The 3D bundle (three.js + scene) is split out and only fetched in the browser.
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

/** Phones, small screens and machines with few cores get the light scene. */
const getTier = (): Tier => {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 900;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return coarse || small || cores <= 4 || memory <= 4 ? "low" : "high";
};
const noop = () => () => {};

/** Any exception thrown while the scene renders swaps it for the static poster. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function Hero({ lang, t, nodes }: { lang: Locale; t: Dict["hero"]; nodes: NucleusNode[] }) {
  const router = useRouter();
  const root = useRef<HTMLElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, getMotion, () => false);
  const webgl = useSyncExternalStore(noop, getWebgl, () => true);
  const tier = useSyncExternalStore(noop, getTier, () => "high" as Tier);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Pause rendering when the hero is off screen or the tab is hidden.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setVisible(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const { contextSafe } = useGSAP({ scope: root });
  const reveal = contextSafe(() => {
    if (getMotion()) return;
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(".hero-title .line > span", { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0)
      .from(".hero-foot > *", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 }, 0.6);
  });

  const showScene = webgl && !failed;
  const poster = <ScenePoster label={t.noWebgl} />;
  const words = t.tagline.split(" ");

  return (
    <>
      <Intro lang={lang} progress={!showScene || ready ? 1 : 0.6} onDone={reveal} />
      <section ref={root} className="hero" aria-labelledby="hero-title">
        <div className="hero-canvas">
          {showScene ? (
            <SceneBoundary fallback={poster}>
              <NucleusScene
                nodes={nodes}
                reducedMotion={reduced}
                tier={tier}
                paused={!visible}
                onReady={() => setReady(true)}
                onError={() => setFailed(true)}
                onSelect={(slug) => router.push(`/${lang}/poles/${slug}`)}
              />
            </SceneBoundary>
          ) : (
            poster
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
            <p className="lede">{hero.subtitle[lang]}</p>
            {showScene ? <span className="hero-hint">{t.hint}</span> : <span />}
            <div className="hero-ctas">
              <Link className="btn btn-outline" href={href(lang, "expertise")}>
                {ui.discover[lang]}
              </Link>
              <Link className="btn" href={href(lang, "contact")}>
                {ui.start[lang]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
