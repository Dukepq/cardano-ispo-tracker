"use client";

import deleteUser from "@/app/lib/deleteUser";
import styles from "../../../dashboard/components/table.module.css";
import DeleteDialogWrap from "@/app/admin/components/DeleteDialogWrap";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

export default function UserTableRow({
  name,
  email,
  role,
  createdAt,
}: UserResponse) {
  const router = useRouter();
  return (
    <tr>
      <td>{name}</td>
      <td title={email} style={{ maxWidth: "15rem", width: "15rem" }}>
        {email}
      </td>
      <td>{role}</td>
      <td>{createdAt.split("T")[0]}</td>
      <td className={styles["center-align"]}>
        <DeleteDialogWrap
          handleDelete={() => {
            try {
              deleteUser(email);
              toast.success("Deleted user.");
            } catch (err) {
              toast.error("Could not delete user.");
            }
            router.refresh();
          }}
          title={`Delete user ${name}?`}
          description={`This action will permanently delete user: ${name}, with email: ${email} and cannot be undone.`}
        >
          <button>delete user</button>
        </DeleteDialogWrap>
      </td>
    </tr>
  );
}
