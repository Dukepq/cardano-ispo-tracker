import styles from "./landing.module.css";
import React, { Suspense } from "react";
import Link from "next/link";
import CardCollection from "../components/CardCollection";
import LoadingCardCollection from "../components/LoadingCardCollection";
import Carousel from "../components/Carousel";
import { fetchAllProjects } from "../lib/fetchIspoData";
import ISPOCard from "../components/ISPOCard";

export default async function Home() {
  const ISPOs = await fetchAllProjects();
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
            <Link href={"/ispos"}>
              <button className={styles["ispo-button"]}>See ISPO&apos;S</button>
            </Link>
          </div>
          <div className={styles["right-hero"]}>
            <Carousel>
              {ISPOs.map((ispo, index) => {
                if (index > 10) return;
                return <ISPOCard {...ispo} key={ispo.token} />;
              })}
            </Carousel>
          </div>
        </section>
        <Suspense fallback={<LoadingCardCollection />}>
          <CardCollection />
        </Suspense>
      </main>
    </>
  );
}
