import Image from "next/image";
import BookingWidget from "@/components/BookingWidget";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full flex-col justify-end overflow-hidden pt-28">
      <Image
        src="/classi-hero.webp"
        alt="Etihad Airways first-class suite with leather seating and champagne service"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-16 md:px-10">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl uppercase leading-[1.08] tracking-normal text-paper sm:text-6xl sm:tracking-[0.03em] md:text-7xl">
            For winners
            <br />
            everywhere.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/90 sm:text-xl">
            Book economy.{" "}
            <span className="font-medium text-gold">
              Fly business — up to 95% cheaper
            </span>{" "}
            than buying it outright.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#book"
              className="rounded-full bg-gold px-7 py-3 text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:bg-gold-soft"
            >
              Search flights
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-paper/80 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
            >
              See how it works
            </a>
          </div>
        </div>

        <div id="book" className="scroll-mt-28">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
