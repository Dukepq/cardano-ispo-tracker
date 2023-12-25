import "../.././globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Admin Login",
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
          color: "white",
          backgroundColor: "rgba(242, 242, 242, 1)",
          height: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
}
