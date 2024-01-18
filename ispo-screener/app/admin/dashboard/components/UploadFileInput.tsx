"use client";

import { useState, Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import Image from "next/image";

type UploadFileInputProps = {
  accept: InputHTMLAttributes<HTMLInputElement>["accept"];
  imageHook: [string | null, Dispatch<SetStateAction<string | null>>];
  setFile: Dispatch<SetStateAction<File | null>>;
  fetchingImage: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function UploadFileInput({
  accept,
  imageHook,
  setFile,
  fetchingImage,
  ...props
}: UploadFileInputProps) {
  const [imageURL, setImageURL] = imageHook;
  return (
    <div style={{ margin: "1rem 0" }}>
      <label>
        <input
          type="file"
          onChange={async (e) => {
            e.preventDefault();
            const file = e.target.files?.[0];
            if (file) {
              setFile(() => file);
              setImageURL((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return URL.createObjectURL(file);
              });
            }
          }}
          accept={accept}
          {...props}
        />
        {imageURL && (
          <Image alt="logo" src={imageURL} width={100} height={100} />
        )}
      </label>
    </div>
  );
}
