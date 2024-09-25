"use client";

import * as React from "react";
import "react-datepicker/dist/react-datepicker.css"; // стили для календаря
import styles from "./index.module.scss";
import { useProfile } from "@/hooks/useProfile";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import Loader from "@/components/ui/loader/Loader";
import { UserFieldsForm } from "./UserFieldsForm/UserFieldsForm";
import { PasswordResetForm } from "./PasswordResetForm/PasswordResetForm";

export function Settings() {
  const { data: profileData, isLoading, isRefetching, refetch } = useProfile();

  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Настройки</h1>

        {isLoading || isRefetching ? (
          <Loader />
        ) : (
          profileData?.id && (
            <div className={styles.forms}>
              <UserFieldsForm profileData={profileData} refetch={refetch} isLoading={isLoading} />
              {profileData.provider === "credentials" && <PasswordResetForm />}
            </div>
          )
        )}
      </div>
    </MotionSection>
  );
}
