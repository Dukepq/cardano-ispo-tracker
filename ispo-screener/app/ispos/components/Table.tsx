"use client"

import styles from "./table.module.css"
import DataRow from "./DataRow"

export default function Table({ data }: {data: ISPO[]}) {
  return (
    <>
      <thead className={styles["table-head"]}>
        <tr style={{height: "3rem"}}>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row-1"]}
          >
            <div><p>name</p></div>
          </th>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row-2"]}
          >
            <div><p>token</p></div>
          </th>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row-3"]}
          >
            <div><p>allocation</p></div>
          </th>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row-4"]}
          >
            <div><p>test1</p></div>
          </th>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row-5"]}
          >
            <div><p>test2</p></div>
          </th>
          <th
          data-row="placeholder"
          onClick={() => null}
          className={styles["row-6"]}
          >
            <div><p>test3</p></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* can chain a sorting function that returns an array here:
            sortArray(dummyData).map... */}
        {data.map((item, index) => {
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
            />
          )
        })}
      </tbody>
    </>
  )
}