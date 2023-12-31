"use client";

import styles from "./table.module.css";
import DataRow from "./DataRow";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type DictType = {
  [key: string]: string;
  rewards: "takesRewards";
  allocation: "allocation";
  token: "token";
  name: "name";
  live: "live";
  pools: "pools";
  distPercentage: "distributingPercentage";
};

const dict: DictType = {
  rewards: "takesRewards",
  allocation: "allocation",
  token: "token",
  name: "name",
  live: "live",
  pools: "pools",
  distPercentage: "distributingPercentage",
};

const numerics: string[] = ["allocation", "allocatedPercentage"];

export default function Table({ projects }: { projects: ISPO[] }) {
  const sort = useSearchParams().get("sort");
  const [_sortBy, desc] = sort?.split(":") ?? [];
  const sortBy = dict[_sortBy] || _sortBy;
  const sortedProjects = [...projects].sort((a, b) => {
    const valueA = a[sortBy as keyof ISPO];
    const valueB = b[sortBy as keyof ISPO];
    if (typeof valueA === "string" && typeof valueB === "string") {
      if (numerics.includes(sortBy)) {
        // code below removes symbols from a string and turns it into a number.
        // add all strings containing number values to "numerics".
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
              <Link className={styles.query} href={"/ispos?sort=placeholder"}>
                <p>live</p>
                <div className={styles.arrow}>&#8597;</div>
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
                takesRewards={project.takesRewards}
                categories={project.categories}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
