import styles from "../styles/tableRow.module.css";
import Link from "next/link";
import Image from "next/image";
import { FormattedISPO } from "@/app/lib/formatISPOArray";
import { Link as LinkIcon } from "../../../../node_modules/lucide-react";

export default function TableRow({
  name,
  token,
  live,
  index,
  allocatedPercentage,
  ratio,
  rewards,
  categories,
}: FormattedISPO & { index: number }) {
  return (
    <tr className={styles.row} data-cell="general-info">
      <td>
        <div className={styles["name"]}>
          <p>{index + 1}</p>
          <Link href={`/ispos/${token}`}>
            <Image
              src={"/cardano-logo.svg"}
              width={25}
              height={25}
              alt="logo"
            />
            <div className={styles["name-wrapper"]}>
              <h5 style={{ color: "rgb(150, 150, 255)" }}>{name}</h5>
              <LinkIcon width={15} height={15} />
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
          ? allocatedPercentage?.toPrecision(2) + "%"
          : "N/A"}
      </td>
      <td data-cell="rewards">{rewards.toLowerCase()}</td>
      <td style={!ratio ? { opacity: "0.5" } : {}} data-cell="rpa">
        {ratio
          ? new Intl.NumberFormat("en", {
              notation: "standard",
            }).format(ratio) +
            " " +
            token
          : "N/A"}
      </td>
      <td style={live ? { color: "green" } : { color: "red" }}>
        {live ? "yes" : "no"}
      </td>
    </tr>
  );
}
