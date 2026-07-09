"use client";

import { useState } from "react";
import type { Booking } from "@/lib/bookings";
import type { BackendReservation } from "@/lib/backend";
import BookingDetails from "@/components/booking/BookingDetails";

export default function ManageBookingForm() {
  const [code, setCode] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [reservation, setReservation] = useState<BackendReservation | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || !lastName.trim()) {
      setError("Enter both your confirmation code and last name.");
      return;
    }

    setStatus("loading");
    setError(null);
    setBooking(null);

    try {
      const res = await fetch(
        `/api/bookings/lookup?code=${encodeURIComponent(code.trim())}&lastName=${encodeURIComponent(
          lastName.trim()
        )}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not find that booking.");
      setBooking(data.booking as Booking);
      setReservation((data.reservation as BackendReservation | null) ?? null);
      setStatus("idle");
    } catch (err) {
      setError((err as Error).message);
      setStatus("idle");
    }
  }

  if (booking) {
    return <BookingDetails booking={booking} reservation={reservation} variant="lookup" />;
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        Manage booking
      </p>
      <h1 className="mt-3 font-display text-3xl uppercase tracking-wide">
        Find your booking.
      </h1>
      <p className="mt-4 max-w-md text-ink/70">
        Enter your confirmation code and last name to look up your booking and
        check your upgrade status.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:max-w-sm">
        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/50">
            Confirmation code
          </span>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="CLASSI-XXXXXX"
            required
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm uppercase text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/50">
            Last name
          </span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="As it appears on your booking"
            required
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-gold-soft disabled:opacity-50"
        >
          {status === "loading" ? "Searching…" : "Find booking"}
        </button>
      </form>
    </>
  );
}
