import { NextResponse } from "next/server";
import { generateFlights } from "@/lib/flights";
import { createBooking } from "@/lib/bookings";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, cardLast4, flightId, from, to, departDate, returnDate, passengers } =
    body as {
      fullName?: string;
      cardLast4?: string;
      flightId?: string;
      from?: string;
      to?: string;
      departDate?: string;
      returnDate?: string;
      passengers?: number;
    };

  if (
    !fullName?.trim() ||
    !cardLast4 ||
    !/^\d{4}$/.test(cardLast4) ||
    !flightId ||
    !from ||
    !to ||
    !departDate ||
    !passengers
  ) {
    return NextResponse.json({ error: "Missing booking details." }, { status: 400 });
  }

  const flight = generateFlights(from, to, departDate).find((f) => f.id === flightId);
  if (!flight) {
    return NextResponse.json({ error: "That flight could not be found." }, { status: 404 });
  }

  const booking = await createBooking({
    fullName: fullName.trim(),
    flight,
    from,
    to,
    departDate,
    returnDate,
    passengers,
    amountPaidCents: flight.economyPrice * passengers * 100,
    cardLast4,
  });

  return NextResponse.json({ confirmationCode: booking.confirmationCode });
}
