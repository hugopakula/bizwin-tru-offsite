import Link from "next/link";
import type { Booking } from "@/lib/bookings";
import { formatDuration } from "@/lib/flights";

type BookingDetailsProps = {
  booking: Booking;
  variant?: "confirmed" | "lookup";
};

export default function BookingDetails({ booking, variant = "lookup" }: BookingDetailsProps) {
  const { flight } = booking;

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
        {booking.fullName} — an honest economy fare on {flight.airline}{" "}
        {flight.flightNumber}, {booking.from} → {booking.to} on{" "}
        {booking.departDate}. Your seat is confirmed — what we don&apos;t know
        yet is whether it&apos;s the one you paid for or an upgrade.
      </p>

      <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-medium">{flight.departTime}</span>
          <span className="text-ink/40">→</span>
          <span className="text-lg font-medium">{flight.arriveTime}</span>
        </div>
        <p className="mt-1 text-sm text-ink/50">
          {booking.from} → {booking.to} · {formatDuration(flight.durationMinutes)} ·{" "}
          {flight.stops === 0 ? "Nonstop" : "1 stop"} · {flight.aircraft}
        </p>
        <p className="mt-4 text-sm text-ink/50">
          Paid:{" "}
          <span className="font-medium text-ink">
            ${(booking.amountPaidCents / 100).toFixed(2)}
          </span>{" "}
          · {booking.passengers} {booking.passengers === 1 ? "passenger" : "passengers"} ·
          Economy fare · Card ending {booking.cardLast4}
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
        closer — a full flight-tracking dashboard is on the way. Save your
        confirmation code,{" "}
        <span className="font-medium text-ink">{booking.confirmationCode}</span>, to look
        this booking up later.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-block rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition-colors hover:border-ink/40"
        >
          Back to Tru
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
