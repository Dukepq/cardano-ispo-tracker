"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import truncateString from "../lib/truncateString";
import useImageURL from "../hooks/useImageURL";
import Spinner from "./Spinner";

type ISPOCardProps = ISPO & {};

export default function ISPOCard({
  name,
  token,
  categories,
  description,
  logoImageURL,
}: ISPOCardProps) {
  const [url, isFetching] = useImageURL(logoImageURL, []);
  return (
    <div className={styles["card-wrapper"]}>
      <header className={styles["top-flex"]}>
        {!!url ? (
          <Image width={38} height={38} alt="logo" src={url} />
        ) : (
          <div style={{ height: 38 }}></div>
        )}
        <span>{name}</span>
      </header>
      <ul className={styles.categories}>
        {categories.map((category, index) => (
          <span className={styles.category} key={index}>
            {category.name}
          </span>
        ))}
      </ul>
      <p className={styles.description}>
        {truncateString(description || "", 150)}
      </p>
      <div className={styles["read-more-wrapper"]}>
        <Link href={`/ispos/${token}`}>Read more &rarr;</Link>
      </div>
    </div>
  );
}
