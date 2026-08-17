"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TimelineEntry } from "@/lib/content";

export default function PhotoTimeline({ entries }: { entries: TimelineEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + entries.length) % entries.length)),
    [entries.length],
  );

  useEffect(() => {
    if (openIndex === null) {
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
      return;
    }

    restoreFocusRef.current ??= document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : entries[openIndex];

  return (
    <>
      {/*
        `data-progress-track` makes <ScrollFx> write a 0..1 `--progress` here as
        the list passes the viewport, which the spine below reads. Doing it on
        the track (not per node) means one scroll handler for the whole list and
        no per-item observers.
      */}
      <ol className="relative mx-auto max-w-6xl" data-progress-track="">
        {/* Spine: a dim full-length rail with a saffron->vermilion fill that
            grows with scroll, and a lit cap riding its leading edge. */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[11px] w-px md:left-1/2 md:-translate-x-px"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-line to-transparent" />
          <div className="timeline-progress absolute inset-x-0 top-0 h-full bg-gradient-to-b from-saffron to-vermilion" />
          <span className="timeline-progress-cap absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-saffron" />
        </div>

        {entries.map((entry, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={entry.src} className="relative pb-16 pl-12 last:pb-0 md:pl-0">
              {/* Node */}
              <span
                aria-hidden
                data-reveal="scale"
                className="absolute top-2 left-0 flex h-6 w-6 items-center justify-center md:left-1/2 md:-translate-x-1/2"
              >
                <span className="absolute h-6 w-6 rounded-full border border-line bg-ink" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-vermilion" />
              </span>

              <div
                className={`md:grid md:grid-cols-2 md:items-center md:gap-14 ${
                  flip ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Photo */}
                <figure
                  data-reveal={flip ? "right" : "left"}
                  className={flip ? "md:pl-14" : "md:pr-14"}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`Enlarge photograph: ${entry.place}`}
                    className="photo-frame group block w-full cursor-zoom-in border border-line"
                  >
                    <Image
                      src={entry.src}
                      alt={entry.alt}
                      width={entry.width}
                      height={entry.height}
                      sizes="(min-width: 768px) 46vw, 92vw"
                      className="h-full w-full object-cover"
                      loading={i < 2 ? "eager" : "lazy"}
                    />

                    {/* Hover affordance */}
                    <span className="absolute right-4 bottom-4 z-10 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-fg/25 bg-ink/70 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </figure>

                {/* Caption */}
                <div
                  data-reveal={flip ? "left" : "right"}
                  style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                  className={`mt-6 md:mt-0 ${flip ? "md:pr-14 md:text-right" : "md:pl-14"}`}
                >
                  <div
                    className={`flex items-baseline gap-4 ${
                      flip ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="outline-index text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-dim uppercase">
                      {entry.place}
                    </span>
                  </div>

                  <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
                    {entry.caption}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/*
        Lightbox, portalled to <body>. The root layout animates <main>, which
        makes it a stacking context; rendering the dialog inline would trap it
        beneath the fixed header no matter how high its z-index.
        `active` is null during SSR, so createPortal only ever runs client-side.
      */}
      {active &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            className="fixed inset-0 z-[70] flex flex-col bg-ink-deep/96 backdrop-blur-xl"
            onClick={close}
          >
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-dim uppercase">
              {String((openIndex ?? 0) + 1).padStart(2, "0")} / {entries.length}
              <span className="mx-3 text-line">|</span>
              {active.place}
            </span>

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-saffron hover:text-saffron"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="m1 1 12 12M13 1 1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="90vw"
              className="animate-page-in h-auto max-h-full w-full max-w-5xl object-contain"
              priority
            />
          </div>

          <div
            className="flex items-center gap-6 border-t border-line px-6 py-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-none gap-2">
              <LightboxNav label="Previous photograph" onClick={() => step(-1)} flip />
              <LightboxNav label="Next photograph" onClick={() => step(1)} />
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-muted">
              {active.caption}
            </p>
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function LightboxNav({
  label,
  onClick,
  flip = false,
}: {
  label: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-saffron hover:text-saffron"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        style={flip ? { transform: "rotate(180deg)" } : undefined}
      >
        <path
          d="M1 7h11.5M8 2.5 12.5 7 8 11.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
