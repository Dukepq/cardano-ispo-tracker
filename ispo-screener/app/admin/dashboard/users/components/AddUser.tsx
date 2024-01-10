"use client";
import { MouseEvent, useState } from "react";
import styles from "./users-dialog.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<User>({
    email: "",
    name: "",
    password: "",
    role: "EDITOR",
  });
  const router = useRouter();

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
    if (response.status === 201) {
      toast.success("created");
      setOpen(false);
      setFields(() => ({ email: "", name: "", password: "", role: "ADMIN" }));
    } else {
      toast.error("something went wrong");
    }
    router.refresh();
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <Dialog.Trigger asChild>
          <button style={{ margin: "0.5rem" }}>Create User</button>
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
              <div>
                <label>
                  <p>* Username</p>
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
                </label>
              </div>
              <div>
                <label>
                  <p>* Email</p>
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
                </label>
              </div>
              <div>
                <label>
                  <p>* Password</p>
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
                </label>
              </div>
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const role = e.target.checked ? "ADMIN" : "EDITOR";
                      setFields((prev) => ({ ...prev, role }));
                    }}
                  />
                  <p>Administrator</p>
                </label>
              </div>
              <button
                style={{ marginTop: "1rem" }}
                onClick={createUser}
                className={styles.button}
              >
                Create user
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
