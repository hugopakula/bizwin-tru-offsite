# Tru — Landing Page & Mini-App Build Prompt

**Status:** Draft for review
**Owner:** Hugo
**Repo:** `bizwin-tru-offsite` (Next.js + Tailwind + TypeScript)

---

## 1. The Idea, In One Paragraph

Tru sells regular economy tickets at normal prices, then gives away business class upgrades to a percentage of customers across flights. The pitch to a buyer: pay economy money, and you might fly business — no loyalty grind, no points math, no luck-of-the-draw upsell at the gate. The brand voice is confident and a little cheeky about it: **"For winners everywhere."** The core proof point to lead with everywhere: **business class for up to 95% less** than buying it outright.

Use this document as the build prompt for the marketing landing page and the booking mini-app that sits on top of it, both in this repo.

---

## 2. Design Direction

Two references set the tone — use them as anchors, not templates to copy directly.

**Snami (grecian travel site)** — this is the primary visual reference for *feel*: oversized display serif type (think a modern Didone — something like "Canela," "Fraunces," or "GT Sectra" energy), tight all-caps tracking on headlines, full-bleed cinematic photography, warm neutral/black palette, minimal chrome. The homepage should feel like this: editorial, a little indulgent, quiet confidence rather than loud sales copy.

**Qatar Airways Privilege Club** — this is the reference for the *booking widget mechanics*: a familiar, trustworthy flight-search pattern (from / to / dates / passengers) overlaid on a full-bleed lifestyle photo, so the utility of "this is how you book a flight" sits inside a premium visual frame instead of feeling like a boring form.

**Synthesis for Tru:** dark, moody, editorial photography (our own model shoots — people genuinely relaxed and glowing in business class) with a large serif display headline, and a clean, light-colored booking card floating on top of or directly below the hero image, styled like a premium OTA search widget but with Tru's fewer, better fields.

**Logo assets** (`/public/brand/`):
- `bizwin-icon-on-dark.svg` — mark only, off-white, transparent background. Use in the navbar and any other compact placement on black/dark backgrounds.
- `bizwin-logo-on-dark.svg` — full mark + "BizWin" wordmark + tagline, off-white, for larger dark-background placements (e.g. footer).
- `bizwin-logo-on-light.svg` — full-color mark + charcoal wordmark, for white/off-white backgrounds.
- `bizwin-logo-variants.svg` — reference sheet showing all color ways together.

**Palette:** near-black / deep charcoal base, warm off-white, one metallic-adjacent accent (champagne gold, brushed bronze, or similar) used sparingly for CTAs and highlights — not neon, not "startup blue."

**Type:** one large serif display face for headlines and the tagline (uppercase, generous letter-spacing, per the Snami reference), one clean sans for body copy and UI/form elements (booking widget, nav, buttons).

**Motion:** subtle — fade/slide-ins on scroll, a slow ambient zoom (Ken Burns) on hero video/imagery if we use motion. Nothing bouncy or playful; the brand is luxury-confident, not gamified.

---

## 3. Key Messaging (use throughout, not just in hero)

- **Tagline:** "For winners everywhere" — should appear in the hero, and reappear at least once more on the page (e.g., footer or a mid-page section break) so it reads as a repeated brand line, not a one-off headline.
- **Core stat:** Business class for **up to 95% less** — this needs to be a headline-weight number somewhere above the fold, not buried in body copy.
- **Reframe of the mechanic:** Every customer pays an honest economy fare. A portion of customers, across flights, fly business instead — free. This is not "buy a raffle ticket," it's "buy a normal ticket, with better odds than you've ever had." Copy should avoid language that makes this sound like gambling (see Section 8, legal note).
- **Emotional target:** the feeling of being upgraded — the sigh of relief, the lounge, the lie-flat seat, arriving rested. Sell the outcome, not the mechanism.

---

## 4. Page Sections

### 4.1 Hero

**Purpose:** Land the tagline, the 95%-cheaper hook, and the "you could be flying business" premise in under 3 seconds.

