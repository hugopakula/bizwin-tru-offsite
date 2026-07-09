"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  formatCardNumber,
  formatExpiry,
  isFutureExpiry,
  isValidCvc,
  lastFourDigits,
  luhnCheck,
} from "@/lib/cardValidation";

type CheckoutFormProps = {
  flightId: string;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  totalPrice: number;
};

export default function CheckoutForm({
  flightId,
  from,
  to,
  departDate,
  returnDate,
  passengers,
  totalPrice,
}: CheckoutFormProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Enter the full name for this booking.");
      return;
    }
    if (!luhnCheck(cardNumber)) {
      setError("Enter a valid card number.");
      return;
    }
    if (!isFutureExpiry(expiry)) {
      setError("Enter a valid, non-expired expiration date (MM/YY).");
      return;
    }
    if (!isValidCvc(cvc)) {
      setError("Enter a valid CVC.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          cardLast4: lastFourDigits(cardNumber),
          flightId,
          from,
          to,
          departDate,
          returnDate,
          passengers,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not finalize booking.");

      router.push(`/confirmation?code=${data.confirmationCode}`);
    } catch (err) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="block">
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/50">
          Full name
        </span>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="As it appears on your ID"
          required
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/50">
          Card number
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="4242 4242 4242 4242"
          required
          className={inputClass}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/50">
            Expiry (MM/YY)
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="12/30"
            required
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/50">
            CVC
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123"
            required
            className={inputClass}
          />
        </label>
      </div>

      <p className="text-xs text-ink/40">
        Test mode — use 4242 4242 4242 4242, any future expiry, any CVC.
      </p>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-gold-soft disabled:opacity-50"
      >
        {submitting ? "Processing…" : `Pay $${totalPrice} & confirm booking`}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
