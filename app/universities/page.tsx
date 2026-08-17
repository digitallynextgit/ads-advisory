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
import { universities } from "@/lib/content";

export const metadata: Metadata = {
  title: "For Universities & Institutions",
  description:
    "A direct, government-backed platform for Indian universities to present before visiting Japanese CEOs and ministers, structured around placements, exchange, research and investment.",
};

export default function UniversitiesPage() {
  return (
    <>
      <PageHero
        ghost="INSTITUTIONS"
        eyebrow="For universities & institutions"
        title="A seat at the table, not a seat in the hall."
        lead="A direct, government-backed platform to present your institution to a visiting delegation, built around the outcomes that actually matter to an academic institution."
      />

      <Opportunity />
      <WhatWeProvide />
      <Outcomes />
      <HowToParticipate />
      <ClosingCTA />
    </>
  );
}

/* ---------------------------------------------------------- Opportunity --- */

function Opportunity() {
  return (
    <section className="bg-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={universities.opportunity.title}
              title="Ordinary channels will not get you this room."
            />

            {universities.opportunity.paragraphs.map((para, i) => (
              <Reveal key={i} variant="up" ms={140 + i * 100} as="p">
                <span className="mt-7 block text-base leading-relaxed text-muted sm:text-lg">
                  {para}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" ms={120} className="lg:pt-12">
            <figure className="photo-frame border border-line">
              <Image
                src="/timeline/06-miyagi-vice-governor.webp"
                alt="The Miyagi Vice Governor speaking during a panel discussion at the India-Japan Governors' Network launch."
                width={900}
                height={506}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="h-full w-full object-cover"
              />
            </figure>
            <figcaption className="mt-4 text-xs leading-relaxed text-dim">
              Panel discussion at the launch of the India-Japan Governors&rsquo; Network,
              Indian Embassy, Tokyo.
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ What we provide --- */

function WhatWeProvide() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-raised py-24 sm:py-32">
      <GhostWord vw={16}>PROVIDE</GhostWord>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="What we provide"
          title="Five things that come with your slot."
        />

        <div className="mt-16 grid gap-px bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
          {universities.provide.map((item, i) => (
            <IndexCard
              key={item.index}
              index={item.index}
              title={item.title}
              body={item.body}
              ms={i * 95}
            />
          ))}

          {/*
            Filler tile completes the last row. It shows from `sm` up, not `lg`:
            five cards in two columns leave a sixth cell, and an unfilled cell
            paints the parent's hairline colour as a solid block.
          */}
          <div
            data-reveal="up"
            style={delay(500)}
            className="relative hidden flex-col justify-end overflow-hidden border-t border-line bg-ink p-8 sm:flex sm:p-9"
          >
            <div aria-hidden className="absolute inset-0">
              <Image
                src="/timeline/07-tottori-governor.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
            </div>

            <p className="relative font-display text-xl leading-snug text-fg">
              Precision over scale: the right ten institutions, not a hall full of names.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Outcomes --- */

function Outcomes() {
  return (
    <section className="bg-paper py-24 text-paper-ink sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Outcomes"
          tone="light"
          title="What we help you build toward."
          lead="A day in the room is the mechanism, not the point. These are the results the programme is structured to produce."
        />

        <div className="mt-16 grid gap-x-12 gap-y-px sm:grid-cols-2">
          {universities.outcomes.map((item, i) => (
            <div
              key={item.title}
              data-reveal="up"
              style={delay(i * 100)}
              className="group flex items-start gap-6 border-t border-paper-line py-9"
            >
              <span className="outline-index outline-index--paper mt-1 flex-none text-2xl">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="text-xl leading-snug text-paper-ink">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-paper-muted">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ How to participate --- */

function HowToParticipate() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="How to participate"
          title="Five steps from interest to the room."
        />

        {/*
          Laid out across the width rather than down a 768px column, which left
          most of an 1800px shell empty. Five abreast on `lg` also reads as the
          process it describes; two-up on `sm`, stacked below that.
        */}
        <ol className="relative mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-7">
          {/*
            Connector, only on the single-row layout. It sits on the vertical
            centre of the numbered nodes (top-4 = half of the h-8 node) and the
            nodes, being opaque, punch through it.
          */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-4 hidden h-px bg-gradient-to-r from-saffron/45 via-line to-transparent lg:block"
          />

          {universities.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal="up"
              style={delay(i * 110)}
              className="group relative"
            >
              <span
                aria-hidden
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-ink text-[0.68rem] font-semibold text-saffron transition-colors duration-500 group-hover:border-saffron"
              >
                {i + 1}
              </span>

              <h3 className="mt-6 text-xl leading-snug text-fg">{step.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Closing CTA --- */

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-raised py-24 sm:py-28">
      <GhostWord vw={19} place="bottom">RESERVE</GhostWord>

      <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-6 text-center lg:px-10">
        {/* text-balance belongs on the block, not the inline eyebrow, or it
            has no effect and "bulk" is left orphaned on its own line. */}
        <Reveal variant="fade" className="text-balance">
          <Eyebrow>Slots are curated, not sold in bulk</Eyebrow>
        </Reveal>

        <h2 className="mt-7 text-[clamp(1.8rem,3.8vw,2.9rem)] leading-[1.12]">
          <span className="line-mask">
            <span>Reserve your institution&rsquo;s slot.</span>
          </span>
        </h2>

        <Reveal variant="up" ms={180}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Tell us your accreditation, flagship programmes and the outcomes you are
            seeking. We will tell you candidly whether the fit is there.
          </p>
        </Reveal>

        <Reveal variant="up" ms={280} className="mt-10 flex flex-wrap justify-center gap-3">
          <CTA href="/contact">Confirm interest</CTA>
          <CTA href="/business" variant="ghost">
            For business
          </CTA>
        </Reveal>
      </div>
    </section>
  );
}
