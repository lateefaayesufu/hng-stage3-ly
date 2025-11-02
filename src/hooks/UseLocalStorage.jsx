"use client"

import { useEffect, useState } from "react"

export default function UseLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const jsonValue = localStorage.getItem(key)
      if (jsonValue != null) return JSON.parse(jsonValue)

      if (typeof initialValue === "function") {
        return initialValue
      } else {
        return initialValue
      }
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, initialValue])

  return [state, setState]
}
