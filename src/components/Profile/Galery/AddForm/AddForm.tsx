import React, { ChangeEvent, Dispatch, useState } from "react";
import styles from "./index.module.scss";
import { useCreateGalery } from "@/hooks/useCreateGalery";
import { useUploadGalery } from "@/hooks/useUploadGalery";
import imageCompression from "browser-image-compression";
import { useForm, SubmitHandler } from "react-hook-form";
import { IGaleryPage } from "../Galery";
import GaleryCarousel from "../GaleryCarousel/GaleryCarousel";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { IGalery } from "@/types/auth.types";

interface IAddForm {
  setIsFilesAdd: Dispatch<React.SetStateAction<boolean>>;
  setSubmitError: Dispatch<React.SetStateAction<string>>;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      | IGalery[]
      | {
          error: string;
        },
      Error
    >
  >;
}

export function AddForm({ setIsFilesAdd, setSubmitError, refetch }: IAddForm) {
  const { mutateAsync: uploadMutateAsync, isPending: isUploadPending } = useUploadGalery();
  const { mutateAsync: createMutateAsync } = useCreateGalery();

  const [selectedFiles, setSelectedFiles] = useState<string[] | []>([]);
  const [selectedFilesList, setSelectedFilesList] = useState<File[] | []>([]);
  const [error, setError] = useState("");

  const [isFilesLoaded, setIsFilesLoaded] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const { register, handleSubmit, reset } = useForm<IGaleryPage>({ mode: "onSubmit" });

  const handleDelete = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setSelectedFilesList((prev) => Array.from(prev).filter((_, i) => i !== index));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFilesAdd(true);
    const files = e.target.files;

    if (files && files.length > 4) {
      setError("Вы можете загрузить не более 4 изображений");
      setIsFilesAdd(false);
      return;
    }

    setError("");

    if (files && files?.[0]) {
      setSelectedFilesList([]);
      setSelectedFiles([]);

      const newFiles: string[] = [];
      const newFilesList: File[] = [];
      const totalFiles = files.length; // Общее количество файлов
      let loadedFiles = 0;

      Array.from(files).forEach((file) => {
        if (
          file.type !== "image/png" &&
          file.type !== "image/jpeg" &&
          file.type !== "image/jpg" &&
          file.type !== "image/webp"
        ) {
          setSelectedFiles([]);
          setSelectedFilesList([]);
          reset();
          setIsFilesAdd(false);
          return setError("Возможные форматы изображений : PNG, JPG, JPEG и WEBP");
        }

        newFilesList.push(file);

        const reader = new FileReader();

        reader.onloadend = () => {
          newFiles.push(reader.result as string);
          loadedFiles++;

          if (loadedFiles === totalFiles) {
            setSelectedFiles((prev) => [...prev, ...newFiles]);
            setSelectedFilesList((prev) => [...prev, ...newFilesList]);
            setIsFilesLoaded(true);
            setIsFilesAdd(false);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const limit = 4 - selectedFiles.length;
    const files = e.target.files;

    if (selectedFilesList.length >= 4) {
      return setError("Максимальное количество изображений не должно превышать 4");
    }

    if (files && files.length > limit) {
      return setError(`Вы можете добавить еще ${limit} файл(а)`);
    }

    if (files) {
      const extraFiles: string[] = [];
      const extraFilesList: File[] = [];
      let filesRead = 0; // Counter for how many files have been read

      Array.from(files).forEach((file) => {
        // Check the file type
        if (
          file.type !== "image/png" &&
          file.type !== "image/jpeg" &&
          file.type !== "image/jpg" &&
          file.type !== "image/webp"
        ) {
          return setError("Возможные форматы изображений : PNG, JPG, JPEG и WEBP");
        }

        extraFilesList.push(file); // Store the file in the array

        const reader = new FileReader();
        reader.onloadend = () => {
          extraFiles.push(reader.result as string); // Store the file result

          filesRead++; // Increment the counter
          // Once all files have been read, update the state
          if (filesRead === files.length) {
            setSelectedFiles((prev) => [...prev, ...extraFiles]);
            setSelectedFilesList((prev) => [...prev, ...extraFilesList]);
            setError(""); // Clear any error messages
          }
        };

        reader.readAsDataURL(file); // Start reading the file
      });
    }
  };

  const onSubmit: SubmitHandler<IGaleryPage> = async (data) => {
    setIsSubmit(true);
    const compressedImages: File[] = [];

    if (selectedFilesList.length > 0) {
      for (const file of selectedFilesList) {
        const imageFile = file;
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 900,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          compressedImages.push(compressedFile);
        } catch (error) {
          setIsSubmit(false);
          setSubmitError("Возникла ошибка при обработке файла");
          console.log(error);
        }
      }
    }

    try {
      const result = await uploadMutateAsync({ files: compressedImages });

      if (!result || result.length !== 0) {
        const urls: string[] = [];

        for (const res of result) {
          urls.push(res.url);
        }

        await createMutateAsync(urls);
        setSelectedFiles([]);
        setSelectedFilesList([]);
        reset();
        refetch();
      } else {
        setSubmitError("Возникла ошибка при загрузке фото");
      }
    } catch (error) {
      setIsSubmit(false);
      return setSubmitError("Возникла ошибка при загрузке файлов, попробуйте снова");
    }

    setIsSubmit(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.galery}>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.buttons}>
          {selectedFiles.length !== 0 ? (
            <label aria-disabled={selectedFiles.length >= 4 || isSubmit} className={styles.file}>
              <input type="file" {...register("extraFiles")} multiple onChange={handleAddFiles} id="extraFile" />
              <span className={styles.fileText}>Добавить еще</span>
            </label>
          ) : (
            <label aria-disabled={selectedFiles.length >= 4 || isSubmit} className={styles.file}>
              <input type="file" {...register("files")} multiple onChange={handleFileChange} id="file" />
              <span className={styles.fileText}>Выберите фотографии</span>
            </label>
          )}
          <button disabled={selectedFiles.length === 0 || isSubmit} className={styles.button}>
            Сохранить
          </button>
        </div>

        {isFilesLoaded && selectedFiles.length > 0 && (
          <div className={styles.images}>
            <GaleryCarousel responsive={selectedFiles} handleDelete={handleDelete} />
          </div>
        )}
      </div>
    </form>
  );
}