- Full-bleed background: video loop or high-res photo of a model genuinely relaxed in a business class seat (warm light, minimal, aspirational — Snami-style cinematic crop).
- Large serif headline carrying the tagline: **"For winners everywhere."**
- Sub-headline stating the mechanic + the number, e.g. "Book economy. Fly business — up to 95% cheaper than buying it outright." (placeholder copy, needs final wording pass)
- Primary CTA button (e.g. "Search flights") that scrolls to or focuses the booking widget below.
- Secondary, quieter link/CTA to "See how it works" (anchors to Section 4.3).
- Minimal top nav: logo/wordmark, How it works, Past Winners, Why Business Class, a phone/contact icon, and a primary "Book" button — modeled on the Snami nav bar (logo left, thin icon-based nav, prominent pill CTA on the right).

### 4.2 Hero Booking Widget

**Purpose:** Standard flight-search UX, styled premium, positioned overlapping or directly beneath the hero image (Qatar-reference pattern).

Fields (v1 scope — one-way/round-trip toggle changes which fields show):
- **Trip type toggle:** Round trip / One way
- **From** — airport/city autocomplete
- **To** — airport/city autocomplete
- **Departure date** — calendar picker
- **Return date** — calendar picker, disabled/hidden when "One way" is selected
- **Passengers / number of tickets** — stepper or dropdown (adults at minimum for v1; note infants/children as a fast-follow, not blocking v1)
- **Search / Book** — primary CTA button, uses the accent color

Component notes:
- This is the first real "mini-app" surface — treat it as a reusable `BookingWidget` component, not hero-only markup, since it likely needs to be reused (e.g., a persistent header version once the user scrolls past the hero, or reused on a future dedicated booking page).
- Should work convincingly as a static UI for v1 (no live inventory required yet) — clarify with engineering whether this wires to a real search/booking backend in v1 or is a styled front-end capture-intent form that routes to a "results" or "waitlist" step. **Open question — flag for Hugo.**
- Mobile: fields stack vertically into a single card; keep the same field set.

### 4.3 How It Works

**Purpose:** Demystify the mechanic in 3–4 steps so it reads as straightforward and trustworthy, not gimmicky.

Suggested step structure (copy TBD, structure is the scope item):
1. **Book your seat** — Choose your flight and pay a normal, honest economy fare.
2. **We do the upgrading** — Across every flight, Tru gives away a share of business class seats to travelers who booked economy.
3. **Find out if you're flying business** — [define timing: at booking? X days before departure? Needs a decision — flag as open question.]
4. **Fly like a winner** — Lounge access, lie-flat seat, full service, no extra charge.

Layout: horizontal step-through on desktop (numbered, icon or small illustration per step), vertical stack on mobile. Keep visual weight light here — this section is explanatory, not another hero.

### 4.4 Past Winners

**Purpose:** Social proof that the upgrade mechanic is real, with real (or convincingly real) people.

- A curated grid/carousel of past winners: photo, first name + last initial, route flown (e.g. "Sarah T. — flew business SFO → NRT"), maybe a one-line quote.
- Section headline reinforcing believability, e.g. "Real winners. Real upgrades." (placeholder)
- Prominent CTA: **"See all winners"** → routes to `/past-winners` (new page, see Section 5).
- Consider a rotating counter/stat here too if the number is compelling ("XXX winners upgraded this month") — nice-to-have, not blocking.

### 4.5 Why Business Class

**Purpose:** Sell the destination experience, not just the deal — this is the emotional/aspirational payoff section and should be the most photography-heavy part of the page.

Content pillars to cover (each gets its own beat — copy + supporting photo):
- **Lounge access** — pre-flight comfort, food/drink, quiet space before the gate.
- **Lie-flat seats on longer routes** — call out specifically for flights over ~5 hours; be explicit that this is a route-dependent benefit, not universal, so we're not overpromising on short-haul.
- **Service** — dedicated cabin crew attention, better food/amenities, the general "taken care of" feeling.

Layout: large-format editorial photo grid or alternating image/text rows (image, then a short line of copy, repeat) — this is the section that most directly channels the Snami reference. **Needs Hugo's model photography** (sitting in business class, lounge, etc.) — placeholder/stock imagery only until real assets land; do not ship with generic stock business-class photos if avoidable, the whole section's credibility rests on these feeling like *our* photos, not stock.

### 4.6 Recommended Additions (not explicitly requested — flag for approval)

