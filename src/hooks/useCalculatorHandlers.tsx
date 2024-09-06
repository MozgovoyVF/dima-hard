import { calculatorService } from "@/services/calculator.service";
import { CalculatorType, TdeeType, BmiType, BmrType } from "@/types/calculator.types";
import { useState } from "react";
import { SubmitHandler, UseFormReset } from "react-hook-form";
import { toast } from "sonner";
import { useSaveResult } from "./useSaveResult";

export function useCalculatorHandlers({ reset }: { reset: UseFormReset<TdeeType | BmiType | BmrType> }) {
  const { mutate, isPending } = useSaveResult();
  const [result, setResult] = useState<number | null>();
  const [desiredResult, setDesiredResult] = useState<number | null>();
  const [calcType, setCalcType] = useState<CalculatorType>("tdee");
  const [serverError, setServerError] = useState("");

  const saveResult = () => {
    if (!result) {
      return setServerError("Произошла непредвиденная ошибка");
    }
    try {
      if (desiredResult) {
        mutate({ calcType, result, desiredResult });
      } else {
        mutate({ calcType, result });
      }

      reset();
      toast.success("Результат успешно сохранен");
      setResult(null);
      return setDesiredResult(null);
    } catch (error) {
      return toast.error("Произошла ошибка при сохранении");
    }
  };

  const onSubmit: SubmitHandler<TdeeType | BmiType | BmrType> = async (data) => {
    try {
      if (data.hasOwnProperty("desired_weight")) {
        const desiredResponse = await calculatorService.getCalc(calcType, {
          ...data,
          // @ts-ignore
          weight: data?.desired_weight,
          // @ts-ignore
          activityLevel: data?.desiredActivityLevel,
        });
        setDesiredResult(desiredResponse.data.result);
      }
      const response = await calculatorService.getCalc(calcType, data);

      setResult(response.data.result);
    } catch (error: any) {
      setServerError(error.message);
    }
  };
  return {
    saveResult,
    onSubmit,
    setResult,
    setDesiredResult,
    setCalcType,
    calcType,
    setServerError,
    result,
    desiredResult,
    serverError,
    isPending,
  };
}
