import * as React from "react";
import styles from "./index.module.scss";
import { PriceCard } from "./PriceCard/PriceCard";

export function Price() {
  return (
    <div className={styles.price}>
      <h1 className={styles.title}>
        Сколько Вы готовы тратить на тренировочный процесс в месяц?
        <div className={styles.cards}>
          <PriceCard
            title="Базовый"
            image="/images/price/price1.jpg"
            price={5000}
            text="Инфо про тариф"
          />
          <PriceCard
            title="Лучший друг"
            image="/images/price/price2.jpg"
            price={10000}
            text="Инфо про тариф"
          />
          <PriceCard
            title="All Inclusive"
            image="/images/price/price3.jpg"
            price={15000}
            text="Инфо про тариф"
          />
        </div>
      </h1>
    </div>
  );
}
