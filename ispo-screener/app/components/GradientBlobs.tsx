import styles from "./gradient-blobs.module.css";

type GradientBlobsProps = {
  children: React.ReactNode;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  sixthColor?: string;
  blobSize?: string;
  firstBackgroundColor?: string;
  secondBackgroundColor?: string;
};

export default function GradientBlobs({
  children,
  firstColor = "0, 0, 180",
  secondColor = "0, 0, 180",
  thirdColor = "80, 80, 180",
  fourthColor = "0, 0, 180",
  fifthColor = "0, 0, 180",
  sixthColor = "0, 0, 180",
  blobSize = "calc(25vw + 1100px)",
  firstBackgroundColor,
  secondBackgroundColor,
}: GradientBlobsProps) {
  return (
    <div className={styles.container}>
      <svg style={{ display: "none" }}>
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div style={{ backdropFilter: "blur(38px)" }}>{children}</div>
      <div
        className={styles["gradients-container"]}
        style={
          firstBackgroundColor && secondBackgroundColor
            ? {
                background: `linear-gradient(-45deg, rgba(${firstBackgroundColor},0.25) 0%, rgba(${secondBackgroundColor}, 0.0) 100%)`,
              }
            : {}
        }
      >
        <div
          style={{
            background: `radial-gradient(circle, rgb(${firstColor}), rgb(${firstColor}, 0) 50%)`,
            width: blobSize,
            height: blobSize,
          }}
          className={`${styles.blob} ${styles["blob-1"]}`}
        ></div>
        <div
          style={{
            background: `radial-gradient(circle, rgb(${secondColor}), rgb(${secondColor}, 0) 50%)`,
            width: blobSize,
            height: blobSize,
          }}
          className={`${styles.blob} ${styles["blob-2"]}`}
        ></div>
        <div
          style={{
            background: `radial-gradient(circle, rgb(${thirdColor}), rgb(${thirdColor}, 0) 50%)`,
            width: blobSize,
            height: blobSize,
          }}
          className={`${styles.blob} ${styles["blob-3"]}`}
        ></div>
        {/* <div
          style={{
            background: `radial-gradient(circle, rgb(${fourthColor}), rgb(${fourthColor}, 0) 50%)`,
            width: blobSize,
            height: blobSize,
          }}
          className={`${styles.blob} ${styles["blob-4"]}`}
        ></div> */}
        <div
          style={{
            background: `radial-gradient(circle, rgb(${fifthColor}), rgb(${fifthColor}, 0) 50%)`,
            width: blobSize,
            height: blobSize,
          }}
          className={`${styles.blob} ${styles["blob-5"]}`}
        ></div>
        <div
          style={{
            background: `radial-gradient(circle, rgb(${sixthColor}), rgb(${sixthColor}, 0) 50%)`,
            width: blobSize,
            height: blobSize,
          }}
          className={`${styles.blob} ${styles["blob-6"]}`}
        ></div>
      </div>
    </div>
  );
}
