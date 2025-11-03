import { Resend } from "resend"
import { NextResponse } from "next/server"

// Initialize Resend with your API key (stored securely in .env.local)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    // Parse incoming JSON body
    const body = await req.json()
    const { customer, items, total } = body

    // Validate required fields
    if (!customer?.email || !customer?.name) {
      return NextResponse.json(
        { error: "Missing customer name or email" },
        { status: 400 },
      )
    }

    if (!items?.length) {
      return NextResponse.json(
        { error: "No order items found" },
        { status: 400 },
      )
    }

    // Construct order summary HTML
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Thank you for your order, ${customer.name}!</h2>
        <p>Here’s your order summary:</p>
        <ul style="padding-left: 20px;">
          ${items
            .map(
              (item) =>
                `<li>${item.name} × ${
                  item.quantity
                } — $${item.price.toLocaleString()}</li>`,
            )
            .join("")}
        </ul>
        <p style="margin-top: 16px; font-weight: bold;">
          Total: $${total.toLocaleString()}
        </p>
        <p style="margin-top: 24px;">
          We’ll start preparing your order right away.
        </p>
        <p style="margin-top: 16px; color: #555;">
          — The Audiophile Team
        </p>
      </div>
    `

    // Send the email using Resend
    const data = await resend.emails.send({
      from: "Audiophile <orders@yourdomain.com>", // must be verified in Resend
      to: customer.email,
      subject: "Your Audiophile Order Confirmation",
      html,
    })

    console.log("Email sent successfully:", data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Email sending error:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    )
  }
}
