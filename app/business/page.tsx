import type { Metadata } from "next";
import Image from "next/image";

import Marquee from "@/components/marquee";
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
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: "For Business & Corporates",
  description:
    "Direct access to talent pipelines, government stakeholders and institutional partners across the India-Japan corridor, with full protocol and coordination support.",
};

export default function BusinessPage() {
  return (
    <>
      <PageHero
        ghost="CORPORATES"
        eyebrow="For business & corporates"
        title="Years of cold outreach, compressed into days."
        lead="We give companies moving across the India-Japan corridor direct access to the people, institutions and policymakers that decide whether an expansion works."
      />

      <Opportunity />
      <WhatWeProvide />

      <Marquee
        items={["INDIA", "JAPAN"]}
        duration={30}
        className="border-y border-line bg-ink"
      />

      <Sectors />
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
          <Reveal variant="scale" className="order-2 lg:order-1 lg:pt-12">
            <figure className="photo-frame border border-line">
              <Image
                src="/timeline/09-robotics-facility.webp"
                alt="Chief Minister Yogi Adityanath and Governor Kotaro Nagasaki at a Japanese robotics facility."
                width={1280}
                height={904}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="h-full w-full object-cover"
              />
            </figure>
            <figcaption className="mt-4 text-xs leading-relaxed text-dim">
              Industrial cooperation between Uttar Pradesh and Yamanashi Prefecture,
              discussed on the factory floor.
            </figcaption>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={business.opportunity.title}
              title="Two unknowns, solved at once."
            />

            {business.opportunity.paragraphs.map((para, i) => (
              <Reveal key={i} variant="up" ms={140 + i * 100} as="p">
                <span className="mt-7 block text-base leading-relaxed text-muted sm:text-lg">
                  {para}
                </span>
              </Reveal>
            ))}

            <Reveal variant="up" ms={340}>
              <div className="mt-10 grid grid-cols-2 gap-px border-t border-line bg-line/60">
                {[
                  { k: "Japanese & international", v: "companies engaging India" },
                  { k: "Indian businesses", v: "building across Japan" },
                ].map((item) => (
                  <div key={item.k} className="bg-ink px-5 py-6">
                    <p className="text-sm font-medium text-fg">{item.k}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-dim">{item.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ What we provide --- */

function WhatWeProvide() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-paper py-24 text-paper-ink sm:py-32">
      <GhostWord vw={16} tone="paper">
        PROVIDE
      </GhostWord>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="What we provide"
          tone="light"
          title="Four kinds of access, arranged end to end."
        />

        <div className="mt-16 grid gap-px bg-paper-line/70 sm:grid-cols-2">
          {business.provide.map((item, i) => (
            <IndexCard
              key={item.index}
              index={item.index}
              title={item.title}
              body={item.body}
              ms={i * 100}
              tone="light"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Sectors --- */

function Sectors() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Sectors we work across"
          title="Fourteen sectors, one corridor."
          lead="Delegates represent organisations spanning heavy industry, deep tech, finance and public institutions, alongside prefectural governments and Japanese universities."
        />

        <ul className="mt-16 grid gap-px bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
          {business.sectors.map((sector, i) => (
            <li
              key={sector}
              data-reveal="up"
              style={delay((i % 3) * 70 + Math.floor(i / 3) * 60)}
              className="group flex items-center gap-3 bg-ink px-0 py-5 transition-colors duration-500 hover:bg-ink-card sm:gap-4 sm:px-6 sm:py-6"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 flex-none rounded-full bg-vermilion transition-transform duration-500 group-hover:scale-[2.2]"
              />
              <span className="text-[0.95rem] leading-snug text-muted transition-colors duration-500 group-hover:text-fg">
                {sector}
              </span>
            </li>
          ))}

          {/* 14 sectors over 3 columns leave one cell unfilled, which would
              paint the parent's hairline colour as a solid block. */}
          <li aria-hidden className="hidden bg-ink lg:block" />
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Closing CTA --- */

function ClosingCTA() {
  return (
    <section className="relative flex min-h-[28rem] items-center overflow-hidden border-t border-line">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/timeline/02-delegation-received-tokyo.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      </div>

      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 py-20 lg:px-10">
        <Reveal variant="fade">
          <Eyebrow>Get in touch</Eyebrow>
        </Reveal>

        <h2 className="mt-7 max-w-2xl text-[clamp(1.8rem,3.8vw,2.9rem)] leading-[1.12]">
          <span className="line-mask">
            <span>Shorten the timeline on your India-Japan expansion.</span>
          </span>
        </h2>

        <Reveal variant="up" ms={180}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Tell us which side of the corridor you are on and what you need from it. We
            will map the access from there.
          </p>
        </Reveal>

        <Reveal variant="up" ms={280} className="mt-10 flex flex-wrap gap-3">
          <CTA href="/contact">Start a conversation</CTA>
          <CTA href="/universities" variant="ghost">
            For institutions
          </CTA>
        </Reveal>
      </div>
    </section>
  );
}
