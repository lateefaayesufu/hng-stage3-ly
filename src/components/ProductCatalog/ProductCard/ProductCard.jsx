"use client"
import Image from "next/image"
import React from "react"
import { data } from "@/app/category/[products]/data"
import ButtonOne from "@/components/Buttons/ButtonOne"

export default function ProductCard({ product, index }) {
  return (
    <div>
      <div
        className={`item-${index} m-auto w-[100%] lg:max-w-[1110px] md:max-w-[689px] sm:max-w-[327px] flex justify-between items-center gap-x-10 gap-y-10 sm:flex-col`}
      >
        <div className="relative rounded-md lg:h-[560px] md:h-[352px] sm:h-[352px] lg:w-[540px] md:w-full sm:w-full bg-grey">
          <Image
            src={`${product.image.desktop}`}
            alt={product.name}
            priority={true}
            className="lg:object-cover md:object-contain rounded-md m-auto"
            fill={true}
          />
        </div>
        <div className="flex flex-col gap-y-2 lg:items-start md:items-center sm:items-center lg:text-left md:text-center sm:text-center">
          {product.new && (
            <p className="overline-text text-dark-salmon w-1/2 sm:w-full sm:pb-2 sm:font-normal">
              New Product
            </p>
          )}
          <h2 className="w-[100%] max-w-[342px]">{product.name}</h2>
          <p className="w-[100%] max-w-[442px] sm:w-[95%] sm:max-w-[352px] pt-3 pb-5 text-black/50">
            {product.description}
          </p>
          <ButtonOne
            color={"bg-dark-salmon text-white hover:bg-salmon"}
            link={`category/${product.category}/${product.slug}`}
          />
        </div>
      </div>
    </div>
  )
}
