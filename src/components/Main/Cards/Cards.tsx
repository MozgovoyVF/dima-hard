import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

export function Cards() {
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };
  return (
    <div className={styles.cards}>
      <ul className={styles.list}>
        <motion.div
          key={1}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          variants={variants}
          viewport={{ once: true }}
          className={styles.card}
        >
          <Image alt="card" height={150} width={100} src="/images/cards/result1.webp" />
          <h4 className={styles.description}>Для достижения спортивных результатов</h4>
        </motion.div>
        <motion.div
          key={2}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          variants={variants}
          viewport={{ once: true }}
          className={styles.card}
        >
          <Image alt="card" height={150} width={100} src="/images/cards/result2.webp" />
          <h4>Для восстановления после травм</h4>
        </motion.div>
        <motion.div
          key={3}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          variants={variants}
          viewport={{ once: true }}
          className={styles.card}
        >
          <Image alt="card" height={150} width={100} src="/images/cards/result3.webp" />
          <h4>Для восстановления после родов</h4>
        </motion.div>
      </ul>
    </div>
  );
}
