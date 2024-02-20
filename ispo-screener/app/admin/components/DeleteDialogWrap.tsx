"use client";
import { useState } from "react";
import styles from "../styles/dialog.module.css";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

type DeleteDialogProps = {
  children: React.ReactNode;
  handleDelete: Function;
  title?: string;
  description?: string;
};

export default function DeleteDialogWrap({
  children,
  handleDelete,
  title = "Delete item?",
  description = "This action cannot be undone and will permanently delete this item.",
}: DeleteDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <AlertDialog.Trigger asChild>
        <div
          style={{
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => setOpen((prev) => !prev)}
        >
          {children}
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles["alert-overlay"]} />
        <AlertDialog.Content className={styles["alert-content"]}>
          <AlertDialog.Title style={{ marginBottom: "0.5rem" }}>
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description>{description}</AlertDialog.Description>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <AlertDialog.Cancel asChild>
              <button className={styles["cancel-button"]}>cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className={styles["confirm-button"]}
                onClick={() => handleDelete()}
              >
                confirm
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
