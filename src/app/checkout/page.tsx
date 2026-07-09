import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { importFlight, isBackendConfigured } from "@/lib/backend";
import {
  durationMinutes,
  formatClock,
  formatDate,
  formatDuration,
  savingsPct,
  toFlightSummary,
} from "@/lib/flights";

export const metadata: Metadata = {
  title: "Checkout — Classi",
  description: "Pay your economy fare and find out at check-in if you're flying business.",
};

type CheckoutPageProps = {
  searchParams: Promise<{ flightIata?: string }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { flightIata } = await searchParams;

  if (!flightIata) {
    return <Shell><NotFound /></Shell>;
  }

  if (!isBackendConfigured()) {
    return (
      <Shell>
        <div className="rounded-xl border border-red-300 bg-red-50 p-5 text-sm text-red-800">
          Checkout isn&apos;t configured yet — set NEXT_PUBLIC_API_BASE_URL in
          .env.local and restart the dev server.
        </div>
      </Shell>
    );
  }

  let summary;
  try {
    // Selection step — this fixes the price permanently and stores the flight.
    const flight = await importFlight(flightIata);
    summary = toFlightSummary(flight);
  } catch (err) {
    return (
      <Shell>
        <div className="rounded-xl border border-red-300 bg-red-50 p-5 text-sm text-red-800">
          We couldn&apos;t load that flight: {(err as Error).message}
        </div>
        <p className="mt-4 text-sm text-ink/60">
          <Link href="/" className="underline">
            Back to search
          </Link>
        </p>
      </Shell>
    );
  }

  const mins = durationMinutes(summary.departure, summary.arrival);
  const pct = savingsPct(summary.economyPrice, summary.businessPrice);

  return (
    <Shell>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        Checkout
      </p>
      <h1 className="mt-3 font-display text-3xl uppercase tracking-wide">
        Pay & confirm your seat.
      </h1>

      <div className="mt-6 rounded-xl border border-ink/10 bg-white p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-medium">{formatClock(summary.departure)}</span>
          <span className="text-ink/40">→</span>
          <span className="text-lg font-medium">{formatClock(summary.arrival)}</span>
        </div>
        <p className="mt-1 text-sm text-ink/50">
          {summary.flightIata} · {summary.origin} → {summary.destination} ·{" "}
          {formatDate(summary.departure)} · {formatDuration(mins)}
        </p>
        <p className="mt-4 text-sm text-ink/50">
          <span className="font-medium text-ink">${summary.economyPrice}</span> economy
          fare · business would run ${summary.businessPrice} ({pct}% less if you win)
        </p>
      </div>

      <p className="mt-6 text-sm text-ink/60">
        This is a normal, honest economy fare — no extra charge for a shot at
        business. You&apos;ll find out if you&apos;re upgraded when you check in.
      </p>

      <div className="mt-8">
        <CheckoutForm flightIata={summary.flightIata} totalPrice={summary.economyPrice} />
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav solid />
      <main className="min-h-screen bg-paper pt-24 pb-20 text-ink">
        <div className="mx-auto max-w-2xl px-6 md:px-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <p className="text-ink/60">
      We couldn&apos;t find that flight. Head back to{" "}
      <Link href="/" className="underline">
        search flights
      </Link>
      .
    </p>
  );
}
