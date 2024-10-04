"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { useFatsecretRequest } from "@/hooks/useFatsecretRequest";
import { useFatsecretUsers } from "@/hooks/useFatsecretUsers";
import {
  TFatSecretDayFood,
  TFatSecretExercise,
  TFatSecretFood,
  TFatSecretMonthFood,
  TFatSecretMontsWeigth,
} from "@/types/fatsecret.types";
import { convertDateToDays } from "@/utils/convertDatetoDays";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CalendarSelect from "../WeightInfo/CalendarSelect/CalendarSelect";
import { UsersSelect } from "../WeightInfo/UsersSelect/UsersSelect";
import FoodMonthChart, { DayData } from "./FoodMonthChart/FoodMonthChart";
import DaySelect from "./DaySelect/DaySelect";
import { convertDaysToDate } from "@/utils/convertDaysToDate";
import PieChart from "./PieChart.tsx/PieChart";
import { useState } from "react";
import { sortByMeal } from "@/utils/sortByMeal";

export interface IFoodMonthForm {
  user: {
    token: string;
    secret: string;
  };

  selectedMonth: string | null;
  selectedYear: string | null;
}

export interface IFoodDayForm {
  selectedDay: string;
}

export function FoodMonth() {
  const { data: users } = useFatsecretUsers();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<IFoodMonthForm>({ mode: "onSubmit" });

  const {
    handleSubmit: handleInfoSubmit,
    control: infoControl,
    formState: { errors: infoErrors },
  } = useForm<IFoodDayForm>({ mode: "onSubmit" });

  const { mutateAsync, isPending } = useFatsecretRequest<"food_month", TFatSecretMonthFood>();
  const { mutateAsync: mutateAsyncDay, isPending: isDayPending } = useFatsecretRequest<"food_day", TFatSecretDayFood>();
  const { mutateAsync: mutateAsyncExcerciese, isPending: isExcercisePending } = useFatsecretRequest<
    "exercise",
    TFatSecretExercise
  >();
  const [data, setData] = useState<TFatSecretMonthFood | null>();
  const [infoData, setInfoData] = useState<TFatSecretDayFood | null>();
  const [excerciseInfo, setExcerciseInfo] = useState<TFatSecretExercise | null>();
  const [selectedDay, setSelectedDay] = useState<DayData | undefined>();
  const [filteredInfoData, setFilteredInfoData] = useState<Record<string, TFatSecretFood[]> | null>();

  const onSubmit: SubmitHandler<IFoodMonthForm> = async ({ user, selectedMonth, selectedYear }, event) => {
    try {
      setData(null);
      setInfoData(null);
      setSelectedDay(undefined);
      const days = convertDateToDays(`01.${selectedMonth}.${selectedYear}`);

      const result = await mutateAsync({
        request: "food_month",
        token: user.token,
        secret: user.secret,
        params: { date: days },
      });

      setData(result);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const onSubmitDayInfo: SubmitHandler<IFoodDayForm> = async ({ selectedDay }, event) => {
    try {
      const { user } = getValues();

      const [result, resultExercise] = await Promise.all([
        mutateAsyncDay({
          request: "food_day",
          token: user.token,
          secret: user.secret,
          params: { date: selectedDay },
        }),
        mutateAsyncExcerciese({
          request: "exercise",
          token: user.token,
          secret: user.secret,
          params: { date: selectedDay },
        }),
      ]);

      console.log(result.food_entries);

      const currentDay = Array.isArray(data?.month.day)
        ? data?.month.day.find((item) => item.date_int === selectedDay)
        : data?.month.day;

      setSelectedDay(currentDay);
      setInfoData(result);
      setExcerciseInfo(resultExercise);

      const sordetResult = sortByMeal(result);
      setFilteredInfoData(sordetResult);
      console.log(sordetResult);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Информация о питании</h1>

        {users && (
          <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="user"
                control={control}
                rules={{ required: "Пользователь обязателен для выбора" }}
                render={({ field }) => (
                  <UsersSelect
                    onChangeFn={(selectedUser) => {
                      field.onChange(selectedUser);
                    }}
                    options={users.map((user) => ({
                      value: { token: user.fatsecret.token ?? "", secret: user.fatsecret.secret ?? "" },
                      label: user.name + " " + user.lastName,
                    }))}
                    errors={errors}
                    value={field.value}
                  />
                )}
              />
              <CalendarSelect errors={errors} control={control} />

              <button disabled={isPending} className={styles.button} type="submit">
                Поиск
              </button>
            </form>

            {data && data.month.day && (
              <div className={styles.result}>
                <FoodMonthChart month={data.month} />
                <form onSubmit={handleInfoSubmit(onSubmitDayInfo)} className={styles.form}>
                  <Controller
                    name="selectedDay"
                    control={infoControl}
                    rules={{ required: "Дата обязательна для выбора" }}
                    render={({ field }) => (
                      <DaySelect
                        control={infoControl}
                        onChangeFn={(day) => {
                          field.onChange(day); // Обновляем поле при изменении выбора
                        }}
                        options={
                          Array.isArray(data.month.day)
                            ? (data.month.day as DayData[]).map((day) => ({
                                value: day.date_int,
                                label: convertDaysToDate(Number(day.date_int)),
                              }))
                            : [
                                {
                                  value: (data.month.day as DayData).date_int,
                                  label: convertDaysToDate(Number((data.month.day as DayData).date_int)),
                                },
                              ]
                        }
                        errors={infoErrors}
                        value={field.value} // Передаем текущее значение
                      />
                    )}
                  />
                  <button disabled={isDayPending || isExcercisePending} className={styles.button} type="submit">
                    Получить подробную информацию
                  </button>
                </form>
                {infoData && selectedDay && filteredInfoData && (
                  <>
                    <div className={styles.consume}>
                      <p className={styles.subtitle}>Употреблено {selectedDay.calories} ккал</p>
                      {excerciseInfo && excerciseInfo.month.day[0] && (
                        <p className={styles.subtitle}>Потрачено {excerciseInfo.month.day[0].calories} ккал</p>
                      )}
                    </div>
                    <PieChart
                      currentDay={{
                        carbohydrate: selectedDay.carbohydrate,
                        fat: selectedDay.fat,
                        protein: selectedDay.protein,
                      }}
                    />
                    <div className={styles.foods}>
                      <h3 className={styles.subtitle}>Список продуктов</h3>
                      {Object.keys(filteredInfoData).map((key) => (
                        <div key={key} className={styles.meal}>
                          <h4 className={styles.mealTitle}>
                            {key === "Breakfast"
                              ? "Завтрак"
                              : key === "Dinner"
                              ? "Ужин"
                              : key === "Lunch"
                              ? "Обед"
                              : "Перекус"}
                          </h4>
                          {filteredInfoData[key].map((food) => (
                            <div key={food.food_entry_id} className={styles.food}>
                              <div className={styles.top}>
                                <div className={styles.header}>КБЖУ</div>
                                <div className={styles.calories}>{food.calories} ккал</div>
                                <div className={styles.protein}>{food.protein} гр.</div>
                                <div className={styles.fat}>{food.fat} гр.</div>
                                <div className={styles.carbohydrate}>{food.carbohydrate} гр.</div>
                              </div>
                              <div className={styles.bottom}>
                                <div className={styles.name}>{food.food_entry_name}</div>
                                <div className={styles.size}>
                                  {food.food_entry_description.split(food.food_entry_name)[0].includes(":custom:")
                                    ? food.food_entry_description.split(food.food_entry_name)[0].split(":custom:")[1]
                                    : food.food_entry_description.split(food.food_entry_name)[0]}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
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
