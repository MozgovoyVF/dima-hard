import { PropsWithChildren, useRef } from "react";
import styles from "./index.module.scss";

export function ParallaxContainer({ children }: PropsWithChildren) {
  return (
    <section className={styles.section}>
      <div>{children}</div>
    </section>
  );
}
