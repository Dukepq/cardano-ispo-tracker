import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";

const poppins = Poppins({
  weight: ["300", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

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
      <div className="app-wrapper">{children}</div>
      <footer
        style={{
          height: "6rem",
          display: "grid",
          placeContent: "center",
          backgroundColor: "#0b090a",
        }}
      >
        <p>
          All information on this page is for informational purposes only and
          might not always be fully up to date.
        </p>
      </footer>
    </>
  );
}
