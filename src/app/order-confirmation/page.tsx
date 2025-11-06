"use client"

import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Link from "next/link"
import { Doc } from "../../../convex/_generated/dataModel"

type Order = Doc<"orders">

export default function OrderConfirmation() {
  const [latestOrder, setLatestOrder] = useState<Order | null>(null)
  const orders = useQuery(api.orders.getAllOrders) || []

  // Prefer lastOrder stored in localStorage (set by checkout flow). Fallback to Convex data.
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lastOrder')
      if (raw) {
        const parsed = JSON.parse(raw)
        // Convert to Order-like shape if possible
        const localOrder: any = {
          _id: parsed.orderId,
          customerName: parsed.customer?.name || parsed.customerName,
          customerEmail: parsed.customer?.email || parsed.customerEmail,
          items: parsed.items?.map((it: any) => ({
            productId: it.productId || it.name,
            name: it.name,
            price: it.price,
            quantity: it.quantity,
            image: it.image || '',
          })) || [],
          grandTotal: parsed.total || parsed.grandTotal || 0,
        }
        setLatestOrder(localOrder as Order)
        // remove stored order after reading
        localStorage.removeItem('lastOrder')
        return
      }
    } catch (e) {
      console.warn('Failed to read lastOrder from localStorage', e)
    }

    if (orders.length > 0) {
      // Sort by creation time if needed (optional safety)
      const sorted = [...orders].sort(
        (a, b) => (b._creationTime as any) - (a._creationTime as any),
      )
      setLatestOrder(sorted[0])
    }
  }, [orders])

  if (!latestOrder) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading your order...</p>
      </div>
    )
  }

  return (
    <div className="max-w-[1110px] m-auto my-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-dark-salmon">
        Thank you for your order, {latestOrder.customerName}!
      </h2>
      <p className="mb-6 text-black/70">
        Your order ID is{" "}
        <strong className="text-black/90">{latestOrder._id}</strong>
      </p>

      <div className="bg-grey/10 p-6 rounded-md border border-grey/30">
        <h3 className="font-bold mb-3 text-lg">Order Summary</h3>
        {latestOrder.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between border-b border-gray-200 py-2 text-[15px]"
          >
            <span className="font-medium text-black/80">
              {item.name} x{item.quantity}
            </span>
            <span className="font-semibold text-black/90">
              ${item.price.toLocaleString()}
            </span>
          </div>
        ))}
        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Grand Total:</span>
          <span className="text-dark-salmon">
            ${latestOrder.grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block bg-dark-salmon hover:bg-salmon transition text-white py-3 px-6 rounded-md font-bold"
      >
        Back to Home
      </Link>
    </div>
  )
}
