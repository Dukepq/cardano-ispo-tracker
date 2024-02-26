"use client";

import { useRef } from "react";
import styles from "./table.module.css";
import debounce from "@/app/lib/debounce";
import { FileX, Search as SearchIcon } from "lucide-react";

type SearchBarProps = {
  setState: (prev: React.SetStateAction<string>) => void;
  setIsDebouncing?: (prev: React.SetStateAction<boolean>) => void;
  hideIcon?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchBar({
  setState,
  setIsDebouncing,
  hideIcon = false,
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
    <div style={{ position: "relative", display: "flex" }}>
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
        style={hideIcon ? {} : { paddingLeft: "2rem" }}
        {...attributes}
      />
      {!hideIcon && (
        <SearchIcon
          width={15}
          height={15}
          style={{
            position: "absolute",
            left: "8px",
            display: "inline-block",
            margin: "auto 0",
            alignSelf: "center",
          }}
        />
      )}
    </div>
  );
}
