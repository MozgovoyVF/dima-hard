import * as React from "react";
import styles from "./index.module.scss";
import { FaClock, FaHome, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { PHONE_NUMBER } from "@/constants/global.constants";
import { BiPhone } from "react-icons/bi";
import { ParallaxContainer } from "@/components/ParallaxContainer/ParallaxContainer";
import { ContactItem } from "./ContactItem";
import { ContactMap } from "./ContactMap";

export function Contact() {
  return (
    <ParallaxContainer>
      <div id="contacts" className={styles.contacts}>
        <h2 className={styles.title}>Контакты для связи</h2>
        <div className={styles.content}>
          <ul className={styles.list}>
            <ContactItem
              icon={<FaHome className={styles.svg} />}
              subtitle="Адрес"
              text='г. Мытищи, Шараповский пр., вл2с3, ТЦ "Красный Кит"'
              index={0}
            />
            <ContactItem
              icon={<PiTelegramLogo className={styles.svg} />}
              subtitle="Почта"
              text="dmitriy_peschalnikov@mail.ru"
              index={1}
            />
            <ContactItem
              icon={<FaClock className={styles.svg} />}
              subtitle="График работы"
              text="8:00 - 22:00"
              index={2}
            />
          </ul>
        </div>
        <div className={styles.social}>
          <a target="_blank" href={`https://wa.me/${PHONE_NUMBER}`} rel="noopener noreferrer">
            <FaWhatsapp className={styles.whatsapp} />
          </a>
          <a target="_blank" href={`https://t.me/${PHONE_NUMBER}`} rel="noopener noreferrer">
            <FaTelegram className={styles.telegram} />
          </a>
          <a href={`tel:${PHONE_NUMBER}`}>
            <BiPhone className={styles.phone} />
          </a>
        </div>
        <ContactMap />
      </div>
    </ParallaxContainer>
  );
}
