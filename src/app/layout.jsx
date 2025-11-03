"use client"

import Footer from "@/components/Footer/Footer.jsx"
import Header from "@/components/Header/Header.jsx"
import "./globals.css"
import { Manrope } from "next/font/google"
import { CartContextProvider } from "@/context/CartContext"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import Head from "next/head"

const manrope = Manrope({ subsets: ["latin"] })
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <Head>
        <title>Audiophile e-commerce website</title>
        <meta
          name="description"
          content="This is an e-commerce website for audiophiles."
        />
      </Head>
      <body className="bg-zinc overflow-x-hidden">
        <ConvexProvider client={convex}>
          <CartContextProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartContextProvider>
        </ConvexProvider>
      </body>
    </html>
  )
}
