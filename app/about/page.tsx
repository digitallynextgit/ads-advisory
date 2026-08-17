import type { Metadata } from "next";
import Image from "next/image";

import {
  CTA,
  delay,
  Eyebrow,
  GhostWord,
  IndexCard,
  PageHero,
  Reveal,
  SectionHeading,
} from "@/components/ui";
import { approach, story, team, whyWeExist } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The ADS Advisors operates in the gap between diplomatic intent and working execution, translating high-level India-Japan relationships into engagements institutions and companies can act on.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        ghost="ABOUT"
        eyebrow="Who we are"
        title="The gap between diplomatic intent and working execution."
        lead="India and Japan have no shortage of goodwill between them. What has always been harder to find is the person who makes sure the right institution is sitting across the table when it matters."
      />

      <OurStory />
      <WhyWeExist />
      <OurApproach />
      <Team />
      <ClosingCTA />
    </>
  );
}

/* ------------------------------------------------------------- Our story --- */

function OurStory() {
  return (
    <section className="bg-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[auto_1fr] lg:gap-20">
          <Reveal variant="fade" className="lg:sticky lg:top-32 lg:h-fit lg:pt-2">
            <Eyebrow>Our story</Eyebrow>
          </Reveal>

          {/* Uncapped: the story column now fills the shell. Type scales with
              viewport width from lg so the longer measure still reads. */}
          <div>
            {story.paragraphs.slice(0, 2).map((para, i) => (
              <Reveal key={i} variant="up" ms={i * 90} as="p">
                <span
                  className={`block leading-relaxed ${
                    i === 0
                      ? "text-xl text-fg sm:text-2xl lg:text-[clamp(1.5rem,1.85vw,2.15rem)]"
                      : "mt-7 text-base text-muted sm:text-lg lg:text-[clamp(1.05rem,1.3vw,1.5rem)]"
                  }`}
                >
                  {para}
                </span>
              </Reveal>
            ))}

            {/* Pull quote */}
            <Reveal variant="up" ms={120}>
              <blockquote className="my-14 border-l-2 border-vermilion py-2 pl-7">
                <p className="font-display text-2xl leading-snug text-fg sm:text-[1.9rem] lg:text-[clamp(1.9rem,2.6vw,3rem)]">
                  &ldquo;{story.pullQuote}&rdquo;
                </p>
              </blockquote>
            </Reveal>

            {story.paragraphs.slice(2).map((para, i) => (
              <Reveal key={i} variant="up" ms={i * 90} as="p">
                {/*
                  Spacing is driven off the map index, not `first:`. Each span is
                  the only child of its own <p> wrapper, so `:first-child` matched
                  every time and silently cancelled the gap between paragraphs.
                */}
                <span
                  className={`block text-base leading-relaxed text-muted sm:text-lg lg:text-[clamp(1.05rem,1.3vw,1.5rem)] ${
                    i === 0 ? "" : "mt-7"
                  }`}
                >
                  {para}
                </span>
              </Reveal>
            ))}

            <Reveal variant="scale" ms={100}>
              <figure className="photo-frame mt-16 border border-line">
                <Image
                  src="/timeline/03-traditional-welcome.webp"
                  alt="A young girl applies a ceremonial tilak to the Chief Minister during a traditional welcome in Japan."
                  width={1280}
                  height={854}
                  sizes="(min-width: 1024px) 62vw, 92vw"
                  className="h-full w-full object-cover"
                />
              </figure>
              <figcaption className="mt-4 text-xs leading-relaxed text-dim">
                A traditional welcome extended to the Chief Minister during the visit,
                reflecting the warmth alongside the formal diplomacy of the engagement.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Why we exist --- */

function WhyWeExist() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-paper-ink sm:py-32">
      <GhostWord vw={19} tone="paper" place="bottom">
        WHY WE EXIST
      </GhostWord>

      <div className="relative mx-auto w-full max-w-4xl px-5 sm:px-6 text-center lg:px-10">
        <Reveal variant="fade">
          <Eyebrow tone="light">{whyWeExist.title}</Eyebrow>
        </Reveal>

        <h2 className="mt-7 text-[clamp(1.7rem,3.6vw,2.8rem)] leading-[1.14]">
          <span className="line-mask">
            <span>Not just present in the room,</span>
          </span>
          <span className="line-mask" style={delay(130)}>
            <span className="text-vermilion">positioned to walk out with something.</span>
          </span>
        </h2>

        <Reveal variant="up" ms={220}>
          <p className="mx-auto mt-9 max-w-2xl text-base leading-relaxed text-paper-muted sm:text-lg">
            {whyWeExist.body}
          </p>
        </Reveal>

        <Reveal variant="up" ms={320}>
          <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2">
            {[
              "A placement pipeline",
              "A research partnership",
              "An investment conversation",
              "A signed commitment",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full border border-paper-line px-4 py-2 text-xs font-medium tracking-wide text-paper-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Our approach --- */

function OurApproach() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <GhostWord vw={17}>APPROACH</GhostWord>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Our approach"
          title="Four things we will not trade away."
          lead="These are not values on a wall. They are the constraints that decide which mandates we take, how many slots exist, and what happens after the delegation leaves."
        />

        <div className="mt-16 grid gap-px bg-line/60 sm:grid-cols-2">
          {approach.map((item, i) => (
            <IndexCard
              key={item.index}
              index={item.index}
              title={item.title}
              body={item.body}
              ms={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Team --- */

function Team() {
  return (
    <section className="border-t border-line bg-ink-raised py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Team & leadership"
          title="The people who pick up the phone."
        />

        <div className="mt-16 grid gap-px bg-line/60 lg:grid-cols-2">
          {team.map((member, i) => (
            <article
              key={member.name}
              data-reveal="up"
              style={delay(i * 130)}
              className="card-lift group flex flex-col bg-ink p-6 transition-colors duration-500 hover:bg-ink-card sm:p-10"
            >
              {/*
                Stacked below `sm`: at 320px a 64px monogram beside the text left
                only ~132px of measure, wrapping the role onto four lines and
                leaving the circle floating against a block 2.5x its height.
              */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                {/* Monogram */}
                <span className="relative flex h-14 w-14 flex-none items-center justify-center rounded-full border border-line sm:h-16 sm:w-16">
                  <span className="font-display text-lg tracking-tight text-saffron">
                    {member.initials}
                  </span>
                  <span
                    aria-hidden
                    className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-vermilion"
                  />
                </span>

                <div>
                  <h3 className="text-xl leading-tight text-fg sm:text-2xl">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-[0.72rem] font-semibold tracking-[0.16em] text-dim uppercase">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* `lg:grow` lets the bio absorb the height difference between the
                  two cards so both tag rows sit level at the same card bottom. */}
              <p className="mt-8 text-[0.95rem] leading-relaxed text-muted lg:grow">
                {member.bio}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-7">
                {member.focus.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[0.7rem] tracking-wide text-dim transition-colors duration-500 group-hover:border-saffron/40 group-hover:text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Closing CTA --- */

function ClosingCTA() {
  return (
    <section className="border-t border-line bg-ink py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col items-start justify-between gap-8 px-5 sm:px-6 lg:flex-row lg:items-center lg:px-10">
        <Reveal variant="up">
          <h2 className="max-w-xl text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.14]">
            Work with a team that stays in the room after the cameras leave.
          </h2>
        </Reveal>

        <Reveal variant="up" ms={140} className="flex flex-wrap gap-3">
          <CTA href="/contact">Start a conversation</CTA>
          <CTA href="/universities" variant="ghost">
            For institutions
          </CTA>
        </Reveal>
      </div>
    </section>
  );
}
