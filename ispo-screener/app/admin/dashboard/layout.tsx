import { ReactNode } from "react";
import type { Metadata } from "next";
import Navbar from "../components/DashboardNav";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Administrator dashboard",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section
      style={{
        backgroundColor: "#212936",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className={styles["dashboard-wrapper"]}>{children}</div>
    </section>
  );
}
