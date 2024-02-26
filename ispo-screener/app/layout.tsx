import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700", "800"],
});

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
      <body className={workSans.className}>
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
