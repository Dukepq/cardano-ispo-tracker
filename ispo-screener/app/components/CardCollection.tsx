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
      <h2>Featured</h2>
      <div className={styles["ispo-grid-wrapper"]}>
        {ISPOs.filter((ispo) => ispo.live).map((ispo, index) => {
          const { featured } = ispo;
          if (maxCards && index + 1 > maxCards) return;
          if (featured) return <ISPOCard {...ispo} key={index} />;
        })}
      </div>
    </section>
  );
}
