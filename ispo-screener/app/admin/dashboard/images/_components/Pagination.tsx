"use client";

import styles from "../styles/pagination.module.css";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Spinner from "@/app/components/Spinner";

type PaginationProps = {
  page: number;
  items: number;
  max: number;
};

export default function Pagination({ page, items, max }: PaginationProps) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  }, [page, items, max]);
  return (
    <>
      <div className={styles["pages-wrapper"]}>
        <Link
          href={{
            pathname: "/admin/dashboard/images",
            query: { page: page > 0 ? page - 1 : 0, items: items },
          }}
          className={styles["pages-button"]}
          onClick={() => {
            if (page > 0) {
              setIsLoading(true);
            }
          }}
        >
          <ChevronLeft />
        </Link>
        <Link
          className={styles["pages-button"]}
          href={{
            pathname: "/admin/dashboard/images",
            query: {
              page: (page + 1) * items < max ? page + 1 : page,
              items: items,
            },
          }}
          onClick={() => {
            if ((page + 1) * items < max) {
              setIsLoading(true);
            }
          }}
        >
          <ChevronRight />
        </Link>
      </div>
      <div className={styles["loading"]}>
        {isLoading && <Spinner css={{ marginTop: "1rem" }} type="circular" />}
      </div>
    </>
  );
}
