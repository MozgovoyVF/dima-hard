import * as React from "react";
import styles from "./index.module.scss";
import { TrainingCard } from "./TrainingCard/TrainingCard";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";

export function Training() {
  const trainingData = [
    {
      title: "Функциональная тренировка",
      description: "Направлена на улучшение физического состояния мышц-стабилизаторов",
      image: "/images/training/training1.webp",
    },
    {
      title: "Кроссфит тренировка",
      description: "Направлена на всесторонее развитие физических навыков",
      image: "/images/training/training2.webp",
    },
    {
      title: "Силовая тренировка",
      description: "Направлена на развитие силовых качеств с использованием штанг, гантелей и силового оборудования",
      image: "/images/training/training3.webp",
    },
    {
      title: "Кардио-тренировка",
      description: "Для укрепления сердечно-сосудистой системы и увеличения выносливости организма",
      image: "/images/training/training4.webp",
    },
  ];

  return (
    <ParallaxContainer>
      <div id="training" className={styles.training}>
        <h2 className={styles.title}>Составляющие тренировок со мной</h2>
        <div className={styles.content}>
          {trainingData.map((training, index) => (
            <TrainingCard
              key={index}
              title={training.title}
              description={training.description}
              image={training.image}
            />
          ))}
        </div>
      </div>
    </ParallaxContainer>
  );
}
