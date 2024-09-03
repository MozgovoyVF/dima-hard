"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { FieldErrors, SubmitHandler, useForm, Controller } from "react-hook-form";
import { variants } from "@/constants/framer.constants";
import { BmiType, BmrType, CalculatorType, IbwType, TdeeType } from "@/types/calculator.types";
import { CalcSelect } from "./CalcSelect/CalcSelect";
import { FieldSelect } from "./FieldSelect/FieldSelect";
import { Field } from "@/components/ui/fields/Field";
import { calculatorService } from "@/services/calculator.service";
import { getCalcResultType } from "@/utils/getCalcResultType";

export function Calculator() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TdeeType | BmiType | BmrType | IbwType>({
    mode: "onSubmit",
  });

  const [calcType, setCalcType] = useState<CalculatorType>("tdee");
  const [result, setResult] = useState<number | null>();
  const [error, setError] = useState("");

  console.log(errors);

  const onSubmit: SubmitHandler<TdeeType | BmiType | BmrType | IbwType> = async (data) => {
    try {
      const response = await calculatorService.getCalc(calcType, data);

      setResult(response.data.result);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <motion.section
      key="auth"
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
            <CalcSelect setResult={setResult} setCalcType={setCalcType} />
          </div>
          <form onChange={() => setResult(null)} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Field
              {...register("height", { required: "Height is required!", min: 30, max: 240 })}
              id="height"
              label="Ваш рост:"
              placeholder="Введите Ваш рост"
              type="text"
              isNumber
              state={(errors as FieldErrors<TdeeType | BmiType | BmrType | IbwType>).height ? "error" : "success"}
            />
            {calcType !== "ibw" && (
              <Field
                {...register("weight", { required: "Weight is required!", min: 30, max: 200 })}
                id="weight"
                label="Ваш вес:"
                placeholder="Введите Ваш вес"
                type="text"
                isNumber
                state={(errors as FieldErrors<TdeeType | BmiType | BmrType>).weight ? "error" : "success"}
              />
            )}
            {calcType !== "ibw" && calcType !== "bmi" && (
              <>
                <Field
                  {...register("age", { required: "Age is required!", min: 1, max: 120 })}
                  id="age"
                  label="Ваш возраст:"
                  placeholder="Введите Ваш возраст"
                  type="text"
                  isNumber
                  state={(errors as FieldErrors<TdeeType | BmrType>).age ? "error" : "success"}
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
            <div className={styles.result}>
              Результат расчета: {result} {getCalcResultType(calcType)}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
