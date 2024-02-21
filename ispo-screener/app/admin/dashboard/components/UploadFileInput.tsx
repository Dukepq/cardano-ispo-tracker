"use client";

import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import useImageURL from "@/app/hooks/useImageURL";
import Image from "next/image";
import base from "@/app/lib/routes";
import styles from "../styles/file-input.module.css";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type UploadFileInputProps = {
  accept: InputHTMLAttributes<HTMLInputElement>["accept"];
  setFile: Dispatch<SetStateAction<File | null>>;
  imageURL?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function UploadFileInput({
  accept,
  setFile,
  imageURL,
  ...props
}: UploadFileInputProps) {
  const [newURL, setTempBlob] = useImageURL();
  const [hovering, setHovering] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    if (files.length > 1) {
      toast.error("Can only upload one file");
    }
    const file = files[0];
    if (!file) return;
    if (file.size > 60000) {
      toast.error("File too big");
      return;
    }
    const extension = file.type.split("/")[1].toLowerCase();
    if (!["png", "jpg", "jpeg"].includes(extension)) {
      toast.error("Only accepts .png, .jpg or .jpeg files");
      return;
    }

    setTempBlob(file);
    setFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setHovering(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label
        htmlFor="image-input"
        className={styles["dropzone-select"]}
        onDragLeave={(e) => setHovering(false)}
        onDragEnter={(e) => setHovering(true)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div
          className={styles.dropzone}
          style={hovering ? { border: " 1px solid #536589" } : {}}
        >
          <ImagePlus />
        </div>
      </label>
      <input
        id="image-input"
        type="file"
        onChange={async (e) => {
          e.preventDefault();
          const files = e.target.files;
          handleFiles(files);
        }}
        accept={accept}
        {...props}
        style={{ display: "none" }}
      />

      {imageURL &&
        (newURL ? (
          <div className={styles.preview}>
            <Image src={newURL} width={100} height={100} alt="logo" />
          </div>
        ) : (
          <div className={styles.preview}>
            <Image src={base + imageURL} width={100} height={100} alt="logo" />
          </div>
        ))}
    </div>
  );
}
