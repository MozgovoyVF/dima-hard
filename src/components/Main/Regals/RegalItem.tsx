"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./index.module.scss";

interface RegalItemProps {
  imageSrc: string;
  text: string;
  index: number;
}

export function RegalItem({ imageSrc, text, index }: RegalItemProps) {
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -300 },
  };

  return (
    <motion.li
      key={text}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.3, delay: index * 0.2 }}
      variants={variants}
      viewport={{ once: true }}
      className={styles.item}
    >
      <Image width={15} height={15} alt="svg image" src={imageSrc} />
      <span className={styles.text}>{text}</span>
    </motion.li>
  );
}
