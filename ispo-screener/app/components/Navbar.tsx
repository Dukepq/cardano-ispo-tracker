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
    <div ref={navRef} className={styles["navbar-wrapper"]}>
      <nav style={scrolled ? { height: "4rem" } : {}} className={styles.navbar}>
        <li>
          <Link href={"/"}>
            <img src="./C-ISPO.svg" alt="logo" className={styles.logo} />
          </Link>
        </li>
        <li>
          <Link className={styles["ispo-button"]} href={"/ispos"}>
            <span>ISPO&apos;S</span>
            <ArrowRight />
          </Link>
        </li>
      </nav>
    </div>
  );
}
