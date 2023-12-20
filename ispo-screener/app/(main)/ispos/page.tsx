import styles from "./ispos.module.css";
import { Metadata } from "next";
import Table from "./components/Table";
import { fetchAllProjects } from "../../lib/fetchIspoData";

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
