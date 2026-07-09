import Image from "next/image";
import type { Winner } from "@/lib/winners";

export default function WinnerCard({ winner }: { winner: Winner }) {
  return (
    <article className="group overflow-hidden rounded-xl bg-ink-soft">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={winner.image}
          alt={`${winner.name}, upgraded to business on ${winner.route}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
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
