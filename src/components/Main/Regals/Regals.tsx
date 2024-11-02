import * as React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";
import { RegalItem } from "./RegalItem";

export function Regals() {
  return (
    <ParallaxContainer>
      <div id="about" className={styles.regals}>
        <h2 className={styles.title}>Обо мне</h2>
        <Image src={"/images/about/about.webp"} alt="about photo" width={200} height={100} />
        <div className={styles.content}>
          <ul className={styles.list}>
            <RegalItem imageSrc="/images/about/experience.svg" text="Опыт работы свыше 3-х лет" index={0} />
            <RegalItem
              imageSrc="/images/about/notepad.svg"
              text="Обладаю экспертностью в области физиологии и анатомии"
              index={1}
            />
            <RegalItem imageSrc="/images/about/diploma.svg" text="Сертифицированный тренер" index={2} />
          </ul>
        </div>
      </div>
    </ParallaxContainer>
  );
}
