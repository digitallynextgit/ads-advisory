import Image from "next/image";
import Link from "next/link";

import Marquee from "@/components/marquee";
import PhotoTimeline from "@/components/photo-timeline";
import {
  ArrowIcon,
  CTA,
  delay,
  Eyebrow,
  GhostWord,
  IndexCard,
  Reveal,
  SectionHeading,
} from "@/components/ui";
import {
  business,
  flagship,
  positioning,
  timeline,
  timelineIntro,
  whatWeDo,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Marquee
        items={[
          "GOVERNMENT TO GOVERNMENT",
          "GOVERNMENT TO INSTITUTIONS",
          "BUSINESS TO BUSINESS",
        ]}
      />

      <Positioning />
      <WhatWeDo />
      <Flagship />
      <Timeline />
      <WhoWeServe />
      <ClosingCTA />
    </>
  );
}

/* ------------------------------------------------------------------ Hero --- */

/*
 * Height is pinned to the viewport, not floored by it. With `min-h-[100svh]`
 * the hero's height was decided entirely by viewport WIDTH (a constant 998px
 * from 1440px up) and ignored height, so the CTAs fell below the fold on every
 * laptop-height screen. Every vertical measurement below is now a clamp with a
 * `vh` term so the whole block scales with the height actually available.
 */
