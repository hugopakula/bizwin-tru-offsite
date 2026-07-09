export type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  aircraft: string;
  departTime: string;
  arriveTime: string;
  durationMinutes: number;
  stops: 0 | 1;
  economyPrice: number;
  businessPrice: number;
  lieFlat: boolean;
};

const AIRLINES = [
  { name: "Tru Air", code: "TR" },
  { name: "Meridian", code: "MD" },
  { name: "Northline", code: "NL" },
  { name: "Aurora", code: "AU" },
];

// Simple string hash so the same search always returns the same placeholder
// results — no live inventory in v1, but results shouldn't reshuffle on
// every render of the same query.
function seedFrom(...parts: string[]): number {
  const str = parts.join("|");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function minutesToLabel(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

function timeLabel(startMinutes: number) {
  const h = Math.floor(startMinutes / 60) % 24;
  const m = startMinutes % 60;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

export function generateFlights(
  from: string,
  to: string,
  date: string,
  count = 6
): Flight[] {
  const rand = mulberry32(seedFrom(from, to, date));
  const flights: Flight[] = [];

  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)];
    const departMinutes = Math.floor(rand() * 20 + 4) * 60 + Math.floor(rand() * 4) * 15;
    const durationMinutes = Math.floor(rand() * 8 + 2) * 60 + Math.floor(rand() * 4) * 15;
    const stops = rand() > 0.6 ? 1 : 0;
    const basePrice = 220 + Math.floor(rand() * 15) * 10 + stops * -20;
    const businessMultiplier = 6 + rand() * 4;

    flights.push({
      id: `${from}-${to}-${date}-${i}`,
      airline: airline.name,
      flightNumber: `${airline.code}${100 + Math.floor(rand() * 800)}`,
      aircraft: rand() > 0.5 ? "A350" : "787-9",
      departTime: timeLabel(departMinutes),
      arriveTime: timeLabel(departMinutes + durationMinutes),
      durationMinutes,
      stops: stops as 0 | 1,
      economyPrice: basePrice,
      businessPrice: Math.round(basePrice * businessMultiplier),
      lieFlat: durationMinutes >= 300,
    });
  }

  return flights.sort((a, b) => a.economyPrice - b.economyPrice);
}

export function formatDuration(mins: number) {
  return minutesToLabel(mins);
}
