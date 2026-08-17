"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * A single client-side motion engine mounted once in the root layout.
 *
 * Pages stay Server Components and opt into motion declaratively:
 *   data-reveal="up|fade|left|right|scale|mask|wipe"   scroll reveal
 *   data-parallax="-0.15"                             translateY factor
 *   data-count="200" [data-count-prefix] [data-count-suffix]
 *
 * Re-scans on route change so client navigation keeps working.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    /* ---------------------------------------------- scroll progress bar --- */
    const bar = document.getElementById("scroll-progress");
    let progressFrame = 0;
    const onScrollProgress = () => {
      if (progressFrame) return;
      progressFrame = requestAnimationFrame(() => {
        progressFrame = 0;
        if (!bar) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        bar.style.transform = `scaleX(${ratio})`;
      });
    };
    window.addEventListener("scroll", onScrollProgress, { passive: true });
    onScrollProgress();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScrollProgress);
      if (progressFrame) cancelAnimationFrame(progressFrame);
    });

    if (reduced) {
      // Honour the OS setting: show everything, run no animation loops.
      document
        .querySelectorAll<HTMLElement>("[data-reveal],.line-mask,[data-count]")
        .forEach((el) => {
          el.dataset.shown = "true";
          if (el.dataset.count) {
            el.textContent = `${el.dataset.countPrefix ?? ""}${el.dataset.count}${
              el.dataset.countSuffix ?? ""
            }`;
          }
        });
      return () => cleanups.forEach((fn) => fn());
    }

    /* ------------------------------------------------------ reveal pass --- */
    const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal], .line-mask");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "true";
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    /*
      Anything already within (or above) the fold must appear immediately.

      This threshold used to be `innerHeight * 0.92`, which left a dead band:
      an element sitting in the bottom 8% of the first screen was too low for
      the initial pass, while the observer's -12% bottom rootMargin meant it
      would not trigger either until the user scrolled. The hero CTAs land
      exactly there, so they stayed at opacity 0 on load on every desktop size.
      Revealing everything above the viewport's bottom edge closes the gap.
    */
    const revealIfInView = (el: HTMLElement) => {
      if (el.dataset.shown === "true") return true;
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.dataset.shown = "true";
        revealObserver.unobserve(el);
        return true;
      }
      return false;
    };

    revealTargets.forEach((el) => {
      if (!revealIfInView(el)) revealObserver.observe(el);
    });

    /*
      Decorative ghost bands get a second, lenient observer (no bottom margin,
      any pixel counts). The main observer's -12% bottom margin is right for
      copy, but the footer band lives at the very bottom of the page: on every
      portrait phone/tablet size it sits entirely inside that excluded 12% even
      when scrolled all the way down, so it never fired and the footer wordmark
      never drew. Bands are full-strength texture, so any-pixel reveal is fine.
    */
    const bandObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "true";
          bandObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px", threshold: 0 },
    );
    document
      .querySelectorAll<HTMLElement>(".ghost-band[data-reveal]")
      .forEach((el) => el.dataset.shown !== "true" && bandObserver.observe(el));

    // Late-loading fonts and images can shift content into view after the first
    // pass, so sweep once more when the page has fully settled.
    const resweep = () => requestAnimationFrame(() => revealTargets.forEach(revealIfInView));
    if (document.readyState === "complete") resweep();
    else window.addEventListener("load", resweep, { once: true });

    // Belt and braces for the last screenful: once the page is scrolled to the
    // bottom, nothing below can ever enter the observed region, so show
    // whatever is still pending rather than leave it stuck at opacity 0.
    const bottomSweep = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0 || window.scrollY < max - 2) return;
      revealTargets.forEach((el) => {
        if (el.dataset.shown !== "true") el.dataset.shown = "true";
      });
      window.removeEventListener("scroll", bottomSweep);
    };
    window.addEventListener("scroll", bottomSweep, { passive: true });

    cleanups.push(() => {
      window.removeEventListener("load", resweep);
      window.removeEventListener("scroll", bottomSweep);
      revealObserver.disconnect();
      bandObserver.disconnect();
    });

    /* -------------------------------------------------------- counters --- */
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const countObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          countObserver.unobserve(el);

          const target = Number(el.dataset.count ?? 0);
          const prefix = el.dataset.countPrefix ?? "";
          const suffix = el.dataset.countSuffix ?? "";
          const duration = 1600;
          const start = performance.now();

          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
            el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    counters.forEach((el) => countObserver.observe(el));
    cleanups.push(() => countObserver.disconnect());

    /* ------------------------------------------- scroll progress tracks --- */
    /*
      Writes a 0..1 `--progress` onto each [data-progress-track] as it passes
      the viewport, for scroll-linked fills like the photo timeline's spine.
      0 when the track's top reaches the anchor line, 1 when its bottom does,
      so the fill sits level with whichever entry you are reading.
    */
    const tracks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-progress-track]"),
    );
    if (tracks.length) {
      let trackFrame = 0;
      const applyTracks = () => {
        trackFrame = 0;
        const anchor = window.innerHeight * 0.55;
        for (const el of tracks) {
          const rect = el.getBoundingClientRect();
          // Skip work while far off-screen, but only after pinning the value to
          // its end state, or a fast scroll past can strand it part-filled.
          if (rect.bottom < 0) {
            el.style.setProperty("--progress", "1");
            continue;
          }
          if (rect.top > window.innerHeight) {
            el.style.setProperty("--progress", "0");
            continue;
          }
          const ratio = rect.height > 0 ? (anchor - rect.top) / rect.height : 0;
          el.style.setProperty(
            "--progress",
            Math.min(1, Math.max(0, ratio)).toFixed(4),
          );
        }
      };
      const onTrackScroll = () => {
        if (!trackFrame) trackFrame = requestAnimationFrame(applyTracks);
      };
      window.addEventListener("scroll", onTrackScroll, { passive: true });
      window.addEventListener("resize", onTrackScroll);
      applyTracks();
      cleanups.push(() => {
        window.removeEventListener("scroll", onTrackScroll);
        window.removeEventListener("resize", onTrackScroll);
        if (trackFrame) cancelAnimationFrame(trackFrame);
      });
    }

    /* -------------------------------------------------------- parallax --- */
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (parallaxEls.length) {
      let frame = 0;
      const apply = () => {
        frame = 0;
        const mid = window.innerHeight / 2;
        for (const el of parallaxEls) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
          const factor = Number(el.dataset.parallax) || 0;
          const offset = (rect.top + rect.height / 2 - mid) * factor;
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        }
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(apply);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      apply();
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) cancelAnimationFrame(frame);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
