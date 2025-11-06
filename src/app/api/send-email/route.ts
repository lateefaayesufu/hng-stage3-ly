import { sendMail } from "@/lib/email"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html } = await req.json()
    const result = await sendMail({ to, subject, html })

    if (result.success) {
      return NextResponse.json(
        { message: "Email sent successfully", previewUrl: result.previewUrl },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("API Error:", error)
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 },
    )
  }
}