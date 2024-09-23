"use client";

import * as React from "react";
import styles from "./index.module.scss";
import { useProfile } from "@/hooks/useProfile";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { MotionSection } from "@/components/ui/motionSection/MotionSection";

interface ISettings {
  name?: string;
  lastName?: string;
  birthday?: Date;
  file?: FileList;
}

export function Settings() {
  const { data, isLoading } = useProfile();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<ISettings>();

  useEffect(() => {
    if (data?.avatarUrl) {
      setSelectedFile(data.avatarUrl);
    } else {
      setSelectedFile("/images/avatars/user.webp");
    }
    setFields({
      name: data?.name,
      lastName: data?.lastName,
      birthday: data?.profile.birthday,
    });
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ISettings>({
    mode: "onSubmit",
    defaultValues: {
      name: fields?.name,
      lastName: fields?.lastName,
      birthday: fields?.birthday,
    },
  });

  const onSubmit: SubmitHandler<ISettings> = async (data) => {
    console.log(data);

    if (data.file && data.file[0]) {
      const imageFile = data.file[0];
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        // await uploadToServer(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];

    console.log(file);

    if (file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/webp"
      ) {
        return setError("Возможные форматы изображений : PNG, JPG, JPEG и WEBP");
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(data?.avatarUrl);
    setSelectedFile(data?.avatarUrl ?? "/images/avatars/user.webp");
    setError("");
  };

  return (
    <MotionSection>
      <div className={styles.content}>
        <h1 className={styles.title}>Настройки</h1>

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
          <div className={styles.row}>
            <div className={styles.label}>Дата рождения</div>
            <input {...register("birthday")} className={styles.value} />
          </div>
          <div className={styles.submits}>
            <button className={styles.buttonSave} type="submit">
              Сохранить изменения
            </button>
            <button className={styles.buttonCancel} onClick={handleClear}>
              Отменить изменения
            </button>
          </div>
        </form>
      </div>
    </MotionSection>
  );
}
