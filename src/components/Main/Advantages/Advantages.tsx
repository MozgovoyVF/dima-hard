import React from "react";
import styles from "./index.module.scss";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";
import { AdvantagesContent } from "./AdvantagesContent";

export function Advantages() {
  return (
    <section className={styles.section}>
      <div className={styles.fatsecret}>
        <h2 className={styles.title}>Какие преимущества Вы получите во время тренировок под моим руководством?</h2>
        <AdvantagesContent />
      </div>
    </section>
  );
}
