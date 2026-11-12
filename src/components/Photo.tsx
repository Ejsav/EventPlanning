import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  /** CSS aspect ratio, e.g. "4/5". */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Focal point for object-position, e.g. "50% 30%". */
  focus?: string;
  caption?: string;
  fill?: boolean;
}

/** Framed, art-directed image with an optional editorial caption. */
export function Photo({ src, alt, ratio = "4/5", sizes, priority, className = "", focus = "50% 50%", caption, fill }: Props) {
  const frame = (
    <div className={`plate ${fill ? "h-full w-full" : ""}`} style={fill ? undefined : { aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        quality={72}
        className="object-cover"
        style={{ objectPosition: focus }}
      />
    </div>
  );
  if (!caption) return <div className={className}>{frame}</div>;
  return (
    <figure className={className}>
      {frame}
      <figcaption className="mt-3 font-serif text-[0.9375rem] italic text-granite">{caption}</figcaption>
    </figure>
  );
}
