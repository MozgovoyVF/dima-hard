import { removeEmptyFields } from "@/utils/removeEmptyFields";
import { useFatsecretReset } from "@/hooks/useFatsecretReset";
import { DeepPartial, IUser } from "@/types/auth.types";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useUpdateAvatar } from "@/hooks/useUpdateAvatar";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { ISettings } from "@/components/Profile/Settings/UserFieldsForm/UserFieldsForm";
import { IProfileResponse } from "@/services/profile.service";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

export const useUserFieldsFormHandlers = (
  profileData: IProfileResponse,
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IProfileResponse | undefined, Error>>
) => {
  const { isPending, mutateAsync } = useFatsecretReset();
  const { mutateAsync: avatarMutate, isPending: avatarPending } = useUpdateAvatar();
  const { isPending: updatePending, mutateAsync: updateMutateAsync } = useUpdateUser();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileList, setSelectedFileList] = useState<FileList | null>(null);
  const [error, setError] = useState("");
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
  }, [profileData, setValue, refetch, reset]);

  const onSubmit: SubmitHandler<ISettings> = async (data) => {
    setIsSubmit(true);
    let url = "";

    if (selectedFileList && selectedFileList[0]) {
      const imageFile = selectedFileList[0];
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 300,
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

  const handleFatsecretReset = async () => {
    try {
      if (profileData?.id) await mutateAsync(profileData?.id);
      const button = document.getElementById("fatsecretButton");
      if (button !== null) button.style.display = "none";
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onSubmit,
    handleFileChange,
    handleClear,
    handleFatsecretReset,
    handleSubmit,
    register,
    selectedFile,
    error,
    control,
    dirtyFields,
    avatarPending,
    updatePending,
    isSubmit,
    isPending,
  };
};
