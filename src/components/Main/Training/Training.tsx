import * as React from "react";
import styles from "./index.module.scss";
import { TrainingCard } from "./TrainingCard/TrainingCard";

export function Training() {
  return (
    <div id="training" className={styles.training}>
      <h2 className={styles.title}>Составляющие тренировок со мной</h2>
      <div className={styles.content}>
        <TrainingCard
          title="Функциональная тренировка"
          description="Направлена на улучшение физического состояния мышц-стабилизаторов"
          image="/images/training/training1.webp"
        />
        <TrainingCard
          title="Кроссфит тренировка"
          description="Направлена на всесторонее развития физических навыков"
          image="/images/training/training2.webp"
        />
        <TrainingCard
          title="Силовая тренировка"
          description="Направлена на развитие силовых качеств с использованием штанг, гантелей и силового оборудования"
          image="/images/training/training3.webp"
        />
        <TrainingCard
          title="Кардио-тренировка"
          description="Для укрепления сердечно-сосудистой системы и увеличения выносливости организама"
          image="/images/training/training4.webp"
        />
      </div>
    </div>
  );
}
