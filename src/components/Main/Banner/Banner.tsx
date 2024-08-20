import * as React from "react";
import styles from "./index.module.scss";
import { FaMedal } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";
import { PiNotepadBold } from "react-icons/pi";

export function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.title}>
          Ты заслуживаешь здорового и сильного тела!
        </h1>
        <ul className={styles.promise}>
          <li className={styles.me}>
            <GiBiceps />
            <span>Видимый результат уже через 4 месяца тренировок</span>
          </li>
          <li className={styles.me}>
            <FaMedal />
            <span>
              Сертифицированный тренер по физической подготовке (фитнес-тренер)
              с большим опытом
            </span>
          </li>
          <li className={styles.me}>
            <PiNotepadBold />
            <span>
              Специалист по здоровому спортивному питанию к Вашим услугам
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
