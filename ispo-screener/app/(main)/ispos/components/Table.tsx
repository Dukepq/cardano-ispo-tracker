"use client";

import styles from "./table.module.css";
import DataRow from "./DataRow";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import formatISPOArray, { FormattedISPO } from "@/app/lib/formatISPOArray";

export default function Table({ projects }: { projects: ISPO[] }) {
  const extract = useMemo(() => formatISPOArray(projects), [projects.length]);
  /*^extracts the exact data needed to fill table fields*/
  const sort = useSearchParams().get("sort");
  const [sortBy, desc] =
    (sort?.split(":") as [keyof FormattedISPO, "desc" | ""] | undefined) ?? [];

  const sortedProjects = [...extract].sort((a, b) => {
    const valueA = a[sortBy as keyof typeof a];
    const valueB = b[sortBy as keyof typeof b];
    if (valueA === null) return 1;
    if (valueB === null) return -1;

    if (typeof valueA === "number" && typeof valueB === "number") {
      console.log("im here");
      return desc ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return desc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    return 0;
  });
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
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
        <tbody>
          {/* can chain a sorting function that returns an array here:
            sortArray(dummyData).map... */}
          {sortedProjects.map((project, index) => {
            return (
              <DataRow
                key={index}
                index={index}
                name={project.name}
                token={project.token}
                live={project.live}
                categories={project.categories}
                rewards={project.rewards}
                allocatedPercentage={project.allocatedPercentage}
                ratio={project.ratio}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
