"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "./alert-dialog.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AlertDialogWindow({
  arg,
  deleteFunc,
  children,
}: {
  arg: string;
  deleteFunc: (arg: string) => Promise<any>;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {children ? (
          children
        ) : (
          <button className={styles.Button}>Delete account</button>
        )}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <AlertDialog.Title className={styles.AlertDialogTitle}>
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.AlertDialogDescription}>
            This action cannot be undone.
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button>Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={async () => {
                  if (arg === "admin@live.be") {
                    alert("cant delete admin");
                    return;
                  }
                  try {
                    await deleteFunc(arg);
                    (() =>
                      toast.success("deleted", {
                        style: {
                          backgroundColor: "lightgreen",
                        },
                      }))();
                  } catch (err) {
                    (() => toast.error("error"))();
                  }
                  router.refresh();
                }}
              >
                continue
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
