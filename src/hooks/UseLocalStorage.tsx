"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function UseLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
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
