import React from "react";
import styles from "./index.module.scss";
import { Banner } from "./Banner/Banner";
import { Cards } from "./Cards/Cards";
import { Price } from "./Price/Price";

export function Main() {
  return (
    <div className={styles.main}>
      <Banner />
      <Cards />
      <Price />
    </div>
  );
}
