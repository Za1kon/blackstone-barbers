import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// The email address that receives booking requests (set in .env.local)
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "";
// The from address — must be a verified domain in Resend
// During development you can use: onboarding@resend.dev (only sends to your own verified email)
const FROM_EMAIL = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body as {
      name: string;
      email: string;
      phone: string;
      service: string;
      message: string;
    };

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Notify the shop owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New booking request — ${service} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0f0f0f; color: #f5f5f5; padding: 32px; border-radius: 4px;">
          <div style="border-bottom: 2px solid #c9a84c; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 22px; margin: 0; color: #c9a84c;">New Booking Request</h1>
            <p style="margin: 4px 0 0; color: #888; font-size: 13px;">Blackstone Barbers</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; width: 120px;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #f5f5f5; font-size: 13px; font-weight: bold;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #f5f5f5; font-size: 13px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #f5f5f5; font-size: 13px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #f5f5f5; font-size: 13px;">${phone || "—"}</td>
            </tr>
            ${
              message
                ? `
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Notes</td>
              <td style="padding: 10px 0; color: #f5f5f5; font-size: 13px;">${message}</td>
            </tr>`
                : ""
            }
          </table>
          <div style="margin-top: 24px; padding: 14px; background: #1a1a1a; border-left: 3px solid #c9a84c;">
            <p style="margin: 0; font-size: 12px; color: #888;">Reply directly to this email to confirm with the client.</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    // 2. Send confirmation to the client
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "We got your request — Blackstone Barbers",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0f0f0f; color: #f5f5f5; padding: 32px; border-radius: 4px;">
          <div style="border-bottom: 2px solid #c9a84c; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 22px; margin: 0; color: #f5f5f5;">Your request is in.</h1>
            <p style="margin: 4px 0 0; color: #888; font-size: 13px;">Blackstone Barbers — Brooklyn, NY</p>
          </div>
          <p style="color: #888; font-size: 14px; line-height: 1.7;">
            Hey ${name}, we received your booking request for <strong style="color: #c9a84c;">${service}</strong>.
            We will confirm your appointment within 2 hours during business hours.
          </p>
          <div style="margin: 24px 0; padding: 16px; background: #1a1a1a; border-left: 3px solid #c9a84c;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #888;">Our address</p>
            <p style="margin: 0; font-size: 14px; color: #f5f5f5;">347 Atlantic Ave, Brooklyn, NY 11217</p>
          </div>
          <p style="color: #555; font-size: 12px; margin-top: 24px;">
            Questions? Reply to this email or call us directly.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
