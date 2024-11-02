import React from "react";
import styles from "./index.module.scss";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";
import { PiKeyholeFill } from "react-icons/pi";

export function FatsecretBlock() {
  return (
    <div className={styles.subscribe}>
      <span className={styles.info}>
        Для того, чтобы тренировочный процесс был <b className={styles.blueViolet}>максимально</b> эффективен, привяжите
        Ваш аккаунт <b className={styles.green}>FatSecret</b> для оперативного получения обратной связи от меня
      </span>
      <Link href={DASHBOARD_PAGES.FATSECRET} className={styles.link}>
        <PiKeyholeFill className={styles.whatsapp} />
        <span className={styles.text}>Привязать FatSecret</span>
      </Link>
    </div>
  );
}
