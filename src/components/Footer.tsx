import Link from "next/link";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/past-winners", label: "Past Winners" },
  { href: "/#why-business-class", label: "Why Business Class" },
  { href: "/manage-booking", label: "Manage booking" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "mailto:hello@flytru.com", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-2xl uppercase tracking-normal text-paper sm:text-3xl sm:tracking-[0.1em]">
          For winners everywhere.
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-paper/10 pt-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/70">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-paper/40">
            © {new Date().getFullYear()} Tru. All rights reserved.
          </p>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-paper/40">
          Every ticket sold on Tru is a genuine economy fare priced the same
          as any other economy seat on that flight. A share of economy
          passengers on each flight are upgraded to business class at no
          additional charge; upgrade status is confirmed at check-in. No
          purchase of any kind is required to receive the flight you booked,
          and there is no additional entry, payment, or action that increases
          an individual traveler&apos;s likelihood of being upgraded. Availability
          of lie-flat seating, lounge access, and specific service standards
          varies by aircraft, route, and operating carrier. See Terms for
          full program details.
        </p>
      </div>
    </footer>
  );
}
