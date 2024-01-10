import styles from "../styles/tableRow.module.css";
import Link from "next/link";
import Image from "next/image";
import { FormattedISPO } from "@/app/lib/formatISPOArray";

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
          <Link href={"/"}>
            <Image
              src={"/cardano-logo.svg"}
              width={25}
              height={25}
              alt="logo"
            />
            <Image
              alt="link symbol"
              src={"/link.png"}
              width={20}
              height={20}
              style={{ filter: "invert(1)" }}
            />
            <Image
              src={"/cardano-logo.svg"}
              width={25}
              height={25}
              alt="logo"
            />
            <h5>{name}</h5>
          </Link>
          <div className={styles["categories-wrapper"]}>
            {categories.map((item, index) => {
              if (index < 3) return <p key={index}>{item.name}</p>;
            })}
          </div>
        </div>
      </td>
      <td data-cell="token">{token}</td>
      <td data-cell="allocation">{allocatedPercentage?.toFixed(2) || "N/A"}</td>
      <td data-cell="rewards">{rewards.toLowerCase()}</td>
      <td data-cell="%per100k">{ratio?.toFixed(2) || "N/A"}</td>
      <td style={live ? { color: "green" } : { color: "red" }}>
        {live ? "yes" : "no"}
      </td>
    </tr>
  );
}
