"use client"

import Image from "next/image"
import React from "react"
import ButtonOne from "../components/Buttons/ButtonOne"
import CategoryCards from "../components/CategoryCards/CategoryCards"
import AboutSection from "../components/AboutSection/AboutSection"
import { motion } from "framer-motion"

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0, 0.71, 0.2, 1.01] },
      }}
      exit={{ opacity: 0, x: 20 }}
    >
      {/* HERO SECTION */}
      <section className="relative h-[729px] sm:h-[600px] flex flex-col items-center justify-center">
        {/* Desktop */}
        <Image
          className="absolute z-0 object-cover h-[729px] top-0 md:hidden lg:block sm:hidden"
          src="/home/desktop/image-hero.jpg"
          alt="Hero image for XX99 MARK II Headphones"
          width={1400}
          height={729}
          priority
        />
        {/* Tablet */}
        <Image
          className="absolute z-0 object-cover h-[729px] top-0 md:block lg:hidden sm:hidden"
          src="/home/tablet/image-header.jpg"
          alt="Hero image for XX99 MARK II Headphones"
          width={768}
          height={729}
          priority
        />
        {/* Mobile */}
        <Image
          className="absolute z-0 object-cover h-[600px] top-0 md:hidden lg:hidden sm:block"
          src="/home/mobile/image-header.jpg"
          alt="Hero image for XX99 MARK II Headphones"
          fill
          priority
        />

        <div className="flex flex-col lg:items-start md:items-center lg:text-left md:text-center sm:text-center md:justify-center sm:justify-end relative h-full sm:h-[70%] lg:w-[1110px] md:w-[689px] sm:w-[328px] max-w-[1110px] gap-y-6 shrink-0 pt-8 sm:pt-0">
          <p className="overline-text text-white/50">New product</p>
          <h1 className="text-white lg:w-1/2 md:w-[80%]">
            XX99 Mark II Headphones
          </h1>
          <p className="text-white/75 shrink-0 w-[349px] sm:w-full mb-4 sm:text-[15px]">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <ButtonOne
            link={"category/headphones/xx99-mark-two-headphones"}
            color={"bg-dark-salmon text-white hover:bg-salmon"}
          />
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="lg:pt-[120px] md:pt-[96px] sm:pt-[40px]">
        <CategoryCards />
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="lg:pt-[168px] md:pt-[96px] sm:pt-[120px] flex flex-col w-[100%] lg:max-w-[1110px] md:max-w-[689px] sm:max-w-[327px] m-auto sm:justify-center gap-y-8 sm:gap-y-6">
        {/* ZX9 Speaker */}
        <div className="flex lg:flex-row md:flex-col sm:flex-col w-full lg:justify-end md:justify-start sm:justify-start items-center sm:items-center sm:text-center rounded-md bg-dark-salmon lg:h-[560px] md:h-[720px] sm:h-[600px] relative overflow-hidden">
  {/* Background Pattern */}
  <Image
    src="/home/desktop/pattern-circles-desktop.svg"
    alt="Background pattern"
    width={944} 
    height={944}
    className="absolute top-[50px] left-[50px] z-0"
    priority
  />

  {/* Speaker Image */}
  <Image
    src="/home/desktop/image-speaker-zx9.png"
    alt="ZX9 Speaker"
    width={360}
    height={417}
    className="z-10 lg:absolute md:block left-[13%] bottom-0 lg:my-0 md:my-14 sm:my-14"
  />

  {/* Content */}
  <div className="z-10 relative lg:w-1/3 md:w-1/2 sm:w-[80%] lg:text-left md:text-center flex flex-col gap-y-7">
    <h1 className="text-white sm:px-4">ZX9 SPEAKER</h1>
    <p className="text-white">
      Upgrade to premium speakers that are phenomenally built to deliver
      truly remarkable sound.
    </p>
    <ButtonOne
      link={"category/speakers/zx9-speaker"}
      color={"bg-black text-white hover:bg-[#4C4C4C]"}
    />
  </div>
</div>


        {/* ZX7 Speaker */}
        <div className="flex flex-row w-full justify-start items-center rounded-md h-[320px] sm:h-[320px] relative">
          <div className="z-10 relative lg:w-1/3 md:w-2/3 flex flex-col gap-y-7 sm:gap-y-10 justify-center items-start lg:pl-[104px] md:pl-[63px] sm:pl-[24px]">
            <h4>ZX7 SPEAKER</h4>
            <ButtonOne
              link={"category/speakers/zx7-speaker"}
              color={
                "border-black border text-black hover:text-white hover:bg-black"
              }
            />
          </div>
          <Image
            alt="ZX7 Speaker"
            src="/home/desktop/container-2-bg.jpg"
            width={1110}
            height={320}
            className="lg:block md:hidden absolute object-cover sm:hidden"
          />
          <Image
            alt="ZX7 Speaker"
            src="/home/tablet/image-speaker-zx7.jpg"
            width={689}
            height={320}
            className="lg:hidden z-0 md:block absolute object-cover sm:hidden"
          />
          <Image
            alt="ZX7 Speaker"
            src="/home/mobile/image-speaker-zx7.jpg"
            fill
            className="lg:hidden z-0 md:hidden absolute object-cover sm:block sm:rounded-md"
          />
        </div>

        {/* YX1 Earphones */}
        <div className="flex flex-row sm:flex-col w-full justify-start items-center h-[320px] sm:h-[424px] relative gap-x-[30px] sm:gap-y-6">
          <div className="bg-black w-full max-w-[540px] h-[320px] sm:h-[327px] sm:max-w-full rounded-md relative">
            <Image
              alt="YX1 Earphones"
              src="/home/desktop/container-3-img.jpg"
              width={540}
              height={320}
              className="object-cover rounded-md lg:block md:hidden sm:hidden"
            />
            <Image
              alt="YX1 Earphones"
              src="/home/tablet/image-earphones-yx1.jpg"
              width={540}
              height={320}
              className="object-cover rounded-md lg:hidden md:block sm:hidden"
            />
            <Image
              alt="YX1 Earphones"
              src="/home/mobile/image-earphones-yx1.jpg"
              fill
              className="object-cover rounded-md lg:hidden md:hidden sm:block"
            />
          </div>
          <div className="w-full max-w-[540px] bg-grey h-[320px] rounded-md">
            <div className="lg:pl-[95px] md:pl-[42.5px] sm:pl-6 h-full flex flex-col justify-center gap-y-7">
              <h4>YX1 EARPHONES</h4>
              <ButtonOne
                color={
                  "border-black border text-black hover:text-white hover:bg-black"
                }
                link={"category/earphones/yx1-earphones"}
              />
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
    </motion.div>
  )
}
