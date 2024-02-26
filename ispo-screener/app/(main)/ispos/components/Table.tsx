"use client";

import styles from "../styles/table.module.css";
import TableRow from "./TableRow";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import formatISPOArray, { FormattedISPO } from "@/app/lib/formatISPOArray";
import TableHead from "./TableHead";
import SearchBar from "@/app/admin/dashboard/components/SearchBar";

export default function Table({ projects }: { projects: ISPO[] }) {
  const [search, setSearch] = useState("");
  const extract = useMemo(() => formatISPOArray(projects), [projects]);
  /*^extracts the exact data needed to fill table rows*/
  const sort = useSearchParams().get("sort");
  const [sortBy, desc] =
    (sort?.split(":") as [keyof FormattedISPO, "desc" | ""] | undefined) ?? [];

  const sortedProjects = [...extract].sort((a, b) => {
    const valueA = a[sortBy as keyof typeof a];
    const valueB = b[sortBy as keyof typeof b];
    if (valueA === null) return 1;
    if (valueB === null) return -1;

    if (typeof valueA === "number" && typeof valueB === "number") {
      return desc ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return desc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    return 0;
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles["search-wrapper"]}>
        <SearchBar setState={setSearch} className={styles.search} />
      </div>

      <table className={styles.table}>
        <TableHead desc={desc} />
        <tbody>
          {/* can chain a filter function that returns an array here:
            sortArray(dummyData).map... */}
          {sortedProjects
            .filter((project) => {
              if (search.length < 2) return project;
              if (
                project.name.toLowerCase().includes(search) ||
                project.token.toLowerCase().includes(search)
              ) {
                return project;
              }
            })
            .map((project, index) => {
              return (
                <TableRow
                  key={index}
                  index={index}
                  name={project.name}
                  token={project.token}
                  live={project.live}
                  categories={project.categories}
                  rewards={project.rewards}
                  allocatedPercentage={project.allocatedPercentage}
                  ratio={project.ratio}
                  totalStaked={project.totalStaked}
                  pools={project.pools}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
