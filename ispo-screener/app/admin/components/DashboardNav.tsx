"use client";
import styles from "../styles/dashboardNav.module.css";
import Link from "next/link";
import Logout from "../components/Logout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  UserCog,
  Users,
  Boxes,
  Image as LucideImage,
} from "../../../node_modules/lucide-react";

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
        <Menu width={35} height={35} style={{ cursor: "pointer" }}></Menu>
      </div>
      <div
        className={`${styles["navbar-wrapper"]} ${active ? styles.active : ""}`}
      >
        <Link href={"/admin/dashboard"}>
          <UserCog width={35} height={35}></UserCog>
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
              <Boxes
                className={styles["nav-icon"]}
                width={20}
                height={20}
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
              <Users
                className={styles["nav-icon"]}
                width={20}
                height={20}
                onClick={() => setActive(false)}
              />
              <p>Accounts</p>
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/dashboard/images"}
              style={
                resourceMatches(pathname, "images")
                  ? { backgroundColor: "rgb(110, 110, 230, 0.25)" }
                  : {}
              }
              onClick={() => setActive(false)}
            >
              <LucideImage
                className={styles["nav-icon"]}
                width={20}
                height={20}
                onClick={() => setActive(false)}
              />
              <p>Images</p>
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
