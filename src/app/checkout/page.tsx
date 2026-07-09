import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { generateFlights, formatDuration } from "@/lib/flights";

export const metadata: Metadata = {
  title: "Checkout — Tru",
  description: "Pay your economy fare and find out at check-in if you're flying business.",
};

type CheckoutPageProps = {
  searchParams: Promise<{
    flightId?: string;
    from?: string;
    to?: string;
    departDate?: string;
    returnDate?: string;
    passengers?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const from = params.from ?? "";
  const to = params.to ?? "";
  const departDate = params.departDate ?? "";
  const returnDate = params.returnDate;
  const flightId = params.flightId ?? "";
  const passengers = Number(params.passengers ?? "1") || 1;

  const flight =
    from && to && departDate
      ? generateFlights(from, to, departDate).find((f) => f.id === flightId)
      : undefined;

  return (
    <>
      <Nav solid />
      <main className="min-h-screen bg-paper pt-24 pb-20 text-ink">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          {!flight ? (
            <p className="text-ink/60">
              We couldn&apos;t find that flight. Head back to{" "}
              <Link href="/" className="underline">
                search flights
              </Link>
              .
            </p>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                Checkout
              </p>
              <h1 className="mt-3 font-display text-3xl uppercase tracking-wide">
                Pay & confirm your seat.
              </h1>

              <div className="mt-6 rounded-xl border border-ink/10 bg-white p-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-medium">{flight.departTime}</span>
                  <span className="text-ink/40">→</span>
                  <span className="text-lg font-medium">{flight.arriveTime}</span>
                </div>
                <p className="mt-1 text-sm text-ink/50">
                  {from} → {to} · {formatDuration(flight.durationMinutes)} ·{" "}
                  {flight.stops === 0 ? "Nonstop" : "1 stop"} · {flight.aircraft}
                </p>
                <p className="mt-4 text-sm text-ink/50">
                  {passengers} {passengers === 1 ? "passenger" : "passengers"} ·{" "}
                  <span className="font-medium text-ink">
                    ${flight.economyPrice * passengers}
                  </span>{" "}
                  economy fare total
                </p>
              </div>

              <p className="mt-6 text-sm text-ink/60">
                This is a normal, honest economy fare — no extra charge for a
                shot at business. You&apos;ll find out if you&apos;re upgraded
                at check-in.
              </p>

              <div className="mt-8">
                <CheckoutForm
                  flightId={flight.id}
                  from={from}
                  to={to}
                  departDate={departDate}
                  returnDate={returnDate}
                  passengers={passengers}
                  totalPrice={flight.economyPrice * passengers}
                />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
