import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingWidget from "@/components/BookingWidget";
import FlightCard from "@/components/flights/FlightCard";
import { searchFlights, isBackendConfigured } from "@/lib/backend";
import { toFlightSummary } from "@/lib/flights";

export const metadata: Metadata = {
  title: "Search flights — Classi",
  description:
    "Search live flights and see which ones give you a shot at a free business class upgrade.",
};

type SearchPageProps = {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    flightIata?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const origin = params.origin?.trim() ?? "";
  const destination = params.destination?.trim() ?? "";
  const flightIata = params.flightIata?.trim() ?? "";
  const hasQuery = Boolean(origin || destination || flightIata);

  let flights = [] as ReturnType<typeof toFlightSummary>[];
  let errorMessage: string | null = null;

  if (hasQuery) {
    if (!isBackendConfigured()) {
      errorMessage =
        "Flight search isn't configured yet — set NEXT_PUBLIC_API_BASE_URL in .env.local.";
    } else {
      try {
        const results = await searchFlights({ origin, destination, flightIata });
        // Only bookable flights: /flights/import needs a real flight number.
        flights = results
          .filter((r) => r.number)
          .map((r) => toFlightSummary(r));
      } catch (err) {
        errorMessage = (err as Error).message;
      }
    }
  }

  return (
    <>
      <Nav solid />
      <main className="min-h-screen bg-paper-dim pt-24 pb-20 text-ink">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <BookingWidget compact initial={{ from: origin, to: destination, flightIata }} />

          <div className="mt-10">
            {!hasQuery ? (
              <p className="text-ink/60">
                Enter where you&apos;re flying from and to (or a flight number) to
                see live flights.
              </p>
            ) : errorMessage ? (
              <div className="rounded-xl border border-red-300 bg-red-50 p-5 text-sm text-red-800">
                {errorMessage}
              </div>
            ) : flights.length === 0 ? (
              <p className="text-ink/60">
                No bookable flights came back for that search. Try a different
                route or flight number — the live feed returns near-term
                scheduled flights.
              </p>
            ) : (
              <>
                <h1 className="mb-2 font-display text-2xl uppercase tracking-wide text-ink">
                  {origin || "Anywhere"} → {destination || "Anywhere"}
                </h1>
                <p className="mb-6 max-w-2xl text-sm text-ink/60">
                  Every fare below is an honest economy price on a live flight. A
                  share of passengers on each flight fly business instead, free —
                  you&apos;ll find out when you check in.
                </p>
                <div className="flex flex-col gap-4">
                  {flights.map((flight) => (
                    <FlightCard key={`${flight.flightIata}-${flight.departure}`} flight={flight} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
