import React, { Dispatch } from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormMeasure } from "./Measure";

interface IMeasureForm {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors: FieldErrors<IFormMeasure>;
  register: UseFormRegister<IFormMeasure>;
  setIsShow: Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
}

export function MeasureForm({ onSubmit, errors, register, setIsShow, isPending }: IMeasureForm) {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmit}
      className={styles.form}
    >
      <label className={`${styles.label} ${errors.chest && styles.error}`}>
        <span className={styles.subtitle}>Обхват груди</span>
        <input
          {...register("chest", {
            required: "Обязательное поле",
            min: { value: 10, message: "Минимальное значение - 10 см" },
            max: { value: 200, message: "Максимальное значение - 200 см" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Допустимы только цифры",
            },
          })}
          className={styles.value}
          inputMode="numeric" // Предлагает цифровую клавиатуру на мобильных устройствах
          onInput={(e) => {
            const input = e.target as HTMLInputElement; // Явное приведение к типу HTMLInputElement
            input.value = input.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
          }}
          placeholder="Введите значение в см"
        />
        {errors.chest && <span className={styles.errorMessage}>{errors.chest.message}</span>}
      </label>
      <label className={`${styles.label} ${errors.arms && styles.error}`}>
        <span className={styles.subtitle}>Обхват рук</span>
        <input
          {...register("arms", {
            required: "Обязательное поле",
            min: { value: 10, message: "Минимальное значение - 10 см" },
            max: { value: 200, message: "Максимальное значение - 200 см" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Допустимы только цифры",
            },
          })}
          className={styles.value}
          inputMode="numeric" // Предлагает цифровую клавиатуру на мобильных устройствах
          onInput={(e) => {
            const input = e.target as HTMLInputElement; // Явное приведение к типу HTMLInputElement
            input.value = input.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
          }}
          placeholder="Введите значение в см"
        />
        {errors.arms && <span className={styles.errorMessage}>{errors.arms.message}</span>}
      </label>
      <label className={`${styles.label} ${errors.waist && styles.error}`}>
        <span className={styles.subtitle}>Обхват талии</span>
        <input
          {...register("waist", {
            required: "Обязательное поле",
            min: { value: 10, message: "Минимальное значение - 10 см" },
            max: { value: 200, message: "Максимальное значение - 200 см" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Допустимы только цифры",
            },
          })}
          className={styles.value}
          inputMode="numeric" // Предлагает цифровую клавиатуру на мобильных устройствах
          onInput={(e) => {
            const input = e.target as HTMLInputElement; // Явное приведение к типу HTMLInputElement
            input.value = input.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
          }}
          placeholder="Введите значение в см"
        />
        {errors.waist && <span className={styles.errorMessage}>{errors.waist.message}</span>}
      </label>
      <label className={`${styles.label} ${errors.lowerAbdomen && styles.error}`}>
        <span className={styles.subtitle}>Обхват низа живота</span>
        <input
          {...register("lowerAbdomen", {
            required: "Обязательное поле",
            min: { value: 10, message: "Минимальное значение - 10 см" },
            max: { value: 200, message: "Максимальное значение - 200 см" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Допустимы только цифры",
            },
          })}
          className={styles.value}
          inputMode="numeric" // Предлагает цифровую клавиатуру на мобильных устройствах
          onInput={(e) => {
            const input = e.target as HTMLInputElement; // Явное приведение к типу HTMLInputElement
            input.value = input.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
          }}
          placeholder="Введите значение в см"
        />
        {errors.lowerAbdomen && <span className={styles.errorMessage}>{errors.lowerAbdomen.message}</span>}
      </label>
      <label className={`${styles.label} ${errors.hips && styles.error}`}>
        <span className={styles.subtitle}>Обхват бедер</span>
        <input
          {...register("hips", {
            required: "Обязательное поле",
            min: { value: 10, message: "Минимальное значение - 10 см" },
            max: { value: 200, message: "Максимальное значение - 200 см" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Допустимы только цифры",
            },
          })}
          className={styles.value}
          inputMode="numeric" // Предлагает цифровую клавиатуру на мобильных устройствах
          onInput={(e) => {
            const input = e.target as HTMLInputElement; // Явное приведение к типу HTMLInputElement
            input.value = input.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
          }}
          placeholder="Введите значение в см"
        />
        {errors.hips && <span className={styles.errorMessage}>{errors.hips.message}</span>}
      </label>
      <label className={`${styles.label} ${errors.legsUnderButtock && styles.error}`}>
        <span className={styles.subtitle}>Обхват ноги под ягодицами</span>
        <input
          {...register("legsUnderButtock", {
            required: "Обязательное поле",
            min: { value: 10, message: "Минимальное значение - 10 см" },
            max: { value: 200, message: "Максимальное значение - 200 см" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Допустимы только цифры",
            },
          })}
          className={styles.value}
          inputMode="numeric" // Предлагает цифровую клавиатуру на мобильных устройствах
          onInput={(e) => {
            const input = e.target as HTMLInputElement; // Явное приведение к типу HTMLInputElement
            input.value = input.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
          }}
          placeholder="Введите значение в см"
        />
        {errors.legsUnderButtock && <span className={styles.errorMessage}>{errors.legsUnderButtock.message}</span>}
      </label>
      <label className={`${styles.label} ${errors.calves && styles.error}`}>
        <span className={styles.subtitle}>Обхват икры</span>
        <input
          {...register("calves", {
            required: "Обязательное поле",
            min: { value: 10, message: "Минимальное значение - 10 см" },
            max: { value: 200, message: "Максимальное значение - 200 см" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Допустимы только цифры",
            },
          })}
          className={styles.value}
          inputMode="numeric" // Предлагает цифровую клавиатуру на мобильных устройствах
          onInput={(e) => {
            const input = e.target as HTMLInputElement; // Явное приведение к типу HTMLInputElement
            input.value = input.value.replace(/[^0-9]/g, ""); // Оставляем только цифры
          }}
          placeholder="Введите значение в см"
        />
        {errors.calves && <span className={styles.errorMessage}>{errors.calves.message}</span>}
      </label>
      <div className={styles.buttonsBlock}>
        <button disabled={isPending} type="submit" className={styles.button}>
          Сохранить
        </button>
        <button disabled={isPending} onClick={() => setIsShow(false)} type="button" className={styles.button}>
          Скрыть форму
        </button>
      </div>
    </motion.form>
  );
}
