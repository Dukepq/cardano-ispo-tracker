"use client";
import styles from "./dashboardNav.module.css";
import Link from "next/link";
import Logout from "../components/Logout";
import Image from "next/image";
import { usePathname } from "next/navigation";

function resourceMatches(pathname: string, slug: string): boolean {
  return pathname.split("/")[pathname.split("/").length - 1] === slug;
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className={styles["navbar-wrapper"]}>
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
                ? { backgroundColor: "rgba(89, 101, 219, 1)" }
                : {}
            }
          >
            <Image
              className={styles["nav-icon"]}
              alt="dashboard image"
              src={"/dashboard.svg"}
              width={25}
              height={25}
              style={{ filter: "invert(1)" }}
            />
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/dashboard/users"}
            style={
              resourceMatches(pathname, "users")
                ? { backgroundColor: "rgba(89, 101, 219, 1)" }
                : {}
            }
          >
            <Image
              className={styles["nav-icon"]}
              alt="key image"
              src={"/key.svg"}
              width={25}
              height={25}
            />
            <p>Accounts</p>
          </Link>
        </li>

        <li>
          <Logout>Logout</Logout>
        </li>
      </nav>
    </div>
  );
}
