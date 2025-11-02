import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// Create a new order
export const createOrder = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    city: v.string(),
    country: v.string(),
    zipCode: v.string(),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      }),
    ),
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    grandTotal: v.number(),
    paymentMethod: v.string(),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      orderStatus: "pending",
      createdAt: Date.now(),
    })

    return orderId
  },
})

// Get order by ID
export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.orderId)
  },
})

// Get all orders for a customer
export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customerEmail", args.email))
      .order("desc")
      .collect()
  },
})

// Get all orders (admin view)
export const getAllOrders = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_creation")
      .order("desc")
      .take(100)
  },
})

// Update order status
export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      orderStatus: args.status,
    })
  },
})
