import styles from "./landing.module.css";
import About from "../components/About";
import React, { Suspense } from "react";
import Link from "next/link";
import CountAni from "../components/CountAni";
import CardCollection from "../components/CardCollection";
import LoadingCardCollection from "../components/LoadingCardCollection";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles["hero-section"]}>
          <div className={styles["left-hero"]}>
            <h1>FIND YOUR CARDANO ISPO</h1>
            <p>
              We try to make it easy for you to determine which ISPO is worthy
              of your delegation.
            </p>
            <Link href={"/ispos"}>
              <button className={styles["ispo-button"]}>See ISPO&apos;S</button>
            </Link>
          </div>
          <div className={styles["right-hero"]}>
            {/* <img src="/undraw-innovative-placeholder.svg" alt="hero-image" /> */}
            <div className={styles["stat-wrapper"]}>
              <span>CURRENTLY LIVE</span>
              <div>
                <CountAni number={18} />
                <span>ISPO&apos;S</span>
              </div>
            </div>
          </div>
        </section>
        <h2>Featured</h2>
        <Suspense fallback={<LoadingCardCollection />}>
          <CardCollection />
        </Suspense>
        <About />
      </main>
    </>
  );
}
