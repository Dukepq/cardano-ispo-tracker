"use client";

import { deleteISPO } from "@/app/lib/deleteISPO";
import styles from "./table.module.css";
import ManageProjectButton from "./ManageProjectButton";
import AddPool from "./AddPool";
import EditPoolModal from "./EditPoolModal";
import CategoryDropdown from "./CategoryDropdown";
import { Trash, FilePenLine } from "lucide-react";
import DeleteDialogWrap from "../../components/DeleteDialogWrap";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function TableRow(props: ISPO) {
  const { name, token, live, categories } = props;
  const router = useRouter();
  return (
    <tr>
      <td style={{ minWidth: "15rem" }} title={name}>
        {name}
      </td>
      <td>{token}</td>
      <td
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {live ? "\u2713" : "\u00D7"}
      </td>
      <td>
        <CategoryDropdown token={token} categories={categories} />
      </td>
      <td className={styles["center-align"]}>
        <ManageProjectButton method="PUT" ISPO={props}>
          <FilePenLine
            style={{ cursor: "pointer" }}
            width={25}
            height={25}
            className={styles.icon}
          />
        </ManageProjectButton>
      </td>
      <td className={styles["center-align"]}>
        <DeleteDialogWrap
          handleDelete={() => {
            try {
              deleteISPO(token);
              toast.success("Deleted project.");
            } catch (err) {
              toast.error("Failed to delete project");
            }
            router.refresh();
          }}
          title={`Delete ${name}?`}
          description={`This action will permanently delete ${name} and cannot be undone.`}
        >
          <Trash
            className={styles.icon}
            width={25}
            height={25}
            style={{
              cursor: "pointer",
            }}
          />
        </DeleteDialogWrap>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddPool token={token}>
            <button className={styles.button}>
              <span>add pool</span> <span>+</span>
            </button>
          </AddPool>
          <EditPoolModal poolOf={token}>
            <button className={styles.button}>
              <span>edit pools</span> <span>&#9998;</span>
            </button>
          </EditPoolModal>
        </div>
      </td>
    </tr>
  );
}
