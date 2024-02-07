import styles from "../(main)/landing.module.css";
import CountAni from "./CountAni";
import { fetchAllProjects } from "../lib/fetchIspoData";

export default async function () {
  const ISPOs = await fetchAllProjects();
  return (
    <div className={styles["right-hero"]}>
      {/* <img src="/undraw-innovative-placeholder.svg" alt="hero-image" /> */}
      <div className={styles["stat-wrapper"]}>
        <span>CURRENTLY LIVE</span>
        <div>
          <CountAni number={ISPOs.length} />
          <span>ISPO&apos;S</span>
        </div>
      </div>
    </div>
  );
}
