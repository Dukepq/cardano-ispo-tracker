"use client";

import { useState } from "react";
import UserTableRow from "./userTableRow";
import styles from "../../../dashboard/components/table.module.css";
import SearchBar from "../../components/SearchBar";
import AddUser from "./AddUser";
import Spinner from "@/app/components/Spinner";

export default function UserTable({ users }: { users: UserResponse[] }) {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <div className={styles["action-bar"]}>
        <SearchBar setState={setSearch} />
        <AddUser />
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>Name</th>
            <th style={{ width: "15rem" }}>Email</th>
            <th>Role</th>
            <th style={{ width: "8rem" }}>Created</th>
            <th style={{ minWidth: "8rem" }} className={styles["center-align"]}>
              Delete User
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              if (search.length < 3) return true;
              return user.email.includes(search) || user.name.includes(search);
            })
            .map((user, index) => {
              const { name, role, email, updatedAt, createdAt } = user;
              return (
                <UserTableRow
                  key={index}
                  name={name}
                  role={role}
                  email={email}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
}
