"use client";

import base from "@/app/lib/routes";
import Image from "next/image";
import styles from "../styles/images.module.css";
import { Link2 } from "lucide-react";

type GalleryImageProps = {
  filename: string;
  url: string;
  projectId: string | null;
};

export default function GalleryImage({
  filename,
  url,
  projectId,
}: GalleryImageProps) {
  return (
    <div className={styles["logo-wrapper"]}>
      {projectId && <Link2 className={styles["link-icon"]} />}
      <Image
        className={styles.logo}
        src={base + url}
        width={100}
        height={100}
        alt="logo"
      />
    </div>
  );
}
