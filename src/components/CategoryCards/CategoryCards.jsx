"use client"

import React from "react"
import CategoryCard from "./CategoryCard/CategoryCard"

export default function CategoryCards() {
  return (
    <div className="w-full lg:max-w-[1110px] md:max-w-[689px] sm:max-w-[327px] flex flex-row sm:flex-col justify-between m-auto flex-wrap sm:h-[683px]">
      <CategoryCard
        image="/shared/desktop/image-category-thumbnail-headphones.png"
        link="/category/headphones"
        category="Headphones"
      />
      <CategoryCard
        image="/shared/desktop/image-category-thumbnail-speakers.png"
        link="/category/speakers"
        category="Speakers"
      />
      <CategoryCard
        image="/shared/desktop/image-category-thumbnail-earphones.png"
        link="/category/earphones"
        category="Earphones"
      />
    </div>
  )
}
