"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { useProfile } from "@/hooks/useProfile";
import Loader from "@/components/ui/loader/Loader";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import Link from "next/link";
import { PHONE_NUMBER } from "@/constants/global.constants";
import { useGalery } from "@/hooks/useGalery";
import { useEffect, useState } from "react";
import { IGalery } from "@/types/auth.types";
import { groupByDay } from "@/utils/groupByDay";
import { AddForm } from "./AddForm/AddForm";
import GaleryCarousel from "./GaleryCarousel/GaleryCarousel";
import { motion } from "framer-motion";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useDeletePhoto } from "@/hooks/useDeletePhoto";
import { isDateInCurrentWeek } from "@/utils/isDateinCurrentWeek";

export interface IGaleryPage {
  files?: FileList;
  extraFiles?: FileList;
}

export function Galery() {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { data: galeryData, isLoading: isGaleryLoading, refetch, isRefetching: isGaleryRefetching } = useGalery();
  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } = useDeletePhoto();

  const [submitError, setSubmitError] = useState("");
  const [isFilesAdd, setIsFilesAdd] = useState(false);
  const [filteredGalery, setFilteredGalery] = useState<Record<string, IGalery[]>>();
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (galeryData && Object.keys(galeryData).every((value) => value !== "error")) {
      const result = groupByDay(galeryData as IGalery[]);
      setFilteredGalery(result);

      const openState = Object.keys(result).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);

      setIsOpen(openState);
    }
  }, [galeryData]);

  const deletePhoto = (key: string) => {
    return async (index: number) => {
      setSubmitError("");
      const result = await deleteMutateAsync((filteredGalery as Record<string, IGalery[]>)[key][index]);

      if (typeof result === "string") {
        setSubmitError(result);
      }

      if (filteredGalery && filteredGalery[key].length === 1) {
        delete filteredGalery[key];
      }
    };
  };

  return (
    <>
      {isProfileLoading || isGaleryLoading || isGaleryRefetching ? (
        <Loader />
      ) : !profileData?.profile.subscribe ? (
        <MotionSection>
          <h1 className={styles.title}>Галерея результатов</h1>
          <div className={styles.content}>
            <p className={styles.text}>
              В настоящий момент Ваша подписка неактивна!
              <br />
              Для оформления подписки свяжитесь со мной в{" "}
              <Link className={styles.link} target="_blank" href={`https://t.me/${PHONE_NUMBER}`}>
                Telegtam
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
          <h1 className={styles.title}>Галерея результатов</h1>
          <div className={styles.content}>
            {typeof galeryData === "object" && Object.keys(galeryData).find((e) => e === "error") && (
              <>
                <h2 className={styles.subtitle}>Ваша галерея результатов пуста</h2>
                <p className={styles.text}>
                  Добавляйте до 4-х Ваших фото с результатами каждую неделю и следите за Вашим прогрессом!
                </p>

                {isFilesAdd && <Loader />}
                <AddForm setIsFilesAdd={setIsFilesAdd} setSubmitError={setSubmitError} refetch={refetch} />

                {submitError && <span className={styles.error}>{submitError}</span>}
              </>
            )}

            {filteredGalery && Object.keys(filteredGalery).length !== 0 && !isDateInCurrentWeek(filteredGalery) && (
              <>
                <p className={styles.text}>
                  Добавляйте до 4-х Ваших фото с результатами каждую неделю и следите за Вашим прогрессом!
                </p>
                {isFilesAdd && <Loader />}
                <AddForm setIsFilesAdd={setIsFilesAdd} setSubmitError={setSubmitError} refetch={refetch} />
                {submitError && <span className={styles.error}>{submitError}</span>}
              </>
            )}

            {filteredGalery && (
              <div className={styles.galeryBlock}>
                {Object.keys(filteredGalery).map((item) => (
                  <div className={styles.galeryItem} key={item}>
                    <span
                      className={styles.date}
                      onClick={() =>
                        setIsOpen((prev) => ({
                          ...prev,
                          [item]: !prev[item],
                        }))
                      }
                    >
                      {new Date(item).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                      <FaArrowDown className={`${styles.arrow} ${isOpen[item] && styles.up}`} />
                    </span>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={isOpen[item] ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className={styles.images}
                    >
                      <GaleryCarousel
                        responsive={filteredGalery[item].map((galery) => galery.photoUrl)}
                        handleDelete={deletePhoto(item)}
                        isDeletePending={isDeletePending}
                        showCounter={false}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </MotionSection>
      )}
    </>
  );
}
