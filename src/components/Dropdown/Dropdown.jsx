"use client"

import Backdrop from "./Backdrop/Backdrop"
import { motion } from "framer-motion"
import CategoryCard from "../CategoryCards/CategoryCard/CategoryCard"

export default function Dropdown({ handleClose }) {
  const dropIn = {
    hidden: { transform: "translateY(-20px)", opacity: 0 },
    visible: {
      transform: "translateY(0px)",
      opacity: 1,
      transition: { duration: 1, type: "spring", damping: 25, stiffness: 500 },
    },
    exit: { transform: "translateY(-5px)", opacity: 0 },
  }

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full h-[340px] bg-white relative z-0 top-[88px] rounded-b-md flex justify-center sm:flex-col gap-x-2 gap-y-[16px] px-[39px] items-center sm:justify-start sm:top-[0px] sm:mt-[0vh] sm:mb-[85vh] sm:min-h-[130vh] pt-[40px]"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <CategoryCard
          image="/shared/desktop/image-category-thumbnail-headphones.png"
          link="/category/headphones"
          category="Headphones"
          dropDownClose={handleClose}
          className="m-dropdown-cards"
        />
        <CategoryCard
          image="/shared/desktop/image-category-thumbnail-speakers.png"
          link="/category/speakers"
          category="Speakers"
          dropDownClose={handleClose}
          className="m-dropdown-cards"
        />
        <CategoryCard
          image="/shared/desktop/image-category-thumbnail-earphones.png"
          link="/category/earphones"
          category="Earphones"
          dropDownClose={handleClose}
          className="m-dropdown-cards"
        />
      </motion.div>
    </Backdrop>
  )
}
