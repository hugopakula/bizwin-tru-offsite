import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WinnerCard from "@/components/winners/WinnerCard";
import { WINNERS } from "@/lib/winners";

export const metadata: Metadata = {
  title: "Past Winners — Classi",
  description: "Real winners, real upgrades — travelers who booked economy on Classi and flew business.",
};

export default function PastWinnersPage() {
  return (
    <>
      <Nav solid />
      <main className="min-h-screen bg-ink pt-32 pb-24 text-paper">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Past winners
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl uppercase tracking-wide sm:text-5xl">
            Real winners. Real upgrades.
          </h1>
          <p className="mt-4 max-w-xl text-paper/70">
            Every traveler below paid a normal economy fare and flew business
            instead, free — found out at check-in, same as you would.
          </p>

          <Link
            href="/#book"
            className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-gold-soft"
          >
            Book your flight
          </Link>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WINNERS.map((winner) => (
              <WinnerCard key={winner.id} winner={winner} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
