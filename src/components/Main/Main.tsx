import React, { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { Banner } from "./Banner/Banner";
import { Cards } from "./Cards/Cards";
import { Price } from "./Price/Price";
import { useVH } from "@/hooks/useVH";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ParallaxContainer({ children }: PropsWithChildren) {
  const ref = useRef(null);

  return (
    <section className={styles.section}>
      <div ref={ref}>{children}</div>
    </section>
  );
}

export function Main() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useVH();

  return (
    <div className={styles.main}>
      <ParallaxContainer>
        <Banner />
      </ParallaxContainer>
      <ParallaxContainer>
        <Cards />
      </ParallaxContainer>
      <ParallaxContainer>
        <Price />
      </ParallaxContainer>
      <motion.div className={styles.progress} style={{ scaleX }} />
    </div>
  );
}
