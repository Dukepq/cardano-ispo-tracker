import styles from "./spinner.module.css";

export default function Spinner({ css }: { css?: React.CSSProperties }) {
  return (
    <div
      style={Object.assign(css || {}, {
        display: "grid",
        placeContent: "center",
        pointerEvents: "none",
      })}
    >
      <span className={styles.spinner}></span>
    </div>
  );
}
