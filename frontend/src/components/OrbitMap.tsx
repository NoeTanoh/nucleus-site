import { poles } from "@/content/poles";

/** Flat diagram of the nucleus: seven nodes on one orbit, the current pôle highlighted. */
export function OrbitMap({ active }: { active: string }) {
  const r = 80;
  return (
    <svg className="orbit-map" viewBox="-110 -110 220 220" aria-hidden>
      <circle r={r} fill="none" stroke="rgba(232,230,225,.22)" strokeWidth="0.75" />
      <circle r={r * 0.55} fill="none" stroke="rgba(232,230,225,.12)" strokeWidth="0.75" strokeDasharray="1 4" />
      <polygon points="0,-15 13,-7.5 13,7.5 0,15 -13,7.5 -13,-7.5" fill="#16181C" stroke="#C6A56B" strokeWidth="0.75" />
      {poles.map((p, i) => {
        const a = (i / poles.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        const on = p.slug === active;
        return (
          <g key={p.slug}>
            {on && <line x1="0" y1="0" x2={x} y2={y} stroke="#C6A56B" strokeWidth="0.75" />}
            <circle cx={x} cy={y} r={on ? 6 : 3} fill={on ? "#C6A56B" : "#E8E6E1"} fillOpacity={on ? 1 : 0.5} />
            {on && <circle cx={x} cy={y} r="13" fill="none" stroke="#C6A56B" strokeOpacity=".5" strokeWidth="0.75" />}
          </g>
        );
      })}
    </svg>
  );
}
