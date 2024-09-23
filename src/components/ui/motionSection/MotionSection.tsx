import * as React from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { variants } from "@/constants/framer.constants";

export function MotionSection({ children }: React.PropsWithChildren) {
  return (
    <motion.section
      key="account"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "easi-in-out", duration: 0.3 }}
      className={styles.section}
    >
      <div className={styles.container}>{children}</div>
    </motion.section>
  );
}
