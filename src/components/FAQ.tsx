const FAQS = [
  {
    q: "Wait — is this a lottery?",
    a: "No. Every ticket on Classi is a real, honestly priced economy fare — the same fare you'd pay anywhere else for that flight. There's no separate entry, no extra charge for a shot at business, and nothing to buy beyond the ticket itself.",
  },
  {
    q: "So how do upgrades get decided?",
    a: "Across every flight, a share of economy passengers fly business instead, at no extra cost. We don't sell a better shot at it, and there's no points balance or status tier to climb — it's built into how every seat on that flight is priced and allocated.",
  },
  {
    q: "When do I find out if I'm flying business?",
    a: "At check-in. Your Classi confirmation lets you track your flight right up to that point, and your seat is confirmed the moment you check in.",
  },
  {
    q: "What if I'm not upgraded?",
    a: "You still fly — in the seat you paid for, at the fare you paid. Nothing about your booking, your price, or your flight changes either way.",
  },
  {
    q: "Do lie-flat seats apply to every flight?",
    a: "No. Lie-flat business seats are typically found on longer routes, generally over about five hours. On shorter flights, business class still means more room, recline, and service — we'll always be upfront about which one your route gets.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">FAQ</p>
        <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-paper md:text-4xl">
          Straight answers.
        </h2>

        <div className="mt-10 divide-y divide-paper/15">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-paper">
                <span className="text-base font-medium">{item.q}</span>
                <span className="shrink-0 text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
