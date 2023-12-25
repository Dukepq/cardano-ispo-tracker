"use client";

import Image from "next/image";
import { deleteISPO } from "@/app/lib/deleteISPO";
import styles from "./table.module.css";
import AlertDialogWindow from "./AlertDialog";
import ManageProjectButton from "./ManageProjectButton";
import AddPool from "./AddPool";
import EditPoolModal from "./EditPoolModal";

export default function TableRow(props: ISPO) {
  const { name, token, live } = props;
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
      <td className={styles["center-align"]}>
        <ManageProjectButton method="PUT" ISPO={props}>
          <Image
            alt="edit icon"
            src="/edit.svg"
            style={{ cursor: "pointer" }}
            width={25}
            height={25}
          />
        </ManageProjectButton>
      </td>
      <td className={styles["center-align"]}>
        <AlertDialogWindow deleteFunc={deleteISPO} arg={token}>
          <Image
            alt="trash icon"
            src="/trash.svg"
            width={25}
            height={25}
            style={{
              cursor: "pointer",
            }}
          />
        </AlertDialogWindow>
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
