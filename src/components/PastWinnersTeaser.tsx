import Link from "next/link";
import WinnerCard from "@/components/winners/WinnerCard";
import { WINNERS } from "@/lib/winners";

export default function PastWinnersTeaser() {
  const featured = WINNERS.slice(0, 4);

  return (
    <section id="past-winners" className="scroll-mt-24 bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Past winners
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-paper md:text-4xl">
              Real winners. Real upgrades.
            </h2>
          </div>
          <Link
            href="/past-winners"
            className="rounded-full border border-paper/25 px-5 py-2 text-sm text-paper transition-colors hover:border-paper/60"
          >
            See all winners
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((winner) => (
            <WinnerCard key={winner.id} winner={winner} />
          ))}
        </div>
      </div>
    </section>
  );
}
