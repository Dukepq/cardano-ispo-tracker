"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import truncateString from "../lib/truncateString";
import base from "../lib/routes";
import { MoveRight } from "lucide-react";

type ISPOCardProps = ISPO & {};

export default function ISPOCard({
  name,
  token,
  categories,
  description,
  logoImageURL,
}: ISPOCardProps) {
  return (
    <div className={styles["card-wrapper"]}>
      <header className={styles["top-flex"]}>
        {!!logoImageURL && (
          <img
            src={logoImageURL}
            alt="logo"
            width={38}
            height={38}
            style={{ borderRadius: "0.25rem" }}
          />
        )}
        <span style={{ fontWeight: "500" }}>{name}</span>
      </header>
      <ul className={styles.categories}>
        {categories.map((category, index) => (
          <li className={styles.category} key={index}>
            {category.name}
          </li>
        ))}
      </ul>
      <p className={styles.description}>
        {truncateString(description || "", 180)}
      </p>
      <div className={styles["read-more-wrapper"]}>
        <Link draggable={false} href={`/ispos/${token}`}>
          <span>Read more</span>
        </Link>
      </div>
    </div>
  );
}
