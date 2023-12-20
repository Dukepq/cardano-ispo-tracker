import base from "./routes";
import toast from "react-hot-toast";

export default async function (ticker: string) {
  const response = await fetch(base + "/api/pools", {
    method: "DELETE",
    credentials: "include",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ticker }),
  });
  if (!response.ok) {
    toast.error("could not delete pool", {
      style: {
        backgroundColor: "red",
        color: "white",
      },
    });
    throw new Error("failed to delete pool: " + response.status);
  } else {
    toast.success("deleted pool", {
      style: {
        backgroundColor: "lightgreen",
      },
    });
  }
  return response;
}
