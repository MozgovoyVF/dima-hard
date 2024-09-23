"use client";

import React from "react";
import styles from "./index.module.scss";
import { FieldErrors, useForm, Controller } from "react-hook-form";
import { BmiType, BmrType, TdeeType } from "@/types/calculator.types";
import { CalcSelect } from "./CalcSelect/CalcSelect";
import { FieldSelect } from "./FieldSelect/FieldSelect";
import { Field } from "@/components/ui/fields/Field";
import { getCalcResultType } from "@/utils/getCalcResultType";
import { BiSave } from "react-icons/bi";
import { useProfile } from "@/hooks/useProfile";
import { useCalculatorHandlers } from "@/hooks/useCalculatorHandlers";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";

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

  const { data } = useProfile();
  const {
    saveResult,
    onSubmit,
    setDesiredResult,
    setResult,
    setCalcType,
    calcType,
    setServerError,
    desiredResult,
    result,
    serverError,
    isPending,
  } = useCalculatorHandlers({ reset });

  return (
    <MotionSection>
      <div className={styles.content}>
        <div className={styles.heading}>
          <CalcSelect
            setResult={() => {
              setResult(null);
              setDesiredResult(null);
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
            setDesiredResult(null);
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
          {calcType === "tdee" && (
            <Field
              {...register("desired_weight", {
                required: "Обязательное поле",
                min: { value: 30, message: "Минимальное значение веса : 30 кг" },
                max: { value: 200, message: "Максимальное значение веса : 200 кг" },
              })}
              id="desired_weight"
              label="Желаемый вес:"
              placeholder="Введите желаемый вес, кг"
              type="number"
              isNumber
              state={(errors as FieldErrors<TdeeType>).desired_weight ?? null}
            />
          )}

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
                    resetResult={() => {
                      setResult(null);
                      return setDesiredResult(null);
                    }}
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
            <>
              <Controller
                name="activityLevel"
                defaultValue="sedentary"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldSelect
                    type="activity"
                    onChangeFn={onChange}
                    resetResult={() => {
                      setResult(null);
                      return setDesiredResult(null);
                    }}
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
              <Controller
                name="desiredActivityLevel"
                defaultValue="sedentary"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldSelect
                    type="desiredActivity"
                    onChangeFn={onChange}
                    resetResult={() => {
                      setDesiredResult(null);
                      return setResult(null);
                    }}
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
            </>
          )}
          <button disabled={!!result || Object.keys(errors).length !== 0} className={styles.button} type="submit">
            Получить результат
          </button>
        </form>
        {result && (
          <>
            <div className={styles.result}>
              Результат расчета: {result} {getCalcResultType(calcType)}
            </div>
            {desiredResult && result - desiredResult !== 0 && (
              <div className={styles.result}>
                Необходимый{" "}
                <span className={result - desiredResult < 0 ? styles.positive : styles.negative}>
                  {result - desiredResult < 0 ? "профицит" : "дефицит"}
                </span>{" "}
                калорий: {Math.abs(result - desiredResult)} {getCalcResultType(calcType)}
              </div>
            )}
            <button onClick={saveResult} disabled={isPending} className={styles.save}>
              <BiSave className={styles.saveIcon} />
              Сохранить результат в профиль
            </button>
          </>
        )}
        {serverError && (
          <div className={styles.error}>Возникла ошибка сервера. Пожалуйста, попробуйте повторить запрос позже</div>
        )}
      </div>
    </MotionSection>
  );
}
