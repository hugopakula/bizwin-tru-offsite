import { NextResponse } from "next/server";
import {
  createOrReuseUser,
  createReservation,
  importFlight,
  isBackendConfigured,
} from "@/lib/backend";
import { toFlightSummary } from "@/lib/flights";
import { createBooking } from "@/lib/bookings";

function deriveUsername(fullName: string, email: string): string {
  const base = (fullName.trim() || email.split("@")[0])
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return base || email.split("@")[0];
}

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, cardLast4, flightIata } = body as {
    fullName?: string;
    email?: string;
    cardLast4?: string;
    flightIata?: string;
  };

  if (
    !fullName?.trim() ||
    !email?.trim() ||
    !cardLast4 ||
    !/^\d{4}$/.test(cardLast4) ||
    !flightIata
  ) {
    return NextResponse.json({ error: "Missing booking details." }, { status: 400 });
  }

  if (!isBackendConfigured()) {
    return NextResponse.json(
      { error: "Booking backend is not configured (set BACKEND_API_URL)." },
      { status: 503 }
    );
  }

  try {
    // 1. Selection step: import fixes the price and stores the flight row.
    const flight = await importFlight(flightIata);
    if (flight.id === undefined || flight.id === null) {
      throw new Error("Backend did not return a flight id for the selected flight.");
    }
    const summary = toFlightSummary(flight);

    // 2. Create (or reuse) the traveler.
    const user = await createOrReuseUser({
      username: deriveUsername(fullName, email),
      email: email.trim(),
    });

    // 3. Create the economy reservation. The in-DB cron may later upgrade it.
    const reservation = await createReservation({
      flight_id: flight.id,
      user_id: user.id,
    });

    // 4. Store the frontend code + last-name mapping and display snapshot.
    const booking = await createBooking({
      fullName: fullName.trim(),
      email: email.trim(),
      reservationId: reservation.id,
      userId: user.id,
      flightId: flight.id,
      flightIata: summary.flightIata,
      origin: summary.origin,
      destination: summary.destination,
      departure: summary.departure,
      arrival: summary.arrival,
      economyPrice: summary.economyPrice,
      businessPrice: summary.businessPrice,
      cardLast4,
    });

    return NextResponse.json({ confirmationCode: booking.confirmationCode });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message ?? "Could not complete booking." },
      { status: 502 }
    );
  }
}
