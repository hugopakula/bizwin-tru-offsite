import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingDetails from "@/components/booking/BookingDetails";
import { getBookingByCode } from "@/lib/bookings";
import { getReservationById, isBackendConfigured } from "@/lib/backend";

export const metadata: Metadata = {
  title: "Booking confirmed — Classi",
  description: "Your seat is booked. Find out at check-in if you've been upgraded to business class.",
};

type ConfirmationPageProps = {
  searchParams: Promise<{ code?: string }>;
};

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { code } = await searchParams;
  const booking = code ? await getBookingByCode(code) : null;

  let reservation = null;
  if (booking && isBackendConfigured()) {
    try {
      reservation = await getReservationById(Number(booking.reservationId));
    } catch {
      reservation = null;
    }
  }

  return (
    <>
      <Nav solid />
      <main className="min-h-screen bg-paper pt-24 pb-20 text-ink">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          {!booking ? (
            <p className="text-ink/60">
              We couldn&apos;t find that booking. Head back to{" "}
              <Link href="/" className="underline">
                search flights
              </Link>
              .
            </p>
          ) : (
            <BookingDetails booking={booking} reservation={reservation} variant="confirmed" />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
