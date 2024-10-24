"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import Loader from "@/components/ui/loader/Loader";
import { IUserLock } from "@/types/auth.types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserSelect } from "../Users/UserSelect/UserSelect";
import { useCreateTask } from "@/hooks/task/useCreateTask";
import TaskItem from "./TaskItem/TaskItem";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";

export interface IAdminTasks {
  userId: number;
}

export interface IAdminTasksAdd {
  title: string;
  description?: string;
}

export function Tasks() {
  const { data: usersData, isLoading, isRefetching } = useGetAllUsers();
  const { mutateAsync, isPending } = useCreateTask();
  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } = useUpdateTask();
  const [data, setData] = useState<IUserLock | undefined>();
  const [users, setUsers] = useState(usersData);

  const [isShow, setIsShow] = useState(false);
  const [updateTask, setUpdateTask] = useState("");

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IAdminTasks>({ mode: "onSubmit" });

  const {
    register,
    handleSubmit: addHandleSubmit,
    reset,
    formState: { errors: addErrors },
  } = useForm<IAdminTasksAdd>({ mode: "onSubmit" });

  useEffect(() => {
    setUsers(usersData);
    if (usersData) {
      setData((prev) => usersData.find((user) => user.id === prev?.id));
    }
  }, [data, setValue, usersData]);

  const onSubmit: SubmitHandler<IAdminTasks> = async ({ userId }) => {
    if (users) {
      const user = users.find((user) => user.id === userId);
      setData(user);
      setIsShow(false);
    }
  };

  const onAddSubmit: SubmitHandler<IAdminTasksAdd> = async ({ title, description }) => {
    if (data) {
      await mutateAsync({ userId: String(data.id), title, description });
      reset();
      setIsShow(false);
    }
  };

  const handleToggleComplete = async (userId: string, taskId: string, isComplete: boolean) => {
    setUpdateTask(taskId);
    if (userId && taskId) {
      await updateMutateAsync({ userId, taskId, completed: isComplete });
      setUpdateTask("");
    }
    setUpdateTask("");
  };

  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Задачи</h1>

        {isLoading || isRefetching ? (
          <Loader />
        ) : (
          users && (
            <div className={styles.block}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="userId"
                  control={control}
                  rules={{ required: "Пользователь обязателен для выбора" }}
                  render={({ field }) => (
                    <UserSelect
                      onChangeFn={(selectedUser) => {
                        field.onChange(selectedUser);
                      }}
                      options={users.map((user) => ({
                        value: user.id,
                        label: user.name + " " + user.lastName,
                      }))}
                      errors={errors}
                      value={field.value}
                    />
                  )}
                />

                <button className={styles.button} type="submit">
                  Поиск
                </button>
              </form>

              {data && (
                <>
                  {isShow ? (
                    <form onSubmit={addHandleSubmit(onAddSubmit)} className={styles.addForm}>
                      <label className={`${styles.label} ${addErrors.title && styles.error}`}>
                        Название
                        <input
                          className={styles.input}
                          {...register("title", {
                            required: "Поле обязательно для заполнения",
                            maxLength: { value: 40, message: "Максимальная длина названия задачи - 40 символов" },
                          })}
                          placeholder="Введите название ..."
                        />
                      </label>
                      <label className={styles.label}>
                        Описание
                        <input
                          className={styles.input}
                          {...register("description", {
                            maxLength: { value: 200, message: "Максимальная длина описания задачи - 200 символов" },
                          })}
                          placeholder="Введите описание ..."
                        />
                      </label>
                      {addErrors.title && <span className={styles.error}>{addErrors.title.message}</span>}
                      {addErrors.description && <span className={styles.error}>{addErrors.description.message}</span>}
                      <button disabled={isPending} className={styles.button} type="submit">
                        Создать
                      </button>
                    </form>
                  ) : (
                    <div onClick={() => setIsShow(true)} className={styles.addButton}>
                      Добавить задачу
                    </div>
                  )}

                  {data?.task && data?.task?.length > 0 ? (
                    <div className={styles.tasks}>
                      {data.task.map((item) => (
                        <TaskItem
                          key={item.id}
                          item={item}
                          isPending={updateTask === item.id}
                          onToggleComplete={handleToggleComplete}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className={styles.empty}>Задачи отсутствуют</div>
                  )}
                </>
              )}
            </div>
          )
        )}
      </div>
    </MotionSection>
  );
}
