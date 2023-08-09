import Image from 'next/image'
import styles from './landing.module.css'
import DisplaySegment from './components/DisplayISPO'

const dummyData = [
  {
    name: 'Tier Protocol',
    logo: "cardano-logo.svg",
    token: "XYZ",
    categories: ["DeFi", "Lending"],
    allocation: "20%",
    ratio: "0.00006%",
    takesRewards: "yes",
  },
  {
    name: 'Mongosi City',
    logo: "cardano-logo.svg",
    token: "MCI",
    categories: ["Gaming"],
    allocation: "6%",
    ratio: "0.0000012%",
    takesRewards: "no",
  },
  {
    name: 'Verbatum',
    logo: "cardano-logo.svg",
    token: "VTUM",
    categories: ["DeFi", "Dex"],
    allocation: "50%",
    ratio: "0.000135%",
    takesRewards: "yes",
  },
  {
    name: 'Mara Market',
    logo: "cardano-logo.svg",
    token: "MARA",
    categories: ["NFT", "Marketplace"],
    allocation: "10%",
    ratio: "0.0000932%",
    takesRewards: "partial",
  },
  {
    name: 'Zirum',
    logo: "cardano-logo.svg",
    token: "CZIR",
    categories: ["gaming"],
    allocation: "90%",
    ratio: "0.00932%",
    takesRewards: "optional",
  },
]

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles["hero-section"]}>
        <div className={styles["left-hero"]}>
          <h1>YOUR CARDANO ISPO GUIDE</h1>
          <p>We make it easy for you to determine which ISPO is worthy of your delegation.</p>
        </div>
        <div className={styles["right-hero"]}>
          <p>hi</p>
        </div>
      </section>
      <section className={styles["ispo-section"]}>
        {dummyData.map((item, index) => {
          return (
            <DisplaySegment key={index}
            name={item.name}
            logo={"cardano-logo.svg"}
            token={item.token}
            categories={item.categories}
            allocation={item.allocation}
            ratio={item.ratio}
            takesRewards={item.takesRewards}
            />
          )
        })}
          
        
      </section>
    </main>
  )
}
