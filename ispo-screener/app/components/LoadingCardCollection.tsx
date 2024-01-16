import styles from "./card.module.css";

const placeHolderStyle = {
  width: "20%",
  height: "1rem",
  display: "block",
  borderRadius: "0.2rem",
};

export default function LoadingCardCollection({ cards }: { cards?: number }) {
  return (
    <section className={styles["ispo-section"]}>
      <div className={styles["ispo-grid-wrapper"]}>
        {[...Array(cards || 12).keys()].map((_, index) => (
          <div key={index} className={`${styles.wrapper}`}>
            <header className={styles["top-flex"]}>
              <span
                className={styles.placeholder}
                style={{
                  ...placeHolderStyle,
                  width: "60%",
                  height: "2rem",
                }}
              ></span>
            </header>
            <ul className={styles.categories}>
              <span
                style={{
                  ...placeHolderStyle,
                  height: "1.2rem",
                  display: "inline-block",
                  marginRight: "0.5rem",
                }}
                className={styles.placeholder}
              ></span>
              <span
                style={{
                  ...placeHolderStyle,
                  height: "1.2rem",
                  display: "inline-block",
                }}
                className={styles.placeholder}
              ></span>
            </ul>
            <p
              className={styles.description}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span
                className={styles.placeholder}
                style={{
                  ...placeHolderStyle,
                  width: "80%",
                  height: "0.6rem",
                }}
              ></span>
              <span
                className={styles.placeholder}
                style={{
                  ...placeHolderStyle,
                  width: "80%",
                  height: "0.6rem",
                }}
              ></span>
              <span
                className={styles.placeholder}
                style={{
                  ...placeHolderStyle,
                  width: "30%",
                  height: "0.6rem",
                }}
              ></span>
            </p>
            <div className={styles["read-more-wrapper"]}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
