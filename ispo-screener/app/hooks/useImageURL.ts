"use client";

import { useEffect, useState, DependencyList, SetStateAction } from "react";
import fetchImage from "../lib/fetchImage";

export default function useImageURL(
  path: string | undefined,
  deps: DependencyList
): [string | null, boolean] {
  const [url, setUrl] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  useEffect(() => {
    if (!path) return;
    (async () => {
      try {
        setIsFetching(true);
        const blob = await fetchImage(path);
        const url = URL.createObjectURL(blob);
        setUrl((prev) => {
          if (prev) {
            URL.revokeObjectURL(prev);
          }
          return url;
        });
        setIsFetching(false);
      } catch (err) {
        console.error(err);
        setIsFetching(false);
      }
    })();
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [path, ...deps]);
  return [url, isFetching];
}
