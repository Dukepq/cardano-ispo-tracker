import styles from "./table.module.css";
import TableRow from "./TableRow";

export default async function Table({ projects }: { projects: ISPO[] }) {
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>Name</th>
            <th>Token</th>
            <th className={styles["center-align"]}>Edit</th>
            <th className={styles["center-align"]}>Delete</th>
            <th rowSpan={2} className={styles["center-align"]}>
              Pool Options
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            return (
              <TableRow
                key={index}
                name={project.name}
                token={project.token}
                live={project.live}
                takesRewards={project.takesRewards}
                maxSupplyExists={project.maxSupplyExists}
                maxSupply={project.maxSupply}
                distributingAmount={project.distributingAmount}
                pools={project.pools}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}
