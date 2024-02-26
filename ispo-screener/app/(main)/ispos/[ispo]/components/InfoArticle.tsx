import styles from "../styles/ispo.module.css";
import { FormattedISPO } from "@/app/lib/formatISPOArray";
import { Globe } from "../../../../../node_modules/lucide-react";
import Link from "next/link";
import { numberFormat } from "@/app/lib/numberFormat";

type InfoCardProps = Pick<
  FormattedISPO,
  | "live"
  | "allocatedPercentage"
  | "rewards"
  | "maxSupply"
  | "ratio"
  | "websiteURL"
  | "token"
  | "totalStaked"
  | "startsAt"
  | "endsAt"
>;

export default function Info({
  live,
  rewards,
  maxSupply,
  ratio,
  allocatedPercentage,
  websiteURL,
  token,
  totalStaked,
  startsAt,
  endsAt,
}: InfoCardProps) {
  return (
    <article className={styles["info-card"]}>
      <div className={styles.live}>
        <h4 style={live ? { color: "lightgreen" } : { color: "red" }}>
          {live ? "This project is live!" : "This project is not live."}
        </h4>
        {!!live && (
          <p>For information on how to stake please refer to their website.</p>
        )}

        <div className={styles["icon-wrapper"]}>
          {!!websiteURL && (
            <Link href={websiteURL} target="_blank">
              <Globe />
            </Link>
          )}
        </div>
      </div>
      <ul>
        <li>
          <span>Max supply: </span>
          <span>
            {maxSupply
              ? new Intl.NumberFormat("en", {
                  notation: "compact",
                }).format(maxSupply) +
                " " +
                token
              : "-"}
          </span>
        </li>
        <li>
          <span>Takes rewards: </span>
          <span>{rewards}</span>
        </li>
        <li>
          <span>Rewards per ADA: </span>
          <span>{ratio ? numberFormat.format(ratio) : "N/A"}</span>
        </li>
        <li>
          <span>ISPO Allocation: </span>
          <span>
            {allocatedPercentage ? allocatedPercentage.toFixed(2) + "%" : "-"}
          </span>
        </li>
        <li>
          <span>Staked: </span>
          <span>{totalStaked ? numberFormat.format(totalStaked) : "-"}</span>
        </li>
      </ul>
      <ul className={styles.dates}>
        <li>
          <span>Starts at: </span>
          <span>
            {startsAt
              ? new Date(startsAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </span>
        </li>
        <li>
          <span>Ends at: </span>
          <span>
            {endsAt
              ? new Date(endsAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </span>
        </li>
      </ul>
    </article>
  );
}
