import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
