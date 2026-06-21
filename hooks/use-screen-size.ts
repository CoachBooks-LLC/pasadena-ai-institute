"use client"

import { useEffect, useMemo, useState } from "react"

// Define the possible screen sizes as a const array for better type inference
const SCREEN_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const

// Create a union type from the array
export type ScreenSize = (typeof SCREEN_SIZES)[number]

// Type-safe size order mapping
const sizeOrder: Record<ScreenSize, number> = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
} as const

class ComparableScreenSize {
  constructor(private value: ScreenSize) {}

  toString(): ScreenSize {
    return this.value
  }

  valueOf(): number {
    return sizeOrder[this.value]
  }

  // Add type predicate methods for better TypeScript support
  equals(other: ScreenSize): boolean {
    return this.value === other
  }

  lessThan(other: ScreenSize): boolean {
    return this.valueOf() < sizeOrder[other]
  }

  greaterThan(other: ScreenSize): boolean {
    return this.valueOf() > sizeOrder[other]
  }

  lessThanOrEqual(other: ScreenSize): boolean {
    return this.valueOf() <= sizeOrder[other]
  }

  greaterThanOrEqual(other: ScreenSize): boolean {
    return this.valueOf() >= sizeOrder[other]
  }
}

const useScreenSize = (): ComparableScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("xs")

  useEffect(() => {
    const getSize = (): ScreenSize => {
      const width = window.innerWidth

      if (width >= 1536) return "2xl"
      if (width >= 1280) return "xl"
      if (width >= 1024) return "lg"
      if (width >= 768) return "md"
      if (width >= 640) return "sm"
      return "xs"
    }

    const handleResize = () => {
      const nextSize = getSize()
      setScreenSize((current) => (current === nextSize ? current : nextSize))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return useMemo(() => new ComparableScreenSize(screenSize), [screenSize])
}

export { useScreenSize }
