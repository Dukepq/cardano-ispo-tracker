import { FormattedPool } from "@/app/lib/formatPools";
import styles from "../styles/pool-card.module.css";
import Link from "next/link";
import { ExternalLink } from "../../../../../node_modules/lucide-react";

export default function PoolCard({
  margin,
  name,
  percentageSaturated,
  poolId,
  ticker,
}: FormattedPool) {
  return (
    <Link
      target="_blank"
      href={`https://cexplorer.io/pool/${poolId}`}
      className={styles.wrapper}
    >
      <h4 className={styles.name}>
        <span>{name}</span>
      </h4>
      <div>
        <span>Ticker: </span>
        <span>{ticker}</span>
      </div>
      <div>
        <span>Saturation: </span>
        <span>{percentageSaturated.toFixed(2) + "%"}</span>
      </div>
      <div>
        <span>Margin: </span> <span>{margin + "%"}</span>
      </div>
      <ExternalLink width={28} height={28} className={styles["link-icon"]} />
    </Link>
  );
}