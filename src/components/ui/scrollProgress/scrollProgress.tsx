'use client'

import * as React from "react";
import styles from "./index.module.scss";
import { ArrowLink } from "@/components/ui/arrowLink/ArrowLink";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div className={styles.progress} style={{ scaleX }} />
      <ArrowLink />
    </>
  );
}
