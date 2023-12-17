"use client";

import base from "../../lib/routes";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Logout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const logout = async () => {
    const response = await fetch(base + "/api/users/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("logout failed");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div onClick={logout} style={{ cursor: "pointer", marginTop: "auto" }}>
        <Image
          style={{
            maxWidth: "20px",
            maxHeight: "20px",
            marginRight: "0.75rem",
          }}
          alt="logout image"
          src={"/power-button.svg"}
          width={25}
          height={25}
        />
        <p>{children}</p>
      </div>
    </>
  );
}
