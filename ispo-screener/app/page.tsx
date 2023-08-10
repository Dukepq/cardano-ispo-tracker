import Image from 'next/image'
import styles from './landing.module.css'
import DisplaySegment from './components/DisplayISPO'
import About from './components/About'
import React, {useRef} from 'react'
import ScrollButton from './components/ScrollButton'
import Link from 'next/link'
import { dummyData } from './dummyData'
import Stats from './components/Stats'
import CountAni from './components/CountAni'

export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <section className={styles["hero-section"]}>
        <div className={styles["left-hero"]}>
          <h1>FIND YOUR CARDANO ISPO</h1>
          <p>We make it easy for you to determine which ISPO is worthy of your delegation.</p>
          <Link href={"/ispos"}><button className={styles["ispo-button"]}>SEE ISPO&apos;S</button></Link>
        </div>
        <div className={styles["right-hero"]}>
          {/* <img src="/undraw-innovative-placeholder.svg" alt="hero-image" /> */}
          <h3>
            <span>currently tracking</span>
            <CountAni number={18} />
            <span>ISPO&apos;S</span>
          </h3>
        </div>
      </section>
      <section className={styles["ispo-section"]}>
        <div className={styles["ispo-grid-wrapper"]}>
          {dummyData.map((item, index) => {
            if (index < 6) {
              return (
                <DisplaySegment key={index}
                website={"/"}
                name={item.name}
                description={item.description}
                logo={"cardano-logo.svg"}
                token={item.token}
                categories={item.categories}
                allocation={item.allocation}
                ratio={item.ratio}
                takesRewards={item.takesRewards}
                live={item.live}
                status="upcoming"
                />
              )
            }
          })}
        </div>
      </section>
      <About />
    </main>
    </>
  )
}