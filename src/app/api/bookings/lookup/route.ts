import { NextResponse } from "next/server";
import { getBookingByCodeAndLastName } from "@/lib/bookings";

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
      { error: "We couldn't find a booking matching that confirmation code and last name." },
      { status: 404 }
    );
  }

  return NextResponse.json({ booking });
}
