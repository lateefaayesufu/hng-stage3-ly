import React from "react"
import ProductCard from "./ProductCard/ProductCard"
import { notFound } from "next/navigation"

export default function ProductCatalog({ category }) {
  return (
    <div className="lg:py-[160px] md:py-[120px] sm:py-[64px] flex flex-col gap-y-[160px]">
      {category.length > 0
        ? [...category].reverse().map((product, i) => (
 
              <ProductCard index={i} product={product} key={product.id} />
            ))
        : notFound()}
    </div>
  )
}
