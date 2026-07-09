export type Airport = {
  code: string;
  city: string;
  country: string;
};

export const AIRPORTS: Airport[] = [
  { code: "SFO", city: "San Francisco", country: "USA" },
  { code: "JFK", city: "New York", country: "USA" },
  { code: "LAX", city: "Los Angeles", country: "USA" },
  { code: "ORD", city: "Chicago", country: "USA" },
  { code: "MIA", city: "Miami", country: "USA" },
  { code: "LHR", city: "London", country: "UK" },
  { code: "CDG", city: "Paris", country: "France" },
  { code: "FCO", city: "Rome", country: "Italy" },
  { code: "ATH", city: "Athens", country: "Greece" },
  { code: "DXB", city: "Dubai", country: "UAE" },
  { code: "DOH", city: "Doha", country: "Qatar" },
  { code: "NRT", city: "Tokyo", country: "Japan" },
  { code: "SIN", city: "Singapore", country: "Singapore" },
  { code: "HKG", city: "Hong Kong", country: "Hong Kong" },
  { code: "SYD", city: "Sydney", country: "Australia" },
  { code: "BNE", city: "Brisbane", country: "Australia" },
  { code: "MEL", city: "Melbourne", country: "Australia" },
  { code: "GRU", city: "São Paulo", country: "Brazil" },
];

export function formatAirport(a: Airport) {
  return `${a.city} (${a.code})`;
}

export function findAirportByLabel(label: string): Airport | undefined {
  const match = label.match(/\(([A-Z]{3})\)\s*$/);
  const code = match?.[1] ?? label.trim().toUpperCase();
  return AIRPORTS.find((a) => a.code === code);
}

// Pull a 3-letter IATA code out of "City (CODE)" or a raw code. Returns "" if
// the input doesn't contain a plausible code.
export function extractIata(input: string): string {
  const trimmed = input.trim();
  const paren = trimmed.match(/\(([A-Za-z]{3})\)\s*$/);
  if (paren) return paren[1].toUpperCase();
  if (/^[A-Za-z]{3}$/.test(trimmed)) return trimmed.toUpperCase();
  return "";
}
