"use client";

import { useRef } from "react";
import styles from "./table.module.css";
import debounce from "@/app/lib/debounce";

export default function SearchBar({
  setState,
  setIsDebouncing,
}: {
  setState: (prev: React.SetStateAction<string>) => void;
  setIsDebouncing?: (prev: React.SetStateAction<boolean>) => void;
}) {
  const searchRef = useRef<HTMLInputElement | null>(null);
  return (
    <input
      type="text"
      ref={searchRef}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          setState(() => searchRef.current?.value || "");
        }
      }}
      onChange={async (e) => {
        const value = e.target.value;
        await debounce(() => {
          setState(() => value || "");
          if (setIsDebouncing) setIsDebouncing(true);
        }, 300);
        if (setIsDebouncing) setIsDebouncing(false);
      }}
      className={styles["search-input"]}
    />
  );
}
