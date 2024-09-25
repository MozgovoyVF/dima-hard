"use client";

import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { useFatsecretHandle } from "@/hooks/useFatsecretHandle";
import { useFatsecret } from "@/hooks/useFatsecret";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import Loader from "@/components/ui/loader/Loader";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export function FatSecret() {
  const { error, handleAccessToken, handleRequestToken, link, ref } = useFatsecretHandle();
  const { data, isLoading } = useFatsecret();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <MotionSection>
          <h1 className={styles.title}>FatSecret</h1>
          <div className={styles.content}>
            <p className={styles.text}>
              Ваш аккаунт FatSecret подтвержден!
              <br />
              Если вы хотите отвязать его от Вашего личного кабинета, то перейдите на страницу{" "}
              <Link className={styles.link} href={DASHBOARD_PAGES.SETTINGS}>
                настроек
              </Link>
            </p>
          </div>
        </MotionSection>
      ) : (
        <MotionSection>
          <h1 className={styles.title}>FatSecret</h1>
          <div className={styles.content}>
            {link ? (
              <>
                <div className={styles.buttonBlock}>
                  <Link target="_blank" className={styles.accept} href={link}>
                    Получить код доступа
                  </Link>

                  <button className={styles.button} onClick={handleAccessToken}>
                    Подтвердить код доступа
                  </button>
                </div>

                <input placeholder="Код доступа" ref={ref} type="text" className={styles.input} />
              </>
            ) : (
              <>
                <p className={styles.text}>
                  После подтверждения аккаунта на официальном сайте FatSecret Вы получите код доступа
                  <br />
                  Введите указанный код доступа в появившееся поле ввода и подтвердите его
                </p>
                <button className={styles.button} onClick={() => handleRequestToken()}>
                  Привязать аккаунт FatSecret к профилю
                </button>
              </>
            )}
            {error && <span style={{ color: "red" }}>{error}</span>}
          </div>
        </MotionSection>
      )}
    </>
  );
}
