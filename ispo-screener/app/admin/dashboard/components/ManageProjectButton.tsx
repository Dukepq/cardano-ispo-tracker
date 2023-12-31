"use client";
import { MouseEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./project-dialog.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import pruneFalsy from "@/app/lib/pruneFalsy";
import onProjectFormChange from "@/app/lib/onProjectFormChange";

export default function ManageProjectButton({
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
      toast.success(method === "POST" ? "created" : "updated");
      setOpen(false);
      router.refresh();
    } else {
      toast.error("something went wrong");
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
  };
  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={() => {
          setOpen((prev) => !prev);
          if (method === "POST") {
            setFields(() => ({}));
          }
        }}
      >
        <Dialog.Trigger asChild>
          {children ? (
            children
          ) : (
            <button style={{ margin: "0.5rem" }}>Create Project</button>
          )}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles["dialog-overlay"]} />
          <Dialog.Content className={styles["dialog-content"]}>
            <Dialog.Title className={styles.title}>
              <p>
                {method === "POST"
                  ? "Create a new project"
                  : "Update " + fields.token}
              </p>
              <Dialog.Close className={styles.button}>close</Dialog.Close>
            </Dialog.Title>
            <form className={styles.form}>
              <div>
                <label>
                  <p>* Token</p>
                  <input
                    type="text"
                    placeholder="Token"
                    name="token"
                    onChange={(e) => onProjectFormChange(e, setFields)}
                    value={fields?.token || ""}
                    disabled={method === "PUT"}
                    style={method === "PUT" ? { filter: "grayscale(0.8)" } : {}}
                  />
                </label>
              </div>
              <div>
                <label>
                  <p>* Name</p>
                  <input
                    type="text"
                    placeholder="Project Name"
                    name="name"
                    onChange={(e) => onProjectFormChange(e, setFields)}
                    value={fields?.name || ""}
                  />
                </label>
              </div>

              <div>
                <label>
                  <p>Website</p>
                  <input
                    type="text"
                    placeholder="Website"
                    name="websiteURL"
                    onChange={(e) => onProjectFormChange(e, setFields)}
                    value={fields?.websiteURL || ""}
                  />
                </label>
              </div>
              <div>
                <label>
                  <p>Logo URL</p>
                  <input
                    type="text"
                    placeholder="Logo URL"
                    name="logoImageURL"
                    onChange={(e) => onProjectFormChange(e, setFields)}
                    value={fields?.logoImageURL || ""}
                  />
                </label>
              </div>
              <div>
                <label>
                  <p>Description</p>
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    onChange={(e) => onProjectFormChange(e, setFields)}
                    value={fields?.description || ""}
                  />
                </label>
              </div>
              <div>
                <label>
                  <p>* Amount distributing</p>
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
                </label>
              </div>
              <div>
                <label>
                  <p>Maximum supply</p>
                  <input
                    type="text"
                    placeholder="Max supply"
                    name="maxSupply"
                    onChange={(e) => onProjectFormChange(e, setFields)}
                    value={fields?.maxSupply || ""}
                  />
                </label>
              </div>
              <div>
                <label>
                  live
                  <input
                    className={styles.checkbox}
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
                    className={styles.radio}
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
                    className={styles.radio}
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
                    className={styles.radio}
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
                    className={styles.radio}
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
                    className={styles.radio}
                    type="radio"
                    name="takesRewards"
                    value={"NOT_SPECIFIED"}
                    checked={fields?.takesRewards === "NOT_SPECIFIED"}
                    onChange={updateFields}
                  />
                  <p>Not specified</p>
                </label>
              </div>
              <button onClick={createProject}>
                {method === "POST" ? "Add project" : "Update project"}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
