import { ReactNode } from "react";
import type { Metadata } from "next";
import Navbar from "../components/DashboardNav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Administrator dashboard",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div style={{ marginLeft: "10rem" }}>{children}</div>
    </>
  );
}
