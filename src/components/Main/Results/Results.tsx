import * as React from "react";
import styles from "./index.module.scss";
import ResultsCarousel from "./ResultsCarousel/ResultsCarousel";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";
import { ResultsModal } from "./ResultsModal";

export function Results() {
  return (
    <ParallaxContainer>
      <div id="results" className={styles.results}>
        <h2 className={styles.title}>Результаты работы со мной</h2>
        <ResultsCarousel />
        <ResultsModal />
      </div>
    </ParallaxContainer>
  );
}
