import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { generateFlights, formatDuration } from "@/lib/flights";

export const metadata: Metadata = {
  title: "Booking confirmed — Tru",
  description: "Your seat is booked. Find out at check-in if you've been upgraded to business class.",
};

type ConfirmationPageProps = {
  searchParams: Promise<{
    flightId?: string;
    from?: string;
    to?: string;
    departDate?: string;
    returnDate?: string;
    passengers?: string;
  }>;
};

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams;
  const from = params.from ?? "";
  const to = params.to ?? "";
  const departDate = params.departDate ?? "";
  const flightId = params.flightId ?? "";

  const flights = from && to && departDate ? generateFlights(from, to, departDate) : [];
  const flight = flights.find((f) => f.id === flightId);

  const reference = flightId
    ? `TRU-${flightId.split("-").pop()?.padStart(4, "0") ?? "0000"}`.toUpperCase()
    : "TRU-0000";

  return (
    <>
      <Nav solid />
      <main className="min-h-screen bg-paper pt-24 pb-20 text-ink">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          {!flight ? (
            <p className="text-ink/60">
              We couldn&apos;t find that booking. Head back to{" "}
              <Link href="/" className="underline">
                search flights
              </Link>
              .
            </p>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                Booking confirmed
              </p>
              <h1 className="mt-3 font-display text-3xl uppercase tracking-wide">
                You&apos;re in, {reference}.
              </h1>
              <p className="mt-4 max-w-xl text-ink/70">
                You&apos;ve booked an honest economy fare on {flight.airline}{" "}
                {flight.flightNumber}, {from} → {to} on {departDate}. Your seat
                is confirmed — what we don&apos;t know yet is whether it&apos;s
                the one you paid for or an upgrade.
              </p>

              <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6">
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
                  Paid: <span className="font-medium text-ink">${flight.economyPrice}</span>{" "}
                  · Economy fare
                </p>
              </div>

              <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-ink/50">
                What happens next
              </h2>
              <ol className="mt-4 flex flex-col gap-4">
                <TrackStep
                  title="Booked"
                  body="Your economy fare is confirmed. Nothing else to do yet."
                  done
                />
                <TrackStep
                  title="Check-in opens"
                  body="Usually 24 hours before departure — we'll email and text you."
                />
                <TrackStep
                  title="Winner status revealed"
                  body="Check in and find out immediately if you're flying business."
                />
              </ol>

              <p className="mt-8 text-sm text-ink/50">
                We&apos;ll send tracking details to your email as departure gets
                closer — a full flight-tracking dashboard is on the way.
              </p>

              <Link
                href="/"
                className="mt-10 inline-block rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition-colors hover:border-ink/40"
              >
                Back to Tru
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function TrackStep({
  title,
  body,
  done = false,
}: {
  title: string;
  body: string;
  done?: boolean;
}) {
  return (
    <li className="flex items-start gap-4">
      <span
        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
          done ? "bg-gold text-ink" : "border border-ink/25 text-ink/40"
        }`}
      >
        {done ? "✓" : ""}
      </span>
      <div>
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="text-sm text-ink/60">{body}</p>
      </div>
    </li>
  );
}
