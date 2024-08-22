import * as React from "react";
import styles from "./index.module.scss";
import { PriceCard } from "./PriceCard/PriceCard";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/Button";
import { motion } from "framer-motion";

export function Price() {
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  return (
    <div id="online-training" className={styles.price}>
      <h1 className={styles.title}>
        Сколько Вы готовы тратить на тренировочный процесс в месяц?
      </h1>
      <div className={styles.cards}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          variants={variants}
          className={styles.priceCard}
        >
          <div className={styles.content}>
            <div className={styles.heading}>
              <Image
                src="/images/price/price1.jpg"
                alt="Price card"
                width={100}
                height={100}
              />
              <h4 className={styles.title}>Тариф Базовый</h4>
            </div>
            <div className={styles.description}>
              <p className={styles.text}>Инфо про тариф</p>
              <span className={styles.price}>
                Цена - {Number(5000).toLocaleString("de-DE")} руб./мес.
              </span>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <Button className={styles.buy}>Купить</Button>
            <Button className={styles.more}>Подробнее</Button>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          variants={variants}
          className={styles.priceCard}
        >
          <div className={styles.content}>
            <div className={styles.heading}>
              <Image
                src="/images/price/price2.jpg"
                alt="Price card"
                width={100}
                height={100}
              />
              <h4 className={styles.title}>Тариф Лучший друг</h4>
            </div>
            <div className={styles.description}>
              <p className={styles.text}>Инфо про тариф</p>
              <span className={styles.price}>
                Цена - {Number(10000).toLocaleString("de-DE")} руб./мес.
              </span>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <Button className={styles.buy}>Купить</Button>
            <Button className={styles.more}>Подробнее</Button>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          variants={variants}
          className={styles.priceCard}
        >
          <div className={styles.content}>
            <div className={styles.heading}>
              <Image
                src="/images/price/price3.jpg"
                alt="Price card"
                width={100}
                height={100}
              />
              <h4 className={styles.title}>Тариф All Inclusive</h4>
            </div>
            <div className={styles.description}>
              <p className={styles.text}>Инфо про тариф</p>
              <span className={styles.price}>
                Цена - {Number(15000).toLocaleString("de-DE")} руб./мес.
              </span>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <Button className={styles.buy}>Купить</Button>
            <Button className={styles.more}>Подробнее</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
