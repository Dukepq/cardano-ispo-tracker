"use client";

import Image from "next/image";
import { deleteISPO } from "@/app/lib/deleteISPO";
import styles from "./table.module.css";
import AlertDialogWindow from "./AlertDialog";
import AddProject from "./AddProject";
import AddPool from "./AddPool";
import EditPoolModal from "./EditPoolModal";

export default function TableRow(props: ISPO) {
  const { name, token } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{token}</td>
      <td className={styles["center-align"]}>
        <AddProject method="PUT" ISPO={props}>
          <Image
            alt="edit icon"
            src="/edit.svg"
            style={{ cursor: "pointer" }}
            width={25}
            height={25}
          />
        </AddProject>
      </td>
      <td className={styles["center-align"]}>
        <AlertDialogWindow deleteFunc={deleteISPO} arg={token}>
          <Image
            alt="trash icon"
            src="/trash.svg"
            width={25}
            height={25}
            style={{ cursor: "pointer" }}
          />
        </AlertDialogWindow>
      </td>
      <td
        style={{
          border: "none",
          display: "flex",
          marginLeft: "0.25rem",
          gap: "0.25rem",
          alignItems: "center",
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
      </td>
    </tr>
  );
}
