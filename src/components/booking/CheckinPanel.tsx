"use client";

import { useState } from "react";
import type { BackendReservation } from "@/lib/backend";
import { checkinTime, isCheckinOpen } from "@/lib/flights";

type CheckinPanelProps = {
  code: string;
  departure: string; // ISO
  initialReservation: BackendReservation | null;
};

export default function CheckinPanel({
  code,
  departure,
  initialReservation,
}: CheckinPanelProps) {
  const [reservation, setReservation] = useState(initialReservation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkedIn = Boolean(reservation?.checked_in_at);
  const upgraded =
    reservation?.is_upgraded || reservation?.class === "business";
  const open = isCheckinOpen(departure);
  const opensAt = checkinTime(departure);

  async function handleCheckin() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Check-in failed.");
      setReservation(data.reservation as BackendReservation);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (checkedIn) {
    return (
      <div
        className={`mt-8 rounded-xl border p-6 ${
          upgraded
            ? "border-gold bg-gold/10"
            : "border-ink/10 bg-white"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
          Checked in
        </p>
        {upgraded ? (
          <>
            <p className="mt-2 font-display text-2xl uppercase tracking-wide text-ink">
              You&apos;re flying business. 🥂
            </p>
            <p className="mt-2 text-sm text-ink/70">
              You booked economy and won an upgrade to business class — lounge,
              better service, and a better seat, at no extra charge. Welcome to
              the front of the plane.
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 font-display text-2xl uppercase tracking-wide text-ink">
              You&apos;re in economy this time.
            </p>
            <p className="mt-2 text-sm text-ink/70">
              No upgrade on this flight — but you paid an honest economy fare and
              you&apos;re all checked in. There&apos;s always the next one.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        Check in
      </p>
      <p className="mt-2 text-sm text-ink/70">
        Your upgrade status is revealed the moment you check in.{" "}
        {open
          ? "Check-in is open."
          : `Check-in opens around ${opensAt.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })} (45 min before departure).`}
      </p>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        onClick={handleCheckin}
        disabled={loading}
        className="mt-4 rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-gold-soft disabled:opacity-50"
      >
        {loading ? "Checking in…" : "Check in & reveal my seat"}
      </button>
    </div>
  );
}
