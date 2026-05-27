import type { Metadata } from "next";
import { BookForm } from "@/components/BookForm";

export const metadata: Metadata = {
  title: "Contact — Kraftify",
  description:
    "Book a photography, videography, or content creation session with Kraftify. We respond within 24 hours.",
  openGraph: {
    title: "Contact — Kraftify",
    description: "Book a session with Kraftify.",
  },
};

export default function BookPage() {
  return <BookForm />;
}
