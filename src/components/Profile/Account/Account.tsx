"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { PHONE_NUMBER } from "@/constants/global.constants";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { BiCalculator } from "react-icons/bi";
import { getCalcResultType } from "@/utils/getCalcResultType";
import Loader from "@/components/ui/loader/Loader";
import { useFatsecret } from "@/hooks/useFatsecret";
import { PiKeyholeFill } from "react-icons/pi";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";

export function Account() {
  const { data, isLoading } = useProfile();
  const { data: fatSecretData } = useFatsecret();

  return (
    <MotionSection>
      <h1 className={styles.title}>Личный кабинет</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!data?.profile.subscribe ? (
            <div className={styles.subscribe}>
              <span className={styles.info}>
                В данный момент Ваша подписка <b className={styles.red}>неактивна</b>.
                <br />
                Для оформления подписки и получения подробностей о тренировках со мной напишите мне в{" "}
                <b className={styles.green}>WhatsApp</b>
              </span>
              <Link href={`https://wa.me/${PHONE_NUMBER}`} className={styles.link}>
                <FaWhatsapp className={styles.whatsapp} />
                <span className={styles.text}>Выбрать тренировочный пакет</span>
              </Link>
            </div>
          ) : (
            !fatSecretData && (
              <div className={styles.subscribe}>
                <span className={styles.info}>
                  Для того, чтобы тренировочный процесс был <b className={styles.blueViolet}>максимально</b> эффективен,
                  привяжите Ваш аккаунт <b className={styles.green}>FatSecret</b> для оперативного получения обратной
                  связи от меня
                </span>
                <Link href={DASHBOARD_PAGES.FATSECRET} className={styles.link}>
                  <PiKeyholeFill className={styles.whatsapp} />
                  <span className={styles.text}>Привязать FatSecret</span>
                </Link>
              </div>
            )
          )}
          {!data?.profile.bmi || !data?.profile.bmr || !data?.profile.tdee ? (
            <div className={styles.results}>
              <p className={styles.subtitle}>
                <span>Каких результатов Вы хотите достичь с помощью тренировочного процесса?</span>
                <span>
                  Рассчитайте <b>3 основных показателя</b> и сохраните их в своем профиле для успешного достижения
                  поставленных целей
                </span>
              </p>
              <Link href={DASHBOARD_PAGES.CALC} className={styles.link}>
                <BiCalculator className={styles.calc} />
                <span className={styles.text}>Перейти к калькулятору калорий</span>
              </Link>
            </div>
          ) : (
            <div className={styles.results}>
              <p className={styles.subtitle}>Ваши сохраненные расчетные показатели:</p>
              <div className={styles.content}>
                <div className={styles.item}>
                  <div className={styles.name}>Общие суточные затраты энергии</div>
                  <div className={styles.value}>
                    {data.profile.tdee} {getCalcResultType("tdee")}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.name}>Индекс массы тела</div>
                  <div className={styles.value}>
                    {data.profile.bmi} {getCalcResultType("bmi")}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.name}>Базовая скорость метаболизма</div>
                  <div className={styles.value}>
                    {data.profile.bmr} {getCalcResultType("bmr")}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </MotionSection>
  );
}
