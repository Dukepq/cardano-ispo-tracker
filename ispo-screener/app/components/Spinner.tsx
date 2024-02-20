import styles from "./spinner.module.css";

export default function Spinner({
  css,
  type,
}: {
  css?: React.CSSProperties;
  type?: "circular" | "dots";
}) {
  return (
    <div
      style={Object.assign(css || {}, {
        display: "grid",
        placeContent: "center",
        pointerEvents: "none",
      })}
    >
      <span
        className={
          type === "circular" ? styles.spinner : styles["spinner-dots"]
        }
      ></span>
    </div>
  );
}
