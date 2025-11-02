import React from "react"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CategoryCard({
  image,
  link,
  category,
  dropDownClose,
  className,
}) {
  const onHover = useRef()

  const onEnter = () => {
    onHover.current.style.color = "#D87D4A"
  }
  const onLeave = () => {
    onHover.current.style.color = "rgba(0,0,0,0.5)"
  }

  return (
    <Link
      className={`w-[32%] sm:w-full lg:h-[264px] md:h-[217px] sm:h-[217px] flex flex-col relative items-center justify-end ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      href={link}
      onClick={dropDownClose}
    >
      <Image
        className="absolute lg:top-0 md:top-[20px] sm:top-[0px] left-[50%] translate-x-[-50%] lg:h-[160px] md:h-[104px] sm:h-[144px] w-auto"
        src={image}
        width={133}
        height={160}
        alt="Category Images"
      />
      <div
        className={`w-full bg-grey lg:h-[204px] md:h-[165px] sm:h-[165px] flex flex-col items-center justify-end pb-[30px] gap-y-[12px] rounded-md`}
      >
        <h6>{category}</h6>
        <motion.button
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          ref={onHover}
          className={`sub-title flex items-center gap-x-3 ease-in-out duration-300 text-black/50 cursor-auto`}
        >
          Shop{" "}
          <span>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.3219 1L6.3219 6L1.3219 11"
                stroke="#D87D4A"
                strokeWidth="2"
              />
            </svg>
          </span>
        </motion.button>
      </div>
    </Link>
  )
}
