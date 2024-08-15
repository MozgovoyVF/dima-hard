"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/buttons/Button";
import { Field } from "@/components/ui/fields/Field";

import { IAuthForm } from "@/types/auth.types";
import { authService } from "@/services/auth.service";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export function Auth() {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: "onChange",
  });

  const [isLoginForm, setIsLoginForm] = useState(false);

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: IAuthForm) =>
      authService.main(isLoginForm ? "login" : "register", data),
    onSuccess() {
      toast.success("Successfully login!");
      reset();
      push(DASHBOARD_PAGES.HOME);
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  };

  const refresh = () => {
    authService.getNewTokens();
  };
  const logout = () => {
    authService.logout();
  };

  return (
    <div className="flex min-h-screen">
      <form
        className="w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading title="Auth" />
        <Field
          {...register("email", { required: "Email is required!" })}
          id="email"
          label="Email:"
          placeholder="Enter email:"
          type="email"
          extra="mb-6"
        />
        <Field
          {...register("password", { required: "Password is required!" })}
          id="password"
          label="Password:"
          placeholder="Enter password:"
          type="password"
          extra="mb-6"
        />
        <div className="flex items-center gap-5 justify-center">
          <Button onClick={() => setIsLoginForm(true)}>Login</Button>
          <Button onClick={() => setIsLoginForm(false)}>Register</Button>
          <Button onClick={() => refresh()}>Refresh</Button>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      </form>
    </div>
  );
}
