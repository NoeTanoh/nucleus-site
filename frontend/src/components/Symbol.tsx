type Props = {
  className?: string;
  title?: string;
};

/**
 * Vector redraw of the NUCLÉUS symbol (two interlocking strokes forming an N/M),
 * in the brand two-tone: navy stroke + orange stroke (NUCLEUS Prime guidelines).
 */
export function Symbol({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 288 364"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <polygon fill="var(--ink)" points="0,0 127,125 88,164 56,133 56,309 0,364" />
      <polygon fill="var(--accent)" points="76,210 288,0 288,364 161,238 200,198 232,229 232,133 76,289" />
    </svg>
  );
}
