"use client"
import * as React from "react"
import Link from "next/link"
import { HTMLMotionProps, motion } from "framer-motion"

interface ButtonOneProps {
  color: string;
  link: string;
}

type ButtonMotionProps = HTMLMotionProps<"button"> & ButtonOneProps;

// Create a MotionButton alias; keep it untyped (any) to avoid framer-motion/React type conflicts
const MotionButton: any = motion.button

export default function ButtonOne({ color, link }: ButtonOneProps) {
  return (
    <Link href={`/${link}`}>
      <MotionButton
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className={`sub-title ${color} h-[48px] w-[160px]`}
      >
        See Product
      </MotionButton>
    </Link>
  )
}
