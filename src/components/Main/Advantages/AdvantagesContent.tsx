"use client";

import * as React from "react";
import { motion } from "framer-motion";
import styles from "./index.module.scss";
import Image from "next/image";

export function AdvantagesContent() {
  const variantsLeft = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };

  const variantsRight = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 100 },
  };

  return (
    <ul className={styles.list}>
      {[
        {
          title: "Персонализированные программы",
          text: "  Я разрабатываю тренировки и планы питания с учетом ваших целей, уровня подготовки и предпочтений.Индивидуальный подход помогает быстрее добиться результатов, избегая рисков для здоровья",
          variant: variantsLeft,
          image: "/images/advantages/advantages_1.webp",
        },
        {
          title: "Гибкий график",
          text: "Тренировки онлайн позволяют вам заниматься в удобное время и в любом месте — не привязываясь к графику",
          variant: variantsRight,
          image: "/images/advantages/advantages_2.webp",
        },
        {
          title: "Регулярная обратная связь и поддержка",
          text: "Я поддерживаю своих клиентов, мотивируя и контролируя их прогресс. Постоянные консультации помогают вамчувствовать уверенность на каждом этапе тренировочного пути.",
          variant: variantsLeft,
          image: "/images/advantages/advantages_3.webp",
        },
        {
          title: "Обучение правильной технике",
          text: "Через видео-разборы и регулярные проверки я помогу вам освоить правильную технику, чтобы минимизировать рискитравм и улучшить эффективность тренировок.",
          variant: variantsRight,
          image: "/images/advantages/advantages_4.webp",
        },
        {
          title: "Встроенный контроль за питанием",
          text: "Индивидуальный план питания и рекомендации по добавкам помогут вам ускорить прогресс и улучшить качествопитания, делая программу комплексной.",
          variant: variantsLeft,
          image: "/images/advantages/advantages_5.webp",
        },
        {
          title: "Разнообразие программ",
          text: "Мои тренировки включают кардио, силовые, функциональные и гибридные программы, что делает тренировкиинтересными и помогает достигать разных целей, будь то жиросжигание, набор мышц или повышение выносливости.",
          variant: variantsRight,
          image: "/images/advantages/advantages_6.webp",
        },
        {
          title: "Доступ к современным методам",
          text: "Я постоянно изучаю и применяю актуальные методики фитнеса, предлагая программы, которые адаптируются кпоследним трендам и научным исследованиям.",
          variant: variantsLeft,
          image: "/images/advantages/advantages_7.webp",
        },
        {
          title: "Сотрудничество с Fatsecret",
          text: "Больше никаких ежедневных отчетов о питании! Благодаря функционалу личного кабинета Вам лишь остается вести записи в приложении Fatsecret, а я смогу следить и корректировать Ваш рацион!",
          variant: variantsRight,
          image: "/images/advantages/advantages_8.webp",
          type: "fatsecret",
        },
      ].map((item, index) => (
        <motion.li
          key={index}
          initial="hidden"
          whileInView="visible"
          variants={item.variant}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.item}
        >
          <h3 className={item?.type ? styles.fatsecret : styles.subtitle}>{item.title}</h3>
          <span className={styles.text}>{item.text}</span>
          <Image className={styles.image} src={item.image} width={500} height={300} alt={item.title} />
        </motion.li>
      ))}
    </ul>
  );
}
