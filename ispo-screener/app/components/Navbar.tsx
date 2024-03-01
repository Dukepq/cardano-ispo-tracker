"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import throttle from "../lib/throttle";
import { ArrowRight } from "../../node_modules/lucide-react";

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className={styles["navbar-wrapper"]}
      // style={scrolled ? { backgroundColor: "var(--secondary-color)" } : {}}
    >
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link draggable={false} href={"/"}>
              <span style={{ fontSize: "1.8rem" }}>C-ISPO</span>
              {/* <img src={"/C-ISPO.svg"} alt="logo" className={styles.logo} /> */}
            </Link>
          </li>
          <li>
            <Link
              draggable={false}
              className={styles["ispo-button"]}
              href={"/ispos"}
            >
              <span>ISPO&apos;S</span>
              <ArrowRight />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
