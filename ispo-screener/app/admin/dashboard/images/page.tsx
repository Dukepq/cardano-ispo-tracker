import styles from "../images/styles/images.module.css";
import PageHeader from "../components/PageHeader";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import isRole from "@/app/lib/isRole";
import forceNum from "@/app/lib/forceNum";
import ImageArea from "./_components/ImageArea";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookie = headers().get("cookie");
  if (typeof cookie !== "string") {
    redirect("/admin");
  }
  const isAuth = await isRole(cookie, ["ADMIN", "EDITOR"]);
  if (!isAuth) {
    redirect("/admin");
  }
  const page = forceNum(searchParams.page, 0);
  const items = forceNum(searchParams.items, 50);
  return (
    <>
      <PageHeader>
        <h2 className={styles.title}>Images</h2>
      </PageHeader>
      <ImageArea page={page} items={items} />
    </>
  );
}
