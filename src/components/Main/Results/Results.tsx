import * as React from "react";
import styles from "./index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import ResultsCarousel from "./ResultsCarousel/ResultsCarousel";
import { Button } from "@/components/ui/buttons/Button";
import Link from "next/link";
import { PHONE_NUMBER } from "@/constants/global.constants";
import { FaWhatsapp } from "react-icons/fa";

export function Results() {
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -300 },
  };
  return (
    <div id="results" className={styles.results}>
      <h2 className={styles.title}>Результаты работы со мной</h2>
      <ResultsCarousel />
      <Link href={`https://wa.me/${PHONE_NUMBER}`} className={styles.link}>
        <FaWhatsapp className={styles.whatsapp} />
        <span className={styles.text}>Попробовать потренироваться со мной</span>
      </Link>
    </div>
  );
}
