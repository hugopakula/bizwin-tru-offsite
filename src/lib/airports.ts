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
