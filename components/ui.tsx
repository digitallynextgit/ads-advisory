import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type RevealVariant = "up" | "fade" | "left" | "right" | "scale" | "mask" | "wipe";

/** Inline style carrying the stagger delay consumed by `[data-reveal]` in CSS. */
export function delay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

export function Reveal({
  children,
  variant = "up",
  ms = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  ms?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p" | "figure" | "article";
}) {
  return (
    <Tag data-reveal={variant} style={delay(ms)} className={className}>
      {children}
    </Tag>
  );
}

/** Small uppercase label preceded by the vermilion seal dot. */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={`eyebrow ${tone === "dark" ? "text-saffron" : "text-vermilion"} ${className}`}
    >
      {children}
    </span>
  );
}

/** Full-bleed hairline rule that spans the section. */
export function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-line/70 ${className}`} aria-hidden />;
}

/*
 * Ghost-word draw timing.
 *
 * GLYPH_PERIMETER_EM is the MEASURED length of the longest single contour of
 * each glyph, in em, in the site's own font (Inter ExtraBold, letter-spacing
 * -0.05em). Measured in-browser by binary-searching the smallest dash length at
 * which the parked glyph paints nothing (scratchpad/perimeter.js) - guessed
 * values were off by 2x for several letters. Longest contour, not total outline,
 * because SVG restarts the dash pattern on every subpath, and Inter builds
 * glyphs from overlapping subpaths (a K is a stem plus two separate arms).
 *
 * With one dash length for every glyph, an "I" finished in a fraction of the
 * time a "W" took and visibly snapped in - the "too fast" complaint. Sizing
 * each glyph's dash to its own perimeter makes every letter take the same time.
 */
const DASH_MARGIN = 1.5;
const DASH_MIN_EM = 3;
const GLYPH_PERIMETER_EM: Record<string, number> = {
  A: 3.6, B: 2.6, C: 3.5, D: 2.9, E: 3.8, F: 3.05, G: 4.1, H: 3.95, I: 1.85,
  J: 2.55, K: 1.85, L: 2.45, M: 6.45, N: 4.7, O: 2.3, P: 3.6, Q: 2.3, R: 3.55,
  S: 3.75, T: 2.7, U: 3.55, V: 3.6, W: 6.55, X: 4.5, Y: 3.05, Z: 4.0, "·": 0.6,
};
const DEFAULT_PERIMETER_EM = 4.7; // the largest measured value bar M/W: safe for an unlisted glyph

/**
 * Oversized outlined word used as section texture, drawn on when its section
 * scrolls into view.
 *
 * Rendered as SVG <text>, not HTML. Only SVG stroke can be dashed, and the
 * draw-on effect IS a dash animation: every glyph outline starts fully hidden
 * inside a dash gap and `stroke-dashoffset` slides to 0, so each letter traces
 * itself in like pen on paper. HTML `-webkit-text-stroke` cannot do this - the
 * earlier clip-path wipe merely uncovered a finished outline, and at the old
 * 6% stroke opacity even that was invisible.
 *
 * The size is COMPUTED, not hand-set per usage. Fixed `text-[Nvw]` values had
 * to be guessed per string and 11 of them ran wider than the viewport. Capping
 * the font size at `FILL / (length * EM_PER_CHAR)` vw keeps any word inside the
 * viewport at any width; `vw` is the design size and wins whenever the word
 * already fits.
 */
export function GhostWord({
  children,
  vw = 18,
  tone = "dark",
  place = "top",
  className = "",
}: {
  children: string;
  vw?: number;
  tone?: "dark" | "paper";
  /** Which edge of the section the band sits against. */
  place?: "top" | "bottom" | "middle";
  className?: string;
}) {
  // Widest measured glyph run for this weight/tracking is ~0.686em per char;
  // 0.70 leaves margin so the fit calculation stays safe.
  const EM_PER_CHAR = 0.7;
  const FILL = 98; // percent of the viewport the word may occupy at most
  const size = Math.min(vw, FILL / (children.length * EM_PER_CHAR));

  // Positioning lives here rather than at each call site. Usages had drifted to
  // eleven different offsets - several negative (`-top-10`, `-bottom-[5vw]`),
  // left over from when these words were oversized and meant to bleed off the
  // edge. Now that each one fits, a negative offset just shears it against the
  // section boundary, so every band gets the same inset and centring.
  // "middle" is hidden below sm: on phones the band there is barely larger
  // than the small-caps row it sits behind and the two tangle.
  const placement = {
    top: "top-8 sm:top-10",
    bottom: "bottom-8 sm:bottom-10",
    middle: "top-1/2 -translate-y-1/2 max-sm:hidden",
  }[place];

  const chars = Array.from(children);
  // Letters start on a stagger so the word writes left to right; the step
  // shrinks for long words so the last letter starts within ~0.9s of the first.
  const step = Math.min(90, 900 / chars.length);

  return (
    /*
      `data-reveal` sits on the CONTAINER and the glyphs animate off its
      `[data-shown]` state - the same pattern `.line-mask` uses. The band itself
      never fades (see .ghost-band in globals.css); it is only the scroll
      trigger, so the stroke is at full strength from the first frame and is
      simply drawn in.
    */
    <div
      aria-hidden
      data-reveal="fade"
      className={`ghost-band pointer-events-none absolute inset-x-0 overflow-hidden ${placement} ${className}`}
    >
      <svg
        className={`ghost-svg block w-full overflow-visible ${
          tone === "paper" ? "ghost-svg--paper" : ""
        }`}
        // Font size in vw on the <svg> so the SVG text - and the em-based dash
        // lengths - scale with the viewport exactly as the HTML version did.
        style={{ fontSize: `${size.toFixed(2)}vw`, height: `${size.toFixed(2)}vw` }}
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          className="ghost-text"
        >
          {chars.map((ch, i) => (
            <tspan
              key={`${ch}-${i}`}
              className="ghost-glyph"
              style={
                {
                  transitionDelay: `${Math.round(i * step)}ms`,
                  // Consumed by .ghost-glyph for stroke-dasharray/-dashoffset.
                  // A custom property, not the properties themselves: an inline
                  // stroke-dashoffset would outrank the [data-shown] rule that
                  // animates it to 0.
                  "--dash": `${Math.max(
                    DASH_MIN_EM,
                    (GLYPH_PERIMETER_EM[ch] ?? DEFAULT_PERIMETER_EM) * DASH_MARGIN,
                  ).toFixed(2)}em`,
                } as CSSProperties
              }
            >
              {/* NBSP: SVG collapses ordinary spaces between tspans. */}
              {ch === " " ? " " : ch}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arrow ${className}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 7h11.5M8 2.5 12.5 7 8 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CTA({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "ghost-dark";
  className?: string;
}) {
  const variants = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    "ghost-dark": "btn-ghost-dark",
  } as const;

  return (
    <Link href={href} className={`btn ${variants[variant]} ${className}`}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`link-arrow ${className}`}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

/**
 * Page masthead used by every inner page: an outlined ghost word behind a
 * serif title, framed by hairlines.
 */
export function PageHero({
  ghost,
  eyebrow,
  title,
  lead,
}: {
  ghost: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-ink pt-36 pb-16 sm:pt-44 sm:pb-24">
      {/* Ambient accent wash */}
      <div
        aria-hidden
        className="animate-orb pointer-events-none absolute -top-40 -right-32 h-[36rem] w-[36rem] rounded-full opacity-[0.16] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-vermilion) 0%, transparent 65%)",
        }}
      />

      {/* Outlined ghost word */}
      {/* Below sm the band moves up behind the h1; at the bottom it crossed the
          lead paragraph, which is small enough for the lines to tangle with. */}
      <GhostWord vw={20} place="bottom" className="max-sm:top-28 max-sm:bottom-auto">
        {ghost}
      </GhostWord>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <Reveal variant="fade">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,6.2vw,4.75rem)] leading-[1.02]">
          <span className="line-mask">
            <span>{title}</span>
          </span>
        </h1>

        {lead && (
          <Reveal variant="up" ms={180}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}

/** Section heading with an optional outlined index numeral. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  const isLight = tone === "light";
  return (
    /*
      No width cap on the block. `max-w-3xl` here forced every section title to
      wrap inside a 768px column with the rest of the shell left empty beside it.
      The title now runs the full width it is given - the whole shell in a
      one-column section, or its own column inside a grid - and only the lead
      keeps a cap, since it is body copy and needs a readable measure.
    */
    <div className={align === "center" ? "mx-auto text-center" : ""}>
      {eyebrow && (
        <Reveal variant="fade">
          <Eyebrow tone={isLight ? "light" : "dark"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal variant="up" ms={90}>
        {/*
          leading-[1.3] plus explicit vertical padding. At display sizes this
          serif's descenders (p, g, y) sit well below a tight line box, so any
          clipping context shaved them flat. The padding guarantees ink room
          regardless of what clips further up the tree.
        */}
        <h2
          className={`mt-5 py-[0.12em] text-[clamp(1.8rem,4.2vw,3.9rem)] leading-[1.3] ${
            isLight ? "text-paper-ink" : "text-fg"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal variant="up" ms={170}>
          {/* Capped at 800px: the title runs the full shell, but this is body
              copy and needs a readable measure rather than a 1700px line. */}
          <p
            className={`mt-6 max-w-[800px] text-base leading-relaxed sm:text-lg ${
              align === "center" ? "mx-auto" : ""
            } ${isLight ? "text-paper-muted" : "text-muted"}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Numbered card used for "What We Do", "What We Provide" and "Our Approach". */
export function IndexCard({
  index,
  title,
  body,
  ms = 0,
  tone = "dark",
}: {
  index: string;
  title: string;
  body: string;
  ms?: number;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <article
      data-reveal="up"
      style={delay(ms)}
      className={`card-lift group relative flex flex-col overflow-hidden border-t p-8 sm:p-9 ${
        isLight
          ? "border-paper-line bg-paper-2/40 hover:bg-paper-2/80"
          : "border-line bg-ink-raised/60 hover:bg-ink-card"
      }`}
    >
      <span
        className={`text-5xl sm:text-6xl ${
          isLight ? "outline-index outline-index--paper" : "outline-index"
        }`}
      >
        {index}
      </span>

      <h3
        className={`mt-8 text-2xl leading-snug ${isLight ? "text-paper-ink" : "text-fg"}`}
      >
        {title}
      </h3>

      <p
        className={`mt-4 text-[0.95rem] leading-relaxed ${
          isLight ? "text-paper-muted" : "text-muted"
        }`}
      >
        {body}
      </p>
    </article>
  );
}
