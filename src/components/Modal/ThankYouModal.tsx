"use client"

import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CartContext } from "@/context/CartContext"

interface ThankYouModalProps {
  showModal: boolean
  modelState: () => void
  previewUrl?: string | null
  orderId?: string
}

export default function ThankYouModal({
  showModal,
  modelState,
  previewUrl,
  orderId,
}: ThankYouModalProps) {
  const [seeMore, setSeeMore] = useState(false)
  const router = useRouter()

  const context = useContext(CartContext)
  if (!context)
    throw new Error("ThankYouModal must be used within a CartContextProvider")

  const { cart, totalPriceCalc, clearCart } = context
  const cartTotal = totalPriceCalc()

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showModal])

  const handleClose = () => {
    modelState()
    clearCart() // ✅ clear cart after order confirmation
    if (orderId) {
      router.push(`/order-confirmation?orderId=${orderId}`)
    } else {
      router.push("/")
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!showModal) return null

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-5"
    >
      <div className="w-full max-w-[540px] animate-[fadeIn_0.3s_ease-out]">
        <div className="flex flex-col md:flex-row w-full rounded-lg overflow-hidden shadow-2xl max-h-[90vh]">
          {/* LEFT: White side */}
          <div className="flex flex-col justify-between bg-white p-8 md:p-10 flex-1 min-h-[300px]">
            <div>
              <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.7539 33.3328L27.5054 40.0843L43.3085 24.2812"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="text-[28px] md:text-[32px] font-bold leading-tight tracking-wider uppercase">
                Thank you
                <br />
                for your order
              </h3>
              <p className="text-[15px] text-black/50 mt-6 leading-[25px]">
                You will receive an email confirmation shortly.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={handleClose}
                className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white font-bold text-[13px] tracking-[1px] uppercase w-full h-12 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Back to Home
              </button>

              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-center text-black/60 underline mt-4 hover:text-black/80"
                >
                  Preview Sent Email
                </a>
              )}
            </div>
          </div>

          {/* RIGHT: Dark side with order summary */}
          <div className="bg-[#000000] text-white flex flex-col p-6 md:p-8 md:w-[280px] min-h-[200px] md:min-h-[300px]">
            <div className="flex-1 overflow-y-auto">
              {cart.length > 0 && (
                <>
                  {!seeMore ? (
                    <div className="flex items-center gap-4 pb-3">
                      <div className="w-[50px] h-[50px] relative flex-shrink-0 rounded-lg overflow-hidden bg-[#F1F1F1]">
                        <Image
                          src={cart[0].image}
                          width={50}
                          height={50}
                          alt={cart[0].name}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-bold uppercase truncate">
                          {cart[0].name}
                        </div>
                        <div className="text-[14px] text-white/50 font-bold">
                          ${cart[0].price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-[15px] text-white/50 font-bold">
                        x{cart[0].quantity}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 pb-3 max-h-[180px] overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-[50px] h-[50px] relative flex-shrink-0 rounded-lg overflow-hidden bg-[#F1F1F1]">
                            <Image
                              src={item.image}
                              width={50}
                              height={50}
                              alt={item.name}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[15px] font-bold uppercase truncate">
                              {item.name}
                            </div>
                            <div className="text-[14px] text-white/50 font-bold">
                              ${item.price.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-[15px] text-white/50 font-bold">
                            x{item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {cart.length > 1 && (
                    <>
                      <div className="border-t border-white/10 my-3"></div>
                      <button
                        onClick={() => setSeeMore(!seeMore)}
                        className="text-[12px] text-white/50 font-bold w-full text-center hover:text-white/70 transition-colors"
                      >
                        {!seeMore
                          ? `and ${cart.length - 1} other item(s)`
                          : "View less"}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="mt-auto pt-4">
              <div className="text-[15px] text-white/50 uppercase mb-2">
                Grand Total
              </div>
              <div className="text-[18px] font-bold">
                ${cartTotal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
