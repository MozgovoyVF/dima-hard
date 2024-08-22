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

export function PriceCard({ price, text, title, image }: IPriceCard) {
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.3 }}
      variants={variants}
      className={styles.priceCard}
    >
      <div className={styles.content}>
        <div className={styles.heading}>
          <Image src={`${image}`} alt="Price card" width={100} height={100} />
          <h4 className={styles.title}>Тариф `{title}`</h4>
        </div>
        <div className={styles.description}>
          <p className={styles.text}>{text}</p>
          <span className={styles.price}>
            Цена - {price.toLocaleString("de-DE")} руб./мес.
          </span>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <Button className={styles.buy}>Купить</Button>
        <Button className={styles.more}>Подробнее</Button>
      </div>
    </motion.div>
  );
}
