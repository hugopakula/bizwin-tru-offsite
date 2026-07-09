const STEPS = [
  {
    number: "01",
    title: "Book your seat",
    body: "Choose your flight and pay a normal, honest economy fare. No hidden markup for the chance to fly business.",
  },
  {
    number: "02",
    title: "We do the upgrading",
    body: "Across every flight, Classi gives away a share of business class seats to travelers who booked economy — no points, no bidding, no gate-side upsell.",
  },
  {
    number: "03",
    title: "Check in to find out",
    body: "Winner status is revealed the moment you check in for your flight — track it right from your Classi confirmation.",
  },
  {
    number: "04",
    title: "Fly like a winner",
    body: "Lounge access, a lie-flat seat on longer routes, full service — at no extra charge, the moment you're upgraded.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-paper md:text-4xl">
            Straightforward, by design.
          </h2>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {STEPS.map((step) => (
            <li key={step.number} className="border-t border-paper/15 pt-6">
              <span className="font-display text-2xl text-gold">{step.number}</span>
              <h3 className="mt-3 text-lg font-medium text-paper">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
