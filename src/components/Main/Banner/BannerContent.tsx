"use client";

import React from "react";
import styles from "./index.module.scss";
import { GiBiceps, GiBrain } from "react-icons/gi";
import { PiNotepadBold } from "react-icons/pi";
import { motion } from "framer-motion";
import { variants } from "@/constants/framer.constants";
import { MdSportsGymnastics } from "react-icons/md";
import { RiMentalHealthLine } from "react-icons/ri";

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
        <GiBrain className={styles.brain} />
        <span>Внедряю привычки для нового тела!</span>
      </li>
      <li className={styles.me}>
        <GiBiceps className={styles.biceps} />
        <span>Из тюбика в киборга!</span>
      </li>
      <li className={styles.me}>
        <MdSportsGymnastics className={styles.sport} />
        <span>Из &quot;широкой&quot; кости в тонкую талию!</span>
      </li>
      <li className={styles.me}>
        <RiMentalHealthLine className={styles.health} />
        <span>Парюсь о Вашем здоровье - ментальном и физическом!</span>
      </li>
    </motion.ul>
  );
}
