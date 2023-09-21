"use client";
import { useState } from "react";

export default function Login() {
  const [fields, setFields] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetField = e.target.name;
    setFields((prev) => {
      return { ...prev, [targetField]: e.target.value };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5003/api/users/login", {
      method: "POST",
      body: JSON.stringify(fields),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) console.log(response);
    // set auth context here on successfull login
  };
  return (
    <>
      <h1>login goes here</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "10rem" }}>
        <input
          onChange={onChangeHandle}
          name="email"
          type="text"
          placeholder="email"
          value={fields.email || ""}
        />
        <input
          onChange={onChangeHandle}
          name="password"
          type="text"
          placeholder="password"
          value={fields.password || ""}
        />
        <button>login</button>
      </form>
    </>
  );
}
