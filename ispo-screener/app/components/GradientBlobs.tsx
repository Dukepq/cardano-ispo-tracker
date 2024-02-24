"use client";

import styles from "./gradient-blobs.module.css";

type GradientBlobsProps = {
  children: React.ReactNode;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  blobSize?: string;
};

export default function GradientBlobs({
  children,
  firstColor = "18, 63, 255",
  secondColor = "221, 74, 255",
  thirdColor = "180, 150, 255",
  fourthColor = "50, 50, 222",
  fifthColor = "0, 0, 255",
  blobSize = "80vw",
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
      <div style={{ backdropFilter: "blur(60px)" }}>{children}</div>
      <div className={styles["gradients-container"]}>
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
        <div
          style={{
            background: `radial-gradient(circle, rgb(${fourthColor}), rgb(${fourthColor}, 0) 50%)`,
            width: blobSize,
            height: blobSize,
          }}
          className={`${styles.blob} ${styles["blob-4"]}`}
        ></div>
        <div
          style={{
            background: `radial-gradient(circle, rgb(${fifthColor}), rgb(${fifthColor}, 0) 50%)`,
            width: blobSize,
            height: blobSize,
          }}
          className={`${styles.blob} ${styles["blob-5"]}`}
        ></div>
      </div>
    </div>
  );
}
