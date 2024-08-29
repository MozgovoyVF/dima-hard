import * as React from "react";
import styles from "./index.module.scss";
import { FaMedal } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";
import { PiNotepadBold } from "react-icons/pi";
import { motion } from "framer-motion";

export function Banner() {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  return (
    <motion.div
      key="main"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "easi-in-out", duration: 0.3 }}
      id="banner"
      className={styles.container}
    >
      <div className={styles.banner}>
        <h1 className={styles.title}>Ты заслуживаешь здорового и сильного тела!</h1>
        <ul className={styles.promise}>
          <li className={styles.me}>
            <GiBiceps />
            <span>Видимый результат уже через 4 месяца тренировок</span>
          </li>
          <li className={styles.me}>
            <FaMedal />
            <span>Сертифицированный тренер по физической подготовке (фитнес-тренер) с большим опытом</span>
          </li>
          <li className={styles.me}>
            <PiNotepadBold />
            <span>Специалист по здоровому спортивному питанию к Вашим услугам</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
