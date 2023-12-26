"use client";

import styles from "./table.module.css";
import TableRow from "./TableRow";
import { useState } from "react";
import SearchBar from "./SearchBar";
import ManageProjectButton from "./ManageProjectButton";

export default function Table({ projects }: { projects: ISPO[] }) {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <div className={styles["action-bar"]}>
        <SearchBar setState={setSearch} />
        <ManageProjectButton method={"POST"} ISPO={{}} />
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th style={{ width: "15rem" }}>Name</th>
            <th>Token</th>
            <th className={styles["center-align"]}>Live</th>
            <th className={styles["center-align"]}>Categories</th>
            <th className={styles["center-align"]}>Edit</th>
            <th className={styles["center-align"]}>Delete</th>
            <th
              style={{ minWidth: "15rem" }}
              rowSpan={2}
              className={styles["center-align"]}
            >
              Pool Options
            </th>
          </tr>
        </thead>
        <tbody>
          {projects
            .filter((project) => {
              if (search.length < 3) return true;
              return (
                project.name
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                project.token.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((project, index) => {
              return (
                <TableRow
                  key={index}
                  name={project.name}
                  token={project.token}
                  live={project.live}
                  takesRewards={project.takesRewards}
                  maxSupplyExists={project.maxSupplyExists}
                  maxSupply={project.maxSupply}
                  distributingAmount={project.distributingAmount}
                  pools={project.pools}
                  categories={project.categories}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
}
