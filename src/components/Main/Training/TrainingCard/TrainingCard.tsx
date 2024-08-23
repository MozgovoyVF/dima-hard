import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

interface ITrainingCard {
  title: string;
  description?: string;
  image: string;
}

export function TrainingCard({ description, image, title }: ITrainingCard) {
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -300 },
  };

  return (
    <motion.div
      key={title}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.3 }}
      variants={variants}
      viewport={{ once: true }}
      className={styles.trainingCard}
    >
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
      <div className={styles.image}>
        <Image alt="training photo" src={image} width={200} height={100} />
      </div>
    </motion.div>
  );
}
