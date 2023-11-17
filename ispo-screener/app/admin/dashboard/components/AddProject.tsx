"use client";
import { MouseEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./projectDialog.module.css";

const clearObjectValues = (object: { [keys: string]: any }) => {
  for (let key in object) {
    object[key] = "";
    console.log(key);
  }
  return object;
};

export default function AddProject() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<ISPO | null>(null);
  const createProject = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5003/api/projects", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      setOpen(false);
    } else {
      window.alert("something went wrong");
    }
  };
  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFields((prev) => {
      return {
        ...prev!,
        [name]: value,
      };
    });
    console.log(fields);
  };
  return (
    <>
      <Dialog.Root open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <Dialog.Trigger asChild>
          <button className={styles.button}>Add Project</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles["dialog-overlay"]} />
          <Dialog.Content className={styles["dialog-content"]}>
            <Dialog.Title className={styles.title}>
              <p>Add a new project</p>
              <Dialog.Close className={styles.button}>close</Dialog.Close>
            </Dialog.Title>
            <form action="" className={styles.form}>
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
                onChange={updateFields}
                value={fields?.distributingAmount || ""}
              />
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
