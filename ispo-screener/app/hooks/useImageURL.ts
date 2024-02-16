"use client";

import { useEffect, useState, SetStateAction, Dispatch } from "react";

export default function useImageURL(): [
  string,
  Dispatch<SetStateAction<File | null>>
] {
  const [url, setUrl] = useState<string>("");
  const [blob, setBlob] = useState<File | null>(null);
  useEffect(() => {
    if (!blob) return;
    (async () => {
      const url = URL.createObjectURL(blob);
      setUrl((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev);
        }
        return url;
      });
    })();
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [blob]);
  return [url, setBlob];
}
