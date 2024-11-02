"use client";

import * as React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const cardsData = [
  {
    id: 1,
    src: "/images/cards/result1.webp",
    description: "Для достижения спортивных результатов",
    duration: 0.5,
  },
  {
    id: 2,
    src: "/images/cards/result2.webp",
    description: "Для восстановления после травм",
    duration: 0.3,
  },
  {
    id: 3,
    src: "/images/cards/result3.webp",
    description: "Для восстановления после родов",
    duration: 0.3,
  },
];

export function CardsContent() {
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  return (
    <>
      {cardsData.map((card) => (
        <motion.div
          key={card.id}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: card.duration }}
          variants={variants}
          viewport={{ once: true }}
          className={styles.card}
        >
          <Image alt="card" height={150} width={100} src={card.src} />
          <h4 className={styles.description}>{card.description}</h4>
        </motion.div>
      ))}
    </>
  );
}
