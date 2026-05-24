import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, subject, message } = await req.json();

  const { error } = await resend.emails.send({
    from: "MC86 Contact Form <onboarding@resend.dev>",
    to: ["kgomotsowilbur@gmail.com"],
    replyTo: email,
    subject: `New Enquiry: ${subject || "General"}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name</strong></td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td>
            <td style="padding: 8px 0;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Subject</strong></td>
            <td style="padding: 8px 0;">${subject || "General Enquiry"}</td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
          <strong style="color: #666;">Message</strong>
          <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #999;">
          Sent via mc86group.com contact form. Hit Reply to respond directly to ${name}.
        </p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}