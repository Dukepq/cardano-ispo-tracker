"use client";
import { MouseEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./project-dialog.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import pruneFalsy from "@/app/lib/pruneFalsy";

export default function AddProject({
  method,
  ISPO,
  children,
}: {
  method: "POST" | "PUT";
  ISPO: Partial<ISPO>;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Partial<ISPO>>(ISPO);
  const router = useRouter();
  const createProject = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const deepCopy: Partial<ISPO> = JSON.parse(JSON.stringify(fields));
    const filtered = pruneFalsy(deepCopy);
    const body = JSON.stringify({
      ...filtered,
      maxSupplyExists: !!fields.maxSupply,
      live: typeof filtered.live === "boolean" ? fields.live : false,
    });

    const response = await fetch("http://localhost:5003/api/projects", {
      method,
      credentials: "include",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      (() =>
        toast.success("created", {
          style: { backgroundColor: "lightgreen" },
        }))();
      setFields(() => ({}));
      setOpen(false);
      router.refresh();
    } else {
      (() =>
        toast.error("something went wrong", {
          style: { backgroundColor: "red", color: "white" },
        }))();
    }
  };
  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => {
      if (!prev) {
        return {
          [name]: value,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(fields);
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
              <p>
                {method === "POST"
                  ? "Create a new project"
                  : "Update " + fields.name}
              </p>
              <Dialog.Close className={styles.button}>close</Dialog.Close>
            </Dialog.Title>
            <form className={styles.form}>
              <input
                type="text"
                placeholder="Project Name"
                name="name"
                onChange={updateFields}
                value={fields?.name || ""}
              />
              <input
                type="text"
                placeholder="Token"
                name="token"
                onChange={updateFields}
                value={fields?.token || ""}
              />
              <input
                type="text"
                placeholder="Website"
                name="websiteURL"
                onChange={updateFields}
                value={fields?.websiteURL || ""}
              />
              <input
                type="text"
                placeholder="Logo URL"
                name="logoImageURL"
                onChange={updateFields}
                value={fields?.logoImageURL || ""}
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                onChange={updateFields}
                value={fields?.description || ""}
              />
              <input
                type="text"
                placeholder="Distributing amount"
                name="distributingAmount"
                onChange={(e) => {
                  setFields((prev) => {
                    const amount = Number(e.target.value);
                    if (isNaN(amount)) return { ...prev };
                    return { ...prev, distributingAmount: amount };
                  });
                }}
                value={fields?.distributingAmount || ""}
              />
              <div>
                <label>
                  live
                  <input
                    type="checkbox"
                    name="live"
                    checked={fields?.live || false}
                    onChange={() => {
                      setFields((prev) => {
                        return { ...prev, live: !prev.live };
                      });
                    }}
                  />
                </label>
              </div>
              <div>
                <label className={styles["rewards-radio-label"]}>
                  <input
                    type="radio"
                    name="takesRewards"
                    value={"NONE"}
                    checked={fields?.takesRewards === "NONE"}
                    onChange={updateFields}
                  />
                  <p>None</p>
                </label>
                <label className={styles["rewards-radio-label"]}>
                  <input
                    type="radio"
                    name="takesRewards"
                    value={"PARTIAL"}
                    checked={fields?.takesRewards === "PARTIAL"}
                    onChange={updateFields}
                  />
                  <p>Partial</p>
                </label>
                <label className={styles["rewards-radio-label"]}>
                  <input
                    type="radio"
                    name="takesRewards"
                    value={"OPTIONAL"}
                    checked={fields?.takesRewards === "OPTIONAL"}
                    onChange={updateFields}
                  />
                  <p>Optional</p>
                </label>
                <label className={styles["rewards-radio-label"]}>
                  <input
                    type="radio"
                    name="takesRewards"
                    value={"ALL"}
                    checked={fields?.takesRewards === "ALL"}
                    onChange={updateFields}
                  />
                  <p>All</p>
                </label>
                <label className={styles["rewards-radio-label"]}>
                  <input
                    type="radio"
                    name="takesRewards"
                    value={"NOT_SPECIFIED"}
                    checked={fields?.takesRewards === "NOT_SPECIFIED"}
                    onChange={updateFields}
                  />
                  <p>Not specified</p>
                </label>
              </div>
              <button onClick={createProject}>add project</button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
