"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/content/site";
import { INTRO_KEY as KEY } from "@/lib/introGate";

const MIN_MS = 2200;
const MAX_MS = 7000;

/**
 * Opening sequence: the symbol is drawn stroke by stroke while the scene loads,
 * then the curtain lifts. Shown once per browser session. An inline script in
 * the layout sets data-intro="off" before paint for return visits and for
 * reduced motion, so the overlay never flashes in those cases.
 */
export function Intro({ lang, progress, onDone }: { lang: Locale; progress: number; onDone: () => void }) {
  const [state, setState] = useState<"on" | "leaving" | "off">("on");
  const [shown, setShown] = useState(0);
  const start = useRef(0);
  const target = useRef(progress);
  const done = useRef(onDone);
  useEffect(() => {
    target.current = progress;
    done.current = onDone;
  });

  const finish = () => {
    setState((s) => (s === "on" ? "leaving" : s));
  };

  // Skip entirely when the layout script already turned it off.
  useEffect(() => {
    if (document.documentElement.dataset.intro === "off") {
      done.current();
      return;
    }
    start.current = performance.now();
    document.documentElement.dataset.introRunning = "";
    let raf = 0;
    let value = 0;
    const tick = (now: number) => {
      const elapsed = now - start.current;
      // Never run ahead of real loading, and never finish before MIN_MS.
      const cap = Math.min(target.current, elapsed / MIN_MS);
      const goal = elapsed > MAX_MS ? 1 : cap;
      value += (goal - value) * 0.08;
      if (goal - value < 0.002) value = goal;
      setShown(value);
      if (value >= 1) {
        setState((s) => (s === "on" ? "leaving" : s));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (state !== "leaving") return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    delete document.documentElement.dataset.introRunning;
    done.current();
    const id = window.setTimeout(() => setState("off"), 900);
    return () => window.clearTimeout(id);
  }, [state]);

  if (state === "off") return null;

  const pct = Math.round(shown * 100);
  return (
    <div className="intro-overlay" data-state={state} aria-hidden={state === "leaving"}>
      <div className="intro-mark">
        <svg viewBox="-4 -4 296 372" aria-hidden>
          <polygon className="s1" pathLength={1} points="0,0 127,125 88,164 56,133 56,309 0,364" />
          <polygon className="s2" pathLength={1} points="76,210 288,0 288,364 161,238 200,198 232,229 232,133 76,289" />
        </svg>
        <span className="intro-word">NUCLÉUS</span>
      </div>
      <div className="intro-foot">
        <span className="meta" role="status" aria-live="polite">
          <span className="sr-only">{ui.loading[lang]} </span>
          <span aria-hidden>{String(pct).padStart(3, "0")}</span>
          <span className="sr-only">%</span>
        </span>
        <span className="intro-bar" aria-hidden>
          <i style={{ transform: `scaleX(${shown})` }} />
        </span>
        <button type="button" className="link intro-skip" onClick={finish}>
          {ui.skipIntro[lang]}
        </button>
      </div>
    </div>
  );
}
