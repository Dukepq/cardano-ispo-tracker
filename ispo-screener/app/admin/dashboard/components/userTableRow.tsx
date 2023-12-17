"use client";

import deleteUser from "@/app/lib/deleteUser";
import { useRouter } from "next/navigation";
import styles from "./table.module.css";
import AlertDialogWindow from "./AlertDialog";

export default function UserTableRow({
  name,
  email,
  role,
  createdAt,
  updatedAt,
}: UserResponse) {
  const router = useRouter();
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>{createdAt.split("T")[0]}</td>
      <td>{updatedAt.split("T")[0]}</td>
      <td className={styles["center-align"]}>
        <AlertDialogWindow deleteFunc={deleteUser} arg={email} />
      </td>
    </tr>
  );
}
