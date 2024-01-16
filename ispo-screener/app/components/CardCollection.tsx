import styles from "./card.module.css";
import ISPOCard from "./ISPOCard";
import { fetchAllProjects } from "../lib/fetchIspoData";

export default async function CardCollection({
  maxCards,
}: {
  maxCards?: number;
}) {
  const ISPOs = await fetchAllProjects();
  return (
    <section className={styles["ispo-section"]}>
      <div className={styles["ispo-grid-wrapper"]}>
        {ISPOs.map((ispo, index) => {
          if (maxCards && index + 1 > maxCards) return;
          return <ISPOCard {...ispo} key={index} />;
        })}
      </div>
    </section>
  );
}
