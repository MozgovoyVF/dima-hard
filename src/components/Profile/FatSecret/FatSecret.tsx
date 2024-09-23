"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { useFatsecretHandle } from "@/hooks/useFatsecretHandle";
import { useFatsecret } from "@/hooks/useFatsecret";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useRouter } from "next/navigation";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";

export function FatSecret() {
  const { error, handleAccessToken, handleRequestToken, link, ref } = useFatsecretHandle();
  const { data } = useFatsecret();
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    if (data) {
      push(DASHBOARD_PAGES.PERSONAL_ACCOUNT);
    } else {
      setLoading(false);
    }
  }, [push, data]);

  return (
    <>
      {!loading && (
        <MotionSection>
          <h1 className={styles.title}>Настройки</h1>
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
