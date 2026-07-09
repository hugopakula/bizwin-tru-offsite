// Client for the Classi booking backend (server.js / the "api" Supabase Edge
// Function). No auth, open CORS. All calls funnel through here so the base URL
// and contract shapes live in one place.

export type BackendUser = {
  id: number;
  username: string;
  email: string;
  age: number | null;
};

// A stored flight (returned by POST /flights/import).
export type BackendFlight = {
  id: number;
  number: string | null;
  origin: string;
  stopover: string | null;
  destination: string;
  checkin: string; // ISO, departure - 45min
  departure: string; // ISO
  arrival: string; // ISO
  capacity_business_class: number;
  percentage_business_upgrade: number;
  price: number;
};

// A live search hit (GET /flights) — not yet stored, price is indicative.
export type FlightSearchResult = {
  number: string | null;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  status: string;
  price: number;
};

export type BackendReservation = {
  id: number;
  flight_id: number;
  user_id: number;
  is_upgraded: boolean;
  class: "economy" | "business";
  checked_in_at: string | null;
};

export function isBackendConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_API_BASE_URL?.trim());
}

function baseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Add the backend base URL to .env.local."
    );
  }
  return url.replace(/\/$/, "");
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  const text = await res.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }
  if (!res.ok) {
    const message =
      body && typeof body === "object" && "error" in body
        ? String((body as { error: unknown }).error)
        : `Backend request failed (${res.status}).`;
    throw new Error(message);
  }
  return body as T;
}

export type FlightSearchParams = {
  origin?: string;
  destination?: string;
  date?: string; // NOTE: unsupported on the current aviationstack plan (502).
  flightIata?: string;
  limit?: number;
};

export async function searchFlights(
  params: FlightSearchParams
): Promise<FlightSearchResult[]> {
  const qs = new URLSearchParams();
  if (params.origin) qs.set("origin", params.origin);
  if (params.destination) qs.set("destination", params.destination);
  if (params.date) qs.set("date", params.date);
  if (params.flightIata) qs.set("flight_iata", params.flightIata);
  qs.set("limit", String(params.limit ?? 25));
  return api<FlightSearchResult[]>(`/flights?${qs.toString()}`);
}

// Selection step — fixes price permanently and returns the stored flight + id.
export async function importFlight(flightIata: string): Promise<BackendFlight> {
  return api<BackendFlight>(`/flights/import`, {
    method: "POST",
    body: JSON.stringify({ flight_iata: flightIata }),
  });
}

export async function createUser(input: {
  username: string;
  email: string;
  age?: number;
}): Promise<BackendUser> {
  return api<BackendUser>(`/users`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function listUsers(): Promise<BackendUser[]> {
  return api<BackendUser[]>(`/users`);
}

// "POST /users (or reuse an existing user id)" — email is unique, so on a
// duplicate we look the existing traveler up and reuse them.
export async function createOrReuseUser(input: {
  username: string;
  email: string;
}): Promise<BackendUser> {
  try {
    return await createUser(input);
  } catch (err) {
    const existing = (await listUsers()).find(
      (u) => u.email.toLowerCase() === input.email.toLowerCase()
    );
    if (existing) return existing;
    throw err;
  }
}

export async function createReservation(input: {
  flight_id: number;
  user_id: number;
  class?: "economy" | "business";
}): Promise<BackendReservation> {
  return api<BackendReservation>(`/ticket_reservations`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function listReservations(): Promise<BackendReservation[]> {
  return api<BackendReservation[]>(`/ticket_reservations`);
}

export async function getReservationById(
  id: number
): Promise<BackendReservation | null> {
  const all = await listReservations();
  return all.find((r) => r.id === id) ?? null;
}

// Stamp check-in. Idempotent — repeat calls return the same row. The response
// carries the (possibly cron-upgraded) class + is_upgraded: the reveal moment.
export async function checkin(id: number): Promise<BackendReservation> {
  return api<BackendReservation>(`/checkin`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}
