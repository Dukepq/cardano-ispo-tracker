"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./dashboardNav.module.css";
import Link from "next/link";
import throttle from "../../lib/throttle";
import logout from "@/app/lib/logout";

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
      style={scrolled ? { backgroundColor: "rgb(0, 0, 255, 0.1)" } : {}}
      className={styles["navbar-wrapper"]}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          border: "white 2px solid",
          borderRadius: "100%",
        }}
      ></div>
      <nav style={scrolled ? { height: "4rem" } : {}} className={styles.navbar}>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/admin-dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"/admin-dashboard/users"}>Manage administrators</Link>
        </li>
      </nav>
      <div className={styles["logout-button"]} onClick={logout}>
        logout
      </div>
    </div>
  );
}
