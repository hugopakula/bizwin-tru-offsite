import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PastWinnersTeaser from "@/components/PastWinnersTeaser";
import WhyBusinessClass from "@/components/WhyBusinessClass";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <PastWinnersTeaser />
        <WhyBusinessClass />

        <section className="bg-paper px-6 py-20 text-center text-ink md:px-10">
          <p className="font-display text-xl uppercase tracking-normal sm:text-3xl sm:tracking-[0.08em]">
            For winners everywhere.
          </p>
          <p className="mt-3 text-sm text-ink/60">
            Business class for up to 95% less. Every time you fly.
          </p>
        </section>

        <FAQ />
      </main>
      <Footer />
    </>
  );
}
