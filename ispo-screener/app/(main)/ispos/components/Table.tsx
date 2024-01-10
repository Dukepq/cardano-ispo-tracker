"use client";

import styles from "../styles/table.module.css";
import TableRow from "./TableRow";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import formatISPOArray, { FormattedISPO } from "@/app/lib/formatISPOArray";
import TableHead from "./TableHead";

export default function Table({ projects }: { projects: ISPO[] }) {
  const extract = useMemo(() => formatISPOArray(projects), [projects.length]);
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
        <TableHead desc={desc} />
        <tbody>
          {/* can chain a sorting function that returns an array here:
            sortArray(dummyData).map... */}
          {sortedProjects.map((project, index) => {
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
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
