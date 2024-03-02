import styles from "./styles/table.module.css";
import { Metadata } from "next";
import Table from "./components/Table";
import { fetchAllProjects } from "../../lib/fetchIspoData";
import Image from "next/image";
import Link from "next/link";
import isLive from "@/app/lib/isLive";

export const metadata: Metadata = {
  title: "ISPO Tracker",
  description: "Overview of all ISPO's",
};

export default async function ISPOS() {
  const projects = await fetchAllProjects();
  return (
    <main className={styles.main}>
      <Table
        projects={projects.filter((project) =>
          isLive(project.startsAt, project.endsAt)
        )}
      />
      <div className={styles.twitter}>
        <p>Can&apos;t find your favourite ISPO?</p>
        <Link
          target="_blank"
          href={"https://twitter.com/"}
          className={styles.tweet}
        >
          <Image src={"/x.png"} width={16} height={16} alt="x logo" />
          <p>Let us know</p>
        </Link>
      </div>
    </main>
  );
}
