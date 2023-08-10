"use client"

import { useEffect, useState } from "react"

export default function CountAni({number}: {number: number}) {
  const [current, setCurrent] = useState(0)
  const delay = Math.floor(1000 / number)
  useEffect(() => {
    const interval = setInterval(() => {
      if (current < number) {
        setCurrent(prev => {
          if (prev < number) {
            return prev + 1
          }
          else {
            clearInterval(interval)
            return prev
          }
        })
      }
      return () => {
        if (interval) clearInterval(interval)
      }
    }, delay)
  }, [])
  return (
    <span>{current}</span>
  )
}