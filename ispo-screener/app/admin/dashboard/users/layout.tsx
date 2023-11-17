import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage users",
  description: "Administrator dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>;
}
