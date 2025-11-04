// app/category/[products]/ProductClientPage.jsx
"use client"

import { data } from "./data"
import ProductCatalog from "../../../components/ProductCatalog/ProductCatalog"
import { motion } from "framer-motion"

const getData = (productsCategory) => {
  return data.filter((product) => product.category === productsCategory)
}

export default function ProductClientPage({ productsCategory }) {
  const categoryItems = getData(productsCategory)

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
      {/* Header Section */}
      <section className="h-[336px] sm:h-[192px] w-full bg-black flex items-end justify-center">
        <h2 className="h-1/3 text-white capitalize">{productsCategory}</h2>
      </section>

      {/* Product List */}
      <ProductCatalog category={categoryItems} />
    </motion.div>
  )
}
