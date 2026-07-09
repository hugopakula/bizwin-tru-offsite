import Link from "next/link";
import type { Booking } from "@/lib/bookings";
import type { BackendReservation } from "@/lib/backend";
import {
  durationMinutes,
  formatClock,
  formatDate,
  formatDuration,
} from "@/lib/flights";
import CheckinPanel from "@/components/booking/CheckinPanel";

type BookingDetailsProps = {
  booking: Booking;
  reservation: BackendReservation | null;
  variant?: "confirmed" | "lookup";
};

export default function BookingDetails({
  booking,
  reservation,
  variant = "lookup",
}: BookingDetailsProps) {
  const mins = durationMinutes(booking.departure, booking.arrival);

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
        {variant === "confirmed" ? "Booking confirmed" : "Your booking"}
      </p>
      <h1 className="mt-3 font-display text-3xl uppercase tracking-wide">
        {variant === "confirmed" ? "You're in, " : ""}
        {booking.confirmationCode}.
      </h1>
      <p className="mt-4 max-w-xl text-ink/70">
        {booking.fullName} — an honest economy fare on {booking.flightIata},{" "}
        {booking.origin} → {booking.destination} on {formatDate(booking.departure)}.
        Your seat is confirmed — what we don&apos;t know yet is whether it&apos;s
        the one you paid for or an upgrade.
      </p>

      <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-medium">{formatClock(booking.departure)}</span>
          <span className="text-ink/40">→</span>
          <span className="text-lg font-medium">{formatClock(booking.arrival)}</span>
        </div>
        <p className="mt-1 text-sm text-ink/50">
          {booking.flightIata} · {booking.origin} → {booking.destination} ·{" "}
          {formatDate(booking.departure)} · {formatDuration(mins)}
        </p>
        <p className="mt-4 text-sm text-ink/50">
          Paid:{" "}
          <span className="font-medium text-ink">${booking.economyPrice}</span> ·
          Economy fare · Card ending {booking.cardLast4}
        </p>
      </div>

      <CheckinPanel
        code={booking.confirmationCode}
        departure={booking.departure}
        initialReservation={reservation}
      />

      <p className="mt-8 text-sm text-ink/50">
        Save your confirmation code,{" "}
        <span className="font-medium text-ink">{booking.confirmationCode}</span>, and
        your last name — that&apos;s how you look this booking up again.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-block rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition-colors hover:border-ink/40"
        >
          Back to Classi
        </Link>
        {variant === "confirmed" && (
          <Link
            href="/manage-booking"
            className="inline-block rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition-colors hover:border-ink/40"
          >
            Manage this booking later
          </Link>
        )}
      </div>
    </>
  );
}
