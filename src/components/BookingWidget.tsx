"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { AIRPORTS, formatAirport } from "@/lib/airports";

type TripType = "round-trip" | "one-way";

type BookingWidgetProps = {
  compact?: boolean;
  initial?: {
    from?: string;
    to?: string;
    departDate?: string;
    returnDate?: string;
    passengers?: number;
    tripType?: TripType;
  };
};

export default function BookingWidget({ compact = false, initial }: BookingWidgetProps) {
  const router = useRouter();
  const listId = useId();

  const [tripType, setTripType] = useState<TripType>(initial?.tripType ?? "round-trip");
  const [from, setFrom] = useState(initial?.from ?? "");
  const [to, setTo] = useState(initial?.to ?? "");
  const [departDate, setDepartDate] = useState(initial?.departDate ?? "");
  const [returnDate, setReturnDate] = useState(initial?.returnDate ?? "");
  const [passengers, setPassengers] = useState(initial?.passengers ?? 1);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!from.trim() || !to.trim() || !departDate) {
      setError("Please fill in where you're flying from, to, and when.");
      return;
    }
    setError(null);

    const params = new URLSearchParams({
      tripType,
      from: from.trim(),
      to: to.trim(),
      departDate,
      passengers: String(passengers),
    });
    if (tripType === "round-trip" && returnDate) {
      params.set("returnDate", returnDate);
    }

    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl bg-paper text-ink shadow-2xl shadow-black/40 ${
        compact ? "p-4" : "p-6 md:p-8"
      }`}
    >
      <div className="mb-5 flex items-center gap-1 text-sm">
        {(["round-trip", "one-way"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
              tripType === type
                ? "bg-ink text-paper"
                : "text-ink/60 hover:bg-ink/5"
            }`}
            aria-pressed={tripType === type}
          >
            {type === "round-trip" ? "Round trip" : "One way"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-3">
        <Field label="From" className="md:col-span-3">
          <input
            list={`${listId}-airports`}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="City or airport"
            required
            className={inputClass}
            aria-label="Flying from"
          />
        </Field>

        <Field label="To" className="md:col-span-3">
          <input
            list={`${listId}-airports`}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="City or airport"
            required
            className={inputClass}
            aria-label="Flying to"
          />
        </Field>

        <datalist id={`${listId}-airports`}>
          {AIRPORTS.map((a) => (
            <option key={a.code} value={formatAirport(a)} />
          ))}
        </datalist>

        <Field label="Depart" className="md:col-span-2">
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            required
            className={inputClass}
            aria-label="Departure date"
          />
        </Field>

        <Field label="Return" className="md:col-span-2">
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            disabled={tripType === "one-way"}
            className={`${inputClass} disabled:opacity-40`}
            aria-label="Return date"
            aria-disabled={tripType === "one-way"}
          />
        </Field>

        <Field label="Passengers" className="md:col-span-2">
          <div className="flex items-center justify-between rounded-lg border border-ink/15 bg-white px-2 py-2">
            <button
              type="button"
              onClick={() => setPassengers((p) => Math.max(1, p - 1))}
              aria-label="Decrease passengers"
              className="flex h-6 w-6 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              −
            </button>
            <span aria-live="polite" className="text-sm font-medium">
              {passengers}
            </span>
            <button
              type="button"
              onClick={() => setPassengers((p) => Math.min(9, p + 1))}
              aria-label="Increase passengers"
              className="flex h-6 w-6 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              +
            </button>
          </div>
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
