"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useSendEmail } from "@/hooks/mail/useSendEmail";

interface IFeedbackModal {
  closeFn: () => void;
  isShowModal: boolean;
}

interface IFeedbackForm {
  name: string;
  phone: string;
  type: "telegram" | "whatsapp" | "phone";
}

export const FeedbackModal = ({ closeFn, isShowModal }: IFeedbackModal) => {
  const [isSend, setIsSend] = React.useState(false);
  const { mutateAsync, isPending } = useSendEmail();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IFeedbackForm>({ mode: "onSubmit" });

  useEffect(() => {
    if (isShowModal) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShowModal]);

  const onSubmit: SubmitHandler<IFeedbackForm> = (data) => {
    console.log(data);
    mutateAsync({ name: data.name, phone: data.phone, type: data.type });
    setIsSend(true);
  };

  return (
    <AnimatePresence>
      {isShowModal && (
        <motion.div
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className={styles.modal}
        >
          <button onClick={closeFn} className={styles.closeButton}>
            &times;
          </button>
          <div className={styles.window}>
            {!isSend ? (
              <div className={styles.content}>
                <h2 className={styles.title}>Оставьте заявку, и мы свяжемся с Вами в удобном формате!</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <label className={styles.label}>
                    Имя
                    <input
                      className={styles.input}
                      {...register("name", { required: "Имя обязательно для заполнения" })}
                      placeholder="Введите ваше имя"
                    />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                  </label>

                  <label className={styles.label}>
                    Телефон
                    <InputMask
                      mask="+7 (999) 999-99-99"
                      placeholder="+7 (___) ___-__-__"
                      {...register("phone", { required: "Телефон обязателен для заполнения" })}
                      className={styles.input}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("phone", e.target.value)} // Устанавливает значение для react-hook-form
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                  </label>

                  <div className={styles.label}>
                    Предпочтительный способ связи
                    <label className={styles.radioLabel}>
                      <input
                        className={styles.radio}
                        type="radio"
                        defaultChecked
                        value="phone"
                        {...register("type", { required: "Выберите способ связи" })}
                      />
                      <span className={styles.customRadio}></span>
                      По телефону
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        className={styles.radio}
                        type="radio"
                        value="whatsapp"
                        {...register("type", { required: "Выберите способ связи" })}
                      />
                      <span className={styles.customRadio}></span>В WhatsApp
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        className={styles.radio}
                        type="radio"
                        value="telegram"
                        {...register("type", { required: "Выберите способ связи" })}
                      />
                      <span className={styles.customRadio}></span>В Telegram
                    </label>
                    {errors.type && <span className={styles.error}>{errors.type.message}</span>}
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Отправить
                  </button>
                </form>
              </div>
            ) : (
              <div className={styles.success}>
                <h2 className={styles.title}>
                  Спасибо за Вашу заявку! Я обязательно свяжусь с Вами в ближайшее время!
                </h2>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

FeedbackModal.displayName = "feedbackModal";
