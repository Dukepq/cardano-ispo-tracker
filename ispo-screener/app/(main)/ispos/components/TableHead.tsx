"use client";

import Link from "next/link";
import styles from "../styles/table.module.css";

type TableHeadProps = {
  desc: "" | "desc" | undefined;
};

export default function TableHead({ desc }: TableHeadProps) {
  return (
    <thead className={styles["table-head"]}>
      <tr style={{ height: "3rem" }}>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <Link
            className={styles.query}
            href={`/ispos?sort=name${desc ? "" : ":desc"}`}
          >
            <p>Name</p>
            <div className={styles.arrow}>&#8597;</div>
          </Link>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <Link
            className={styles.query}
            href={`/ispos?sort=token${desc ? "" : ":desc"}`}
          >
            <p>Token</p>
            <div className={styles.arrow}>&#8597;</div>
          </Link>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <Link
            className={styles.query}
            href={`/ispos?sort=allocatedPercentage${desc ? "" : ":desc"}`}
          >
            <p>ISPO Allocation</p>
            <div className={styles.arrow}>&#8597;</div>
          </Link>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <Link
            className={styles.query}
            href={`/ispos?sort=rewards${desc ? "" : ":desc"}`}
          >
            <p>Rewards</p>
            <div className={styles.arrow}>&#8597;</div>
          </Link>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <Link
            className={styles.query}
            href={`/ispos?sort=ratio${desc ? "" : ":desc"}`}
          >
            <p>% per million ADA</p>
            <div className={styles.arrow}>&#8597;</div>
          </Link>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <Link className={styles.query} href={""}>
            <p>live</p>
            <div className={styles.arrow}>&#8597;</div>
          </Link>
        </th>
      </tr>
    </thead>
  );
}
