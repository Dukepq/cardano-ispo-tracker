import Image from 'next/image'
import styles from './landing.module.css'
import DisplaySegment from './components/DisplayISPO'
import About from './components/About'
import React, {useRef} from 'react'


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
  {
    name: 'Cardano Casino',
    logo: "cardano-logo.svg",
    token: "CACA",
    categories: ["gambling"],
    allocation: "1%",
    ratio: "0.00000000932%",
    takesRewards: "no",
  },
]

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles["hero-section"]}>
        <div className={styles["left-hero"]}>
          <h1>FIND YOUR CARDANO ISPO</h1>
          <p>We make it easy for you to determine which ISPO is worthy of your delegation.</p>
        </div>
        <div className={styles["right-hero"]}>
          <img src="/undraw-innovative-placeholder.svg" alt="hero-image" />
        </div>
      </section>
      <section className={styles["ispo-section"]}>
        <div className={styles["ispo-grid-wrapper"]}>
          {dummyData.map((item, index) => {
            if (index < 6) {
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
            }
          })}
        </div>
      </section>
      <About />
    </main>
  )
}
