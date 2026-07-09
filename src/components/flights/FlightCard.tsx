import Link from "next/link";
import type { FlightSummary } from "@/lib/flights";
import {
  durationMinutes,
  formatClock,
  formatDate,
  formatDuration,
  isLieFlat,
  savingsPct,
} from "@/lib/flights";

export default function FlightCard({ flight }: { flight: FlightSummary }) {
  const pct = savingsPct(flight.economyPrice, flight.businessPrice);
  const mins = durationMinutes(flight.departure, flight.arrival);
  const lieFlat = isLieFlat(flight.departure, flight.arrival);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-ink/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold uppercase text-paper">
          {flight.flightIata.slice(0, 2) || "TR"}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-lg font-medium text-ink">
              {formatClock(flight.departure)}
            </span>
            <span className="text-ink/40">→</span>
            <span className="text-lg font-medium text-ink">
              {formatClock(flight.arrival)}
            </span>
            <span className="text-sm text-ink/50">
              {flight.origin} → {flight.destination}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/50">
            {flight.flightIata} · {formatDate(flight.departure)} ·{" "}
            {formatDuration(mins)}
            {flight.status ? ` · ${flight.status}` : ""}
          </p>
          {lieFlat && (
            <span className="mt-2 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold-soft">
              Lie-flat business available
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-2">
        <div className="text-right">
          <p className="text-2xl font-medium text-ink">${flight.economyPrice}</p>
          <p className="text-xs text-ink/40">
            economy · business ${flight.businessPrice} ({pct}% less if you win)
          </p>
        </div>
        <Link
          href={`/checkout?flightIata=${encodeURIComponent(flight.flightIata)}`}
          className="whitespace-nowrap rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
        >
          Select
        </Link>
      </div>
    </div>
  );
}
