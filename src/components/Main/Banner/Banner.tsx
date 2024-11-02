import * as React from "react";
import styles from "./index.module.scss";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";
import { BannerContent } from "./BannerContent";

export function Banner() {
  return (
    <ParallaxContainer>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1 className={styles.title}>Ты заслуживаешь здорового и сильного тела!</h1>
          <BannerContent />
        </div>
      </div>
    </ParallaxContainer>
  );
}
