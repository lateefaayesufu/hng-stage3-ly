"use client"

import Modal from "react-modal"
import Cart from "../Cart/Cart"
import Link from "next/link"
import { CartContext } from "@/context/CartContext"
import { useContext, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const ThankYouModal = ({ showModal, modelState }) => {
  const [seeMore, setSeeMore] = useState(false)
  const { clearCart, cart, totalPriceCalc } = useContext(CartContext)

  const cartTotal = totalPriceCalc()

  return (
    <div>
      {cart.length > 0 && (
        <Modal
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: "20",
            },
            content: {
              position: "absolute",
              maxHeight: "713px",
              height: "fit-content",
              width: "clamp(5%, 540px, 90%)",
              top: "110px",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "0",
              border: "1px solid #ccc",
              background: "white",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
              cursor: "auto",
            },
          }}
          closeTimeoutMS={800}
          isOpen={showModal}
          onRequestClose={!showModal}
          contentLabel="Cart"
          id="thankyou-modal"
        >
          <div className="flex flex-col p-[18px] gap-y-6">
            <div>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="32" fill="#D87D4A" />
                <path
                  d="M20.7539 33.3328L27.5054 40.0843L43.3085 24.2812"
                  stroke="white"
                  stroke-width="4"
                />
              </svg>
            </div>
            <div>
              <h3>
                Thank you
                <br />
                for your order
              </h3>
              <p className="text-black/50 pt-4 block">
                You will receive an email confirmation shortly.
              </p>
            </div>
            <div className="w-full h-fit min-h-[140px] sm:min-h-[140px] bg-grey rounded-md flex flex-row justify-between sm:flex-col">
              <div className="flex flex-col p-[24px] w-[248px] sm:w-full">
                <div className="flex min-h-[60%] justify-between gap-y-4 mb-4 flex-col">
                  {!seeMore ? (
                    <div className="flex justify-between w-full">
                      <div className="w-[50px] h-[50px] relative">
                        <Image
                          src={cart[0].image}
                          width={40}
                          height={40}
                          alt={cart[0].name}
                          className="object-cover m-auto pt-[5px]"
                        />
                      </div>
                      <div className="flex-1 pl-2">
                        <p className="text-[15px] text-black font-bold uppercase">
                          {cart[0].name == "XX99 MK II Headphones" ||
                          cart[0].name == "XX99 MK I Headphones"
                            ? cart[0].name.split(" Headphones")[0]
                            : cart[0].name.split(" ")[0]}
                        </p>
                        <p className="text-[14px] text-black/50 font-bold uppercase">
                          $ {cart[0].price.toLocaleString()}
                        </p>
                      </div>
                      <div className="font-bold text-black/50 text-[15px]">
                        x{cart[0].quantity}
                      </div>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div className="flex justify-between w-full">
                        <div className="w-[50px] h-[50px] relative">
                          <Image
                            src={item.image}
                            width={40}
                            height={40}
                            alt={item.name}
                            className="object-cover m-auto pt-[5px]"
                          />
                        </div>
                        <div className="flex-1 pl-2">
                          <p className="text-[15px] text-black font-bold uppercase">
                            {item.name == "XX99 MK II Headphones" ||
                            item.name == "XX99 MK I Headphones"
                              ? item.name.split(" Headphones")[0]
                              : item.name.split(" ")[0]}
                          </p>
                          <p className="text-[14px] text-black/50 font-bold uppercase">
                            $ {item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="font-bold text-black/50 text-[15px]">
                          x{item.quantity}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t border-gray w-full">
                  {cart.length > 1 && (
                    <button
                      className="block py-2 w-fit m-auto font-bold text-black/50 text-[12px] hover:text-black/30"
                      onClick={() =>
                        !seeMore ? setSeeMore(true) : setSeeMore(false)
                      }
                    >
                      {!seeMore
                        ? `and ${cart.length - 1} other item${
                            cart.length > 1 ? "(s)" : ""
                          }`
                        : "View less"}
                    </button>
                  )}
                </div>
              </div>
              <div className="relative w-[198px] sm:w-full sm:h-[100px] bg-black rounded-r-md sm:rounded-b-md sm:rounded-t-none flex flex-col sm:justify-center justify-end items-center sm:items-start sm:pl-[24px] gap-y-1">
                <p className="text-[15px] text-white/50 font-medium uppercase w-[70%]">
                  Grand Total
                </p>
                <p className="text-[18px] text-white font-bold uppercase w-[70%] pb-[25%] sm:pb-0">
                  ${cartTotal.toLocaleString()}
                </p>
              </div>
            </div>
            <Link href="/">
              <motion.button
                className="mt-4 bg-dark-salmon text-white font-bold uppercase w-full h-[48px] text-[13px] tracking-[1px] disabled:opacity-50 hover:bg-salmon"
                form="checkout-form"
                type="submit"
                onClick={() => clearCart()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to home
              </motion.button>
            </Link>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ThankYouModal
