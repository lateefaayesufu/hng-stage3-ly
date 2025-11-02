import Image from "next/image"
import React, { useContext, useState } from "react"
import { CartContext } from "@/context/CartContext"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Cart({ closeCart }) {
  const {
    cart,
    subtractQuantity,
    addQuantity,
    totalPriceCalc,
    clearCart,
    removeQuantity,
  } = useContext(CartContext)

  const cartTotal = totalPriceCalc()

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h6>
          Cart <span>({cart.length})</span>
        </h6>
        <motion.button
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          onClick={clearCart}
          className="text-black/25 underline disabled:text-black/0 hover:text-dark-salmon"
          disabled={cart.length == 0}
        >
          Remove all
        </motion.button>
      </div>
      <ul>
        {cart.length == 0 ? (
          <p className="text-black/50 text-regular">Your cart is empty!</p>
        ) : (
          cart.map((item) => (
            <li
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
              <div className="w-[96px] h-[32px] bg-grey flex items-center">
                <button
                  className="flex-1 text-black/25 hover:text-dark-salmon ease-in-out duration-200"
                  onClick={() =>
                    item.quantity > 1
                      ? subtractQuantity(item.id)
                      : removeQuantity(item.id)
                  }
                  // disabled={item.quantity == 0}
                >
                  -
                </button>
                <p className="flex-1 text-center">{item.quantity}</p>
                <button
                  className="flex-1 text-black/25 hover:text-dark-salmon ease-in-out duration-200"
                  onClick={(e) => addQuantity(item.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="flex justify-between">
        <p className="uppercase text-black/50">Total</p>
        <h6>${cartTotal.toLocaleString()}</h6>
      </div>
      <Link href={"/checkout"} onClick={() => closeCart()}>
        <motion.button
          className="bg-dark-salmon text-white font-bold uppercase w-full h-[48px] text-[13px] tracking-[1px] disabled:bg-dark-salmon/50 hover:bg-salmon ease-in-out duration-300"
          disabled={cart.length == 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Checkout
        </motion.button>
      </Link>
    </div>
  )
}
