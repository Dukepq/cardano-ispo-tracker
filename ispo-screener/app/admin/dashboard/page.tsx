import { redirect } from "next/navigation";
import { headers } from "next/headers";
import styles from "./dashboard.module.css";
import Table from "./components/Table";
import isRole from "@/app/lib/isRole";
import { fetchAllProjects } from "@/app/lib/fetchIspoData";
import PageHeader from "./components/PageHeader";

export default async function Dashboard() {
  const cookie = headers().get("cookie");
  if (typeof cookie !== "string") {
    redirect("/admin");
  }
  const isAdmin = await isRole(cookie, ["ADMIN", "EDITOR"]);
  if (!isAdmin) {
    redirect("/admin");
  }
  const projects = await fetchAllProjects(0);

  return (
    <>
      <PageHeader>
        <h2 className={styles.title}>Project Management</h2>
      </PageHeader>
      <div className={styles["table-wrapper"]}>
        <Table projects={projects} />
      </div>
    </>
  );
}
