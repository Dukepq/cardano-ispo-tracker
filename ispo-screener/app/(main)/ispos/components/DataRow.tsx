import styles from "./datarow.module.css";
import Link from "next/link";
import Image from "next/image";

function getAmountInPools(pools: Pool[]) {
  let amount = 0;
  for (let pool of pools) {
    amount += pool.amountInPool;
  }
  return amount;
}

export default function DataRow({
  name,
  token,
  live,
  index,
  distributingAmount,
  maxSupply,
  maxSupplyExists,
  pools,
  takesRewards,
  categories,
}: ISPO & { index: number }) {
  const allocatedPercentage = maxSupplyExists
    ? ((distributingAmount / maxSupply) * 100).toFixed(2) + "%"
    : "N/A";
  const amountInPools = getAmountInPools(pools);
  const ratio =
    amountInPools > 0 && distributingAmount > 0
      ? (distributingAmount / amountInPools).toFixed(2) + "%"
      : "N/A";

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
          <div className={styles["categories-wrapper"]}>
            {categories.map((item, index) => {
              if (index < 3) return <p key={index}>{item.name}</p>;
            })}
          </div>
        </div>
      </td>
      <td data-cell="token">{token}</td>
      <td data-cell="allocation">{allocatedPercentage}</td>
      <td data-cell="rewards">{takesRewards.toLowerCase()}</td>
      <td data-cell="%per100k">{ratio}</td>
      <td style={live ? { color: "green" } : { color: "red" }}>
        {live ? "yes" : "no"}
      </td>
    </tr>
  );
}
