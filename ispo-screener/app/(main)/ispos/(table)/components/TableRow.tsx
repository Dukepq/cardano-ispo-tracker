import styles from "../styles/tableRow.module.css";
import Link from "next/link";
import Image from "next/image";
import { FormattedISPO } from "@/app/lib/formatISPOArray";
import { Check, X } from "lucide-react";
import { numberFormat } from "@/app/lib/numberFormat";

export default function TableRow({
  name,
  token,
  live,
  index,
  allocatedPercentage,
  ratio,
  rewards,
  categories,
  totalStaked,
}: FormattedISPO & { index: number }) {
  return (
    <tr className={styles.row} data-cell="general-info">
      <td>
        <div className={styles["name"]}>
          <p>{index + 1}</p>
          <Link href={`/ispos/${token}`}>
            <div className={styles["name-wrapper"]}>
              <h5 style={{ color: "rgb(150, 150, 255)" }}>{name}</h5>
            </div>
          </Link>
          <div className={styles["categories-wrapper"]}>
            {categories.map((item, index) => {
              if (index < 1) return <p key={index}>{item.name}</p>;
            })}
          </div>
        </div>
      </td>
      <td data-cell="token">{token}</td>
      <td
        style={!allocatedPercentage ? { opacity: "0.5" } : {}}
        data-cell="allocation"
      >
        {allocatedPercentage
          ? numberFormat.format(allocatedPercentage) + "%"
          : "N/A"}
      </td>
      <td data-cell="rewards">{rewards.toLowerCase()}</td>
      <td style={!ratio ? { opacity: "0.5" } : {}} data-cell="rpa">
        {ratio ? numberFormat.format(ratio) + " " + token : "N/A"}
      </td>
      <td data-cell="staked">{numberFormat.format(totalStaked) + " ADA"}</td>
      <td style={live ? { color: "green" } : { color: "red" }}>
        {live ? <Check /> : <X />}
      </td>
    </tr>
  );
}
