"use client";

import React from "react";
import styles from "./index.module.scss";
import { FaMedal } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";
import { PiNotepadBold } from "react-icons/pi";
import { motion } from "framer-motion";
import { variants } from "@/constants/framer.constants";

export function BannerContent() {
  return (
    <motion.ul
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "easi-in-out", duration: 0.3 }}
      className={styles.promise}
    >
      <li className={styles.me}>
        <GiBiceps />
        <span>Видимый результат уже через 4 месяца тренировок</span>
      </li>
      <li className={styles.me}>
        <FaMedal />
        <span>Сертифицированный тренер по физической подготовке (фитнес-тренер) с большим опытом</span>
      </li>
      <li className={styles.me}>
        <PiNotepadBold />
        <span>Специалист по здоровому спортивному питанию к Вашим услугам</span>
      </li>
    </motion.ul>
  );
}
