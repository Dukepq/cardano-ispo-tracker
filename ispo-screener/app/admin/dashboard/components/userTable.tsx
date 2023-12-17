import UserTableRow from "./userTableRow";
import styles from "./table.module.css";

export default function UserTable({ users }: { users: UserResponse[] }) {
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>role</th>
            <th>created</th>
            <th>updated</th>
            <th className={styles["center-align"]}>delete user</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { name, role, email, updatedAt, createdAt } = user;
            return (
              <UserTableRow
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
