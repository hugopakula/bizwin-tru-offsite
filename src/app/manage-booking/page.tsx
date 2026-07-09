import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ManageBookingForm from "@/components/booking/ManageBookingForm";

export const metadata: Metadata = {
  title: "Manage booking — Tru",
  description: "Look up your Tru booking with your confirmation code and last name.",
};

export default function ManageBookingPage() {
  return (
    <>
      <Nav solid />
      <main className="min-h-screen bg-paper pt-24 pb-20 text-ink">
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <ManageBookingForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
