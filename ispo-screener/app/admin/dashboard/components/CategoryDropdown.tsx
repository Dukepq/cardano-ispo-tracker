"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./category-select.module.css";
import { useState } from "react";
import updateCategory from "@/app/lib/updateCategory";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CategoryDropdown({
  categories,
  token,
}: {
  categories: ISPO["categories"];
  token: string;
}) {
  const [cats, setCats] = useState(categories ?? []);
  const [field, setField] = useState<string>("");
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>&#9998;</DropdownMenu.Trigger>
      <DropdownMenu.Content className={styles["dropdown-content"]}>
        {cats.map((category, index) => {
          return (
            <DropdownMenu.Item
              onSelect={(e) => e.preventDefault()}
              key={index}
              className={styles.item}
            >
              <span>{category.name}</span>
              <Image
                alt="trashcan"
                src={"/trash.svg"}
                width={20}
                height={20}
                onClick={async () => {
                  try {
                    await updateCategory(
                      token,
                      cats.filter((entry) => entry.name !== category.name)
                    );
                    setCats((prev) => {
                      return prev.filter(
                        (entry) => entry.name !== category.name
                      );
                    });
                    toast.success("deleted");
                  } catch (err) {
                    toast.error("failed to delete");
                  }
                }}
              />
            </DropdownMenu.Item>
          );
        })}
        <Dialog.Root
          open={open}
          onOpenChange={() => {
            setOpen((prev) => !prev);
          }}
        >
          <Dialog.Trigger>
            <p>add category</p>
            <DropdownMenu.Item asChild />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className={styles["dialog-overlay"]} />
            <Dialog.Content className={styles["dialog-content"]}>
              <Dialog.Title>
                <p>Add a category</p>
              </Dialog.Title>
              <div className={styles.subcontent}>
                <input
                  value={field}
                  type="text"
                  onChange={(e) => {
                    setField(() => e.target.value);
                  }}
                />
                <button
                  onClick={async () => {
                    try {
                      await updateCategory(token, [...cats, { name: field }]);
                      setCats((prev) => {
                        if (!prev.find((entry) => entry.name === field)) {
                          return [...prev, { name: field }];
                        } else return prev;
                      });
                      toast.success("category added");
                      setOpen(false);
                      setField("");
                    } catch (err) {
                      toast.error("failed to add category");
                    }
                  }}
                >
                  add category
                </button>
              </div>

              <Dialog.Close>close dialog</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
