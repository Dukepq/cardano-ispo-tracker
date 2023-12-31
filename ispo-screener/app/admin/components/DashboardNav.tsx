"use client";
import styles from "./dashboardNav.module.css";
import Link from "next/link";
import Logout from "../components/Logout";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function resourceMatches(pathname: string, slug: string): boolean {
  return pathname.split("/")[pathname.split("/").length - 1] === slug;
}

export default function Navbar() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handlePopstate = (e: PopStateEvent) => {
      setActive(() => false);
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
  return (
    <>
      <div
        style={{}}
        className={styles["toggler"]}
        onClick={() => {
          setActive((prev) => !prev);
        }}
      >
        <Image
          alt="menu-toggle"
          src={"/hamburger.png"}
          width={35}
          height={35}
          style={{ filter: "invert(1)" }}
        ></Image>
      </div>
      <div
        className={`${styles["navbar-wrapper"]} ${active ? styles.active : ""}`}
      >
        <Link href={"/admin/dashboard"}>
          <Image
            alt="admin-icon"
            src={"/admin-icon.png"}
            width={35}
            height={35}
            style={{ filter: "invert(1)" }}
          ></Image>
        </Link>

        <nav className={styles.navbar}>
          <li>
            <Link
              href={"/admin/dashboard"}
              style={
                resourceMatches(pathname, "dashboard")
                  ? { backgroundColor: "rgb(110, 110, 230, 0.25)" }
                  : {}
              }
              onClick={() => setActive(false)}
            >
              <Image
                className={styles["nav-icon"]}
                alt="dashboard image"
                src={"/dashboard.svg"}
                width={25}
                height={25}
                style={{ filter: "invert(1)" }}
                onClick={() => setActive(false)}
              />
              <p>ISPO&apos;s</p>
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/dashboard/users"}
              style={
                resourceMatches(pathname, "users")
                  ? { backgroundColor: "rgb(110, 110, 230, 0.25)" }
                  : {}
              }
              onClick={() => setActive(false)}
            >
              <Image
                className={styles["nav-icon"]}
                alt="key image"
                src={"/key.svg"}
                width={25}
                height={25}
                onClick={() => setActive(false)}
              />
              <p>Accounts</p>
            </Link>
          </li>

          <li>
            <Logout>Logout</Logout>
          </li>
        </nav>
      </div>
    </>
  );
}
