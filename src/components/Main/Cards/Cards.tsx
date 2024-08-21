import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { MotionValue, motion } from "framer-motion";

interface ICards {
  imageScale: MotionValue<number>;
}

export function Cards({ imageScale }: ICards) {
  return (
    <div className={styles.cards}>
      <ul className={styles.list}>
        <motion.div style={{ scale: imageScale }} className={styles.card}>
          <Image
            alt="card"
            height={150}
            width={100}
            src="/images/cards/result1.jpg"
          />
          <h4>Для достижения спортивных результатов</h4>
        </motion.div>
        <motion.div style={{ scale: imageScale }} className={styles.card}>
          <Image
            alt="card"
            height={150}
            width={100}
            src="/images/cards/result2.jpg"
          />
          <h4>Для восстановления после травм</h4>
        </motion.div>
        <motion.div style={{ scale: imageScale }} className={styles.card}>
          <Image
            alt="card"
            height={150}
            width={100}
            src="/images/cards/result3.jpeg"
          />
          <h4>Для восстановления после родов</h4>
        </motion.div>
      </ul>
    </div>
  );
}
