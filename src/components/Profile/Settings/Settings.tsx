"use client";

import * as React from "react";
import "react-datepicker/dist/react-datepicker.css"; // стили для календаря
import styles from "./index.module.scss";
import { useProfile } from "@/hooks/useProfile";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";
import Loader from "@/components/ui/loader/Loader";
import DatePicker, { registerLocale } from "react-datepicker";
import { removeEmptyFields } from "@/utils/removeEmptyFields";
import { ru } from "date-fns/locale";
import "./datepicker.css";
import { useFatsecret } from "@/hooks/useFatsecret";
import { PiKeyholeFill } from "react-icons/pi";
import { useFatsecretReset } from "@/hooks/useFatsecretReset";
import { DeepPartial, IUser } from "@/types/auth.types";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useUpdateAvatar } from "@/hooks/useUpdateAvatar";

registerLocale("ru", ru);

interface ISettings {
  name?: string;
  lastName?: string;
  birthday?: Date;
  file?: FileList;
}

export function Settings() {
  const { data: profileData, isLoading, isRefetching, refetch } = useProfile();
  const { data: fatsecretData, isLoading: fatsecretIsLoading } = useFatsecret();
  const { mutate, isPending } = useFatsecretReset();
  const { mutateAsync: avatarMutate, isPending: avatarPending } = useUpdateAvatar();
  const { mutate: updateMutate, isPending: updatePending, mutateAsync: updateMutateAsync } = useUpdateUser();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileList, setSelectedFileList] = useState<FileList | null>(null);
  const [error, setError] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
    setValue,
    reset,
  } = useForm<ISettings>({
    mode: "onSubmit",
    defaultValues: {
      name: profileData?.name ?? "",
      lastName: profileData?.lastName ?? "",
      birthday: profileData?.profile.birthday ?? undefined,
    },
  });

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name ?? "",
        lastName: profileData.lastName ?? "",
        birthday: profileData.profile.birthday ?? undefined,
        file: undefined,
      });
      setSelectedFile(profileData.avatarUrl || "/images/avatars/user.webp");
      setSelectedFileList(null);
    }
  }, [profileData, setValue, refetch]);

  const onSubmit: SubmitHandler<ISettings> = async (data) => {
    setIsSubmit(true);
    let url = "";
    console.log(dirtyFields, data.file);
    console.log(selectedFileList);
    if (selectedFileList && selectedFileList[0]) {
      const imageFile = selectedFileList[0];
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 100,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        if (profileData?.id) {
          const response = await avatarMutate({ file: compressedFile, id: profileData?.id });
          url = response.url || "";
        }
      } catch (error) {
        setIsSubmit(false);
        setError("Возникла ошибка при обработке файла");
        console.log(error);
      }
    }

    if (url || Object.entries(dirtyFields).length !== 0) {
      const userId = profileData?.id;

      const updateFields = Object.entries(data)
        .filter(([key, value]) => dirtyFields.hasOwnProperty(key))
        .reduce((acc, [key, value]) => {
          (acc as any)[key] = value;
          return acc;
        }, {} as Record<string, any>);

      const userUpdateFields: DeepPartial<IUser> = {
        id: userId,
        name: updateFields.name,
        lastName: updateFields.lastName,
        profile: {
          birthday: updateFields.birthday,
        },
      };
      let result = removeEmptyFields(userUpdateFields);

      if (userUpdateFields.profile?.birthday) {
        result = Object.assign({}, result, { profile: { birthday: userUpdateFields.profile?.birthday } });
      }

      if (url) {
        result = Object.assign({}, result, { avatarUrl: url });
      }

      await updateMutateAsync(result);

      refetch();
    } else {
      setError("Возникла ошибка при загрузке аватарки");
    }
    setIsSubmit(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];

    if (e.target.files && file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/webp"
      ) {
        return setError("Возможные форматы изображений : PNG, JPG, JPEG и WEBP");
      }

      setSelectedFileList(e.target.files);

      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedFile(profileData?.avatarUrl ?? "/images/avatars/user.webp");
    reset({
      name: profileData?.name ?? "",
      lastName: profileData?.lastName ?? "",
      birthday: profileData?.profile.birthday ?? undefined,
      file: undefined,
    });
    setSelectedFileList(null);
    setError("");
  };

  const handleFatsecretBlock = () => {
    try {
      if (profileData?.id) mutate(profileData?.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Настройки</h1>

        {isLoading || isRefetching ? (
          <Loader />
        ) : (
          profileData?.id && (
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.avatar}>
                <label className={styles.file}>
                  <input type="file" {...register("file")} onChange={handleFileChange} id="file" />
                  <span className={styles.fileText}>Выберите аватарку</span>
                </label>
                {isLoading ? (
                  <div className={styles.imageSkeleton}></div>
                ) : (
                  selectedFile && (
                    <div className={styles.image}>
                      <Image src={selectedFile} alt="Preview" width={50} height={50} />
                    </div>
                  )
                )}
              </div>
              {error && <span className={styles.error}>{error}</span>}
              <div className={styles.row}>
                <div className={styles.label}>Имя</div>
                <input {...register("name")} className={styles.value} />
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Фамилия</div>
                <input {...register("lastName")} className={styles.value} />
              </div>
              <div className={`${styles.row} ${styles.datepickerContainer}`}>
                {isCalendarOpen && <div className={styles.overlay} onClick={() => setIsCalendarOpen(false)}></div>}
                <label className={styles.label} htmlFor="birthDate">
                  Дата рождения
                </label>
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      id="birthday"
                      locale="ru"
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                        setIsCalendarOpen(false);
                      }}
                      placeholderText="Выберите дату"
                      dateFormat="dd.MM.yyyy"
                      maxDate={new Date()} // Отключает выбор дат в будущем
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      calendarClassName={styles.centeredCalendar}
                    />
                  )}
                />
              </div>
              <div className={styles.submits}>
                <button
                  disabled={
                    (!dirtyFields.name &&
                      !dirtyFields.lastName &&
                      !dirtyFields.birthday &&
                      selectedFile === profileData.avatarUrl) ||
                    avatarPending ||
                    updatePending ||
                    !!error ||
                    isSubmit
                  }
                  className={styles.buttonSave}
                  type="submit"
                >
                  Сохранить изменения
                </button>
                <button
                  disabled={
                    (!dirtyFields.name &&
                      !dirtyFields.lastName &&
                      !dirtyFields.birthday &&
                      selectedFile === profileData.avatarUrl) ||
                    avatarPending ||
                    updatePending ||
                    !!error ||
                    isSubmit
                  }
                  type="button"
                  className={styles.buttonCancel}
                  onClick={handleClear}
                >
                  Отменить изменения
                </button>
              </div>
              {fatsecretData && (
                <button
                  disabled={avatarPending || updatePending || isSubmit}
                  type="button"
                  onClick={handleFatsecretBlock}
                  className={`${styles.button} ${styles.fatsecretButton}`}
                >
                  <PiKeyholeFill /> Отвязать аккаунт Fatsecret
                </button>
              )}
            </form>
          )
        )}
      </div>
    </MotionSection>
  );
}
