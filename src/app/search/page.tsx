import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingWidget from "@/components/BookingWidget";
import FlightCard from "@/components/flights/FlightCard";
import { generateFlights } from "@/lib/flights";

export const metadata: Metadata = {
  title: "Search flights — Tru",
  description: "Search flights and see which ones give you a shot at a free business class upgrade.",
};

type SearchPageProps = {
  searchParams: Promise<{
    tripType?: string;
    from?: string;
    to?: string;
    departDate?: string;
    returnDate?: string;
    passengers?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const from = params.from ?? "";
  const to = params.to ?? "";
  const departDate = params.departDate ?? "";
  const returnDate = params.returnDate;
  const passengers = Number(params.passengers ?? "1") || 1;
  const tripType = params.returnDate ? "round-trip" : "one-way";

  const flights = from && to && departDate ? generateFlights(from, to, departDate) : [];

  const query = new URLSearchParams();
  query.set("tripType", tripType);
  query.set("from", from);
  query.set("to", to);
  query.set("departDate", departDate);
  query.set("passengers", String(passengers));
  if (returnDate) query.set("returnDate", returnDate);

  return (
    <>
      <Nav solid />
      <main className="min-h-screen bg-paper-dim pt-24 pb-20 text-ink">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <BookingWidget
            compact
            initial={{
              tripType: tripType as "round-trip" | "one-way",
              from,
              to,
              departDate,
              returnDate,
              passengers,
            }}
          />

          <div className="mt-10">
            {flights.length === 0 ? (
              <p className="text-ink/60">
                Enter where you&apos;re flying from and to, and pick a date, to see
                flights.
              </p>
            ) : (
              <>
                <h1 className="mb-6 font-display text-2xl uppercase tracking-wide text-ink">
                  {from} → {to}
                  <span className="ml-3 text-sm font-normal capitalize tracking-normal text-ink/50">
                    {departDate}
                    {returnDate ? ` – ${returnDate}` : ""} · {passengers}{" "}
                    {passengers === 1 ? "passenger" : "passengers"}
                  </span>
                </h1>
                <p className="mb-6 max-w-2xl text-sm text-ink/60">
                  Every fare below is an honest economy price. A share of
                  passengers on each flight fly business instead, free —
                  you&apos;ll find out at check-in.
                </p>
                <div className="flex flex-col gap-4">
                  {flights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      searchParams={query.toString()}
                    />
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
