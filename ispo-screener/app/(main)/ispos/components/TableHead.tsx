"use client";

import Link from "next/link";
import styles from "../styles/table.module.css";
import { ArrowUpDown } from "../../../../node_modules/lucide-react";
import HelpPopup from "./Popup";

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
            <ArrowUpDown width={16} height={16} className={styles.arrow} />

            <p>Name</p>
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
            <ArrowUpDown width={16} height={16} className={styles.arrow} />

            <p>Token</p>
          </Link>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <div>
            <Link
              className={styles.query}
              href={`/ispos?sort=allocatedPercentage${desc ? "" : ":desc"}`}
            >
              <ArrowUpDown width={16} height={16} className={styles.arrow} />
              <p>ISPO Allocation</p>
            </Link>
            <HelpPopup width={20} height={20} className={styles.help}>
              <p>Percentage of total supply allocated to the ISPO.</p>
            </HelpPopup>
          </div>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <div>
            <Link
              className={styles.query}
              href={`/ispos?sort=rewards${desc ? "" : ":desc"}`}
            >
              <ArrowUpDown width={16} height={16} className={styles.arrow} />
              <p>Keeps Rewards</p>
            </Link>
            <HelpPopup width={20} height={20} className={styles.help}>
              <p style={{ marginBottom: "1rem" }}>
                The way the ISPO handles ADA rewards from your delegated stake.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <li>
                  <strong>None</strong>: you&apos;ll receive all of your regular
                  ADA rewards alongside the project token.
                </li>
                <li>
                  <strong>All</strong>: the pool keeps all of your ADA rewards.
                </li>
                <li>
                  <strong>Partial</strong>: only part of your ADA rewards are
                  kept by the pool.
                </li>
                <li>
                  <strong>Optional</strong>: there are multiple pools available
                  that keep different amounts of your ADA rewards.
                </li>
              </ul>
            </HelpPopup>
          </div>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
        >
          <div>
            <Link
              className={styles.query}
              href={`/ispos?sort=ratio${desc ? "" : ":desc"}`}
            >
              <ArrowUpDown width={16} height={16} className={styles.arrow} />

              <p>Rewards per ADA</p>
            </Link>
            <HelpPopup width={20} height={20} className={styles.help}>
              <p>The amount of rewards available per ADA staked.</p>
              <p style={{ marginTop: "0.5rem" }}>
                simply put:{" "}
                <em>
                  Available rewards / cumulative stake in participating pools
                </em>
              </p>
              <div style={{ marginTop: "2rem", color: "yellowgreen" }}>
                <strong>
                  <p>
                    This amount is not representative of the rewards you will
                    receive!
                  </p>
                  <br />
                  <p>Different pools may offer different rewards.</p>
                  <br />
                  <p>Other modifiers could affect the size of your rewards.</p>
                </strong>
              </div>
            </HelpPopup>
          </div>
        </th>
        <th
          data-row="placeholder"
          onClick={() => null}
          className={`${styles["row"]} ${styles.unsortable}`}
        >
          <div className={styles.query}>
            <p>live</p>
          </div>
        </th>
      </tr>
    </thead>
  );
}