function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[26rem] flex-col overflow-hidden pt-[clamp(5rem,11vh,8rem)] pb-[clamp(1rem,3.5vh,3.25rem)]">
      {/*
        Backdrop is a montage of four REAL, unaltered photographs from the firm's
        own archive (2560x1640, composed 2x2 from the highest-resolution sources).
        Nothing is retouched or generated, and since the source upgrade nothing is
        enlarged either: every panel is centre-cropped at <= 1.0x of native.
        Composing them is what makes the asset tall and wide enough that a
        hero-sized object-cover DOWNSCALES it, which is why the single stretched
        photo that started this looked soft.
        Rebuild with scratchpad/montage.js if the source photographs change.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 scale-105" data-parallax="0.06">
          <Image
            src="/brand/hero-delegation.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.9]"
          />
        </div>

        {/*
          Veils. Only two jobs: keep the left column dark enough for the headline
          and hold the very bottom for the lead and CTAs. Everywhere else the
          photographs are left alone - the right-hand stop is fully transparent
          and the vertical veil clears by a third of the way up.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-0 w-full max-w-[1800px] flex-1 flex-col px-5 sm:px-6 lg:px-10">
        {/*
          Empty on purpose. The outlined INDIA / JAPAN wordmarks that sat here
          were removed, but this spacer stays: it is the only flexible item in
          the column, so it absorbs the free space that holds the copy against
          the bottom of the hero, and being `min-h-0` + `overflow-hidden` it is
          also what gives when space runs out. Paired with `shrink-0` on the copy
          below, that is what keeps the headline and CTAs on screen at every
          viewport size. Deleting it would push the copy to the top and break the
          100vh fit.
        */}
        <div aria-hidden className="pointer-events-none min-h-0 flex-1 overflow-hidden" />

        <div className="shrink-0 pt-[clamp(1.5rem,4vh,3.5rem)]">
          <Reveal variant="fade">
            <Eyebrow>The India-Japan bridge</Eyebrow>
          </Reveal>

          <h1 className="mt-[clamp(0.75rem,2.2vh,1.5rem)] max-w-5xl text-[clamp(1.4rem,min(4.8vw,4.9vh),4.25rem)] leading-[1.06]">
            <span className="line-mask" style={delay(80)}>
              <span>The working bridge between</span>
            </span>
            <span className="line-mask" style={delay(200)}>
              <span>governments, institutions</span>
            </span>
            <span className="line-mask" style={delay(320)}>
              <span>
                and businesses across{" "}
                <em className="bg-gradient-to-r from-saffron to-vermilion bg-clip-text not-italic text-transparent">
                  India and Japan.
                </em>
              </span>
            </span>
          </h1>

          {/* Lead stays left, CTAs sit against the right edge of the shell. */}
          <div className="mt-[clamp(1rem,2.9vh,2.75rem)] border-t border-line pt-[clamp(0.9rem,2.6vh,2.25rem)]">
            <div className="flex flex-col gap-[clamp(1rem,2.6vh,2.5rem)] lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              {/*
                Dropped below 720px of viewport height. The identical sentence is
                the pull quote in the Positioning section immediately below, so
                nothing is lost, and it buys ~130px for the CTAs on laptops.
              */}
              <Reveal variant="up" ms={420} className="short:hidden">
                <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  {positioning.body}
                </p>
              </Reveal>

              <Reveal
                variant="up"
                ms={540}
                className="flex flex-none flex-wrap gap-3"
              >
                <CTA href="/contact">Start a conversation</CTA>
                <CTA href="/about" variant="ghost">
                  Who we are
                </CTA>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-line lg:block short:lg:hidden"
      >
        <span
          className="block h-1/2 w-full bg-gradient-to-b from-saffron to-vermilion"
          style={{ animation: "scroll-cue 2.4s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Positioning --- */

function Positioning() {
  return (
    <section className="bg-paper py-24 text-paper-ink sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        {/*
          Stacked rows, not side-by-side columns. Splitting this into columns
          starved the statement into a narrow measure (four short lines with a
          dead half-row beside it). As rows, the statement is uncapped and runs
          the full shell width, so it sets in two long lines at any size and the
          section needs no filler to justify the container.
        */}
        <div className="flex flex-col gap-y-8 sm:gap-y-11">
          <Reveal variant="fade">
            <Eyebrow tone="light">Positioning</Eyebrow>
          </Reveal>

          {/*
            Two explicit lines rather than one reflowing string: at desktop
            widths between ~1100 and 1800 the single string broke to three.
            Each half still wraps freely below `lg`, so narrow screens are
            unaffected. The vw term is tuned so neither half wraps on desktop.
          */}
          <h2 className="text-[clamp(1.45rem,2.85vw,3.35rem)] leading-[1.14]">
            {positioning.leadLines.map((line, i) => (
              <span key={line} className="line-mask" style={delay(i * 130)}>
                <span>{line}</span>
              </span>
            ))}
          </h2>

          {/* Uncapped so it can set as a single line on desktop; the size is
              tied to viewport width for the same reason. */}
          <Reveal variant="up" ms={300}>
            <p className="border-l-2 border-vermilion pl-3 text-base leading-relaxed text-paper-muted sm:pl-4 sm:text-lg lg:text-[clamp(0.95rem,1.16vw,1.3rem)]">
              {positioning.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ What We Do --- */

function WhatWeDo() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <GhostWord vw={18}>WHAT WE DO</GhostWord>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="What we do"
          title="Three corridors, one operating discipline."
          lead="Every mandate we take on runs through one of three relationships, and each is built the same way: government-backed, tightly curated, followed through long after the room empties."
        />

        <div className="mt-16 grid gap-px bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map((item, i) => (
            <IndexCard
              key={item.index}
              index={item.index}
              title={item.title}
              body={item.body}
              ms={i * 110}
            />
          ))}

          {/*
            The hairlines are the parent's background showing through `gap-px`,
            so an unfilled cell paints that colour as a solid block. Three cards
            in two columns leave one such cell, but only between sm and lg.
          */}
          <div aria-hidden className="hidden bg-ink sm:block lg:hidden" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Flagship --- */

function Flagship() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-raised py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading eyebrow={flagship.eyebrow} title={flagship.title} />

            <Reveal variant="up" ms={180}>
              <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">
                {flagship.body}
              </p>
            </Reveal>

            {/*
              Three columns only from `sm`. At 320px each column is ~77px, which
              clipped "~200" and squeezed the labels to three lines; below `sm`
              each stat becomes a row with the figure beside its label instead.
            */}
            <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-line pt-10 sm:grid-cols-3">
              {flagship.stats.map((stat, i) => (
                <div key={stat.label} data-reveal="up" style={delay(i * 120)}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex items-baseline gap-4 sm:block">
                    <span
                      data-count={stat.value}
                      data-count-prefix={stat.prefix}
                      data-count-suffix={stat.suffix}
                      className="font-display block flex-none bg-gradient-to-br from-saffron to-vermilion bg-clip-text text-4xl text-transparent tabular-nums sm:text-5xl"
                    >
                      {stat.prefix}0{stat.suffix}
                    </span>
                    <span className="block text-xs leading-snug text-dim sm:mt-3">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <Reveal variant="up" ms={280}>
              <div className="mt-12 flex flex-wrap gap-3">
                <CTA href="/universities">For universities</CTA>
                <CTA href="/business" variant="ghost">
                  For business
                </CTA>
              </div>
            </Reveal>
          </div>

          {/* Photo pair: the inset sits against the main frame, not the column */}
          <div>
            <div className="relative">
              <Reveal variant="scale" className="photo-frame border border-line">
                <Image
                  src="/timeline/09-robotics-facility.webp"
                  alt="Chief Minister Yogi Adityanath inspecting a collaborative robot arm at a Japanese robotics facility."
                  width={1280}
                  height={904}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="h-full w-full object-cover"
                />
              </Reveal>

              <div
                data-reveal="up"
                style={delay(220)}
                className="photo-frame absolute -bottom-10 -left-6 hidden w-2/5 border border-line shadow-2xl sm:block lg:-left-12"
              >
                <Image
                  src="/timeline/10-closed-door-mou.webp"
                  alt="Closed-door meeting between the Uttar Pradesh and Yamanashi delegations."
                  width={1280}
                  height={767}
                  sizes="20vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <Reveal
              variant="fade"
              ms={340}
              className="mt-16 border-l border-vermilion pl-5 sm:mt-20"
            >
              <p className="text-xs leading-relaxed text-dim">
                Built on the Memorandum of Understanding signed between Uttar Pradesh and
                Japan&rsquo;s Yamanashi Prefecture.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- Photo timeline --- */

function Timeline() {
  return (
    <section id="timeline" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <GhostWord vw={16}>TIMELINE</GhostWord>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Photo timeline"
          title={timelineIntro.title}
          lead={timelineIntro.body}
          align="center"
        />

        <div className="mt-20">
          <PhotoTimeline entries={timeline} />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Who we serve --- */

function WhoWeServe() {
  const panels = [
    {
      href: "/universities",
      kicker: "For universities & institutions",
      title: "A seat at the table, not a seat in the hall.",
      body: "A dedicated, time-bound slot to present your institution before visiting CEOs and ministers, built around placements, exchange, research and investment.",
      image: "/timeline/04-ambassador-panel.webp",
      alt: "India's Ambassador to Japan speaking on a panel at the India-Japan Governors' Network launch.",
    },
    {
      href: "/business",
      kicker: "For business & corporates",
      title: "Years of cold outreach, compressed into days.",
      body: "Direct access to talent pipelines, policy stakeholders and counterparts across the India-Japan corridor, with full protocol and coordination support.",
      image: "/timeline/08-cm-with-japanese-leaders.webp",
      alt: "Chief Minister Yogi Adityanath with Japanese government and industry leaders.",
    },
  ];

  return (
    <section className="border-t border-line bg-ink">
      <div className="grid lg:grid-cols-2">
        {panels.map((panel, i) => (
          <Link
            key={panel.href}
            href={panel.href}
            data-reveal="up"
            style={delay(i * 140)}
            className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden border-line p-8 sm:p-12 [&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-b-0"
          >
            <div aria-hidden className="absolute inset-0 -z-10">
              <Image
                src={panel.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-25 transition-all duration-[1.4s] group-hover:scale-105 group-hover:opacity-40"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/55" />
            </div>

            <Eyebrow>{panel.kicker}</Eyebrow>

            <h2 className="mt-6 max-w-md text-[clamp(1.6rem,2.6vw,2.35rem)] leading-[1.14]">
              {panel.title}
            </h2>

            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted">
              {panel.body}
            </p>

            <span className="link-arrow mt-9 text-saffron">
              Explore
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Closing CTA --- */

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-paper-ink sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[7vw] flex justify-center overflow-hidden"
      >
        <GhostWord vw={20} tone="paper">
          CONNECT
        </GhostWord>
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 text-center lg:px-10">
        <Reveal variant="fade">
          <Eyebrow tone="light">
            Get in touch
          </Eyebrow>
        </Reveal>

        <h2 className="mx-auto mt-7 max-w-3xl text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.1]">
          <span className="line-mask">
            <span>Access like this is rare. Make it count.</span>
          </span>
        </h2>

        <Reveal variant="up" ms={180}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-paper-muted">
            Tell us who you are and what you want out of the room. We will tell you
            candidly whether we can get you there.
          </p>
        </Reveal>

        <Reveal variant="up" ms={280} className="mt-11 flex flex-wrap justify-center gap-3">
          <CTA href="/contact">Start a conversation</CTA>
          <CTA href="/about" variant="ghost-dark">
            Read our story
          </CTA>
        </Reveal>

        {/*
          Full-strength paper-muted: at /70 this blended to #8A8F99 on the cream
          background, a 2.9:1 ratio that fails AA for 12px text. Separators are
          rendered per item so a wrap can never leave a bullet leading a line.
        */}
        <Reveal variant="fade" ms={380}>
          <ul className="mt-16 flex flex-wrap justify-center gap-y-1 text-xs leading-relaxed tracking-[0.18em] text-paper-muted uppercase">
            {business.sectors.slice(0, 6).map((sector, i, all) => (
              <li key={sector} className="flex items-center">
                {sector}
                {/*
                  The separator trails its own label rather than leading the next
                  one, so a wrap ends a line with the bullet instead of starting
                  one with it. It also carries the only horizontal spacing in the
                  row, so it must stay visible at every width or neighbouring
                  items collide ("SEMICONDUCTORSELECTRONICS").
                */}
                {i < all.length - 1 && (
                  <span aria-hidden className="px-3 text-paper-muted/60">
                    &middot;
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
