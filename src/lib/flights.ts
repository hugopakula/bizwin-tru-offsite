import type { BackendFlight, FlightSearchResult } from "@/lib/backend";

// Display-facing shape derived from a BackendFlight. The backend has no
// business fare (aviationstack gives no pricing), so businessPrice is a
// display-only figure derived deterministically from the real economy price.
export type FlightSummary = {
  flightIata: string;
  origin: string;
  destination: string;
  departure: string; // ISO
  arrival: string; // ISO
  status: string | null;
  economyPrice: number;
  businessPrice: number;
  flightId?: number | string;
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Deterministic per-flight multiplier in ~[12, 20] → "up to 95% less".
export function derivedBusinessPrice(economyPrice: number, seed: string): number {
  const multiplier = 12 + (hashString(seed) % 9); // 12..20
  return Math.round(economyPrice * multiplier);
}

export function savingsPct(economyPrice: number, businessPrice: number): number {
  if (businessPrice <= 0) return 0;
  return Math.round(((businessPrice - economyPrice) / businessPrice) * 100);
}

export function toFlightSummary(
  f: BackendFlight | FlightSearchResult
): FlightSummary {
  const economyPrice = Math.round(f.price ?? 0);
  const flightIata = f.number ?? "";
  const status = "status" in f ? f.status : null;
  const flightId = "id" in f ? f.id : undefined;
  return {
    flightIata,
    origin: f.origin,
    destination: f.destination,
    departure: f.departure,
    arrival: f.arrival,
    status,
    economyPrice,
    businessPrice: derivedBusinessPrice(economyPrice, flightIata || String(economyPrice)),
    flightId,
  };
}

export function formatClock(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function durationMinutes(departureIso: string, arrivalIso: string): number {
  const dep = new Date(departureIso).getTime();
  const arr = new Date(arrivalIso).getTime();
  if (Number.isNaN(dep) || Number.isNaN(arr) || arr <= dep) return 0;
  return Math.round((arr - dep) / 60000);
}

export function formatDuration(mins: number): string {
  if (!mins) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function isLieFlat(departureIso: string, arrivalIso: string): boolean {
  return durationMinutes(departureIso, arrivalIso) >= 300;
}

// Check-in opens 45 min before departure (matches the backend's generated
// `checkin` column). Winner status is revealed once check-in is open.
export function checkinTime(departureIso: string): Date {
  return new Date(new Date(departureIso).getTime() - 45 * 60000);
}

export function isCheckinOpen(departureIso: string, now: Date = new Date()): boolean {
  const t = checkinTime(departureIso);
  if (Number.isNaN(t.getTime())) return false;
  return now.getTime() >= t.getTime();
}
