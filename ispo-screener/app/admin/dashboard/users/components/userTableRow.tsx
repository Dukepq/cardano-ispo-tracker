"use client";

import deleteUser from "@/app/lib/deleteUser";
import styles from "../../../dashboard/components/table.module.css";
import AlertDialogWindow from "../../components/AlertDialog";

export default function UserTableRow({
  name,
  email,
  role,
  createdAt,
}: UserResponse) {
  return (
    <tr>
      <td>{name}</td>
      <td title={email} style={{ maxWidth: "15rem", width: "15rem" }}>
        {email}
      </td>
      <td>{role}</td>
      <td>{createdAt.split("T")[0]}</td>
      <td className={styles["center-align"]}>
        <AlertDialogWindow deleteFunc={deleteUser} arg={email}>
          <button>delete user</button>
        </AlertDialogWindow>
      </td>
    </tr>
  );
}
