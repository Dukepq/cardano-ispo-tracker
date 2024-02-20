"use client";

import base from "@/app/lib/routes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "../styles/images.module.css";
import { useState } from "react";
import deleteImage from "@/app/lib/deleteImage";
import { Trash } from "../../../../../node_modules/lucide-react";

type GalleryImageProps = {
  filename: string;
  url: string;
};

export default function GalleryImage({ filename, url }: GalleryImageProps) {
  return (
    <div className={styles["logo-wrapper"]}>
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
