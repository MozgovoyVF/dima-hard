import React, { useState } from "react";
import styles from "./index.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useResetPassword } from "@/hooks/useResetPassword";

interface IPasswordResetForm {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export function PasswordResetForm() {
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useResetPassword();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<IPasswordResetForm>({ mode: "onSubmit" });

  const newPassword1 = watch("newPassword1");

  const handleChange = () => {};

  const onSubmit: SubmitHandler<IPasswordResetForm> = async (data) => {
    console.log(data);
    if (data.newPassword1 !== data.newPassword2) {
      return setError("Новые пароль не совпадают");
    }
    if (data.oldPassword === data.newPassword1) {
      return setError("Новые и старый пароли не должны совпадать");
    }
    setError(""); // Сбрасываем сообщение об ошибке
    const response = await mutateAsync({ oldPassword: data.oldPassword, newPassword: data.newPassword1 });

    if (typeof response === "object" && response.response?.data) {
      // @ts-ignore
      return setError(response.response?.data.error as string);
    }

    reset();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.row} ${errors.oldPassword && styles.error}`}>
        <div className={styles.label}>Старый пароль</div>
        <input
          {...register("oldPassword", { required: "Введите старый пароль", onChange: handleChange, minLength: 6 })}
          className={styles.value}
        />
      </div>
      <div className={`${styles.row} ${errors.newPassword1 && styles.error}`}>
        <div className={styles.label}>Новый пароль</div>
        <input
          {...register("newPassword1", {
            required: "Введите новый пароль",
            onChange: handleChange,
            minLength: 6,
          })}
          className={styles.value}
        />
      </div>
      <div className={`${styles.row} ${errors.newPassword2 && styles.error}`}>
        <div className={styles.label}>Повторите новый пароль</div>
        <input
          {...register("newPassword2", {
            required: "Повторите новый пароль",
            validate: (value) => {
              return value === newPassword1 || "Пароли не совпадают";
            },
            onChange: handleChange,
            minLength: 6,
          })}
          className={`${styles.value} `}
        />
      </div>
      <span className={styles.error}>
        {Object.keys(errors).length > 0
          ? errors.newPassword2?.type === "validate" || errors.newPassword1?.type === "validate"
            ? "Указанные пароли не совпадают"
            : errors.newPassword1?.type === "minLength" ||
              errors.newPassword2?.type === "minLength" ||
              errors.oldPassword?.type === "minLength"
            ? "Минимальная длина пароля - 6 символов"
            : "Заполните обязательные поля"
          : error || null}
      </span>
      <div className={styles.submits}>
        <button
          disabled={isPending || !(dirtyFields.newPassword1 && dirtyFields.newPassword2 && dirtyFields.oldPassword)}
          className={styles.buttonSave}
          type="submit"
          id="saveButton"
        >
          Изменить пароль
        </button>
      </div>
    </form>
  );
}
