import Link from "next/link"
import React from "react"

interface ButtonTwoProps {
  link: string;
}

export default function ButtonTwo({ link }: ButtonTwoProps) {
  return (
    <div>
      <Link
        href={link}
        className="sub-title text-black/50 flex items-center gap-x-3"
      >
        Shop
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
      </Link>
    </div>
  )
}
