/**
 * The Sound & Stone mark: a single stone resting on the horizon of the Sound,
 * with its reflection broken into two ripples beneath. Wordmark set in the
 * display serif with an italic ampersand.
 */
export function Mark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <circle cx="20" cy="15" r="7.25" fill="currentColor" />
      <path d="M3 23.5h34" stroke="currentColor" strokeWidth="1.25" />
      <path d="M11 28h18M15.5 32h9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap ${className}`}>
      <Mark className="h-7 w-7 shrink-0" />
      <span className="font-serif text-[1.45rem] leading-none tracking-[-0.01em]" style={{ fontVariationSettings: '"opsz" 48' }}>
        Sound <em className="font-light italic text-cranberry">&amp;</em> Stone
      </span>
    </span>
  );
}
