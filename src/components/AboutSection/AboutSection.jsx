import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="flex gap-y-[63px] lg:flex-row md:flex-col-reverse sm:flex-col-reverse lg:my-[160px] md:my-[96px] w-full lg:max-w-[1110px] md:max-w-[689px] sm:max-w-[327px] lg:h-[588px] m-auto items-center justify-between sm:my-[120px]">
      <div className="flex-1 lg:pr-[125px] md:pr-0 lg:text-left md:text-center lg:w-auto md:w-[573px]">
        <h2 className="pb-[32px] lg:px-0 md:px-8 sm:text-center">
          Bringing you the <span className="text-dark-salmon">best</span> audio
          gear
        </h2>
        <p className="sm:text-center text-black/50">
          Located at the heart of New York City, Audiophile is the premier store
          for high-end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>

      <div className="rounded-md lg:initial md:relative lg:w-[540px] lg:h-[588px] md:w-full md:h-[300px] sm:h-[327px] sm:w-full relative">
        {/* Desktop */}
        <Image
          alt="Audiophile premium store for high-end audio gear"
          className="rounded-md lg:block md:hidden object-cover"
          src="/shared/desktop/image-best-gear.jpg"
          fill
        />
        {/* Tablet */}
        <Image
          alt="Audiophile premium store for high-end audio gear"
          className="rounded-md lg:hidden md:block sm:hidden object-cover"
          src="/shared/tablet/image-best-gear.jpg"
          width={689}
          height={300}
        />
        {/* Mobile (optional) */}
        <Image
          alt="Audiophile premium store for high-end audio gear"
          className="rounded-md lg:hidden md:hidden sm:block object-cover"
          src="/shared/mobile/image-best-gear.jpg"
          width={327}
          height={327}
        />
      </div>
    </section>
  )
}
