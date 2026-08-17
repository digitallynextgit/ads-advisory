import Link from "next/link";
import { contact, nav, site } from "@/lib/content";
import { ArrowIcon, GhostWord, Reveal } from "./ui";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-deep">
      {/* Oversized outlined wordmark anchoring the page */}
      <GhostWord vw={19} place="bottom">ADS ADVISORS</GhostWord>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 pt-20 pb-12 lg:px-10">
        {/* Contact column is widened at md: the old 1fr left it ~179px, about
            8px short of the email address, which then broke mid-domain. */}
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-[1.35fr_0.85fr_1.2fr]">
          <Reveal variant="up">
            <p className="font-display text-2xl leading-snug text-fg sm:text-3xl">
              Where diplomacy opens the door, we make sure the right people
              <span className="text-saffron"> walk through it.</span>
            </p>
            <Link
              href="/contact"
              className="btn btn-ghost mt-8 !px-6 !py-3 !text-[0.72rem]"
            >
              Start a conversation
              <ArrowIcon />
            </Link>
          </Reveal>

          <Reveal variant="up" ms={100}>
            <h2 className="text-[0.68rem] font-semibold tracking-[0.24em] text-dim uppercase">
              Navigate
            </h2>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-saffron"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="up" ms={200}>
            <h2 className="text-[0.68rem] font-semibold tracking-[0.24em] text-dim uppercase">
              Contact
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="text-fg">{contact.person}</li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="transition-colors duration-300 hover:text-saffron"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                {/*
                  `break-all` chopped this at whatever glyph ran out of room
                  ("...advisors.c" / "om"). An explicit <wbr /> after the "@"
                  gives the only sensible break point, and overflow-wrap only
                  kicks in if even that will not fit.
                */}
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors duration-300 [overflow-wrap:anywhere] hover:text-saffron"
                >
                  {contact.email.split("@")[0]}@<wbr />
                  {contact.email.split("@")[1]}
                </a>
              </li>
              <li className="pt-2 leading-relaxed text-dim">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-[0.7rem] tracking-[0.16em] text-dim uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-3">
            <span>New Delhi</span>
            <span
              aria-hidden
              className="animate-seal inline-block h-1.5 w-1.5 rounded-full bg-vermilion"
            />
            <span>Tokyo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
