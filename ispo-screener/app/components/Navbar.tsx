import styles from "./navbar.module.css"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <li><Link href={"/"}>HOME</Link></li>
      <li><Link href={"/about"}>ABOUT</Link></li>
      <li><Link href={"/ispo"}>ISPO'S</Link></li>
      <li><Link href={"/support"}>SUPPORT US</Link></li>
      <div>
        TOGGLE PLACEHOLDER 
      </div>
    </nav>
  )
}