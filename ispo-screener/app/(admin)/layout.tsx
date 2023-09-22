import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Navbar from "./components/DashboardNav";

const poppins = Poppins({
  weight: ["300", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find your ISPO",
  description:
    "We make it easy for you to determine which ISPO is worthy of your delegation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>{children}</div>
    </>
  );
}
