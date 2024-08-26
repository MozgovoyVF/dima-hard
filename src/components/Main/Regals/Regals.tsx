import * as React from "react";
import styles from "./index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export function Regals() {
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -300 },
  };
  return (
    <AnimatePresence mode="wait">
      <div id="about" className={styles.regals}>
        <h2 className={styles.title}>Обо мне</h2>
        <Image
          src={"/images/about/about.JPG"}
          alt="about photo"
          width={200}
          height={100}
        />
        <div className={styles.content}>
          <ul className={styles.list}>
            <motion.li
              key={"regals1"}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.3 }}
              variants={variants}
              viewport={{ once: true }}
              className={styles.item}
            >
              <Image
                width={15}
                height={15}
                alt="svg image"
                src={"/images/about/experience.svg"}
              />
              <span className={styles.text}>Опыт работы свыше 3-х лет</span>
            </motion.li>
            <motion.li
              key={"regals2"}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.3, delay: 0.2 }}
              variants={variants}
              viewport={{ once: true }}
              className={styles.item}
            >
              <Image
                width={15}
                height={15}
                alt="svg image"
                src={"/images/about/notepad.svg"}
              />
              <span className={styles.text}>
                Обладаю экспертностью в области физиологии и анатомии
              </span>
            </motion.li>
            <motion.li
              key={"regals3"}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.3, delay: 0.4 }}
              variants={variants}
              viewport={{ once: true }}
              className={styles.item}
            >
              <Image
                width={15}
                height={15}
                alt="svg image"
                src={"/images/about/diploma.svg"}
              />
              <span className={styles.text}>Сертифицированный тренер</span>
            </motion.li>
          </ul>
        </div>
      </div>
    </AnimatePresence>
  );
}
