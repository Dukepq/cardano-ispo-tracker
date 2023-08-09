import { useEffect, useState,  useRef, RefObject } from "react"

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isOnScreen, setIsOnScreen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsOnScreen(entry.isIntersecting)
    })
  }, [])
  useEffect(() => {
    if (observerRef.current && ref.current) {
      observerRef.current.observe(ref.current)
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [ref])
  return isOnScreen
}