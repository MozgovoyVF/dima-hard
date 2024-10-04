"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import { IGalery, IUserLock } from "@/types/auth.types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Loader from "@/components/ui/loader/Loader";
import { UserSelect } from "../Users/UserSelect/UserSelect";
import { groupByDay } from "@/utils/groupByDay";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import GaleryCarousel from "@/components/Profile/Galery/GaleryCarousel/GaleryCarousel";

export interface IAdminGalery {
  userId: number;
}

export function AdminGalery() {
  const { data: usersData, isLoading, isRefetching } = useGetAllUsers();

  const [data, setData] = useState<IUserLock | undefined>();
  const [users, setUsers] = useState(usersData);
  const [filteredGalery, setFilteredGalery] = useState<Record<string, IGalery[]>>();
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IAdminGalery>({ mode: "onSubmit" });

  useEffect(() => {
    setUsers(usersData);
    if (usersData) {
      setData((prev) => usersData.find((user) => user.id === prev?.id));
    }
  }, [data, setValue, usersData]);

  const onSubmit: SubmitHandler<IAdminGalery> = async ({ userId }) => {
    if (users) {
      const user = users.find((user) => user.id === userId);
      setData(user);

      const result = groupByDay(user?.galery as IGalery[]);
      setFilteredGalery(result);

      const openState = Object.keys(result).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);

      setIsOpen(openState);
    }
  };

  return (
    <MotionSection>
      <h1 className={styles.title}>Галерея результатов</h1>
      <div className={styles.content}>
        {isLoading || isRefetching ? (
          <Loader />
        ) : (
          users && (
            <div className={styles.block}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="userId"
                  control={control}
                  rules={{ required: "Пользователь обязателен для выбора" }}
                  render={({ field }) => (
                    <UserSelect
                      onChangeFn={(selectedUser) => {
                        field.onChange(selectedUser);
                        setFilteredGalery(undefined);
                        setData(undefined);
                      }}
                      options={users.map((user) => ({
                        value: user.id,
                        label: user.name + " " + user.lastName,
                      }))}
                      errors={errors}
                      value={field.value}
                    />
                  )}
                />

                <button className={styles.button} type="submit">
                  Поиск
                </button>
              </form>

              {filteredGalery && Object.keys(filteredGalery).length > 0 ? (
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
                          showCounter={false}
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
              ) : (
                typeof filteredGalery === "object" && (
                  <div className={styles.galeryBlock}>
                    <h4 className={styles.subtitle}>У данного пользователя не загружено ни одно фото с результатами</h4>
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
    </MotionSection>
  );
}
