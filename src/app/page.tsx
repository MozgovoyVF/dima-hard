"use client";

import { Main } from "@/components/Main/Main";
import styles from "./page.module.scss";
import { motion } from "framer-motion";

export default function Home() {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <motion.main
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={styles.container}
    >
      <Main />
    </motion.main>
    // <main className={styles.container}>
    // </main>
  );
}
