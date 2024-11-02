"use client";

import * as React from "react";
import { motion } from "framer-motion";
import styles from "./index.module.scss";

interface ContactItemProps {
  icon: React.ReactNode;
  subtitle: string;
  text: string;
  index: number;
}

export function ContactItem({ icon, subtitle, text, index }: ContactItemProps) {
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -300 },
  };

  return (
    <motion.li
      key={text}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.3 }}
      variants={variants}
      viewport={{ once: true }}
      className={styles.item}
    >
      {icon}
      <div className={styles.info}>
        <span className={styles.subtitle}>{subtitle}</span>
        <span className={styles.text}>{text}</span>
      </div>
    </motion.li>
  );
}
