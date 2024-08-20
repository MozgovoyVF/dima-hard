import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

export function Cards() {
  return (
    <div className={styles.cards}>
      <ul className={styles.list}>
        <li className={styles.card}>
          <Image alt="card" height={150} width={100} src="/images/cards/result1.jpg" />
          <h4>Для достижения спортивных результатов</h4>
        </li>
        <li className={styles.card}>
          <Image alt="card" height={150} width={100} src="/images/cards/result2.jpg" />
          <h4>Для восстановления после травм</h4>
        </li>
        <li className={styles.card}>
          <Image alt="card" height={150} width={100} src="/images/cards/result3.jpeg" />
          <h4>Для восстановления после родов</h4>
        </li>
      </ul>
    </div>
  );
}
