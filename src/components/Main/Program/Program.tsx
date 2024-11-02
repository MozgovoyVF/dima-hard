import * as React from "react";
import styles from "./index.module.scss";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";
import { ProgramBlock } from "./ProgramBlock";

export function Program() {
  return (
    <ParallaxContainer>
      <div id="programs" className={styles.program}>
        <h2 className={styles.title}>Программы тренировок и питания</h2>
        <div className={styles.content}>
          <ProgramBlock
            imageSrc="/images/program/program1.webp"
            title="Индивидуальная программа тренировок"
            items={[
              "Упражнения на каждый тренировочный день",
              "Постановка техники выполнения упражнений",
              "Индивидуальный подбор количества повторений в подходе, количества подходов и времени отдыха между подходами",
              "Отработка типичных ошибок при выполнении упражнений",
            ]}
          />
          <ProgramBlock
            imageSrc="/images/program/program2.webp"
            title="Индивидуальная план питания"
            items={[
              "Общие рекомендации по питанию",
              "Список продуктов и рекомендации по диете",
              "Обучение правильной интерпретации состава продуктов",
              "Обучение правильному подсчету калорийности продуктов",
              "Разработка индивидуального плана применения спортивных добавок, витаминов и минералов",
            ]}
          />
        </div>
      </div>
    </ParallaxContainer>
  );
}
