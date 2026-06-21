"use client"

import React, { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface PixelTrailProps {
  pixelSize: number // px
  fadeDuration?: number // ms
  delay?: number // ms
  className?: string
  pixelClassName?: string
}

type ActivePixel = {
  x: number
  y: number
  hideAt: number
  fadeEnd: number
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activePixels = useRef<Map<number, ActivePixel>>(new Map())
  const animationFrame = useRef<number | null>(null)
  const pointerFrame = useRef<number | null>(null)
  const pendingPoint = useRef<{ clientX: number; clientY: number } | null>(null)
  const size = useRef({
    width: 0,
    height: 0,
    columns: 0,
    rows: 0,
    dpr: 1,
  })

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current
      const context = canvas?.getContext("2d")
      if (!canvas || !context) {
        animationFrame.current = null
        return
      }

      context.clearRect(0, 0, size.current.width, size.current.height)
      context.fillStyle = "#ffffff"

      activePixels.current.forEach((pixel, key) => {
        if (time >= pixel.fadeEnd) {
          activePixels.current.delete(key)
          return
        }

        const opacity =
          fadeDuration <= 0 || time <= pixel.hideAt
            ? 1
            : 1 - (time - pixel.hideAt) / fadeDuration

        context.globalAlpha = opacity
        context.fillRect(
          pixel.x * pixelSize,
          pixel.y * pixelSize,
          pixelSize,
          pixelSize
        )
      })

      context.globalAlpha = 1
      animationFrame.current =
        activePixels.current.size > 0 ? window.requestAnimationFrame(draw) : null
    },
    [fadeDuration, pixelSize]
  )

  const scheduleDraw = useCallback(() => {
    if (animationFrame.current === null) {
      animationFrame.current = window.requestAnimationFrame(draw)
    }
  }, [draw])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.ceil(rect.width)
    const height = Math.ceil(rect.height)

    size.current = {
      width,
      height,
      columns: Math.ceil(width / pixelSize),
      rows: Math.ceil(height / pixelSize),
      dpr,
    }

    canvas.width = Math.ceil(width * dpr)
    canvas.height = Math.ceil(height * dpr)

    const context = canvas.getContext("2d")
    context?.setTransform(dpr, 0, 0, dpr, 0, 0)
    scheduleDraw()
  }, [pixelSize, scheduleDraw])

  useEffect(() => {
    resizeCanvas()

    const canvas = canvasRef.current
    if (!canvas) return

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", resizeCanvas)
      return () => {
        window.removeEventListener("resize", resizeCanvas)
        if (animationFrame.current !== null) {
          window.cancelAnimationFrame(animationFrame.current)
        }
        if (pointerFrame.current !== null) {
          window.cancelAnimationFrame(pointerFrame.current)
        }
      }
    }

    const observer = new ResizeObserver(resizeCanvas)
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current)
      }
      if (pointerFrame.current !== null) {
        window.cancelAnimationFrame(pointerFrame.current)
      }
    }
  }, [resizeCanvas])

  const activatePixel = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas || size.current.columns <= 0) return

      const rect = canvas.getBoundingClientRect()
      const x = Math.floor((clientX - rect.left) / pixelSize)
      const y = Math.floor((clientY - rect.top) / pixelSize)

      if (
        x < 0 ||
        y < 0 ||
        x >= size.current.columns ||
        y >= size.current.rows
      ) {
        return
      }

      const now = performance.now()
      activePixels.current.set(y * size.current.columns + x, {
        x,
        y,
        hideAt: now + delay,
        fadeEnd: now + delay + fadeDuration,
      })
      scheduleDraw()
    },
    [delay, fadeDuration, pixelSize, scheduleDraw]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      pendingPoint.current = { clientX: e.clientX, clientY: e.clientY }
      if (pointerFrame.current !== null) return

      pointerFrame.current = window.requestAnimationFrame(() => {
        pointerFrame.current = null
        const point = pendingPoint.current
        if (point) activatePixel(point.clientX, point.clientY)
      })
    },
    [activatePixel]
  )

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full pointer-events-auto", className)}
      onPointerMove={handlePointerMove}
    />
  )
}

export { PixelTrail }
