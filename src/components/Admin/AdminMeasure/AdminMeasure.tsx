"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserSelect } from "../Users/UserSelect/UserSelect";
import Loader from "@/components/ui/loader/Loader";
import { useEffect, useState } from "react";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import { IUserLock } from "@/types/auth.types";
import { MeasureTable } from "@/components/Profile/Measure/MeasureTable/MeasureTable";
import MeasureChart from "@/components/Profile/Measure/MeasureChart";
import { groupByMeasures } from "@/utils/groupByMeasures";

export interface IAdminGalery {
  userId: number;
}

export function AdminMeasure() {
  const { data: usersData, isLoading, isRefetching } = useGetAllUsers();

  const [data, setData] = useState<IUserLock | undefined>();
  const [users, setUsers] = useState(usersData);

  const [groupedMeasures, setGroupedMeasures] = useState<Record<string, any[]>>();
  const [currentChart, setCurrentChart] = useState<{ dates: string[]; measure: string[]; title: string }>();

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
    setGroupedMeasures(undefined);
    setCurrentChart(undefined);
    if (users) {
      const user = users.find((user) => user.id === userId);
      setData(user);

      if (user?.measure && user?.measure.length > 0) {
        setGroupedMeasures(groupByMeasures(user.measure));
      }
    }
  };

  return (
    <MotionSection>
      <h1 className={styles.title}>Антропометрия пользователей</h1>
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

              {data && groupedMeasures && Object.keys(groupedMeasures).length > 0 ? (
                <>
                  <div className={styles.measure}>
                    <h2 className={styles.title}>Таблица результатов</h2>
                    <p className={styles.text}>Для визуализации в виде графика нажмите на наименование замера</p>

                    <MeasureTable groupedMeasures={groupedMeasures} setCurrentChart={setCurrentChart} />
                  </div>

                  {currentChart && currentChart.title && (
                    <MeasureChart
                      title={currentChart.title}
                      dates={currentChart.dates}
                      measure={currentChart.measure}
                    />
                  )}
                </>
              ) : (
                data && <p className={styles.text}>У данного пользователя замеры тела отсутствуют</p>
              )}
            </div>
          )
        )}
      </div>
    </MotionSection>
  );
}
