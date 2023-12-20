"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./project-dialog.module.css";
import toast from "react-hot-toast";
import base from "@/app/lib/routes";
import onPoolFormChange from "@/app/lib/onPoolFormChange";

export default function AddPool({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Partial<Pool>>({});
  const createPoolOnProject = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(fields);
    const response = await fetch(base + "/api/pools", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        token,
        pools: [fields],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast.error("failed to create", {
        style: { backgroundColor: "red", color: "white" },
      });
    } else {
      toast.success("created", {
        style: { backgroundColor: "lightGreen" },
      });
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <Dialog.Trigger asChild>
          {children ? (
            children
          ) : (
            <button className={styles.button}>Add Project</button>
          )}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles["dialog-overlay"]} />
          <Dialog.Content className={styles["dialog-content"]}>
            <Dialog.Title className={styles.title}>
              <p>create new pool</p>
              <Dialog.Close className={styles.button}>close</Dialog.Close>
            </Dialog.Title>
            <form className={styles.form}>
              <input
                name="ticker"
                value={fields.ticker || ""}
                type="text"
                onChange={(e) => onPoolFormChange(e, setFields)}
                placeholder="pool ticker"
              />
              <input
                name="poolId"
                value={fields.poolId || ""}
                type="text"
                onChange={(e) => onPoolFormChange(e, setFields)}
                placeholder="pool id"
              />
              <input
                name="amountInPool"
                value={fields.amountInPool || ""}
                type="text"
                onChange={(e) => {
                  setFields((prev) => {
                    const amount = Number(e.target.value);
                    if (isNaN(amount)) return { ...prev };
                    return { ...prev, amountInPool: amount };
                  });
                }}
                placeholder="amount in pool"
              />
              <input
                name="name"
                value={fields.name || ""}
                type="text"
                onChange={(e) => onPoolFormChange(e, setFields)}
                placeholder="name"
              />
              <input
                name="activePledge"
                value={fields.activePledge || ""}
                type="text"
                onChange={(e) => onPoolFormChange(e, setFields)}
                placeholder="active pledge"
              />
              <input
                name="committedPledge"
                value={fields.committedPledge || ""}
                type="text"
                onChange={(e) => onPoolFormChange(e, setFields)}
                placeholder="committed pledge"
              />
              <input
                name="lifetimeBlocks"
                value={fields.lifetimeBlocks || ""}
                type="text"
                onChange={(e) => onPoolFormChange(e, setFields)}
                placeholder="lifetime blocks"
              />
              <input
                name="lifetimeRewards"
                value={fields.lifetimeRewards || ""}
                type="text"
                onChange={(e) => onPoolFormChange(e, setFields)}
                placeholder="lifetime rewards"
              />
              <button onClick={createPoolOnProject}>confirm</button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
