"use client"
import styles from "./scrollbutton.module.css"
import { useRef } from "react"
import useOnScreen from "../hooks/useOnScreen"

export default function ScrollButton() {
  const buttonRef = useRef<null | HTMLButtonElement>(null)
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }
  return (
    <button className={styles.button} onClick={handleClick}>
      scroll
    </button>
  )
}