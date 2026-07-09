import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Winner } from "@/lib/winners";

export default function WinnerCard({ winner }: { winner: Winner }) {
  return (
    <article className="group overflow-hidden rounded-xl bg-ink-soft">
      <ImagePlaceholder
        label={`Winner photo — ${winner.name}`}
        aspect="aspect-[4/5]"
      />
      <div className="p-5">
        <p className="text-sm font-medium text-paper">{winner.name}</p>
        <p className="mt-0.5 text-xs uppercase tracking-wide text-gold">
          {winner.route}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          &ldquo;{winner.quote}&rdquo;
        </p>
      </div>
    </article>
  );
}
