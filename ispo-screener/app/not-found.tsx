import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - not found",
  description: "page was not found",
};

export default function NotFound() {
  return (
    <div style={{ display: "grid", placeContent: "center", height: "100vh" }}>
      404 | Sorry, this page was not found :c
    </div>
  );
}
