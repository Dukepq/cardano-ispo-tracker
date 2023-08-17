import styles from "./datarow.module.css";
import Link from "next/link";
import Image from "next/image";

export default function DataRow({
  name,
  categories,
  description,
  website,
  logo,
  token,
  allocation,
  ratio,
  takesRewards,
  live,
  index,
}: ISPO & { index: number }) {
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
            <h5>{name}</h5>
          </Link>
        </div>
      </td>
      <td data-cell="token">{token}</td>
      <td data-cell="allocation">{allocation}</td>
      <td data-cell="%per100k">{ratio}</td>
      <td style={live ? { color: "green" } : { color: "red" }}>
        {live ? "yes" : "no"}
      </td>
      <td data-cell="categories">
        <div className={styles["categories-wrapper"]}>
          {categories.map((item, index) => {
            if (index < 3) return <p key={index}>{item}</p>;
          })}
        </div>
      </td>
    </tr>
  );
}
