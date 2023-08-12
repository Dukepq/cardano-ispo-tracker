"use client"

import styles from "./table.module.css"
import DataRow from "./DataRow"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function Table({ data }: {data: ISPO[]}) {
  const sort = useSearchParams().get("sort")
  const [sortBy, desc] = sort?.split(':') ?? []
  const sortedData = [...data].sort((a, b) => {
    const valueA = a[sortBy as keyof ISPO]
    const valueB = b[sortBy as keyof ISPO]
    if (typeof valueA === "string" && typeof valueB === "string") {
      if (sortBy === "allocation") { // add all fields with symbols to this if statement
        const numA = parseFloat(valueA.replace(/[^0-9]/g, ''))
        const numB = parseFloat(valueB.replace(/[^0-9]/g, ''))
        return desc
        ? numA < numB ? -1 : 1
        : numA < numB ? 1 : -1
      }
      return desc
        ? valueA < valueB ? -1 : 1
        : valueA < valueB ? 1 : -1
    }
    return 0
  })
  console.log(sortBy)
  return (
    <>
      <thead className={styles["table-head"]}>
        <tr style={{height: "3rem"}}>
            <th
            data-row="placeholder"
            onClick={() => null}
            className={styles["row"]}
            >
              <Link className={styles.query} href={`/ispos?sort=name${desc ? "" : ":desc"}`}>
                <p>Name</p>
                <div className={styles.arrow}>&#8597;</div>
              </Link>
            </th>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
          >
            <Link className={styles.query} href={`/ispos?sort=token${desc ? "" : ":desc"}`}>
              <p>Token</p>
              <div className={styles.arrow}>&#8597;</div>
            </Link>
          </th>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
          >
            <Link className={styles.query} href={`/ispos?sort=allocation${desc ? "" : ":desc"}`}>
              <p>ISPO Allocation</p>
              <div className={styles.arrow}>&#8597;</div>
            </Link>
          </th>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row"]}
          >
            <Link className={styles.query} href={`/ispos?sort=ratio${desc ? "" : ":desc"}`}>
              <p>% per 100k</p>
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
        {(sortedData || data).map((item, index) => {
          return (
            <DataRow
            key={index}
            description={item.description}
            name={item.name}
            website={item.website}
            logo={"cardano-logo.svg"}
            token={item.token}
            categories={item.categories}
            allocation={item.allocation}
            ratio={item.ratio}
            takesRewards={item.takesRewards}
            live={item.live}
            index={index}
            status={item.status}
            />
          )
        })}
      </tbody>
    </>
  )
}