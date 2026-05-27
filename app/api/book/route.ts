import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const PHOTOGRAPHER_EMAIL = "kraftifymedia@gmail.com";

function getTransporter() {
  const user = process.env.BREVO_SMTP_LOGIN;
  const pass = process.env.BREVO_SMTP_PASSWORD;
  if (!user || !pass) {
    throw new Error("BREVO_SMTP_LOGIN or BREVO_SMTP_PASSWORD is not set in .env.local");
  }
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL ?? PHOTOGRAPHER_EMAIL;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  service: z.enum(["Photography", "Videography", "Content Creation"]),
  date: z.string().min(1),
  location: z.string().trim().min(2).max(200),
  message: z.string().trim().max(1000).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const { name, email, phone, service, date, location, message } = parsed.data;

  try {
    const transporter = getTransporter();

    const [notifyResult, confirmResult] = await Promise.allSettled([
      transporter.sendMail({
        from: `"Kraftify Bookings" <${SENDER_EMAIL}>`,
        to: PHOTOGRAPHER_EMAIL,
        replyTo: email,
        subject: `New Booking Request — ${service} on ${date}`,
        html: photographerEmail({ name, email, phone, service, date, location, message }),
      }),
      transporter.sendMail({
        from: `"Kraftify" <${SENDER_EMAIL}>`,
        to: email,
        subject: "We got your request — Kraftify",
        html: clientEmail({ name, service, date, location }),
      }),
    ]);

    const failed = [notifyResult, confirmResult].filter((r) => r.status === "rejected");
    if (failed.length === 2) {
      console.error("Both emails failed:", failed);
      return NextResponse.json({ error: "Failed to send emails. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send emails. Please try again." }, { status: 500 });
  }
}

function photographerEmail({
  name, email, phone, service, date, location, message,
}: {
  name: string; email: string; phone: string; service: string;
  date: string; location: string; message?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#1f1f1f;font-family:'Inter',Arial,sans-serif;color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1f1f1f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding:0 0 32px 0;border-bottom:1px solid #333;">
            <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#888;">KRAFTIFY</p>
            <h1 style="margin:16px 0 0;font-size:28px;font-weight:800;letter-spacing:-0.03em;color:#f5f5f5;">New Booking Request</h1>
            <p style="margin:8px 0 0;font-size:14px;color:#888;">${service} · ${date}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 0;">
            ${row("Full Name", escHtml(name))}
            ${row("Email", `<a href="mailto:${escHtml(email)}" style="color:#c9a84c;text-decoration:none;">${escHtml(email)}</a>`)}
            ${row("Phone", escHtml(phone))}
            ${row("Service", escHtml(service))}
            ${row("Event Date", escHtml(date))}
            ${row("Event Location", escHtml(location))}
            ${message ? row("Project Notes", `<span style="white-space:pre-wrap;">${escHtml(message)}</span>`) : ""}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 0 0;border-top:1px solid #333;">
            <p style="margin:0;font-size:13px;color:#888;">
              Reply to this email to respond to the client — your reply goes to
              <a href="mailto:${escHtml(email)}" style="color:#c9a84c;text-decoration:none;">${escHtml(email)}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function clientEmail({
  name, service, date, location,
}: {
  name: string; service: string; date: string; location: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#1f1f1f;font-family:'Inter',Arial,sans-serif;color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1f1f1f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding:0 0 32px 0;border-bottom:1px solid #333;">
            <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#888;">KRAFTIFY</p>
            <h1 style="margin:16px 0 0;font-size:32px;font-weight:800;letter-spacing:-0.04em;color:#f5f5f5;line-height:1.1;">
              We got your<br />request<span style="color:#c9a84c;">.</span>
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 0;">
            <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#d0d0d0;">Hi ${escHtml(name)},</p>
            <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#d0d0d0;">Thanks for reaching out to Kraftify! 🎉</p>
            <p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#d0d0d0;">
              We've received your booking request for <strong style="color:#f5f5f5;">${escHtml(service)}</strong>
              on <strong style="color:#f5f5f5;">${escHtml(date)}</strong>
              at <strong style="color:#f5f5f5;">${escHtml(location)}</strong>.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="border-left:3px solid #c9a84c;padding:14px 20px;background:#252525;">
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#aaa;">
                    We'll get back to you within <strong style="color:#f5f5f5;">24 hours</strong> to confirm everything and discuss next steps.
                  </p>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:16px;line-height:1.6;color:#d0d0d0;">Looking forward to creating something beautiful with you.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 0 0;border-top:1px solid #333;">
            <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#f5f5f5;">— Kraft</p>
            <a href="https://instagram.com/shotbykraft" style="font-size:13px;color:#c9a84c;text-decoration:none;">Instagram: @shotbykraft</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td style="width:140px;padding:0;vertical-align:top;">
          <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#666;">${label}</p>
        </td>
        <td style="padding:0;vertical-align:top;">
          <p style="margin:0;font-size:15px;color:#f5f5f5;">${value}</p>
        </td>
      </tr>
    </table>`;
}

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
