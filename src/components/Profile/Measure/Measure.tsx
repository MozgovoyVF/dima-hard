"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { useProfile } from "@/hooks/useProfile";
import Loader from "@/components/ui/loader/Loader";
import Link from "next/link";
import { PHONE_NUMBER } from "@/constants/global.constants";
import { useCreateMeasure } from "@/hooks/measure/useCreateMeasure";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MeasureForm } from "./MeasureForm";
import GaleryCarousel from "../Galery/GaleryCarousel/GaleryCarousel";
import { isDateInCurrentMonth } from "@/utils/isDateInCurrentMonth";
import { groupByDay } from "@/utils/groupByDay";
import { groupByMeasures } from "@/utils/groupByMeasures";
// import MeasureChart from "./MeasureChart";
// import { MeasureTable } from "./MeasureTable/MeasureTable";
import dynamic from "next/dynamic";

export interface IFormMeasure {
  chest: string;
  arms: string;
  waist: string;
  lowerAbdomen: string;
  hips: string;
  legsUnderButtock: string;
  calves: string;
}

const MeasureTable = dynamic(() => import("./MeasureTable/MeasureTable"), {
  ssr: false,
});

const MeasureChart = dynamic(() => import("./MeasureChart"), {
  ssr: false,
});

export function Measure() {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { mutateAsync, isPending } = useCreateMeasure();

  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMeasureCurrentMonth, setIsMeasureCurrentMonth] = useState(false);
  const [groupedMeasures, setGroupedMeasures] = useState<Record<string, any[]>>();
  const [currentChart, setCurrentChart] = useState<{ dates: string[]; measure: string[]; title: string }>();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IFormMeasure>({ mode: "onSubmit" });

  useEffect(() => {
    if (profileData?.measure) {
      setIsMeasureCurrentMonth(isDateInCurrentMonth(groupByDay(profileData.measure)));

      setGroupedMeasures(groupByMeasures(profileData.measure));
    }
  }, [profileData, isPending]);

  const onSubmit: SubmitHandler<IFormMeasure> = async (data) => {
    if (profileData?.id) {
      await mutateAsync({ userId: String(profileData?.id), ...data });

      setIsShow(false);
      setCurrentChart(undefined);
      reset();
    }
  };

  return (
    <>
      {isProfileLoading ? (
        <Loader />
      ) : !profileData?.profile.subscribe ? (
        <MotionSection>
          <h1 className={styles.title}>Антропометрия</h1>
          <div className={styles.content}>
            <p className={styles.text}>
              В настоящий момент Ваша подписка неактивна!
              <br />
              Для подтверждения Вашего аккаунта FatSecret свяжитесь со мной в{" "}
              <Link className={styles.link} target="_blank" href={`https://t.me/${PHONE_NUMBER}`}>
                Telegram
              </Link>{" "}
              или{" "}
              <Link className={styles.link} target="_blank" href={`tel:${PHONE_NUMBER}`}>
                по телефону
              </Link>
            </p>
          </div>
        </MotionSection>
      ) : (
        <MotionSection>
          <h1 className={styles.title}>Антропометрия</h1>
          <div className={styles.content}>
            <p className={styles.text}>
              Сохраняйте Ваши антропометрические показатели каждый месяц и наглядно отслеживайте Ваш тренировочный
              прогресс!
            </p>

            <p className={styles.text}>Просмотрите памятку, чтобы произвести Ваши замеры максимально точно</p>

            <button onClick={() => setIsOpen((prev) => !prev)} className={`${styles.button} ${styles.memo}`}>
              {isOpen ? "Скрыть памятку" : "Смотреть памятку"}
            </button>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.images}
            >
              <GaleryCarousel
                responsive={[
                  "/images/measure/chest.jpg",
                  "/images/measure/arms.jpg",
                  "/images/measure/waist.jpg",
                  "/images/measure/lowerAbdomen.jpg",
                  "/images/measure/hips.jpg",
                  "/images/measure/legsUnderButtock.jpg",
                  "/images/measure/calves.jpg",
                ]}
                showCounter={false}
              />
            </motion.div>

            {isShow ? (
              <MeasureForm
                onSubmit={(e) => handleSubmit(onSubmit)(e)}
                errors={errors}
                register={register}
                setIsShow={setIsShow}
                isPending={isPending}
              />
            ) : (
              <button disabled={isMeasureCurrentMonth} className={styles.button} onClick={() => setIsShow(true)}>
                {!isMeasureCurrentMonth ? "Добавить новые замеры" : "Обновите данные в следующем месяце"}
              </button>
            )}
            {groupedMeasures && Object.keys(groupedMeasures).length > 0 && (
              <>
                <div className={styles.measure}>
                  <h2 className={styles.title}>Таблица Ваших результатов</h2>
                  <p className={styles.text}>Для визуализации в виде графика нажмите на наименование замера</p>

                  {isPending ? (
                    <Loader />
                  ) : (
                    <MeasureTable groupedMeasures={groupedMeasures} setCurrentChart={setCurrentChart} />
                  )}
                </div>

                {currentChart && currentChart.title && (
                  <MeasureChart title={currentChart.title} dates={currentChart.dates} measure={currentChart.measure} />
                )}
              </>
            )}
          </div>
        </MotionSection>
      )}
    </>
  );
}
