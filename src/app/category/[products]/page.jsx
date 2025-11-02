"use client"
import { data } from "@/app/category/[products]/data"
import ProductCatalog from "@/components/ProductCatalog/ProductCatalog"
import { motion } from "framer-motion"

const getData = (productsCategory) => {
  const productItems = data.filter((product) => {
    if (product.category == productsCategory) {
      return product
    }
  })

  if (productItems) {
    return productItems
  }
}
export default function products({ params }) {
  const productsCategory = getData(params.products)

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
        },
      }}
      exit={{ opacity: 0, x: 10 }}
    >
      <section className="h-[336px] sm:h-[192px] w-full bg-black flex items-end justify-center">
        <h2 className="h-1/3 text-white">{params.products}</h2>
      </section>
      <ProductCatalog category={productsCategory} />
    </motion.div>
  )
}
