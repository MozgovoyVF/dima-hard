import * as React from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import { FaClock, FaHome, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { PHONE_NUMBER } from "@/constants/global.constants";
import { BiPhone } from "react-icons/bi";

export function Contact() {
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -300 },
  };
  return (
    <div id="contacts" className={styles.contacts}>
      <h2 className={styles.title}>Контакты для связи</h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          <motion.li
            key="contact1"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.3 }}
            variants={variants}
            viewport={{ once: true }}
            className={styles.item}
          >
            <FaHome className={styles.svg} />
            <div className={styles.info}>
              <span className={styles.subtitle}>Адрес</span>
              <span className={styles.text}>г. Мытищи, Шараповский пр., вл2с3, ТЦ &quot;Красный Кит&quot;</span>
            </div>
          </motion.li>
          <motion.li
            key="contact2"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.3 }}
            variants={variants}
            viewport={{ once: true }}
            className={styles.item}
          >
            <PiTelegramLogo className={styles.svg} />
            <div className={styles.info}>
              <span className={styles.subtitle}>Почта</span>
              <span className={styles.text}>dmitriy_peschalnikov@mail.ru</span>
            </div>
          </motion.li>
          <motion.li
            key="contact3"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.3 }}
            variants={variants}
            viewport={{ once: true }}
            className={styles.item}
          >
            <FaClock className={styles.svg} />
            <div className={styles.info}>
              <span className={styles.subtitle}>График работы</span>
              <span className={styles.text}>8:00 - 22:00</span>
            </div>
          </motion.li>
        </ul>
      </div>
      <div className={styles.social}>
        <a target="_blank" href={`https://wa.me/${PHONE_NUMBER}`}>
          <FaWhatsapp className={styles.whatsapp} />
        </a>
        <a target="_blank" href={`https://t.me/${PHONE_NUMBER}`}>
          <FaTelegram className={styles.telegram} />
        </a>
        <a href={`tel:${PHONE_NUMBER}`}>
          <BiPhone className={styles.phone} />
        </a>
      </div>
      <YMaps>
        <div className={styles.maps}>
          <Map defaultState={{ center: [55.916785, 37.755256], zoom: 14 }} />
        </div>
      </YMaps>
    </div>
  );
}
