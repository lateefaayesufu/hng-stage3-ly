import { Resend } from "resend"
import orderConfirmationEmail from "@/hooks/orderConfirmationEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed")
  const data = JSON.parse(req.body)

  try {
    const email = orderConfirmationEmail(data)
    await resend.emails.send({
      from: "orders@yourdomain.com",
      to: data.customer.customerEmail,
      subject: email.subject,
      html: email.html,
    })
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
}
