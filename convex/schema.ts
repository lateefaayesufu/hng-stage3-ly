import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  orders: defineTable({
    // Customer details
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),

    // Shipping details
    shippingAddress: v.string(),
    city: v.string(),
    country: v.string(),
    zipCode: v.string(),

    // Order items
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      }),
    ),

    // Totals
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    grandTotal: v.number(),

    // Payment method
    paymentMethod: v.string(), // "cash" or "e-money"

    // Status
    orderStatus: v.string(), // "pending", "confirmed", "shipped", "delivered"

    // Timestamps
    createdAt: v.number(),
  })
    .index("by_email", ["customerEmail"])
    .index("by_creation", ["createdAt"]),
})
