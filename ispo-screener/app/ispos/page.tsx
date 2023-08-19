import styles from "./ispos.module.css";
import { Metadata } from "next";
import Table from "./components/Table";
import { dummyData } from "@/app/dummyData";
import getDummyDataAsync from "@/app/dummyData";
import { fetchAllProjects } from "../lib/fetchIspoData";

export const metadata: Metadata = {
  title: "Live ISPO's",
  description: "Overview of currently running ISPO's",
};

export default async function ISPOS() {
  const projects = await fetchAllProjects();
  return (
    <main className={styles.main}>
      {/* <div className={styles["bar"]}>
        <h1>ISPO&apos;S:</h1>
      </div> */}
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <Table projects={projects} />
        </table>
      </div>
    </main>
  );
}

// {/* <table className={styles.table}>
//           <thead>
//             <TableHead />
//           </thead>
//           <tbody>
//             {/* can chain a sorting function that returns an array here:
//                 sortArray(dummyData).map... */}
//             {dummyData.map((item, index) => {
//               return (
//                 <DataRow
//                 key={index}
//                 description={item.description}
//                 name={item.name}
//                 website={item.website}
//                 logo={"cardano-logo.svg"}
//                 token={item.token}
//                 categories={item.categories}
//                 allocation={item.allocation}
//                 ratio={item.ratio}
//                 rewards={[item.takesRewards]}
//                 live={item.live}
//                 index={index}
//                 />
//               )
//             })}
//           </tbody>

//         </table> */}
