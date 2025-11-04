import { Resend } from "resend"
import { NextResponse } from "next/server"

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set. Please add it to your .env.local file.');
}

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
}

export async function POST(req: Request) {
  try {
    const { to, subject, html }: EmailRequest = await req.json()

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>",
      to,
      subject,
      html,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email'
      },
      { status: 500 }
    )
  }
}
