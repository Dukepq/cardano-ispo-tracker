import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Administrator dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          height: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
}
