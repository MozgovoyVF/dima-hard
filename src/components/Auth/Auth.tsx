"use client";

import { MouseEvent, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { Field } from "@/components/ui/fields/Field";

import { IAuthForm, IRegisterForm } from "@/types/auth.types";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { signIn } from "next-auth/react";
import styles from "./index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

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

  const { mutate } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: IAuthForm | IRegisterForm) => authService.main(isLoginForm ? "login" : "register", data),
    onSuccess() {
      toast.success("Successfully login!");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      push(DASHBOARD_PAGES.PERSONAL_ACCOUNT);
    },
    onError: (error) => {
      console.log(error);
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
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={() => setError("")}>
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
                      {...register("name", { required: "Name is required!" })}
                      id="name"
                      label="Имя:"
                      placeholder="Введите имя:"
                      type="text"
                      state={(errors as FieldErrors<IRegisterForm>).name ? "error" : "success"}
                    />
                    <Field
                      {...register("lastName", { required: "Last name is required!" })}
                      id="lastName"
                      label="Фамилия:"
                      placeholder="Введите фамилию:"
                      type="text"
                      state={(errors as FieldErrors<IRegisterForm>).lastName && "error"}
                    />
                  </>
                )}
                <Field
                  {...register("email", { required: "Email is required!" })}
                  id="email"
                  label="Email:"
                  placeholder="Введите Email:"
                  type="email"
                  state={errors.email && "error"}
                />
                <Field
                  {...register("password", { required: "Password is required!" })}
                  id="password"
                  label="Пароль:"
                  placeholder="Введите пароль:"
                  type="password"
                  state={errors.password && "error"}
                />
                {error && <span className={styles.error}>{error}</span>}
              </motion.div>
              <div className={styles.buttonsBlock}>
                {isLoginForm ? (
                  <button className={styles.button} onClick={() => setIsLoginForm(true)}>
                    Войти
                  </button>
                ) : (
                  <button className={styles.button} onClick={() => setIsLoginForm(false)}>
                    Зарегистрироваться
                  </button>
                )}
                <button className={styles.google} onClick={handleClick}>
                  <FcGoogle />
                  Войти с аккаунтом Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
