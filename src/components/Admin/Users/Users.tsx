"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserSelect } from "./UserSelect/UserSelect";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import { DeepPartial, IUser, IUserLock } from "@/types/auth.types";
import Loader from "@/components/ui/loader/Loader";
import { UserFieldsSelect } from "./UserFieldsSelect/UserFieldsSelect";
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { PiKeyholeFill } from "react-icons/pi";
import { useFatsecretReset } from "@/hooks/useFatsecretReset";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useFatsecretRequest } from "@/hooks/useFatsecretRequest";
import { TFatSecretProfile } from "@/types/fatsecret.types";
import { useFatsecretUsers } from "@/hooks/useFatsecretUsers";
import { convertDaysToDate } from "@/utils/convertDaysToDate";

export interface IAdminUsers {
  userId: number;
}

export interface IAdminUserUpdate extends DeepPartial<IUserLock> {}

export function Users() {
  const { data: usersData, isLoading, isRefetching } = useGetAllUsers();
  const {
    data: fatsecretData,
    isLoading: isfatsecretLoading,
    isRefetching: isFatsecretRefetching,
  } = useFatsecretUsers();

  const { mutate, isPending } = useFatsecretReset();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateUser();
  const { mutateAsync, isPending: fatsecretPending } = useFatsecretRequest<"profile", TFatSecretProfile>();

  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<IAdminUsers>({ mode: "onSubmit" });

  const [data, setData] = useState<IUserLock | undefined>();
  const [users, setUsers] = useState(usersData);
  const [fatsecretProfile, setFatsecretProfile] = useState<TFatSecretProfile | undefined>();

  const {
    handleSubmit: handleUpdateSubmit,
    control: updateControl,
    setValue,
    reset,
    formState: { errors: updateErrors, dirtyFields },
  } = useForm<IAdminUserUpdate>({
    mode: "onSubmit",
    defaultValues: {
      role: data?.role,
      profile: {
        subscribe: data?.profile.subscribe,
      },
    },
  });

  useEffect(() => {
    setValue("role", data?.role);
    setValue("profile.subscribe", data?.profile.subscribe || false);
    setUsers(usersData);
    if (usersData) {
      setData((prev) => usersData.find((user) => user.id === prev?.id));
    }
  }, [data, setValue, usersData]);

  const onSubmit: SubmitHandler<IAdminUsers> = async ({ userId }) => {
    reset();
    setFatsecretProfile(undefined);
    if (users) {
      const user = users.find((user) => user.id === userId);
      setData(user);

      if (user?.fatsecret && fatsecretData) {
        const fatsecretUser = fatsecretData.find((user) => user.id === userId);

        if (fatsecretUser && fatsecretUser.fatsecret.secret && fatsecretUser.fatsecret.token) {
          const result = await mutateAsync({
            request: "profile",
            token: fatsecretUser.fatsecret.token,
            secret: fatsecretUser.fatsecret.secret,
          });

          setFatsecretProfile(result);
        } else {
          setFatsecretProfile(undefined);
        }
      }
    }
  };

  const onUpdateSubmit: SubmitHandler<IAdminUserUpdate> = (data) => {
    if (Object.entries(dirtyFields).length !== 0) {
      const userId = getValues().userId;
      const updateFields: DeepPartial<IUser> = Object.entries(data)
        .filter(([key, value]) => dirtyFields.hasOwnProperty(key))
        .reduce((acc, [key, value]) => {
          (acc as any)[key] = value;
          return acc;
        }, {} as DeepPartial<IUser>);

      mutateUpdate({
        ...updateFields,
        id: userId,
        profile: {
          ...updateFields.profile,
          subscribe: !!updateFields.profile?.subscribe,
        },
      });
    }
  };

  const handleFatsecretBlock = () => {
    try {
      if (data?.id) mutate(data?.id);
      if (!isPending) {
        setData(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Изменение данных пользователей</h1>

        {isLoading || isfatsecretLoading ? (
          <Loader />
        ) : users ? (
          <>
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

            {isRefetching || fatsecretPending ? (
              <Loader />
            ) : (
              data?.id && (
                <form className={styles.table} onSubmit={handleUpdateSubmit(onUpdateSubmit)}>
                  <div className={styles.row}>
                    <div className={styles.label}>Аватарка</div>
                    <div className={styles.value}>
                      <Image
                        src={data?.avatarUrl ? data.avatarUrl : "/images/avatars/user.webp"}
                        alt="profile"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Имя</div>
                    <div className={styles.value}>{data.name}</div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Фамилия</div>
                    <div className={styles.value}>{data.lastName}</div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Email</div>
                    <div className={styles.value}>{data.email}</div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Роль</div>
                    <div className={styles.value}>
                      <Controller
                        name="role"
                        control={updateControl}
                        rules={{ required: "Роль обязательна для выбора" }}
                        render={({ field, fieldState: { error } }) => (
                          <UserFieldsSelect<Pick<IUserLock, "role">["role"]>
                            onChangeFn={(role) => {
                              field.onChange(role);
                            }}
                            options={[
                              { value: "admin", label: "Администратор" },
                              { value: "user", label: "Пользователь" },
                            ]}
                            errors={error}
                            value={field.value ?? null}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Провайдер</div>
                    <div className={styles.value}>
                      {data.provider === "credentials" ? (
                        <span className={styles.provider}>
                          <MdOutlineEmail /> Email и пароль
                        </span>
                      ) : (
                        <span className={styles.provider}>
                          <FcGoogle />
                          Google
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Fatsecret</div>
                    <div className={styles.value}>
                      {data.fatsecret ? (
                        <span className={styles.fatsecret}>
                          <PiKeyholeFill /> Аккаунт привязан
                        </span>
                      ) : (
                        <span className={styles.fatsecret}>
                          <PiKeyholeFill />
                          Аккаунт не привязан
                        </span>
                      )}
                    </div>
                  </div>
                  {fatsecretProfile && (
                    <>
                      <div className={styles.row}>
                        <div className={styles.label}>Рост</div>
                        <div className={styles.value}>{Number(fatsecretProfile.profile.height_cm)} см</div>
                      </div>
                      <div className={styles.row}>
                        <div className={styles.label}>Желаемый вес</div>
                        <div className={styles.value}>{Number(fatsecretProfile.profile.goal_weight_kg)} кг</div>
                      </div>
                      <div className={styles.row}>
                        <div className={styles.label}>Текущий вес</div>
                        <div className={styles.value}>{Number(fatsecretProfile.profile.last_weight_kg)} кг</div>
                      </div>
                      <div className={styles.row}>
                        <div className={styles.label}>Дата последнего взвешивания</div>
                        <div className={styles.value}>
                          {convertDaysToDate(Number(fatsecretProfile.profile.last_weight_date_int))}
                        </div>
                      </div>
                    </>
                  )}
                  <div className={styles.row}>
                    <div className={styles.label}>Подписка</div>
                    <div className={styles.value}>
                      <Controller
                        name="profile.subscribe"
                        control={updateControl}
                        render={({ field, fieldState: { error } }) => (
                          <UserFieldsSelect<boolean | null>
                            onChangeFn={(subscribe) => {
                              field.onChange(subscribe);
                            }}
                            options={[
                              { value: true, label: "Активна" },
                              { value: false, label: "Не активна" },
                            ]}
                            errors={error}
                            value={field.value ?? null}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className={styles.buttonsBlock}>
                    {data.fatsecret && (
                      <button
                        type="button"
                        onClick={handleFatsecretBlock}
                        className={`${styles.button} ${styles.fatsecretButton}`}
                      >
                        <PiKeyholeFill /> Отвязать Fatsecret
                      </button>
                    )}
                    <button disabled={isPendingUpdate} type="submit" className={styles.button}>
                      Сохранить
                    </button>
                  </div>
                </form>
              )
            )}
          </>
        ) : (
          <div>Ошибка базы данных</div>
        )}
      </div>
    </MotionSection>
  );
}
