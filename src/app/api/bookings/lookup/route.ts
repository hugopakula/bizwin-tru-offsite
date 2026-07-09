import { NextResponse } from "next/server";
import { getBookingByCodeAndLastName } from "@/lib/bookings";
import { getReservationById, isBackendConfigured } from "@/lib/backend";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const lastName = searchParams.get("lastName");

  if (!code?.trim() || !lastName?.trim()) {
    return NextResponse.json(
      { error: "Enter both your confirmation code and last name." },
      { status: 400 }
    );
  }

  const booking = await getBookingByCodeAndLastName(code, lastName);
  if (!booking) {
    return NextResponse.json(
      {
        error:
          "We couldn't find a booking matching that confirmation code and last name.",
      },
      { status: 404 }
    );
  }

  // Refresh live upgrade/check-in status from the backend (best effort).
  let reservation = null;
  if (isBackendConfigured()) {
    try {
      reservation = await getReservationById(Number(booking.reservationId));
    } catch {
      reservation = null;
    }
  }

  return NextResponse.json({ booking, reservation });
}
