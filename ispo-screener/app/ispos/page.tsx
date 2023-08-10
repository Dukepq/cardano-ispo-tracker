import styles from "./ispos.module.css"
import DisplaySegment from "../components/DisplayISPO"
import { dummyData } from "../dummyData"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Live ISPO's",
  description: "Overview of currently running ISPO's"
}

export default function ISPOS() {
  return (
    <main className={styles.main}>
      <h1>ISPO'S:</h1>
      <div className={styles.wrapper}>
        {dummyData.map((item, index) => {
          return (
            <DisplaySegment
            key={index}
            description={item.description}
            name={item.name}
            logo={"cardano-logo.svg"}
            token={item.token}
            categories={item.categories}
            allocation={item.allocation}
            ratio={item.ratio}
            rewards={[item.takesRewards]}
            live={item.live}
            />
          )
        })}
      </div>
    </main>
  )
}