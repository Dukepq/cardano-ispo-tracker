"use client";

import { useState } from "react";
import styles from "./dropdown.module.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Dropdown({
  children,
  parentOpen,
  setFields,
  pools,
  isFetchingPools,
}: {
  children: React.ReactNode;
  parentOpen: boolean;
  setFields: (callback: React.SetStateAction<Partial<Pool>>) => void;
  pools: Pool[];
  isFetchingPools: boolean;
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
        <DropdownMenu.Content className={styles.content}>
          {isFetchingPools ? (
            <p style={{ padding: "0 0.5rem" }}>loading...</p>
          ) : (
            Array.isArray(children) &&
            children.map((child: string, index) => {
              return (
                <DropdownMenu.Item
                  onClick={() => {
                    const pool = pools.find((entry) => entry.ticker === child);
                    if (!pool) return;
                    setFields(() => pool);
                  }}
                  className={styles.item}
                  key={index}
                >
                  {child}
                </DropdownMenu.Item>
              );
            })
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
