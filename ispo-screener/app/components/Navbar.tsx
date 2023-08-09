"use client"
import { useEffect, useState, useRef } from "react"
import styles from "./navbar.module.css"
import Link from "next/link"
import throttle from "../lib/throttle"



export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }, 100)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={navRef} className={styles["navbar-wrapper"]} style={scrolled ? {backgroundColor: "rgb(0, 0, 255, 0.1)"} : {}}>
      <nav className={styles.navbar}>
        <li><Link href={"/"}>HOME</Link></li>
        <li><Link href={"#about"}>ABOUT</Link></li>
        <li><Link href={"/ispo"}>ISPO'S</Link></li>
        <li><Link href={"/support"}>SUPPORT US</Link></li>
        <div>
          ToggleTheme
        </div>
      </nav>
    </div>

  )
}