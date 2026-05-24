import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, subject, message } = await req.json();

    const { error } = await resend.emails.send({
        from: `${name} Project Enquiry <no-reply@mc86group.com>`,
        to: ["info@mc86group.com"],
        replyTo: email,
        subject: `New Enquiry: ${subject || "General"}`,
        html: `
            <div
                style="
                    font-family: Arial, sans-serif;
                    background: #f5f7f4;
                    padding: 40px 20px;
                    color: #1a1a1a;
                "
                >
                <div
                    style="
                    max-width: 640px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.06);
                    "
                >
                    
                    <!-- Top Banner -->
                    <div
                    style="
                        background: linear-gradient(135deg, #55624f 0%, #394236 100%);
                        padding: 40px 35px;
                        position: relative;
                    "
                    >
                        <p
                            style="
                            margin: 0;
                            color: rgba(255,255,255,0.7);
                            text-transform: uppercase;
                            letter-spacing: 4px;
                            font-size: 11px;
                            margin-bottom: 12px;
                            "
                        >
                            MC'86 Engineering & Construction
                        </p>

                        <h2
                            style="
                            margin: 0;
                            color: #ffffff;
                            font-size: 32px;
                            line-height: 1.2;
                            font-weight: 700;
                            "
                        >
                            New Contact Form Submission
                        </h2>

                        <p
                            style="
                            margin-top: 14px;
                            color: rgba(255,255,255,0.75);
                            font-size: 14px;
                            line-height: 1.7;
                            max-width: 480px;
                            "
                        >
                            A new enquiry has been submitted through the MC'86 Engineering & Construction website contact form.
                        </p>
                        </div>

                        <!-- Main Content -->
                        <div style="padding: 35px;">

                        <!-- Contact Details -->
                        <div
                            style="
                            border: 1px solid #ececec;
                            border-radius: 18px;
                            overflow: hidden;
                            margin-bottom: 24px;
                            "
                        >
                            <table
                            style="
                                width: 100%;
                                border-collapse: collapse;
                            "
                            >
                            <tr style="background: #fafafa;">
                                <td
                                style="
                                    padding: 18px 20px;
                                    color: #6b7280;
                                    font-size: 13px;
                                    font-weight: 600;
                                    width: 140px;
                                    border-bottom: 1px solid #ececec;
                                "
                                >
                                Full Name
                                </td>

                                <td
                                style="
                                    padding: 18px 20px;
                                    font-size: 14px;
                                    border-bottom: 1px solid #ececec;
                                "
                                >
                                    ${name}
                                </td>
                            </tr>

                            <tr>
                                <td
                                style="
                                    padding: 18px 20px;
                                    color: #6b7280;
                                    font-size: 13px;
                                    font-weight: 600;
                                    width: 140px;
                                    border-bottom: 1px solid #ececec;
                                "
                                >
                                Email Address
                                </td>

                                <td
                                style="
                                    padding: 18px 20px;
                                    font-size: 14px;
                                    border-bottom: 1px solid #ececec;
                                "
                                >
                                <a
                                    href="mailto:${email}"
                                    style="
                                    color: #55624f;
                                    text-decoration: none;
                                    font-weight: 600;
                                    "
                                >
                                    ${email}
                                </a>
                                </td>
                            </tr>

                            <tr style="background: #fafafa;">
                                <td
                                style="
                                    padding: 18px 20px;
                                    color: #6b7280;
                                    font-size: 13px;
                                    font-weight: 600;
                                    width: 140px;
                                    border-bottom: 1px solid #ececec;
                                "
                                >
                                Phone Number
                                </td>

                                <td
                                style="
                                    padding: 18px 20px;
                                    font-size: 14px;
                                    border-bottom: 1px solid #ececec;
                                "
                                >
                                    ${phone || "Not provided"}
                                </td>
                            </tr>

                            <tr>
                                <td
                                style="
                                    padding: 18px 20px;
                                    color: #6b7280;
                                    font-size: 13px;
                                    font-weight: 600;
                                    width: 140px;
                                "
                                >
                                Subject
                                </td>

                                <td
                                style="
                                    padding: 18px 20px;
                                    font-size: 14px;
                                    font-weight: 500;
                                "
                                >
                                    ${subject || "General Enquiry"}
                                </td>
                            </tr>
                            </table>
                        </div>

                        <!-- Message Box -->
                        <div
                            style="
                            background: linear-gradient(180deg, #fafafa 0%, #f4f4f4 100%);
                            border: 1px solid #ececec;
                            border-radius: 20px;
                            padding: 24px;
                            "
                        >
                            <p
                            style="
                                color: #55624f;
                                font-size: 12px;
                                font-weight: 700;
                                letter-spacing: 2px;
                                text-transform: uppercase;
                            "
                            >
                            Message
                            </p>

                            <p
                            style="
                                style="
                                margin: 0;
                                color: #444;
                                font-size: 14px;
                                line-height: 1.8;
                                white-space: pre-wrap;
                                text-align: left;
                            "
                            >
                                ${message}
                            </p>
                        </div>

                        <!-- Footer -->
                        <div
                            style="
                            margin-top: 28px;
                            padding-top: 20px;
                            border-top: 1px solid #ececec;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            gap: 20px;
                            flex-wrap: wrap;
                            "
                        >
                            <p
                            style="
                                margin: 0;
                                color: #9ca3af;
                                font-size: 12px;
                                line-height: 1.6;
                            "
                            >
                            Sent via mc86group.com contact form.
                            <br />
                            Reply directly to respond to ${name}.
                            </p>

                            <div
                            style="
                                padding: 10px 16px;
                                border-radius: 999px;
                                background: rgba(85, 98, 79, 0.08);
                                color: #55624f;
                                font-size: 11px;
                                font-weight: 700;
                                letter-spacing: 1px;
                                text-transform: uppercase;
                            "
                            >
                            MC'86 Engineering & Construction
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}