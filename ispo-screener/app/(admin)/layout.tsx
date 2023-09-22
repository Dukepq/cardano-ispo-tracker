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
    <html lang="en">
      <body className={inter.className}>
        <div className="blob-wrapper">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div className="app-wrapper">{children}</div>
      </body>
    </html>
  );
}
