"use client";

import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import useImageURL from "@/app/hooks/useImageURL";
import Image from "next/image";
import base from "@/app/lib/routes";

type UploadFileInputProps = {
  accept: InputHTMLAttributes<HTMLInputElement>["accept"];
  setFile: Dispatch<SetStateAction<File | null>>;
  fetchingImage: boolean;
  imageURL?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function UploadFileInput({
  accept,
  setFile,
  imageURL,
  fetchingImage,
  ...props
}: UploadFileInputProps) {
  const [newURL, setTempBlob] = useImageURL();
  return (
    <div style={{ margin: "1rem 0" }}>
      <label>
        <input
          type="file"
          onChange={async (e) => {
            e.preventDefault();
            const file = e.target.files?.[0];
            if (file) {
              setTempBlob(file);
              setFile(file);
            }
          }}
          accept={accept}
          {...props}
        />
        {imageURL &&
          (newURL ? (
            <Image src={newURL} width={100} height={100} alt="logo" />
          ) : (
            <Image src={base + imageURL} width={100} height={100} alt="logo" />
          ))}
      </label>
    </div>
  );
}
