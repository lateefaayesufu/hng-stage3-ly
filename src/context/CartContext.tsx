"use client"

import { createContext, useEffect, useState, ReactNode } from "react"
import { useLocalStorage } from "react-use"

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  categoryImage: {
    desktop: string;
  };
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, itemQuantity: number) => void;
  addQuantity: (id: number) => void;
  updateQuantity: (id: number, itemQuantity: number) => void;
  subtractQuantity: (id: number) => void;
  removeQuantity: (id: number) => void;
  updateItemQuantity: number;
  uniqueItems: number | undefined;
    clearCart: () => void;
    totalPriceCalc: () => number;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | null>(null)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("shopping-cart", [])
  const [updateItemQuantity, setUpdateItemQuantity] = useState<number>(0)
  const [uniqueItems, setUniqueItems] = useState<number>()

    const clearCart = () => {
      setCart([])
    }

    const totalPriceCalc = () => {
      if (!cart) return 0
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  const addToCart = (product: Product, itemQuantity: number) => {
    if (cart) {
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
    } else {
      setCart([
        {
          id: product.id,
          name: product.name,
          image: product.categoryImage.desktop,
          price: product.price,
          quantity: itemQuantity,
        },
      ])
    }

    setUpdateItemQuantity(itemQuantity)
  }

  const updateQuantity = (id: number, itemQuantity: number) => {
    if (!cart) return

    const sameProduct = cart.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: itemQuantity + updateItemQuantity,
        }
      }
      return item
    })
    setCart(sameProduct)
    setUpdateItemQuantity(updateItemQuantity + itemQuantity)
  }

  const subtractQuantity = (id: number) => {
    if (!cart) return

    const sameProduct = cart.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity - 1,
        }
      }
      return item
    })
    setCart(sameProduct)
    setUpdateItemQuantity(updateItemQuantity - 1)
  }

  const addQuantity = (id: number) => {
    if (!cart) return

    const updated = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
    setCart(updated)
    setUpdateItemQuantity(updateItemQuantity + 1)
  }

  const removeQuantity = (id: number) => {
    if (!cart) return

    const filtered = cart.filter((item) => item.id !== id)
    setCart(filtered)
  }

  const contextValue: CartContextType = {
  cart: cart || [],
    addToCart,
    addQuantity,
    updateQuantity,
    subtractQuantity,
    removeQuantity,
    updateItemQuantity,
    uniqueItems,
  clearCart,
  totalPriceCalc
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}