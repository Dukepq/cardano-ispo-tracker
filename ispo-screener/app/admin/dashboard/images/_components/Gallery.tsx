"use client";
import styles from "../styles/images.module.css";
import deleteImage from "@/app/lib/deleteImage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import GalleryImage from "./GalleryImage";
import DeleteDialogWrap from "../../../components/DeleteDialogWrap";

type GalleryProps = {
  logos: Logo[];
};

export default function Gallery({ logos }: GalleryProps) {
  const [_logos, _setLogos] = useState<Logo[]>(logos);
  useEffect(() => {
    _setLogos(logos);
  }, [logos]);
  const router = useRouter();
  return (
    <div className={styles["gallery-wrapper"]}>
      {_logos.map((logo) => {
        return (
          <DeleteDialogWrap
            key={logo.filename}
            title={"Delete image?"}
            handleDelete={async () => {
              const deleted = await deleteImage(logo.filename);
              if (!deleted.success) {
                toast.error("Failed to delete image");
                return;
              }
              _setLogos((prev) => {
                return prev.filter(
                  (entry) => entry.filename !== deleted.deleted
                );
              });
              toast.success("Image deleted");
              router.refresh();
            }}
          >
            {
              <GalleryImage
                filename={logo.filename}
                url={logo.url}
                projectId={logo.projectId}
              />
            }
          </DeleteDialogWrap>
        );
      })}
    </div>
  );
}
