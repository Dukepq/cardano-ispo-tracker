import styles from "./segment.module.css"
import Link from "next/link"

type Props = {
  name: string
  logo: string
  token: string
  categories: string[]
  allocation: string
  ratio: string
  takesRewards: string
}

export default function DisplaySegment({
  name,
  logo,
  token,
  categories,
  allocation,
  ratio,
  takesRewards
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <img src={logo} alt="ISPO logo" />
        <div>
          <h4>{token}</h4>
          <div className={styles["tags"]}>
            {categories.map((item, index) => {
            if (index < 3) {
              return <span className={styles.tag} key={index}>{item}</span>
            }
            })}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.allocation}>
          <h5>ISPO Allocation</h5>
          <p>{allocation}</p>
        </div>
        <div className={styles.ratio}>
          <div className={styles["question-container"]}>
            <h5>SP/100K</h5>
            <p className={styles.question}><Link href={"/"}>what is this?</Link></p>
          </div>
          
          <p>{ratio}</p>
        </div>
        <div className={styles.rewards}>
          <h5>Takes Rewards</h5>
          <p>{takesRewards}</p>
        </div>
      </div>
    </div>
      
  )
}