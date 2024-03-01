import styles from "./landing.module.css";
import React, { Suspense } from "react";
import Link from "next/link";
import CardCollection from "../components/CardCollection";
import LoadingCardCollection from "../components/LoadingCardCollection";
import ServerCarouselWrapper from "../components/serverCarouselWrapper";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles["hero-section"]}>
          <div className={styles["left-hero"]}>
            <h1>Find Your Cardano ISPO</h1>
            <p>
              We try to make it easier for you to determine which ISPO is worth
              your delegation.
            </p>
            <Link draggable={false} href={"/ispos"}>
              <button className={styles["ispo-button"]}>ISPO&apos;S</button>
            </Link>
          </div>
          <div className={styles["right-hero"]}>
            <Suspense>
              <ServerCarouselWrapper />
            </Suspense>
          </div>
        </section>
        <Suspense fallback={<LoadingCardCollection />}>
          <CardCollection />
        </Suspense>
      </main>
    </>
  );
}
