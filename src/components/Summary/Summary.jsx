"use client"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "@/context/CartContext"
import { motion } from "framer-motion"

export default function Summary() {
  const { cart, totalPriceCalc } = useContext(CartContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const cartTotal = totalPriceCalc()

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h6>Summary</h6>
      </div>
      {cart.length !== 0 ? (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex w-full justify-between items-center gap-x-4 pb-6"
          >
            <div className="w-[64px] h-[64px]">
              <Image
                src={item.image}
                width={64}
                height={64}
                alt={item.name}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-1 items-start flex-col">
              <h6 className="text-[15px] tracking-normal">{item.name}</h6>
              <p className="font-bold text-black/50">
                ${item.price.toLocaleString()}
              </p>
            </div>
            <div className="h-[49px]">
              <p className="text-black/50 font-bold">x{item.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-black/50">Your cart is empty!</p>
      )}
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <p className="uppercase text-black/50">Total</p>
          <h6>${cartTotal.toLocaleString()}</h6>
        </div>
        <div className="flex justify-between">
          <p className="uppercase text-black/50">Shipping</p>
          <h6>${cartTotal !== 0 ? "50" : "0"}</h6>
        </div>
        <div className="flex justify-between">
          <p className="uppercase text-black/50">VAT (Included)</p>
          <h6>${Math.floor((cartTotal * 20) / 100).toLocaleString()}</h6>
        </div>
        <div className="flex justify-between mt-4">
          <p className="uppercase text-black/50">Grand Total</p>
          <h6 className="text-dark-salmon">
            ${cartTotal !== 0 ? (cartTotal + 50).toLocaleString() : "0"}
          </h6>
        </div>
      </div>
      <motion.button
        className="mt-8 bg-dark-salmon text-white font-bold uppercase w-full h-[48px] text-[13px] tracking-[1px] disabled:opacity-50 hover:bg-salmon"
        form="checkout-form"
        type="submit"
        disabled={cart.length === 0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue & Pay
      </motion.button>
    </div>
  )
}
