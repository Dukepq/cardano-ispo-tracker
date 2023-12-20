"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import styles from "./project-dialog.module.css";
import Dropdown from "./PoolSelectDropdown";
import fetchPools from "@/app/lib/fetchPool";
import EditPoolForm from "./EditPoolForm";
import Loading from "@/app/(main)/loading";
import deletePool from "@/app/lib/deletePool";
import onSubmitHandle from "@/app/lib/onSubmitHandle";

export default function EditPoolModal({
  children,
  poolOf,
}: {
  children?: React.ReactNode;
  poolOf: string;
}) {
  const [fields, setFields] = useState<Partial<Pool>>({});
  const [open, setOpen] = useState(false);
  const [pools, setPools] = useState<Pool[]>([]);
  const [targetPool, setTargetPool] = useState<Pool | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const onClickHandle = async () => {
    const pools = await fetchPools(poolOf);
    setPools(pools);
  };

  useEffect(() => {
    if (targetPool) {
      setFields(() => {
        console.log(targetPool);
        return { ...targetPool };
      });
    }
  }, [targetPool]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        setTargetPool(null);
      }}
    >
      <Dialog.Trigger asChild>
        <div onClick={onClickHandle}>
          {children ? (
            children
          ) : (
            <button className={styles.button}>Add Project</button>
          )}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles["dialog-overlay"]} />
        <Dialog.Content className={styles["dialog-content"]}>
          {isUpdating && <Loading css={{ position: "absolute", inset: 0 }} />}
          <Dialog.Title className={styles.title}>
            <p>Edit existing pools</p>
            <Dialog.Close className={styles.button}>close</Dialog.Close>
          </Dialog.Title>
          <Dropdown
            parentOpen={open}
            setTargetPool={setTargetPool}
            pools={pools}
          >
            {pools.map((pool) => pool.ticker)}
          </Dropdown>
          {targetPool && (
            <button
              onClick={() => {
                console.log(targetPool.ticker);
                try {
                  deletePool(targetPool.ticker);
                  setOpen(false);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              delete pool
            </button>
          )}
          {targetPool && (
            <>
              <EditPoolForm
                fieldsHook={[fields, setFields]}
                onSubmitHandle={async (e) => {
                  try {
                    if (isUpdating) return;
                    setIsUpdating(true);
                    await onSubmitHandle(e, fields);
                    setIsUpdating(false);
                    setOpen(false);
                  } catch (err) {
                    setIsUpdating(false);
                    console.error(err);
                  }
                }}
              />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
