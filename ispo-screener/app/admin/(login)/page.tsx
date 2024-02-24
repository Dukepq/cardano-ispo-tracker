"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import base from "@/app/lib/routes";
import styles from "./login.module.css";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface LoginDetails {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [fields, setFields] = useState<LoginDetails>({
    email: "",
    password: "",
  });
  const [failed, setFailed] = useState(false);
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetField = e.target.name;
    setFields((prev) => {
      return { ...prev, [targetField]: e.target.value };
    });
  };
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(base + "/api/users/login", {
      method: "POST",
      body: JSON.stringify(fields),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    if (response.ok) {
      toast.success("logged in!");
      router.push("/admin/dashboard");
    } else {
      if (response.status === 404) {
        toast.error("please enter correct credentials");
      }
      setFields((prev) => ({ ...prev, password: "" }));
      setFailed(() => true);
    }
  };
  return (
    <>
      <div className={styles["wrapper-div"]}>
        <div className={styles["form-wrapper"]}>
          <form onSubmit={login} className={styles.form}>
            <div>
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                onChange={onChangeHandle}
                name="email"
                type="text"
                placeholder="email"
                value={fields.email || ""}
              />
            </div>

            <div>
              <label htmlFor="pw-input">Password</label>
              <input
                id="pw-input"
                onChange={onChangeHandle}
                name="password"
                type="password"
                placeholder="password"
                value={fields.password || ""}
              />
            </div>

            <button>login</button>
            {failed && (
              <p style={{ marginTop: "2rem", color: "red", fontWeight: "600" }}>
                password or email incorrect
              </p>
            )}
          </form>
          <div className={styles.logo}>
            <Link
              href={"/"}
              style={{ display: "flex", alignItems: "center", opacity: "0.5" }}
            >
              <ChevronLeft height={15} />
              <span>back</span>
            </Link>
            <span>C-ISPO</span>
          </div>
        </div>
      </div>
    </>
  );
}
