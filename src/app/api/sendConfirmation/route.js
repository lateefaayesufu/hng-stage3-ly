import { Resend } from "resend";
import orderConfirmationEmail from "@/hooks/orderConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const data = await req.json();

  try {
    const email = orderConfirmationEmail(data);
    await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified domain
      to: data.customer.email,
      subject: email.subject,
      html: email.html,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}