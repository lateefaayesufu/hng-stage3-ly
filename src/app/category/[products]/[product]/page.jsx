"use client"

import Link from "next/link"
import React, { useContext, useState } from "react"
import { useParams } from "next/navigation"
import { data } from "../data"
import Image from "next/image"
import ButtonOne from "../../../../components/Buttons/ButtonOne"
import { CartContext } from "../../../../context/CartContext"
import { motion } from "framer-motion"

export default function ProductPage() {
  const params = useParams()
  const { product } = params

  const [quantity, setQuantity] = useState(1)
  const { addToCart, updateQuantity, cart } = useContext(CartContext)

  const productItem = data.find((p) => p.slug === product)
  if (!productItem) return <p>Product not found.</p>

  const lines = productItem.features.match(/[^\r\n]+/g) || []

  const handleCart = () => {
    const inCart = cart.find((item) => item.id === productItem.id)
    if (inCart) {
      updateQuantity(productItem.id, quantity)
    } else {
      addToCart(productItem, quantity)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.8 },
      }}
      exit={{ opacity: 0, x: 10 }}
    >
      {/* Product section */}
      <div className="lg:h-[97px] md:h-[89px] sm:h-[89px] bg-black mb-[79px] sm:mb-[16px]"></div>

      <section className="lg:w-[1110px] md:w-[689px] sm:w-[327px] m-auto lg:pb-[160px] md:pb-[120px] sm:pb-[88px]">
        <Link
          href={`/category/${productItem.category}`}
          className="block mb-10 sm:mb-5 text-black/50 font-medium w-fit hover:text-dark-salmon ease-in-out duration-300"
        >
          Go Back
        </Link>

        <div className="flex w-full sm:flex-col sm:gap-y-6">
          <div className="relative rounded-md bg-grey lg:h-[560px] lg:w-[540px] md:h-[480px] sm:h-[327px] md:w-[281px] sm:w-full">
            <Image
              src={productItem.image.desktop}
              fill
              priority
              alt={productItem.name}
              className="lg:object-cover md:object-contain rounded-md"
            />
          </div>

          <div className="flex-1 flex flex-col gap-y-[16px] sm:gap-y-[24px] justify-center lg:pl-[125px] md:pl-[69.5px]">
            {productItem.new && (
              <p className="overline-text text-dark-salmon">New Product</p>
            )}
            <h2>{productItem.name}</h2>
            <p className="pt-3 pb-4 text-black/50 sm:w-[96%]">
              {productItem.description}
            </p>
            <h6 className="pb-8 text-[18px]">
              $ {productItem.price.toLocaleString()}
            </h6>

            <div className="flex gap-x-4">
              <div className="flex w-[120px] h-[48px] flex-row bg-grey">
                <button
                  className="flex-1 text-black/25 hover:text-dark-salmon"
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                >
                  -
                </button>
                <p className="flex-1 m-auto text-center">{quantity}</p>
                <button
                  className="flex-1 text-black/25 hover:text-dark-salmon"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <motion.button
                className="bg-dark-salmon text-white h-[48px] w-[160px] uppercase sub-title hover:bg-salmon"
                onClick={handleCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Features & In the box section */}
      <section className="flex lg:flex-row md:flex-col sm:flex-col lg:w-[1110px] md:w-[689px] sm:w-[327px] m-auto lg:pb-[160px] md:pb-[120px] sm:pb-[88px] gap-y-[120px] sm:gap-y-[88px]">
        <div className="w-[653px] sm:w-full">
          <h3 className="pb-6">Features</h3>
          {lines.map((p, i) => (
            <p className="pb-6 text-black/50" key={i}>
              {p}
            </p>
          ))}
        </div>

        <div className="flex lg:flex-col md:flex-row sm:flex-col h-full lg:pl-[125px] md:pl-0 gap-x-3">
          <h3 className="pb-6 sm:pb-3 lg:w-fit md:w-[339px]">In the box</h3>
          <ul>
            {productItem.includes.map((include, i) => (
              <li key={i}>
                <p className="pb-2 text-black/50">
                  <span className="pr-4 font-bold text-dark-salmon">
                    {include.quantity}x
                  </span>
                  {include.item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="lg:w-[1110px] md:w-[689px] sm:w-[327px] m-auto grid grid-rows-2 grid-flow-col sm:flex sm:flex-col lg:gap-y-[32px] md:gap-y-[18px] sm:gap-y-[20px] gap-x-7 lg:pb-[160px] md:pb-[120px] sm:pb-[88px]">
        <div className="relative rounded-md bg-gray lg:w-[445px] lg:h-[280px] md:w-[277px] md:h-[174px] sm:w-full sm:h-[174px]">
          <Image
            src={productItem.gallery.first.desktop}
            fill
            className="object-cover rounded-md"
            alt={productItem.name}
          />
        </div>
        <div className="relative rounded-md bg-gray lg:w-[445px] lg:h-[280px] md:w-[277px] sm:w-full sm:h-[174px]">
          <Image
            src={productItem.gallery.second.desktop}
            fill
            className="object-cover rounded-md"
            alt={productItem.name}
          />
        </div>
        <div className="row-span-2 relative rounded-md bg-grey lg:w-[635px] lg:h-[592px] md:w-[395px] md:h-[368px] sm:h-[368px] sm:w-full">
          <Image
            src={productItem.gallery.third.desktop}
            fill
            className="object-cover rounded-md"
            alt={productItem.name}
          />
        </div>
      </section>

      {/* You may also like section */}
      <section className="lg:w-[1110px] md:w-[689px] sm:w-[327px] m-auto lg:pb-[160px] md:pb-[120px] sm:pb-[120px]">
        <h3 className="text-center pb-6">You may also like</h3>
        <div className="flex items-center justify-between sm:flex-col sm:gap-y-[56px]">
          {productItem.others.map((other, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative mb-6 rounded-md sm:bg-grey lg:w-[318px] md:w-[223px] sm:w-[327px] md:h-[318px] sm:h-[120px]">
                <Image
                  src={other.image.desktop}
                  fill
                  className="object-cover sm:object-contain rounded-md"
                  alt={other.name}
                />
              </div>
              <h5 className="pb-6">{other.name}</h5>
              <ButtonOne
                link={`category/${other.slug}`}
                color="bg-dark-salmon text-white hover:bg-salmon ease-in-out duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
