import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Flight } from "@/lib/flights";

export type Booking = {
  confirmationCode: string;
  fullName: string;
  lastName: string;
  flight: Flight;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  amountPaidCents: number;
  cardLast4: string;
  createdAt: string;
};

export type NewBookingInput = Omit<Booking, "confirmationCode" | "lastName" | "createdAt">;

// Server-only, local-file-backed store standing in for the real Supabase
// table until that project's schema/API contract is provided. Every
// function below is the swap point — replace the bodies with Supabase
// calls and nothing outside this file needs to change.

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O or 1/I

function generateConfirmationCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `TRU-${code}`;
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
  return bookings.find((b) => b.confirmationCode === code.trim().toUpperCase()) ?? null;
}

export async function getBookingByCodeAndLastName(
  code: string,
  lastName: string
): Promise<Booking | null> {
  const booking = await getBookingByCode(code);
  if (!booking) return null;
  return booking.lastName.toLowerCase() === lastName.trim().toLowerCase() ? booking : null;
}
