import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import styles from "./landing.module.css";
import ispoStyles from "./ispos/[ispo]/styles/ispo.module.css";
import tableStyles from "./ispos/(table)/styles/table.module.css";
import tableRowStyles from "./ispos/(table)/styles/tableRow.module.css";

export const metadata: Metadata = {
  title: "C-ISPO: Find Your Cardano ISPO",
  description:
    "We make it easier for you to determine which ISPO is worth your delegation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className={styles["app-wrapper"]}>{children}</div>
      <footer className={styles.footer}>
        <p>
          All information on this page is for informational purposes only and
          might not always be up to date.
        </p>
      </footer>
      <span
        className={`${ispoStyles.fix} ${tableStyles.fix} ${tableRowStyles.fix}`}
      ></span>
    </>
  );
}
