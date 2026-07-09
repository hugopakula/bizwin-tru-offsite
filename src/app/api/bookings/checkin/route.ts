import { NextResponse } from "next/server";
import { getBookingByCode } from "@/lib/bookings";
import { checkin, isBackendConfigured } from "@/lib/backend";

// Check in for a booking by confirmation code. Returns the (possibly
// cron-upgraded) reservation — this is the "winner status revealed" moment.
export async function POST(request: Request) {
  const body = await request.json();
  const { code } = body as { code?: string };

  if (!code?.trim()) {
    return NextResponse.json({ error: "Missing confirmation code." }, { status: 400 });
  }
  if (!isBackendConfigured()) {
    return NextResponse.json(
      { error: "Booking backend is not configured." },
      { status: 503 }
    );
  }

  const booking = await getBookingByCode(code);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  try {
    const reservation = await checkin(Number(booking.reservationId));
    return NextResponse.json({ reservation });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message ?? "Check-in failed." },
      { status: 502 }
    );
  }
}
