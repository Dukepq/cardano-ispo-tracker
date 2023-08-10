import styles from "./loading.module.css"

export default function Loading() {
  return (
    <div style={{display: "grid", placeContent: "center", height: "100vh"}}>
      <div className={styles.spinner}></div>
    </div>
  )
}