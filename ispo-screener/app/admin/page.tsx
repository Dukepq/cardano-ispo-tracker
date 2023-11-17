"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import base from "@/app/lib/routes";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [fields, setFields] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
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
      console.log(response);
      router.push("/admin/dashboard");
    } else {
      console.log("something went wrong");
      setFields((prev) => {
        return { ...prev, password: "" };
      });
      setFailed(() => true);
    }
  };
  return (
    <>
      <div className={styles["wrapper-div"]}>
        <div className={styles["form-wrapper"]}>
          <div>
            <div
              style={{
                width: "35px",
                height: "35px",
                border: "2px solid white",
                borderRadius: "100%",
              }}
            ></div>
          </div>
          <div>
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
                <p
                  style={{ marginTop: "2rem", color: "red", fontWeight: "600" }}
                >
                  password or email incorrect
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
