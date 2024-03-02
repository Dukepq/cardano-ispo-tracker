import styles from "./card.module.css";
import ISPOCard from "./ISPOCard";
import { fetchAllProjects } from "../lib/fetchIspoData";
import isLive from "../lib/isLive";

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
        {ISPOs.filter((ispo) => isLive(ispo.startsAt, ispo.endsAt)).map(
          (ispo, index) => {
            const { featured } = ispo;
            if (maxCards && index + 1 > maxCards) return;
            if (featured) return <ISPOCard {...ispo} key={index} />;
          }
        )}
      </div>
    </section>
  );
}
