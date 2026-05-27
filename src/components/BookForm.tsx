"use client";

import { useState } from "react";
import { z } from "zod";
import { Instagram, ArrowUpRight, Check, Loader2, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  service: z.enum(["Photography", "Videography", "Content Creation"]),
  date: z.string().min(1, "Pick a date"),
  location: z.string().trim().min(2, "Where is it?").max(200),
  message: z.string().trim().max(1000).optional(),
});

type Status = "idle" | "loading" | "success" | "error";

export function BookForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="px-5 lg:px-8 py-16 md:py-24 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-12 gap-10 lg:gap-16">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-5 animate-fade-up">
          <p className="label">Contact</p>
          <h1 className="display-lg mt-5">
            Let&apos;s create<br />together<span className="text-gold">.</span>
          </h1>
          <p className="mt-8 text-base text-foreground/70 leading-relaxed max-w-md">
            Fill the form and we&apos;ll get back to you within 24 hours to confirm your booking.
          </p>

          <div className="mt-12 space-y-8 border-t border-border pt-8">
            <div>
              <p className="label mb-2">Instagram</p>
              <a
                href="https://instagram.com/shotbykraft"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-lg hover:text-gold transition-colors"
              >
                <Instagram size={18} /> @shotbykraft
              </a>
            </div>

            <div>
              <p className="label mb-2">Response time</p>
              <p className="text-lg">Within 24 hours.</p>
            </div>

            <div className="border-l-2 border-gold pl-4 py-3">
              <p className="text-sm text-foreground/70 leading-relaxed">
                A booking deposit will be discussed upon confirmation —
                no upfront payment required.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 animate-fade-up delay-200">
          {status === "success" ? (
            <div className="bg-card border border-border p-10 md:p-14">
              <Check className="text-gold" size={40} strokeWidth={1.5} />
              <h2 className="display-md mt-6">Thanks<span className="text-gold">.</span></h2>
              <p className="mt-4 text-foreground/70">
                Kraftify will reach out within 24 hours to confirm details.
                Check your inbox — a confirmation email is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-7">
              <Field label="Full name" name="name" error={errors.name} disabled={status === "loading"} />
              <Field label="Email" name="email" type="email" error={errors.email} disabled={status === "loading"} />
              <Field label="Phone (WhatsApp preferred)" name="phone" type="tel" error={errors.phone} disabled={status === "loading"} />

              <div>
                <Label>Service</Label>
                <select name="service" defaultValue="Photography" className="kraft-input" disabled={status === "loading"}>
                  <option>Photography</option>
                  <option>Videography</option>
                  <option>Content Creation</option>
                </select>
                {errors.service && <ErrorText>{errors.service}</ErrorText>}
              </div>

              <div className="grid sm:grid-cols-2 gap-7">
                <Field label="Event date" name="date" type="date" error={errors.date} disabled={status === "loading"} />
                <Field label="Event location" name="location" error={errors.location} disabled={status === "loading"} />
              </div>

              <div>
                <Label>Tell us about your project</Label>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={1000}
                  className="kraft-input resize-none"
                  placeholder="Vision, vibe, references…"
                  disabled={status === "loading"}
                />
                {errors.message && <ErrorText>{errors.message}</ErrorText>}
              </div>

              {status === "error" && (
                <div className="flex items-start gap-3 border border-destructive/40 bg-destructive/10 px-4 py-3">
                  <AlertCircle size={16} className="text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{serverError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex items-center gap-3 bg-foreground text-primary-foreground pl-6 pr-2 py-2 text-xs uppercase tracking-[0.16em] font-medium hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-foreground"
              >
                {status === "loading" ? (
                  <>
                    Sending…
                    <span className="h-10 w-10 bg-primary-foreground/10 grid place-items-center">
                      <Loader2 size={16} className="animate-spin" />
                    </span>
                  </>
                ) : (
                  <>
                    Send booking request
                    <span className="h-10 w-10 bg-primary-foreground/10 grid place-items-center group-hover:rotate-45 transition-transform">
                      <ArrowUpRight size={16} />
                    </span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .kraft-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid oklch(1 0 0 / 0.15);
          color: var(--foreground);
          padding: 0.85rem 0;
          font-size: 1rem;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.3s ease;
          border-radius: 0;
        }
        .kraft-input:focus { border-color: var(--gold); }
        .kraft-input:disabled { opacity: 0.5; cursor: not-allowed; }
        .kraft-input::placeholder { color: oklch(0.55 0 0); }
        select.kraft-input { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--foreground) 50%), linear-gradient(135deg, var(--foreground) 50%, transparent 50%); background-position: calc(100% - 14px) 50%, calc(100% - 8px) 50%; background-size: 6px 6px; background-repeat: no-repeat; padding-right: 28px; }
        select.kraft-input option { background: oklch(0.18 0 0); color: var(--foreground); }
        input[type="date"].kraft-input::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.6); cursor: pointer; }
      `}</style>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block label mb-1">{children}</label>;
}
function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs text-destructive font-mono uppercase tracking-wider">{children}</p>;
}
function Field({
  label, name, type = "text", error, disabled,
}: {
  label: string; name: string; type?: string; error?: string; disabled?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input name={name} type={type} className="kraft-input" maxLength={255} disabled={disabled} />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
