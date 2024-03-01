import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - not found",
  description: "page was not found",
};

export default function NotFound() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        backgroundColor: "rgb(14, 17, 23)",
        fontWeight: "500",
      }}
    >
      404 | Sorry, this page was not found :c
      <Link href={"/"}>
        <button
          style={{
            marginTop: "20px",
            height: "30px",
            width: "120px",
            cursor: "pointer",
          }}
        >
          Back to home
        </button>
      </Link>
    </div>
  );
}
