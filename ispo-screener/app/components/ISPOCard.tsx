import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import truncateString from "../lib/truncateString";

type ISPOCardProps = ISPO & {};

export default function ISPOCard({
  name,
  token,
  categories,
  description,
}: ISPOCardProps) {
  return (
    <div className={styles.wrapper}>
      <header className={styles["top-flex"]}>
        <Image
          width={25}
          height={25}
          alt="logo"
          src={"/link.png"}
          style={{ filter: "invert(1)" }}
        />
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
        <Link href={"/ispos/token"}>Read more &rarr;</Link>
      </div>
    </div>
  );
}
