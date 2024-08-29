"use client";

import { PropsWithChildren, useRef } from "react";
import styles from "./index.module.scss";

export function ParallaxContainer({ children }: PropsWithChildren) {
  const ref = useRef(null);

  return (
    <section className={styles.section}>
      <div ref={ref}>{children}</div>
    </section>
  );
}
