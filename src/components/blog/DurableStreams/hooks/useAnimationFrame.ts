import { useEffect, useRef } from 'react'

export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  isActive = true
) {
  const requestRef = useRef<number | undefined>(undefined)
  const previousTimeRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!isActive) return

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        callback(deltaTime)
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [callback, isActive])
}
