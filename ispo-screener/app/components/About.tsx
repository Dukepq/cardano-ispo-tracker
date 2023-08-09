"use client"
import styles from "./about.module.css"
import { useRef } from "react"
import useOnScreen from "../hooks/useOnScreen"


export default function About() {
  const sectionRef = useRef<null | HTMLElement>(null)
  const isOnScreen = useOnScreen(sectionRef)

  return (
    <section
    ref={sectionRef} id='about' className={styles.section}
    style={isOnScreen ? {} : {opacity: 0}}
    >
      <div className={styles.right}>
        <h2 >ABOUT US</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam faucibus purus in massa. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed. Blandit massa enim nec dui nunc. Lorem dolor sed viverra ipsum. Scelerisque in dictum non consectetur a erat. Habitasse platea dictumst vestibulum rhoncus est pellentesque.
        </p>
      </div>
    </section>
  )
}