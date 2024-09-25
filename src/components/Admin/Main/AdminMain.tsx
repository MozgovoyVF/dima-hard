"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { useFatsecretUsers } from "@/hooks/useFatsecretUsers";
import { UsersSelect } from "./UsersSelect/UsersSelect";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useFatsecretRequest } from "@/hooks/useFatsecretRequest";
import { TFatSecretMontsWeigth } from "@/types/fatsecret.types";
import { useState } from "react";
import WeightChart from "./WeigthChart/WeigthChart";
import CalendarSelect from "./CalendarSelect/CalendarSelect";
import { convertDateToDays } from "@/utils/convertDatetoDays";
import { convertDaysToDate } from "@/utils/convertDaysToDate";

export interface IAdminMainForm {
  user: {
    token: string;
    secret: string;
  };

  selectedMonth: string | null;
  selectedYear: string | null;
}

export function AdminMain() {
  const { data: users } = useFatsecretUsers();
  const { handleSubmit, control } = useForm<IAdminMainForm>({ mode: "onSubmit" });
  const { mutateAsync } = useFatsecretRequest<"weight_monts", TFatSecretMontsWeigth>();
  const [data, setData] = useState<TFatSecretMontsWeigth | null>();

  const onSubmit: SubmitHandler<IAdminMainForm> = async ({ user, selectedMonth, selectedYear }, event) => {
    try {
      const days = convertDateToDays(`01.${selectedMonth}.${selectedYear}`);
      console.log(days);

      const result = await mutateAsync({
        request: "weight_monts",
        token: user.token,
        secret: user.secret,
        params: { date: days },
      });

      setData(result);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Личный кабинет администратора</h1>

        {users && (
          <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="user"
                control={control}
                render={({ field }) => (
                  <UsersSelect
                    onChangeFn={(selectedUser) => {
                      field.onChange(selectedUser);
                    }}
                    options={users.map((user) => ({
                      value: { token: user.fatsecret.token ?? "", secret: user.fatsecret.secret ?? "" },
                      label: user.name + " " + user.lastName,
                    }))}
                    value={field.value}
                  />
                )}
              />
              <CalendarSelect control={control} />

              <button className={styles.button} type="submit">
                Поиск
              </button>
            </form>

            {data && data.month.day && <WeightChart month={data.month} />}
            {data && !data.month.day && (
              <div className={styles.infoBlock}>
                <span className={styles.infoMessage}>За указанный месяц записи не найдены</span>
              </div>
            )}
          </>
        )}
      </div>
    </MotionSection>
  );
}
