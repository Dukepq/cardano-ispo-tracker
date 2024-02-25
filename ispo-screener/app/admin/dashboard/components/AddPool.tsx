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
    const newFields = { ...fields };
    let marginNum = Number(fields.margin);
    if (typeof marginNum === "number" && !isNaN(marginNum)) {
      newFields.margin = marginNum;
    }

    const response = await fetch(base + "/api/pools", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        token,
        pools: [newFields],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast.error("failed to create");
    } else {
      toast.success("created");
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={() => {
          setFields({});
          setOpen((prev) => !prev);
        }}
      >
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
              <div className={styles.wrapper}>
                <label>
                  <p>* Pool ticker</p>
                  <input
                    name="ticker"
                    value={fields.ticker || ""}
                    type="text"
                    onChange={(e) => onPoolFormChange(e, setFields)}
                    placeholder="pool ticker"
                  />
                </label>
              </div>

              <div className={styles.wrapper}>
                <label>
                  <p>* Pool id</p>
                  <input
                    name="poolId"
                    value={fields.poolId || ""}
                    type="text"
                    onChange={(e) => onPoolFormChange(e, setFields)}
                    placeholder="pool id"
                  />
                </label>
              </div>
              <div className={styles.wrapper}>
                <label>
                  <p>* Amount in pool</p>
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
                </label>
              </div>
              <div className={styles.wrapper}>
                <label>
                  <p>* Pool margin</p>
                  <input
                    name="margin"
                    value={fields.margin || ""}
                    type="text"
                    onChange={(e) => {
                      const decimalRegex =
                        /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
                      setFields((prev) => {
                        const amount = e.target.value;
                        if (!decimalRegex.test(amount)) return { ...prev };
                        return { ...prev, margin: amount };
                      });
                    }}
                    placeholder="Pool margin (%)"
                  />
                </label>
              </div>

              <div className={styles.wrapper}>
                <label>
                  <p>* Pool name</p>
                  <input
                    name="name"
                    value={fields.name || ""}
                    type="text"
                    onChange={(e) => onPoolFormChange(e, setFields)}
                    placeholder="name"
                  />
                </label>
              </div>

              <div className={styles.wrapper}>
                <label>
                  <p>Active pledge</p>
                  <input
                    name="activePledge"
                    value={fields.activePledge || ""}
                    type="text"
                    onChange={(e) => onPoolFormChange(e, setFields)}
                    placeholder="active pledge"
                  />
                </label>
              </div>

              <div className={styles.wrapper}>
                <label>
                  <p>Committed pledge</p>
                  <input
                    name="committedPledge"
                    value={fields.committedPledge || ""}
                    type="text"
                    onChange={(e) => onPoolFormChange(e, setFields)}
                    placeholder="committed pledge"
                  />
                </label>
              </div>

              <div className={styles.wrapper}>
                <label>
                  <p>Lifetime blocks</p>
                  <input
                    name="lifetimeBlocks"
                    value={fields.lifetimeBlocks || ""}
                    type="text"
                    onChange={(e) => onPoolFormChange(e, setFields)}
                    placeholder="lifetime blocks"
                  />
                </label>
              </div>

              <div className={styles.wrapper}>
                <label>
                  <p>Lifetime rewards</p>
                  <input
                    name="lifetimeRewards"
                    value={fields.lifetimeRewards || ""}
                    type="text"
                    onChange={(e) => onPoolFormChange(e, setFields)}
                    placeholder="lifetime rewards"
                  />
                </label>
              </div>

              <button
                style={{ marginTop: "1rem" }}
                className={styles.button}
                onClick={createPoolOnProject}
              >
                confirm
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
