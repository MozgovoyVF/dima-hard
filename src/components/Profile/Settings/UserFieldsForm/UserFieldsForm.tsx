import * as React from "react";
import styles from "./index.module.scss";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { IProfileResponse } from "@/services/profile.service";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useUserFieldsFormHandlers } from "@/hooks/useUserFieldsFormHandlers";
import { BiCalendar } from "react-icons/bi";

registerLocale("ru", ru);

export interface ISettings {
  name?: string;
  lastName?: string;
  birthday?: Date;
  file?: FileList;
}

interface IUserFieldsForm {
  profileData: IProfileResponse;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IProfileResponse | undefined, Error>>;
  isLoading: boolean;
}

export function UserFieldsForm({ profileData, refetch, isLoading }: IUserFieldsForm) {
  const { data: fatsecretData } = useFatsecret();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const {
    handleClear,
    handleFatsecretReset,
    handleFileChange,
    onSubmit,
    handleSubmit,
    register,
    selectedFile,
    error,
    control,
    avatarPending,
    dirtyFields,
    updatePending,
    isPending,
    isSubmit,
  } = useUserFieldsFormHandlers(profileData, refetch);

  return (
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
        <div className={styles.inputContainer}>
          <BiCalendar />
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
                  setTimeout(() => {
                    const saveButton = document.getElementById("saveButton");
                    if (saveButton) {
                      saveButton.focus({ preventScroll: true });
                    }
                  }, 10);
                }}
                placeholderText="Выберите дату"
                dateFormat="dd.MM.yyyy"
                maxDate={new Date()} // Отключает выбор дат в будущем
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                calendarClassName={styles.centeredCalendar}
                readOnly
                onClick={() => setIsCalendarOpen(true)}
                onFocus={() => setIsCalendarOpen(true)}
                open={isCalendarOpen} // Управляем открытием календаря
                onClickOutside={() => setIsCalendarOpen(false)}
              />
            )}
          />
        </div>
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
            isSubmit ||
            isPending
          }
          className={styles.buttonSave}
          type="submit"
          id="saveButton"
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
            isSubmit ||
            isPending
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
          disabled={avatarPending || updatePending || isSubmit || isPending}
          type="button"
          id="fatsecretButton"
          onClick={handleFatsecretReset}
          className={`${styles.button} ${styles.fatsecretButton}`}
        >
          <PiKeyholeFill /> Отвязать аккаунт Fatsecret
        </button>
      )}
    </form>
  );
}
