"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

type AmountSelectProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function AmountSelect(attributes: AmountSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ItemsParam = searchParams.get("Items") ?? "";
  const pageParam = searchParams.get("page") ?? "";
  const [Items, setItems] = useState<string>(ItemsParam);
  console.log(Items);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const query = "page=" + pageParam + "&items=" + Items;
        router.replace("images?" + query);
      }}
    >
      <input
        type="text"
        value={Items}
        onChange={(e) => {
          const input = e.target.value;
          const decimalRegex = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
          if (!decimalRegex.test(input) && input !== "") return;
          setItems(() => {
            return input;
          });
        }}
        {...attributes}
      />
    </form>
  );
}
