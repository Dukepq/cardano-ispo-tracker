"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        backgroundColor: "var(--primary-color)",
      }}
    >
      <h2>{"something went wrong. :c"}</h2>
      <button
        style={{ width: "6rem", marginTop: "1rem" }}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
