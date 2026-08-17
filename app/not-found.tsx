import { CTA, Eyebrow, Reveal } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center overflow-hidden"
      >
        <span className="outline-hero text-[38vw] leading-none">404</span>
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 py-32 text-center lg:px-10">
        <Reveal variant="fade">
          <Eyebrow>Page not found</Eyebrow>
        </Reveal>

        <h1 className="mx-auto mt-7 max-w-2xl text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.12]">
          This door does not open onto anything.
        </h1>

        <Reveal variant="up" ms={160}>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted">
            The page you were looking for has moved or never existed. Let us point you
            back to the room.
          </p>
        </Reveal>

        <Reveal variant="up" ms={260} className="mt-10 flex flex-wrap justify-center gap-3">
          <CTA href="/">Back to home</CTA>
          <CTA href="/contact" variant="ghost">
            Contact us
          </CTA>
        </Reveal>
      </div>
    </section>
  );
}
