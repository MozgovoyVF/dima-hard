"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { FieldErrors, SubmitHandler, useForm, Controller } from "react-hook-form";
import { variants } from "@/constants/framer.constants";
import { BmiType, BmrType, CalculatorType, TdeeType } from "@/types/calculator.types";
import { CalcSelect } from "./CalcSelect/CalcSelect";
import { FieldSelect } from "./FieldSelect/FieldSelect";
import { Field } from "@/components/ui/fields/Field";
import { calculatorService } from "@/services/calculator.service";
import { getCalcResultType } from "@/utils/getCalcResultType";
import { BiSave } from "react-icons/bi";
import { useProfile } from "@/hooks/useProfile";
import { profileService } from "@/services/profile.service";
import { toast } from "sonner";
import { useSaveResult } from "@/hooks/useSaveResult";

export function Calculator() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TdeeType | BmiType | BmrType>({
    mode: "onSubmit",
  });

  const [calcType, setCalcType] = useState<CalculatorType>("tdee");
  const [result, setResult] = useState<number | null>();
  const [serverError, setServerError] = useState("");
  const { data } = useProfile();
  const { mutate, isPending } = useSaveResult();

  const saveResult = () => {
    if (!result) {
      return setServerError("Произошла непредвиденная ошибка");
    }
    try {
      mutate({ calcType, result });

      reset();
      toast.success("Результат успешно сохранен");
      return setResult(null);
    } catch (error) {
      return toast.error("Произошла ошибка при сохранении");
    }
  };

  const onSubmit: SubmitHandler<TdeeType | BmiType | BmrType> = async (data) => {
    try {
      const response = await calculatorService.getCalc(calcType, data);

      setResult(response.data.result);
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  return (
    <motion.section
      key="calc"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "easi-in-out", duration: 0.3 }}
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <CalcSelect
              setResult={() => {
                setResult(null);
                reset();
              }}
              setCalcType={setCalcType}
            />
          </div>
          {data?.profile[calcType] && (
            <div className={styles.currentResult}>
              Cохраненный результат расчета:
              <br />
              <b>
                {data?.profile[calcType].toLocaleString("de-DE")} {getCalcResultType(calcType)}
              </b>
            </div>
          )}
          <form
            onChange={() => {
              setResult(null);
              setServerError("");
            }}
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Field
              {...register("height", {
                required: "Обязательное поле",
                min: { value: 30, message: "Минимальное значение роста : 30 см" },
                max: { value: 240, message: "Максимальное значение роста : 240 см" },
              })}
              id="height"
              label="Рост:"
              placeholder="Введите Ваш рост, см"
              type="number"
              isNumber
              state={(errors as FieldErrors<TdeeType | BmiType | BmrType>).height ?? null}
            />
            <Field
              {...register("weight", {
                required: "Обязательное поле",
                min: { value: 30, message: "Минимальное значение веса : 30 кг" },
                max: { value: 200, message: "Максимальное значение веса : 200 кг" },
              })}
              id="weight"
              label="Вес:"
              placeholder="Введите Ваш вес, кг"
              type="number"
              isNumber
              state={(errors as FieldErrors<TdeeType | BmiType | BmrType>).weight ?? null}
            />

            {calcType !== "bmi" && (
              <>
                <Field
                  {...register("age", {
                    required: "Обязательное поле",
                    min: { value: 1, message: "Минимальное значение возраста : 1 год" },
                    max: { value: 120, message: "Максимальное значение возраста : 120 лет" },
                  })}
                  id="age"
                  label="Возраст:"
                  placeholder="Введите Ваш возраст"
                  type="number"
                  isNumber
                  state={(errors as FieldErrors<TdeeType | BmrType>).age ?? null}
                />

                <Controller
                  name="gender"
                  control={control}
                  defaultValue="male"
                  render={({ field }) => (
                    <FieldSelect
                      type="gender"
                      onChangeFn={field.onChange}
                      resetResult={() => setResult(null)}
                      options={[
                        { value: "male", label: "Мужской" },
                        { value: "female", label: "Женский" },
                      ]}
                      {...field}
                    />
                  )}
                />
              </>
            )}
            {calcType === "tdee" && (
              <Controller
                name="activityLevel"
                defaultValue="sedentary"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldSelect
                    type="activity"
                    onChangeFn={onChange}
                    resetResult={() => setResult(null)}
                    value={value}
                    options={[
                      { value: "sedentary", label: "Очень низкая" },
                      { value: "lightlyActive", label: "Низкая" },
                      { value: "active", label: "Средняя" },
                      { value: "veryActive", label: "Высокая" },
                    ]}
                  />
                )}
              />
            )}
            <button disabled={!!result} className={styles.button} type="submit">
              Получить результат
            </button>
          </form>
          {result && (
            <>
              <div className={styles.result}>
                Результат расчета: {result} {getCalcResultType(calcType)}
              </div>
              <button onClick={saveResult} className={styles.save}>
                <BiSave className={styles.saveIcon}/>
                Сохранить результат в профиль
              </button>
            </>
          )}
          {serverError && (
            <div className={styles.error}>Возникла ошибка сервера. Пожалуйста, попробуйте повторить запрос позже</div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
