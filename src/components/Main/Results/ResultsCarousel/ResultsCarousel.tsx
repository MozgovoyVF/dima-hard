import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./index.module.scss";
import Image from "next/image";

export default function ResponsiveCarousel() {
  const responsive = [
    "/images/results/result1.webp",
    "/images/results/result2.webp",
    "/images/results/result3.webp",
    "/images/results/result4.webp",
    "/images/results/result5.webp",
    "/images/results/result6.webp",
    "/images/results/result7.webp",
    "/images/results/result8.webp",
    "/images/results/result9.webp",
  ];
  return (
    <div className={styles.container}>
      <Carousel
        showArrows={true}
        showIndicators={true}
        infiniteLoop={true}
        dynamicHeight={false}
        showThumbs={false}
        showStatus={false}
        className={styles.mySwiper}
        emulateTouch={true}
      >
        {responsive.map((item, index) => (
          <div key={index} className={styles.swipItem}>
            <div className={styles.imgBox}>
              <Image priority={true} width={600} height={900} src={item} alt="slides" />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
