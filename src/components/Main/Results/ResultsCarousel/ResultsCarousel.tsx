import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./index.module.scss";
export default function ResponsiveCarousel() {
  const responsive = [
    "/images/results/result1.JPG",
    "/images/results/result2.JPG",
    "/images/results/result3.JPG",
    "/images/results/result4.JPG",
    "/images/results/result5.JPG",
    "/images/results/result6.JPG",
    "/images/results/result7.PNG",
    "/images/results/result8.PNG",
    "/images/results/result9.PNG",
  ];
  return (
    <div className={styles.container}>
      <Carousel
        showArrows={true}
        showIndicators={true}
        infiniteLoop={true}
        dynamicHeight={false}
        showStatus={false}
        className={styles.mySwiper}
      >
        {responsive.map((item, index) => (
          <div key={index} className={styles.swipItem}>
            <div className={styles.imgBox}>
              <img src={item} alt="slides" />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