These are common for this page type and would strengthen conversion; including here so nothing is missed, but they're optional relative to the sections above:
- **FAQ** — answers "wait, is this legit / is this gambling / how are odds determined" head-on. Given the mechanic, this is likely to carry real weight in reducing skepticism and should be seriously considered even if cut from v1.
- **Trust bar** — press mentions, airline/partner logos, or a simple "as seen in" strip if any exist yet.
- **Footer** — tagline repeated here, nav links (How it works, Past Winners, Why Business Class, Terms, Privacy, Contact), and legal fine print re: the upgrade mechanic (see Section 8).

---

## 5. New Page: `/past-winners`

**Purpose:** Deeper social-proof page for people who click through from the homepage teaser.

Suggested structure:
- Hero/header restating the "real winners" premise, consistent visual language with the homepage (same type, same photography style).
- Filterable/sortable grid of winners — by route, by date, or just chronological — each card: photo, name (first + last initial), route, date, short quote.
- Possibly a map or route visualization showing spread of winning routes (nice-to-have, not required for v1).
- CTA back to booking (persistent booking widget or a simple "Book your flight" button/header, so this page still converts rather than being a dead end).
- Same footer as homepage.

**Open question for Hugo:** are past winners real, opt-in, verified customers (needs a consent/release process), or should this launch with placeholder/illustrative examples until a real cohort exists? This affects both legal and content timelines — flag before content population begins.

---

## 6. Technical Scope

- **Stack:** Next.js (App Router) + Tailwind CSS + TypeScript, per Hugo's direction.
- **Structure suggestion:**
  - `/app/page.tsx` — homepage (all sections above as composed components)
  - `/app/past-winners/page.tsx` — past winners page
  - `/components/Hero.tsx`, `/components/BookingWidget.tsx`, `/components/HowItWorks.tsx`, `/components/PastWinnersTeaser.tsx`, `/components/WhyBusinessClass.tsx`, `/components/Footer.tsx`, `/components/Nav.tsx`
  - `/components/winners/WinnerCard.tsx`, `/app/past-winners/` supporting components
- **Responsive:** mobile-first; booking widget and photo-heavy sections need explicit mobile layouts, not just squeeze-and-hope.
- **Performance:** hero imagery/video needs to be optimized (Next Image, responsive sources) — this page lives or dies on photography, so don't let it also die on load time.
- **SEO/meta:** unique title/description per page; OG image for social shares (likely a hero-style shot with the tagline overlaid).
- **Accessibility:** booking widget must be fully keyboard-navigable and screen-reader labeled — it's the primary conversion action on the page.

---

## 7. Assets Needed (not yet in hand)

- Model photography: sitting in business class seat, lounge shots, lie-flat/reclined shots, candid "arriving relaxed" shots — Hugo to provide.
- Final logo/wordmark treatment for "Tru" (nav + footer + favicon).
- Confirmed brand color values (base dark, off-white, accent) and the two typefaces (display serif + UI sans) — placeholders assumed above pending final selection.
- Real or placeholder past-winner photos + quotes for Sections 4.4 and 5.

---

## 8. Open Questions / Flags Before Build

1. **Booking widget backend:** does "Search/Book" in v1 hit real inventory/payments, or is it a styled capture form (waitlist/interest) for launch? This materially changes engineering scope.
2. **Upgrade timing:** when does a buyer learn they've "won" business class — at booking, or closer to departure? Needed for the How It Works copy.
3. **Regulatory/legal on the upgrade mechanic:** giving away a subset of seats to a subset of customers can read as a sweepstakes/lottery-adjacent promotion depending on jurisdiction and exact mechanics (e.g., is it "chance-based," is there any way to enter without purchase, are odds disclosed). Recommend legal review of the mechanic itself — separate from this page's copy — before the messaging locks in, and before real customer money is involved. This doc assumes the mechanic is already legally sound; it does not evaluate that.
4. **Past winners authenticity:** real verified customers (needs consent/release) vs. illustrative placeholders at launch — affects both `/past-winners` and the homepage teaser.
5. **Long-haul threshold:** confirm "5 hours" is the right cutoff to advertise for lie-flat seating, and whether it's universally true across whichever carriers/routes Tru actually uses.
