import * as React from "react";
import styles from "./index.module.scss";
import { PriceCard } from "./PriceCard/PriceCard";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";

const priceOptions = [
  {
    title: "Базовый",
    image: "/images/price/price1.webp",
    price: 5000,
    text: "Инфо про тариф",
  },
  {
    title: "Лучший друг",
    image: "/images/price/price2.webp",
    price: 10000,
    text: "Инфо про тариф",
  },
  {
    title: "All Inclusive",
    image: "/images/price/price3.webp",
    price: 15000,
    text: "Инфо про тариф",
  },
];

export function Price() {
  return (
    <ParallaxContainer>
      <section id="online-training" className={styles.price}>
        <h1 className={styles.title}>Сколько Вы готовы тратить на тренировочный процесс в месяц?</h1>
        <div className={styles.cards}>
          {priceOptions.map((option, index) => (
            <PriceCard key={index} title={option.title} image={option.image} price={option.price} text={option.text} />
          ))}
        </div>
      </section>
    </ParallaxContainer>
  );
}
