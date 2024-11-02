"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProgramBlockProps {
  imageSrc: string;
  title: string;
  items: string[];
}

export function ProgramBlock({ imageSrc, title, items }: ProgramBlockProps) {
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -300 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.3 }}
      variants={variants}
      viewport={{ once: true }}
      className={styles.block}
    >
      <div className={styles.heading}>
        <Image alt={title} src={imageSrc} width={100} height={50} />
        <h4 className={styles.subtitle}>{title}</h4>
      </div>
      <div className={styles.info}>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
