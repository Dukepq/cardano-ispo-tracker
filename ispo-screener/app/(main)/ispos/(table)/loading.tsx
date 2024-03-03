import styles from "./styles/table.module.css";
import TableHead from "./components/TableHead";

export default function loading() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <TableHead desc={undefined} />
          <tbody>
            {[...Array(18).keys()].map((value, index) => {
              return (
                <tr key={index} className={styles["skeleton"]}>
                  <td colSpan={7}></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
