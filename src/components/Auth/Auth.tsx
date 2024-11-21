"use client";

import { MouseEvent, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Field } from "@/components/ui/fields/Field";

import { IAuthForm, IAuthResponse, IRegisterForm } from "@/types/auth.types";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { signIn } from "next-auth/react";
import styles from "./index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { MotionSection } from "../ui/motionSection/MotionSection";
import Link from "next/link";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export function Auth() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthForm | IRegisterForm>({
    mode: "onSubmit",
  });

  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");

  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: IAuthForm | IRegisterForm) => authService.main(isLoginForm ? "login" : "register", data),
    onSuccess({ data }: { data: IAuthResponse }) {
      toast.success("Авторизация прошла успешно");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      if (data.user.role === "admin") {
        push(DASHBOARD_PAGES.ADMIN_MAIN);
      } else {
        push(DASHBOARD_PAGES.PERSONAL_ACCOUNT);
      }
    },
    onError: (error) => {
      // @ts-ignore //
      setError(error.response.data.error);
    },
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google", {
      redirect: true,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        }),
      callbackUrl: DASHBOARD_PAGES.PERSONAL_ACCOUNT,
    });
  };

  const onSubmit: SubmitHandler<IAuthForm | IRegisterForm> = (data) => {
    mutate(data);
  };

  return (
    <AnimatePresence mode="wait">
      <MotionSection>
        <div className={styles.content}>
          <form
            autoComplete="on"
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => setError("")}
          >
            <div className={styles.heading}>
              <button
                className={`${styles.button} ${isLoginForm && styles.active}`}
                onClick={() => {
                  reset();
                  setError("");
                  setIsLoginForm(true);
                }}
              >
                Вход
              </button>
              <button
                className={`${styles.button} ${!isLoginForm && styles.active}`}
                onClick={() => {
                  reset();
                  setError("");
                  setIsLoginForm(false);
                }}
              >
                Регистрация
              </button>
            </div>
            <motion.div
              key={isLoginForm ? "login" : "register"}
              variants={variants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "linear", duration: 1 }}
              className={styles.inputs}
            >
              {!isLoginForm && (
                <>
                  <Field
                    {...register("name", { required: "Обязательное поле" })}
                    id="name"
                    label="Имя:"
                    placeholder="Введите имя"
                    type="text"
                    autocomplete="given-name"
                    defaultValue=""
                    state={(errors as FieldErrors<IRegisterForm>).name ?? null}
                  />
                  <Field
                    {...register("lastName", { required: "Обязательное поле" })}
                    id="lastName"
                    label="Фамилия:"
                    placeholder="Введите фамилию"
                    type="text"
                    autocomplete="family-name"
                    defaultValue=""
                    state={(errors as FieldErrors<IRegisterForm>).lastName ?? null}
                  />
                </>
              )}
              <Field
                {...register("email", { required: "Обязательное поле" })}
                id="email"
                label="Email:"
                placeholder="Введите Email"
                type="email"
                autocomplete="email"
                defaultValue=""
                state={errors.email ?? null}
              />
              <Field
                {...register("password", { required: "Обязательное поле" })}
                id="password"
                label="Пароль:"
                placeholder="Введите пароль"
                type="password"
                autocomplete="new-password"
                defaultValue=""
                state={errors.password ?? null}
              />
              {error && <span className={styles.error}>{error}</span>}
              {!isLoginForm && (
                <div className={styles.agreement}>
                  Продолжая регистрацию, я соглашаюсь с{" "}
                  <Link href={DASHBOARD_PAGES.USER_AGREEMENT}>Пользовательским соглашением</Link>
                </div>
              )}
            </motion.div>
            <div className={styles.buttonsBlock}>
              {isLoginForm ? (
                <button
                  disabled={isPending || Object.keys(errors).length > 0}
                  className={styles.button}
                  onClick={() => setIsLoginForm(true)}
                >
                  Войти
                </button>
              ) : (
                <button
                  disabled={isPending || Object.keys(errors).length > 0}
                  className={styles.button}
                  onClick={() => setIsLoginForm(false)}
                >
                  Зарегистрироваться
                </button>
              )}
              <button disabled={isPending} className={styles.google} onClick={handleClick}>
                <FcGoogle />
                Войти с аккаунтом Google
              </button>
            </div>
          </form>
        </div>
      </MotionSection>
    </AnimatePresence>
  );
}
