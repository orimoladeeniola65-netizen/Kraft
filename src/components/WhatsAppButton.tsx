import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/?text=Hi%20Kraftify%2C%20I%27d%20like%20to%20book%20a%20session"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-12 w-12 rounded-full bg-foreground text-primary-foreground flex items-center justify-center hover:bg-gold transition-colors duration-300 shadow-lg"
    >
      <MessageCircle size={20} />
    </a>
  );
}
