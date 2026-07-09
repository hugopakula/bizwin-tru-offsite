"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/past-winners", label: "Past Winners" },
  { href: "/#why-business-class", label: "Why Business Class" },
];

export default function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const isSolid = solid || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isSolid ? "bg-ink/95 backdrop-blur-md shadow-[0_1px_0_rgba(247,242,233,0.08)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" aria-label="Classi — home" className="flex items-center">
          <Image
            src="/classi-logo-white.png"
            alt="Classi"
            width={85}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-paper/80 transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="tel:+10000000000"
            aria-label="Contact Classi"
            className="hidden text-paper/80 transition-colors hover:text-paper md:block"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              <path
                d="M6.6 10.8c1.5 2.9 3.9 5.3 6.8 6.8l2.3-2.3c.3-.3.7-.4 1.1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C10.3 21.3 2.7 13.7 2.7 4.3c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.2.4.1.8-.2 1.1l-2 2.5Z"
              />
            </svg>
          </a>
          <Link
            href="/#book"
            className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
          >
            Book
          </Link>
        </div>
      </nav>
    </header>
  );
}
