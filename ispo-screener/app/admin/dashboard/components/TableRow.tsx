"use client";
import Image from "next/image";
import { deleteISPO } from "@/app/lib/deleteISPO";
import { useRouter } from "next/navigation";
import styles from "./table.module.css";

type TableProps = Pick<ISPO, "name" | "token" | "live">;

export default function TableRow({ name, token, live }: TableProps) {
  const router = useRouter();
  const deleteByToken = () => {
    deleteISPO(token);
    router.refresh();
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{token}</td>
      <td className={styles["center-align"]}>
        {
          <Image
            alt="live icon"
            src={live ? "/check.svg" : "/cross.svg"}
            width={25}
            height={25}
          />
        }
      </td>
      <td className={styles["center-align"]}>
        <Image alt="edit icon" src="/edit.svg" width={25} height={25} />
      </td>
      <td className={styles["center-align"]}>
        <Image
          alt="trash icon"
          src="/trash.svg"
          width={25}
          height={25}
          onClick={deleteByToken}
          style={{ cursor: "pointer" }}
        />
      </td>
    </tr>
  );
}
