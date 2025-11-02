"use client"

import { createContext, useEffect, useState } from "react"
// import UseLocalStorage from "@/hooks/UseLocalStorage"
import { useLocalStorage } from "react-use"

export const CartContext = createContext(null)

export function CartContextProvider({ children }) {
  // const [value, setValue] = UseLocalStorage("cart", [])
  const [cart, setCart] = useLocalStorage("shopping-cart", [])
  const [updateItemQuantity, setUpdateItemQuantity] = useState(0)
  const [uniqueItems, setUniqueItems] = useState()

  const addToCart = (product, itemQuantity) => {
    setCart([
      ...cart,
      {
        id: product.id,
        name: product.name,
        image: product.categoryImage.desktop,
        price: product.price,
        quantity: itemQuantity,
      },
    ])

    setUpdateItemQuantity(itemQuantity)
  }

  const updateQuantity = (id, itemQuantity) => {
    let sameProduct = cart.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: itemQuantity + updateItemQuantity,
        }
      } else {
        return item
      }
    })
    setCart(sameProduct)
    setUpdateItemQuantity(updateItemQuantity + itemQuantity)
  }

  const subtractQuantity = (id) => {
    let sameProduct = cart.map((item) => {
      if (item.id == id) {
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity - 1,
        }
      } else {
        return item
      }
    })
    setCart(sameProduct)
  }

  const addQuantity = (id) => {
    let sameProduct = cart.map((item) => {
      if (item.id == id) {
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity + 1,
        }
      } else {
        return item
      }
    })
    setCart(sameProduct)
  }

  const totalPriceCalc = () => {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      total += Number(cart[i].price) * cart[i].quantity
    }
    return total
  }

  const clearCart = () => {
    setCart([])
  }

  const removeQuantity = (id) => {
    setCart(cart.filter((product) => product.id !== id))
    // // setCart(updatedCart)
  }

  const contextValue = {
    cart,
    clearCart,
    addToCart,
    updateQuantity,
    updateItemQuantity,
    subtractQuantity,
    addQuantity,
    totalPriceCalc,
    removeQuantity,
  }

  // console.log(cart)

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}
