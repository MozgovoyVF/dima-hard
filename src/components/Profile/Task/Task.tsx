"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { useProfile } from "@/hooks/useProfile";
import Loader from "@/components/ui/loader/Loader";
import Link from "next/link";
import { PHONE_NUMBER } from "@/constants/global.constants";
import TaskItem from "@/components/Admin/Tasks/TaskItem/TaskItem";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";

export function Task() {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } = useUpdateTask();

  const [updateTask, setUpdateTask] = useState("");

  const handleToggleComplete = async (userId: string, taskId: string, isComplete: boolean) => {
    setUpdateTask(taskId);

    if (userId && taskId) {
      await updateMutateAsync({ userId, taskId, completed: isComplete });
      setUpdateTask("");
    }

    setUpdateTask("");
  };

  return (
    <>
      {isProfileLoading ? (
        <Loader />
      ) : !profileData?.profile.subscribe ? (
        <MotionSection>
          <h1 className={styles.title}>Мои Задачи</h1>
          <div className={styles.content}>
            <p className={styles.text}>
              В настоящий момент Ваша подписка неактивна!
              <br />
              Для подтверждения Вашего аккаунта FatSecret свяжитесь со мной в{" "}
              <Link className={styles.link} target="_blank" href={`https://t.me/${PHONE_NUMBER}`}>
                Telegram
              </Link>{" "}
              или{" "}
              <Link className={styles.link} target="_blank" href={`tel:${PHONE_NUMBER}`}>
                по телефону
              </Link>
            </p>
          </div>
        </MotionSection>
      ) : profileData.task && profileData.task.length > 0 ? (
        <MotionSection>
          <h1 className={styles.title}>Мои Задачи</h1>
          <div className={styles.content}>
            <div className={styles.tasks}>
              {profileData.task.map((item) => (
                <TaskItem
                  key={item.id}
                  item={item}
                  isPending={updateTask === item.id}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          </div>
        </MotionSection>
      ) : (
        <MotionSection>
          <h1 className={styles.title}>Мои Задачи</h1>
          <div className={styles.content}>
            <div className={styles.empty}>Задачи отсутствуют</div>
          </div>
        </MotionSection>
      )}
    </>
  );
}
