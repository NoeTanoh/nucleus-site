import { poles } from "@/content/poles";

/** Flat diagram of the nucleus: seven nodes on one orbit, the current pôle highlighted. */
export function OrbitMap({ active }: { active: string }) {
  const r = 80;
  return (
    <svg className="orbit-map" viewBox="-110 -110 220 220" aria-hidden>
      <circle r={r} fill="none" stroke="rgba(223,230,237,.28)" strokeWidth="1" />
      <circle r={r * 0.55} fill="none" stroke="rgba(223,230,237,.14)" strokeWidth="1" strokeDasharray="2 4" />
      <circle r="16" fill="#FC5E02" />
      <circle r="26" fill="none" stroke="#FC5E02" strokeOpacity=".35" />
      {poles.map((p, i) => {
        const a = (i / poles.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        const on = p.slug === active;
        return (
          <g key={p.slug}>
            {on && <line x1="0" y1="0" x2={x} y2={y} stroke={p.hue} strokeWidth="1.5" />}
            <circle cx={x} cy={y} r={on ? 9 : 4.5} fill={on ? p.hue : "#DFE6ED"} fillOpacity={on ? 1 : 0.55} />
            {on && <circle cx={x} cy={y} r="16" fill="none" stroke={p.hue} strokeOpacity=".5" />}
          </g>
        );
      })}
    </svg>
  );
}
