"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/Button";
import { motion } from "framer-motion";

interface IPriceCard {
  title: string;
  text: string;
  price: number;
  image: string;
}

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 },
};

export function PriceCard({ price, text, title, image }: IPriceCard) {
  return (
    <motion.div
      key={title}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.3 }}
      variants={variants}
      viewport={{ once: true }}
      className={styles.priceCard}
    >
      <div className={styles.content}>
        <div className={styles.heading}>
          <Image src={image} alt={`Тариф ${title}`} width={100} height={150} />
          <h4 className={styles.title}>Тариф «{title}»</h4>
        </div>
        <div className={styles.description}>
          <p className={styles.text}>{text}</p>
          <span className={styles.price}>{price.toLocaleString("ru-RU")} руб./мес.</span>
          <Button className={styles.more}>Подробнее</Button>
        </div>
      </div>
    </motion.div>
  );
}
