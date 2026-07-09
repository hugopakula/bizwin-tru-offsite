import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Frontend-side booking record. The backend (server.js) owns users/flights/
// reservations, but has no confirmation-code or last-name concept, so we keep
// a thin mapping here: CLASSI-code + last name -> the backend reservation, plus a
// display snapshot so confirmation/lookup render without re-resolving flights
// (there's no get-stored-flight-by-id endpoint). Swap this file's body for a
// table if this ever needs to be shared/multi-instance.

export type Booking = {
  confirmationCode: string;
  fullName: string;
  lastName: string;
  email: string;
  // Backend references
  reservationId: number | string;
  userId: number | string;
  flightId: number | string;
  // Display snapshot (captured at booking time)
  flightIata: string;
  origin: string;
  destination: string;
  departure: string; // ISO
  arrival: string; // ISO
  economyPrice: number;
  businessPrice: number;
  cardLast4: string;
  createdAt: string;
};

export type NewBookingInput = Omit<
  Booking,
  "confirmationCode" | "lastName" | "createdAt"
>;

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O or 1/I

function generateConfirmationCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `CLASSI-${code}`;
}

function lastNameOf(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1] ?? "";
}

async function readAll(): Promise<Booking[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Booking[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(bookings: Booking[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export async function createBooking(input: NewBookingInput): Promise<Booking> {
  const bookings = await readAll();

  let confirmationCode = generateConfirmationCode();
  while (bookings.some((b) => b.confirmationCode === confirmationCode)) {
    confirmationCode = generateConfirmationCode();
  }

  const booking: Booking = {
    ...input,
    confirmationCode,
    lastName: lastNameOf(input.fullName),
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  await writeAll(bookings);
  return booking;
}

export async function getBookingByCode(code: string): Promise<Booking | null> {
  const bookings = await readAll();
  return (
    bookings.find((b) => b.confirmationCode === code.trim().toUpperCase()) ?? null
  );
}

export async function getBookingByCodeAndLastName(
  code: string,
  lastName: string
): Promise<Booking | null> {
  const booking = await getBookingByCode(code);
  if (!booking) return null;
  return booking.lastName.toLowerCase() === lastName.trim().toLowerCase()
    ? booking
    : null;
}
