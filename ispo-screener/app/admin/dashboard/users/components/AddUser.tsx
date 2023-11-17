"use client";
import { MouseEvent, useState } from "react";
import styles from "../users.module.css";
import * as Dialog from "@radix-ui/react-dialog";

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<User>({
    email: "",
    password: "",
    name: "",
    role: "BASIC",
  });
  const createUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5003/api/users/register", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.status === 201) {
      setOpen(false);
    } else {
      window.alert("something went wrong");
    }
  };
  return (
    <>
      <Dialog.Root open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <Dialog.Trigger asChild>
          <button className={styles.button}>Add user</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles["dialog-overlay"]} />
          <Dialog.Content className={styles["dialog-content"]}>
            <Dialog.Title className={styles.title}>
              <p>Add a new user</p>
              <Dialog.Close className={styles.button}>close</Dialog.Close>
            </Dialog.Title>
            <Dialog.Description></Dialog.Description>
            <form action="" className={styles.form}>
              <input
                type="text"
                placeholder="name"
                value={fields.name}
                onChange={(e) =>
                  setFields((prev) => {
                    return { ...prev, name: e.target.value };
                  })
                }
              />
              <input
                type="email"
                placeholder="email"
                value={fields.email}
                onChange={(e) =>
                  setFields((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
              />
              <input
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={(e) =>
                  setFields((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />
              <div className={styles["select-wrapper"]}>
                <div className={styles["radio-wrapper"]}>
                  <input
                    id="admin-radio"
                    about="test"
                    type="radio"
                    checked={fields.role === "ADMIN" ? true : false}
                    onChange={() =>
                      setFields((prev) => {
                        return { ...prev, role: "ADMIN" };
                      })
                    }
                  />
                  <label htmlFor="admin-radio">Admin</label>
                </div>
                <div className={styles["radio-wrapper"]}>
                  <input
                    id="editor-radio"
                    type="radio"
                    checked={fields.role === "EDITOR" ? true : false}
                    onChange={() =>
                      setFields((prev) => {
                        return { ...prev, role: "EDITOR" };
                      })
                    }
                  />
                  <label htmlFor="editor-radio">Editor</label>
                </div>
                <div className={styles["radio-wrapper"]}>
                  <input
                    id="basic-radio"
                    type="radio"
                    checked={fields.role === "BASIC" ? true : false}
                    onChange={() =>
                      setFields((prev) => {
                        return { ...prev, role: "BASIC" };
                      })
                    }
                  />
                  <label htmlFor="basic-radio">Basic</label>
                </div>
              </div>
              <button onClick={createUser} className={styles.button}>
                Create user
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
