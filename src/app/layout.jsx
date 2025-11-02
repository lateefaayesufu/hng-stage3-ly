import Footer from "@/components/Footer/Footer.jsx"
import Header from "@/components/Header/Header.jsx"
import "./globals.css"
import { Manrope } from "next/font/google"
import { CartContextProvider } from "@/context/CartContext"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata = {
  title: "Audiophile e-commerce website",
  description: "This is an e-commerce website for audiophiles.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="bg-zinc overflow-x-hidden">
        <CartContextProvider>
          <Header />
          {children}
          <Footer />
        </CartContextProvider>
      </body>
    </html>
  )
}
