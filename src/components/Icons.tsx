export function ArrowRight({ className = "h-3 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 10" fill="none" className={className} aria-hidden="true">
      <path d="M0 5h14.5M10.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Plus({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Check({ className = "h-3.5 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 12" fill="none" className={className} aria-hidden="true">
      <path d="M1 6.5 5.5 11 15 1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function Dash({ className = "h-px w-4" }: { className?: string }) {
  return <span className={`inline-block bg-current opacity-40 ${className}`} aria-hidden="true" />;
}
