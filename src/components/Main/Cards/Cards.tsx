import React from "react";
import styles from "./index.module.scss";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";
import { CardsContent } from "./CardsContent";

export function Cards() {
  return (
    <ParallaxContainer>
      <div className={styles.cards}>
        <ul className={styles.list}>
          <CardsContent />
        </ul>
      </div>
    </ParallaxContainer>
  );
}
