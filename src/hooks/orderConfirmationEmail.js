export default function orderConfirmationEmail({
  orderId,
  customer,
  items,
  total,
  shipping: providedShipping,
  tax: providedTax,
}) {
  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0; border-bottom:1px solid #eee">${item.name}</td>
          <td style="padding:8px 0; border-bottom:1px solid #eee; text-align:center">x${item.quantity}</td>
          <td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right">$${(
            item.price * item.quantity
          ).toFixed(2)}</td>
        </tr>
      `,
    )
    .join("")

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
  </head>
  <body style="font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin:0; padding:0; background:#f8f8f8;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            <tr style="background:#000; color:#fff;">
              <td style="padding:24px 32px; text-align:left;">
                <h1 style="margin:0; font-size:20px;">Audiophile</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h2 style="margin:0 0 8px 0;">Thank you, ${customer.name}!</h2>
                <p style="margin:0 0 16px 0; color:#666">Your order <strong>${orderId}</strong> has been received and is now being processed. Below are the details of your purchase.</p>

                <table width="100%" style="margin-top:16px;">
                  <thead>
                    <tr>
                      <th style="text-align:left; padding-bottom:8px;">Item</th>
                      <th style="text-align:center; padding-bottom:8px;">Qty</th>
                      <th style="text-align:right; padding-bottom:8px;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemRows}
                  </tbody>
                </table>

                <div style="margin-top:24px;">
                  <div style="margin-bottom:16px;">
                    <p style="margin:0 0 6px 0; color:#666; font-weight:600">Shipping to</p>
                    <p style="margin:0;">${customer.address}<br>${customer.city}, ${customer.zip}<br>${customer.country}</p>
                  </div>

                  <table width="100%" style="margin-top:8px;">
                    <tr>
                      <td style="padding:6px 0; color:#666">Subtotal</td>
                      <td style="padding:6px 0; text-align:right">$${items.reduce((s, it) => s + it.price * it.quantity, 0).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0; color:#666">Shipping</td>
                      <td style="padding:6px 0; text-align:right">$${(providedShipping ?? 50).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0; color:#666">Tax</td>
                      <td style="padding:6px 0; text-align:right">$${(providedTax ?? (items.reduce((s, it) => s + it.price * it.quantity, 0) * 0.1)).toFixed(2)}</td>
                    </tr>
                    <tr style="font-weight:700; border-top:1px solid #eee;">
                      <td style="padding:8px 0;">Grand total</td>
                      <td style="padding:8px 0; text-align:right">$${(total ?? (items.reduce((s, it) => s + it.price * it.quantity, 0) + (providedShipping ?? 50) + (providedTax ?? (items.reduce((s, it) => s + it.price * it.quantity, 0) * 0.1)))).toFixed(2)}</td>
                    </tr>
                  </table>

                  <div style="margin-top:20px; text-align:center;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_ORIGIN || ''}/order-confirmation?orderId=${orderId}" style="display:inline-block; background:#D87D4A; color:#fff; padding:12px 24px; border-radius:4px; text-decoration:none;">View your order</a>
                  </div>

                  <p style="margin-top:18px; color:#999; font-size:13px;">If you have any questions, reply to this email or contact our support at <a href="mailto:${process.env.FROM_EMAIL ? process.env.FROM_EMAIL.replace(/.*<|>.*/g, '') : 'support@audiophile.com'}" style="color:#666;">${process.env.FROM_EMAIL ? process.env.FROM_EMAIL.replace(/.*<|>.*/g, '') : 'support@audiophile.com'}</a>.</p>
                </div>
              </td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:16px 32px; text-align:center; color:#999; font-size:12px;">© ${new Date().getFullYear()} Audiophile. All rights reserved.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `

  return {
    subject: `Your Order ${orderId} Confirmation`,
    html,
  }
}
