"use client"

import React, { useRef, useState } from "react"
import headphone from "public/shared/desktop/image-category-thumbnail-headphones.png"
import speaker from "public/shared/desktop/image-category-thumbnail-speakers.png"
import earphone from "public/shared/desktop/image-category-thumbnail-earphones.png"
import CategoryCard from "./CategoryCard/CategoryCard"

export default function CategoryCards() {
  return (
    <div className="w-[100%] lg:max-w-[1110px] md:max-w-[689px] sm:max-w-[327px] flex flex-row sm:flex-col justify-between m-auto flex-wrap sm:h-[683px]">
      <CategoryCard
        image={headphone}
        link="/category/headphones"
        category="Headphones"
      />
      <CategoryCard
        image={speaker}
        link="/category/speakers"
        category="Speakers"
      />
      <CategoryCard
        image={earphone}
        link="/category/earphones"
        category="Earphones"
      />
    </div>
  )
}
