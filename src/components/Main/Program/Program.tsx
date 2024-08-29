import * as React from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";

export function Program() {
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -300 },
  };
  return (
    <div id="programs" className={styles.program}>
      <h2 className={styles.title}>Программы тренировок и питания</h2>
      <div className={styles.content}>
        <motion.div
          key={"program1"}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          variants={variants}
          viewport={{ once: true }}
          className={styles.block}
        >
          <div className={styles.heading}>
            <Image alt="program" src="/images/program/program1.webp" width={100} height={50} />
            <h4 className={styles.subtitle}>Индивидуальная программа тренировок</h4>
          </div>
          <div className={styles.info}>
            <ul className={styles.list}>
              <li className={styles.item}>Упражнения на каждый тренировочный день</li>
              <li className={styles.item}>Постановка техники выполнения упражнений</li>
              <li className={styles.item}>
                Индивидуальный подбор количества повторений в подходе, количества подходов и времени отдыха между
                подходами
              </li>
              <li className={styles.item}>Отработка типичных ошибок при выполнении упражнений</li>
            </ul>
          </div>
        </motion.div>
        <motion.div
          key={"program2"}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          variants={variants}
          viewport={{ once: true }}
          className={styles.block}
        >
          <div className={styles.heading}>
            <Image alt="program" src="/images/program/program2.jpg" width={100} height={50} />
            <h4 className={styles.subtitle}>Индивидуальная план питания</h4>
          </div>
          <div className={styles.info}>
            <ul className={styles.list}>
              <li className={styles.item}>Общие рекомендации по питанию</li>
              <li className={styles.item}>Список продуктов и рекомендации по диете</li>
              <li className={styles.item}>Обучение правильной интерпретации состава продуктов</li>
              <li className={styles.item}>Обучение правильному подсчету калорийности продуктов</li>
              <li className={styles.item}>
                Разработка индивидуального плана применения спортивных добавок, витаминов и минералов
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
