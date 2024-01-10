"use client";

import base from "@/app/lib/routes";
import { InputHTMLAttributes, SetStateAction } from "react";
import toast from "react-hot-toast";

type UploadImageResponse =
  | { success: true; path: string }
  | { success: false; error?: string };

async function uploadImage(
  file: globalThis.File
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(base + "/api/projects/upload-image", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    body: formData,
  });
  if (!response.ok) {
    toast.error(response.statusText || "Could not upload image");
  } else {
    toast.success("Image uploaded");
  }
  return response.json();
}

type UploadFileInputProps = {
  accept: InputHTMLAttributes<HTMLInputElement>["accept"];
  setPath?: (path: string) => void;
  setIsUploading?: (uploading: SetStateAction<boolean>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default function UploadFileInput({
  accept,
  setPath,
  setIsUploading,
  ...props
}: UploadFileInputProps) {
  return (
    <input
      type="file"
      onChange={async (e) => {
        if (setIsUploading) setIsUploading(true);
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) {
          if (setIsUploading) setIsUploading(false);
          return;
        }
        const data = await uploadImage(file);
        if (!data.success) {
          if (setIsUploading) setIsUploading(false);
          return;
        }
        const { path } = data;
        if (typeof setPath === "function") {
          setPath(path);
        }
        if (setIsUploading) setIsUploading(false);
      }}
      accept={accept}
      {...props}
    />
  );
}
