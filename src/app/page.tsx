"use client";

import { Main } from "@/components/Main/Main";
import styles from "./page.module.scss";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className={styles.container}>
      <Main />
    </main>
  );
}
