"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";

export function AdminMain() {
  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Личный кабинет администратора</h1>
      </div>
    </MotionSection>
  );
}
