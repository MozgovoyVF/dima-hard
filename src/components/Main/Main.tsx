import React, { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { Banner } from "./Banner/Banner";
import { Cards } from "./Cards/Cards";
import { Price } from "./Price/Price";
import { Training } from "./Training/Training";
import { Program } from "./Program/Program";
import { Regals } from "./Regals/Regals";
import { Results } from "./Results/Results";
import { ArrowLink } from "@/components/ui/arrowLink/ArrowLink";

import { motion, useScroll, useSpring } from "framer-motion";

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
      <ParallaxContainer>
        <Training />
      </ParallaxContainer>
      <ParallaxContainer>
        <Program />
      </ParallaxContainer>
      <ParallaxContainer>
        <Regals />
      </ParallaxContainer>
      <ParallaxContainer>
        <Results />
      </ParallaxContainer>
      <motion.div className={styles.progress} style={{ scaleX }} />
      <ArrowLink />
    </div>
  );
}
