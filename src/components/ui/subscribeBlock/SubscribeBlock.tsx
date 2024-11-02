import * as React from "react";
import styles from "./index.module.scss";
import { PHONE_NUMBER } from "@/constants/global.constants";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa";

export function SubscribeBlock() {
  return (
    <div className={styles.subscribe}>
      <span className={styles.info}>
        В данный момент Ваша подписка <b className={styles.red}>неактивна</b>.
        <br />
        Для оформления подписки и получения подробностей о тренировках со мной напишите мне в
        <b className={styles.green}>Telegram</b>
      </span>
      <Link href={`https://t.me/${PHONE_NUMBER}`} className={styles.link}>
        <FaTelegram className={styles.telegram} />
        <span className={styles.text}>Выбрать тренировочный пакет</span>
      </Link>
    </div>
  );
}
