export type Winner = {
  id: string;
  name: string;
  route: string;
  date: string;
  quote: string;
};

// Placeholder / illustrative data pending a real winner cohort (consent + release process TBD).
export const WINNERS: Winner[] = [
  {
    id: "w1",
    name: "Sarah T.",
    route: "SFO → NRT",
    date: "2026-05-14",
    quote: "I booked economy on a whim. Boarded in business. Still not over it.",
  },
  {
    id: "w2",
    name: "Marcus L.",
    route: "JFK → LHR",
    date: "2026-05-02",
    quote: "Found out at check-in. Genuinely thought the app was broken.",
  },
  {
    id: "w3",
    name: "Priya R.",
    route: "LAX → SIN",
    date: "2026-04-21",
    quote: "Lie-flat for sixteen hours after paying an economy fare. Never flying any other way.",
  },
  {
    id: "w4",
    name: "Diego F.",
    route: "MIA → GRU",
    date: "2026-04-09",
    quote: "The lounge alone was worth the surprise. The seat was a bonus.",
  },
  {
    id: "w5",
    name: "Aiko M.",
    route: "ORD → DXB",
    date: "2026-03-27",
    quote: "Told my whole office. Half of them booked their next trip on Tru.",
  },
  {
    id: "w6",
    name: "Ben K.",
    route: "ATH → JFK",
    date: "2026-03-11",
    quote: "No points, no waiting list, no catch. Just a better seat than I paid for.",
  },
];
