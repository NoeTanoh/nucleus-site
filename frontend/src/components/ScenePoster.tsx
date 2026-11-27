/**
 * Static stand-in for the 3D sculpture: used without WebGL, after a GPU error,
 * and while the scene bundle is still loading. Same composition as the scene:
 * a faceted core, a gold lattice, three convergence rings and seven nodes.
 */
export function ScenePoster({ label }: { label: string }) {
  const nodes = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
    return { x: 400 + Math.cos(a) * 300, y: 400 + Math.sin(a) * 120 };
  });
  return (
    <figure className="scene-poster">
      <svg viewBox="0 0 800 800" role="img" aria-label={label}>
        <defs>
          <radialGradient id="sp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#3D8FD6" stopOpacity="0.35" />
            <stop offset="1" stopColor="#3D8FD6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sp-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3D8FD6" />
            <stop offset="1" stopColor="#133360" />
          </linearGradient>
        </defs>
        <circle cx="400" cy="400" r="320" fill="url(#sp-glow)" />
        <g fill="none" stroke="#FC5E02" strokeWidth="1.2" opacity="0.8">
          <ellipse cx="400" cy="400" rx="300" ry="120" />
          <ellipse cx="400" cy="400" rx="250" ry="250" transform="rotate(60 400 400)" opacity="0.45" />
          <ellipse cx="400" cy="400" rx="270" ry="90" transform="rotate(-35 400 400)" opacity="0.6" />
        </g>
        <g stroke="#FC5E02" strokeWidth="0.8" fill="none" opacity="0.35">
          <polygon points="400,170 600,300 560,540 400,630 240,540 200,300" />
          <path d="M400 170 L400 630 M200 300 L560 540 M600 300 L240 540" />
        </g>
        <g stroke="#3D8FD6" strokeWidth="0.8">
          <polygon points="400,250 520,330 400,400" fill="url(#sp-face)" />
          <polygon points="520,330 500,480 400,400" fill="#1d4a86" />
          <polygon points="500,480 400,550 400,400" fill="#0f2a52" />
          <polygon points="400,550 300,480 400,400" fill="#163c6f" />
          <polygon points="300,480 280,330 400,400" fill="#2a62a8" />
          <polygon points="280,330 400,250 400,400" fill="#3d8fd6" />
        </g>
        <path d="M400 250 L520 330" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
        <g>
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 5 : 3.5} fill={i % 3 === 0 ? "#FC5E02" : "#133360"} />
          ))}
        </g>
      </svg>
      <figcaption className="meta">{label}</figcaption>
    </figure>
  );
}
