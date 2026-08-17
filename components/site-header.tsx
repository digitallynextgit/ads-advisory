"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { ArrowIcon } from "./ui";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Condense on scroll; retract when scrolling down, return when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Close the drawer whenever the route changes. Adjusting state during render
  // is React's recommended way to reset on a changed input; no effect needed.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || menuOpen
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-5 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3 py-5"
            aria-label="The ADS Advisors, home"
          >
            <Mark />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] tracking-tight text-fg">
                The ADS Advisors
              </span>
              <span className="mt-1 text-[0.58rem] font-semibold tracking-[0.28em] text-dim uppercase">
                India&nbsp;&middot;&nbsp;Japan
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative py-2 text-[0.8rem] font-medium tracking-[0.1em] uppercase transition-colors duration-300 ${
                  isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-saffron to-vermilion transition-transform duration-500 ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn btn-primary hidden !px-5 !py-2.5 !text-[0.7rem] lg:inline-flex"
            >
              Start a conversation
              <ArrowIcon />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-saffron lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress, driven by <ScrollFx /> */}
        <div
          id="scroll-progress"
          aria-hidden
          className="h-px w-full origin-left scale-x-0 bg-gradient-to-r from-saffron to-vermilion"
        />
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col bg-ink-deep/97 backdrop-blur-2xl transition-[opacity,visibility] duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <nav
          className="mt-28 flex flex-1 flex-col justify-center gap-1 px-8"
          aria-label="Mobile"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline justify-between border-b border-line/60 py-5 transition-all duration-700"
              style={{
                transitionTimingFunction: "var(--ease-out-expo)",
                transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(24px)",
              }}
            >
              <span className="font-display text-3xl text-fg transition-colors duration-300 group-hover:text-saffron">
                {item.label}
              </span>
              <span className="outline-index text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}

          <Link
            href="/contact"
            className="btn btn-primary mt-10 justify-center"
            style={{
              transitionDelay: menuOpen ? "480ms" : "0ms",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            Start a conversation
            <ArrowIcon />
          </Link>
        </nav>

        <div className="px-8 pb-10 text-xs tracking-widest text-dim uppercase">
          New Delhi &middot; Tokyo
        </div>
      </div>
    </>
  );
}

/** Monogram: two arcs meeting, the bridge motif, over the hinomaru dot. */
function Mark() {
  return (
    <span className="relative flex h-10 w-10 flex-none items-center justify-center">
      <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="none" stroke="var(--color-line)" />
        <path
          d="M9 25c0-7 4.9-12 11-12s11 5 11 12"
          fill="none"
          stroke="url(#markGradient)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="20" cy="25" r="3.1" fill="var(--color-vermilion)" />
        <defs>
          <linearGradient id="markGradient" x1="9" y1="13" x2="31" y2="25">
            <stop stopColor="var(--color-saffron)" />
            <stop offset="1" stopColor="var(--color-vermilion)" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
