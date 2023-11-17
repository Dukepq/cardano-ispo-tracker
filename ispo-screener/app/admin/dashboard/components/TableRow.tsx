"use client";
import Image from "next/image";
import { deleteISPO } from "@/app/lib/deleteISPO";
import { useRouter } from "next/navigation";
import styles from "./table.module.css";
import base from "@/app/lib/routes";
import { useState } from "react";

type TableProps = Pick<ISPO, "name" | "token" | "live">;

export default function TableRow({
  name,
  token,
  live,
  distributingAmount,
  maxSupply,
  maxSupplyExists,
  pools,
}: ISPO) {
  const [checked, setChecked] = useState(live);
  const router = useRouter();
  const deleteByToken = async () => {
    await deleteISPO(token);
    router.refresh();
  };
  const toggleLive = async () => {
    const response = await fetch(base + "/api/projects", {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        token: token,
        live: !checked,
      }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (response.ok) {
      setChecked((prev) => {
        return !prev;
      });
    } else {
      if (response.status === 401) {
        router.push("/admin");
      }
    }
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{token}</td>
      <td className={styles["center-align"]}>
        <input type="checkbox" checked={checked} onChange={toggleLive} />
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
