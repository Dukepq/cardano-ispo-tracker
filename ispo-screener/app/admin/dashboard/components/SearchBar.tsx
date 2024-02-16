"use client";

import { useRef } from "react";
import styles from "./table.module.css";
import debounce from "@/app/lib/debounce";

type SearchBarProps = {
  setState: (prev: React.SetStateAction<string>) => void;
  setIsDebouncing?: (prev: React.SetStateAction<boolean>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchBar({
  setState,
  setIsDebouncing,
  ...attributes
}: SearchBarProps) {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const onChangeDebounce = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setState(() => value.toLowerCase() || "");
    },
    300
  );
  return (
    <input
      type="text"
      ref={searchRef}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          setState(() => searchRef.current?.value || "");
        }
      }}
      onChange={async (e) => onChangeDebounce(e)}
      className={styles["search-input"]}
      {...attributes}
    />
  );
}
