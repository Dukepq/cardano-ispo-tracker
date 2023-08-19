"use client";

import styles from "./table.module.css";
import DataRow from "./DataRow";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Table({ projects }: { projects: ISPO[] }) {
  const sort = useSearchParams().get("sort");
  const [sortBy, desc] = sort?.split(":") ?? [];
  const sortedProjects = [...projects].sort((a, b) => {
    const valueA = a[sortBy as keyof ISPO];
    const valueB = b[sortBy as keyof ISPO];
    if (typeof valueA === "string" && typeof valueB === "string") {
      if (sortBy === "allocation" || sortBy === "allocatedPercentage") {
        // add all fields with symbols to this if statement
        let numA = parseFloat(valueA.replace(/[^0-9.]/g, ""));
        let numB = parseFloat(valueB.replace(/[^0-9.]/g, ""));
        if (isNaN(numA)) numA = 0;
        if (isNaN(numB)) numB = 0;
        return desc ? (numA < numB ? -1 : 1) : numA < numB ? 1 : -1;
      }
      return desc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    return 0;
  });
  return (
    <>
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
              href={`/ispos?sort=allocation${desc ? "" : ":desc"}`}
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
            <Link className={styles.query} href={"/ispos?sort=placeholder"}>
              <p>test2</p>
            </Link>
          </th>
          <th
            data-row="placeholder"
            onClick={() => null}
            className={styles["row"]}
          >
            <Link className={styles.query} href={"/ispos?sort=placeholder"}>
              <p>test3</p>
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* can chain a sorting function that returns an array here:
            sortArray(dummyData).map... */}
        {(sortedProjects || projects).map((project, index) => {
          return (
            <DataRow
              key={index}
              name={project.name}
              token={project.token}
              live={project.live}
              index={index}
              maxSupplyExists={project.maxSupplyExists}
              maxSupply={project.maxSupply}
              distributingAmount={project.distributingAmount}
              pools={project.pools}
            />
          );
        })}
      </tbody>
    </>
  );
}
