import ImagePlaceholder from "@/components/ImagePlaceholder";

const PILLARS = [
  {
    title: "Lounge access",
    body: "Quiet space before the gate — food, drinks, and a moment to breathe before you fly.",
    label: "Business lounge, model shoot",
  },
  {
    title: "Lie-flat seats, on longer routes",
    body: "On flights over roughly five hours, business class means a fully reclining, lie-flat seat. Shorter hops mean extra room and recline, not a flat bed — we'll always tell you which you're getting.",
    label: "Lie-flat seat, model shoot",
  },
  {
    title: "Service that takes care of you",
    body: "Dedicated cabin crew attention, better food, and the small things that make a long flight feel short.",
    label: "Cabin service, model shoot",
  },
];

export default function WhyBusinessClass() {
  return (
    <section
      id="why-business-class"
      className="scroll-mt-24 bg-paper px-6 py-24 text-ink md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            Why business class
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-wide md:text-4xl">
            Sell the seat, not the spreadsheet.
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-16">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ImagePlaceholder label={pillar.label} aspect="aspect-[4/3]" className="rounded-xl" />
              <div>
                <h3 className="font-display text-2xl uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
