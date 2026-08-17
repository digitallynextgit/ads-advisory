import type { Metadata } from "next";
import Image from "next/image";

import EnquiryForm from "@/components/enquiry-form";
import { delay, Eyebrow, GhostWord, PageHero, Reveal } from "@/components/ui";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with The ADS Advisors about participating in the Indo-Japan Delegation Engagement Programme, or about engagement across the India-Japan corridor.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        ghost="CONTACT"
        eyebrow="Get in touch"
        title="Tell us what you want out of the room."
        lead="Share who you are and the outcome you are after. We will tell you candidly whether we can get you there."
      />

      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Details />

            <div>
              <Reveal variant="fade">
                <Eyebrow>Enquiry form</Eyebrow>
              </Reveal>

              <Reveal variant="up" ms={100}>
                <h2 className="mt-5 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.15]">
                  Send us the essentials.
                </h2>
              </Reveal>

              <Reveal variant="up" ms={180} className="mt-10">
                <EnquiryForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}

/* -------------------------------------------------------------- Details --- */

function Details() {
  const rows = [
    { label: "Contact", value: contact.person, href: null },
    { label: "Phone", value: contact.phone, href: contact.phoneHref },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <div className="lg:sticky lg:top-32 lg:h-fit">
      <Reveal variant="fade">
        <Eyebrow>The ADS Advisors</Eyebrow>
      </Reveal>

      <dl className="mt-9">
        {rows.map((row, i) => (
          <div
            key={row.label}
            data-reveal="up"
            style={delay(i * 90)}
            className="border-t border-line py-6"
          >
            <dt className="text-[0.66rem] font-semibold tracking-[0.22em] text-dim uppercase">
              {row.label}
            </dt>
            <dd className="mt-2.5">
              {row.href ? (
                <a
                  href={row.href}
                  className="text-lg break-all text-fg transition-colors duration-300 hover:text-saffron"
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-lg text-fg">{row.value}</span>
              )}
            </dd>
          </div>
        ))}

        <div data-reveal="up" style={delay(270)} className="border-y border-line py-6">
          <dt className="text-[0.66rem] font-semibold tracking-[0.22em] text-dim uppercase">
            Office
          </dt>
          <dd className="mt-2.5 text-lg leading-relaxed text-fg">
            {contact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <Reveal variant="scale" ms={220}>
        <figure className="photo-frame mt-10 border border-line">
          <Image
            src="/timeline/05-nagasaki-speech.webp"
            alt="Yamanashi Governor Kotaro Nagasaki speaking at the Embassy of India in Tokyo."
            width={1600}
            height={898}
            sizes="(min-width: 1024px) 34vw, 92vw"
            className="h-full w-full object-cover"
          />
        </figure>
      </Reveal>

      <Reveal variant="fade" ms={320}>
        <p className="mt-5 border-l border-vermilion pl-4 text-xs leading-relaxed text-dim">
          We operate in rooms where diplomatic sensitivity matters. Confidentiality and
          protocol are built into how we work.
        </p>
      </Reveal>
    </div>
  );
}

/* ---------------------------------------------------------- Closing band --- */

function ClosingBand() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-deep py-16">
      <GhostWord vw={15} place="middle">{"NEW DELHI \u00B7 TOKYO"}</GhostWord>

      {/*
        Each separator dot lives inside the item it precedes, so a wrap can never
        strand a lone dot at the end or start of a line. Below `sm` the row
        stacks and the dots are dropped entirely.
      */}
      <ul className="relative mx-auto flex w-full max-w-[1800px] flex-col items-center gap-y-3 px-5 text-center text-[0.68rem] tracking-[0.22em] text-dim uppercase sm:flex-row sm:flex-wrap sm:justify-center sm:gap-y-2 sm:px-6 lg:px-10">
        {[
          "Government to Government",
          "Government to Institutions",
          "Business to Business",
        ].map((label, i) => (
          <li key={label} className="flex items-center">
            <span>{label}</span>
            {/*
              The dot trails its own label, so a wrap ends a line with it rather
              than starting the next line with it. Symmetric margin supplies the
              spacing on both sides, so the row needs no gap of its own.
            */}
            {i < 2 && (
              <span
                aria-hidden
                className="mx-6 hidden h-1 w-1 shrink-0 rounded-full bg-vermilion sm:block lg:mx-10"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
