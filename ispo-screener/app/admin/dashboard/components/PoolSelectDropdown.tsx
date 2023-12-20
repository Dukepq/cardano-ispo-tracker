"use client";

import { useState } from "react";
import styles from "./dropdown.module.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Dropdown({
  children,
  parentOpen,
  setTargetPool,
  pools,
}: {
  children: React.ReactNode;
  parentOpen: boolean;
  setTargetPool: (callback: React.SetStateAction<Pool | null>) => void;
  pools: Pool[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu.Root
      open={open && parentOpen}
      onOpenChange={() => {
        setOpen((prev) => !prev);
      }}
    >
      <DropdownMenu.Trigger className={styles.button}>
        select {open ? "\u2B9D" : "\u2B9F"}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          style={
            Array.isArray(children) && children.length > 0
              ? {}
              : { display: "none" }
          }
          className={styles.content}
        >
          {Array.isArray(children) &&
            children.map((child: string, index) => {
              return (
                <DropdownMenu.Item
                  onClick={() => {
                    const pool = pools.find((entry) => entry.ticker === child);
                    if (!pool) return;
                    setTargetPool(() => pool);
                  }}
                  className={styles.item}
                  key={index}
                >
                  {child}
                </DropdownMenu.Item>
              );
            })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
