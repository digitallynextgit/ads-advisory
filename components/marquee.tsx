/**
 * Infinite horizontal band of outlined display type.
 * The track holds two identical halves and translates -50%, so the loop is seamless.
 */
export default function Marquee({
  items,
  duration = 46,
  className = "",
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
}) {
  const half = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex shrink-0 items-center">
          <span className="outline-band px-8 text-[clamp(2.2rem,6vw,5rem)] whitespace-nowrap">
            {item}
          </span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-vermilion/70" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y border-line py-8 ${className}`}
      style={
        {
          "--marquee-duration": `${duration}s`,
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        } as React.CSSProperties
      }
    >
      <div className="animate-marquee flex w-max">
        {half("a")}
        {half("b")}
      </div>
    </div>
  );
}
