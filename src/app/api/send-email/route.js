import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { to, subject, html } = await req.json()

    const data = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>",
      to,
      subject,
      html,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    )
  }
}
