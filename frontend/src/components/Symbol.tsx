type Props = {
  className?: string;
  /** "brand" = navy + orange (light backgrounds), "reverse" = white + orange (dark backgrounds) */
  tone?: "brand" | "reverse";
  title?: string;
};

/** Vector redraw of the NUCLÉUS symbol (two interlocking strokes forming an N/M). */
export function Symbol({ className, tone = "reverse", title }: Props) {
  const left = tone === "brand" ? "var(--navy)" : "var(--paper)";
  return (
    <svg
      viewBox="0 0 288 364"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id="nx-orange" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#FC5E02" />
          <stop offset="0.75" stopColor="#FC6E04" />
          <stop offset="1" stopColor="#FDB022" />
        </linearGradient>
      </defs>
      <polygon fill={left} points="0,0 127,125 88,164 56,133 56,309 0,364" />
      <polygon
        fill="url(#nx-orange)"
        points="76,210 288,0 288,364 161,238 200,198 232,229 232,133 76,289"
      />
    </svg>
  );
}
