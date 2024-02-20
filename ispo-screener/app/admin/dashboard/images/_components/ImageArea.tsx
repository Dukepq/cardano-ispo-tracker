import styles from "../styles/images.module.css";
import fetchImages from "@/app/lib/fetchImages";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Gallery from "../_components/Gallery";
import Pagination from "../_components/Pagination";

type ImageAreaProps = {
  page: number;
  items: number;
};

export default async function ImageArea({ page, items }: ImageAreaProps) {
  const cookie = headers().get("cookie");
  if (typeof cookie !== "string") {
    redirect("/admin");
  }
  const { data, count } = await fetchImages(cookie, page, items);
  return (
    <div className={styles.wrapper}>
      <Gallery logos={data} />
      <Pagination items={items} page={page} max={count} />
    </div>
  );
}
