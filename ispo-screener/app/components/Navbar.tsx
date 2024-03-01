import styles from "./navbar.module.css";
import Link from "next/link";
import { ArrowRight } from "../../node_modules/lucide-react";

export default function Navbar() {
  return (
    <div className={styles["navbar-wrapper"]}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link draggable={false} href={"/"}>
              <span style={{ fontSize: "1.8rem" }}>C-ISPO</span>
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
