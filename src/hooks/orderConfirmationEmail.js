export default function orderConfirmationEmail({
  orderId,
  customer,
  items,
  total,
}) {
  const itemList = items
    .map(
      (item) =>
        `<li>${item.name} x ${item.quantity} - $${
          item.price * item.quantity
        }</li>`,
    )
    .join("")

  return {
    subject: `Your Order ${orderId} Confirmation`,
    html: `
      <h1>Thank you, ${customer.name}!</h1>
      <p>Your order <strong>${orderId}</strong> has been received.</p>
      <h2>Order Summary:</h2>
      <ul>
        ${itemList}
      </ul>
      <p>Total: $${total}</p>
      <h3>Shipping Address:</h3>
      <p>
        ${customer.address}<br/>
        ${customer.city}, ${customer.zip}<br/>
        ${customer.country}
      </p>
      <p>If you have any questions, reply to this email or contact support.</p>
    `,
  }
}
