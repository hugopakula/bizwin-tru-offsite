"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { AIRPORTS, extractIata, formatAirport } from "@/lib/airports";

type BookingWidgetProps = {
  compact?: boolean;
  initial?: {
    from?: string;
    to?: string;
    flightIata?: string;
  };
};

export default function BookingWidget({ compact = false, initial }: BookingWidgetProps) {
  const router = useRouter();
  const listId = useId();

  const [from, setFrom] = useState(initial?.from ?? "");
  const [to, setTo] = useState(initial?.to ?? "");
  const [flightIata, setFlightIata] = useState(initial?.flightIata ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const origin = extractIata(from);
    const destination = extractIata(to);
    const flightNo = flightIata.trim().toUpperCase();

    if (!flightNo && (!origin || !destination)) {
      setError("Enter where you're flying from and to (or a flight number).");
      return;
    }
    setError(null);

    const params = new URLSearchParams();
    if (origin) params.set("origin", origin);
    if (destination) params.set("destination", destination);
    if (flightNo) params.set("flightIata", flightNo);

    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl bg-paper text-ink shadow-2xl shadow-black/40 ${
        compact ? "p-4" : "p-6 md:p-8"
      }`}
    >
      <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink/50">
        <span className="rounded-full bg-ink px-3 py-1 text-paper">One way</span>
        <span>Live flights, real-time</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-3">
        <Field label="From" className="md:col-span-4">
          <input
            list={`${listId}-airports`}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="City or airport code"
            className={inputClass}
            aria-label="Flying from"
          />
        </Field>

        <Field label="To" className="md:col-span-4">
          <input
            list={`${listId}-airports`}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="City or airport code"
            className={inputClass}
            aria-label="Flying to"
          />
        </Field>

        <datalist id={`${listId}-airports`}>
          {AIRPORTS.map((a) => (
            <option key={a.code} value={formatAirport(a)} />
          ))}
        </datalist>

        <Field label="Flight # (optional)" className="md:col-span-4">
          <input
            value={flightIata}
            onChange={(e) => setFlightIata(e.target.value)}
            placeholder="e.g. QF7420"
            className={inputClass}
            aria-label="Flight number (optional)"
          />
        </Field>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-gold-soft md:w-auto"
      >
        Search flights
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/50">
        {label}
      </span>
      {children}
    </label>
  );
}
