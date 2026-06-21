"use client"

import { useState, useEffect, RefObject } from "react"

interface Dimensions {
  width: number
  height: number
}

export function useDimensions(
  ref: RefObject<HTMLElement | SVGElement>
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    let frameId: number | null = null

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions((current) =>
          current.width === width && current.height === height
            ? current
            : { width, height }
        )
      }
    }

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 250) // Wait 250ms after resize ends
    }

    // Initial measurement
    frameId = window.requestAnimationFrame(updateDimensions)

    if (typeof ResizeObserver !== "undefined" && ref.current) {
      const observer = new ResizeObserver(debouncedUpdateDimensions)
      observer.observe(ref.current)

      return () => {
        observer.disconnect()
        clearTimeout(timeoutId)
        if (frameId !== null) window.cancelAnimationFrame(frameId)
      }
    }

    window.addEventListener("resize", debouncedUpdateDimensions)

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions)
      clearTimeout(timeoutId)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [ref])

  return dimensions
}
