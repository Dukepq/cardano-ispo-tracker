import base from "./routes";
import toast from "react-hot-toast";
import pruneFalsy from "./pruneFalsy";

export default async function onSubmitHandle(
  e: React.FormEvent<HTMLFormElement>,
  fields: Partial<Pool>
) {
  e.preventDefault();
  const prunedFields = pruneFalsy(fields);
  const response = await fetch(`${base}/api/pools`, {
    method: "PUT",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticker: prunedFields.ticker,
      pool: prunedFields,
    }),
  });
  if (!response.ok) {
    toast.error("error");
    throw new Error("failed to submit: " + response.status);
  } else {
    toast.success("updated");
  }
}
