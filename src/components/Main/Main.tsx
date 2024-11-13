import React from "react";
import styles from "./index.module.scss";
import { Banner } from "./Banner/Banner";
import { Cards } from "./Cards/Cards";
import { Price } from "./Price/Price";
import { Training } from "./Training/Training";
import { Program } from "./Program/Program";
import { Regals } from "./Regals/Regals";
import { Results } from "./Results/Results";
import { Contact } from "./Contact/Contact";
import { ScrollProgress } from "../ui/scrollProgress/scrollProgress";
import { Advantages } from "./Advantages/Advantages";

export function Main() {
  return (
    <main className={styles.container}>
      <div className={styles.main}>
        <Banner />

        {/* <Cards /> */}

        <Advantages />

        <Price />

        <Training />

        <Program />

        <Regals />

        <Results />

        <Contact />

        <ScrollProgress />
      </div>
    </main>
  );
}
