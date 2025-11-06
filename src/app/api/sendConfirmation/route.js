import orderConfirmationEmail from "@/hooks/orderConfirmationEmail";
import { sendMail } from "@/lib/email";

export async function POST(req) {
  const data = await req.json();

  try {
    const email = orderConfirmationEmail(data);
    const result = await sendMail({
      to: data.customer.email,
      subject: email.subject,
      html: email.html,
    });

    if (!result || !result.success) {
      console.error('sendMail failed:', result)
      return new Response(JSON.stringify({ success: false, error: result?.error || 'Unknown error' }), { status: 500 })
    }

    // expose preview URL in dev for easier debugging
    return new Response(JSON.stringify({ success: true, previewUrl: result.previewUrl || null }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : String(err) }), { status: 500 });
  }
}