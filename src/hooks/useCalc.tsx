import { calculatorService } from "@/services/calculator.service";
import { CalculatorType, TdeeType, IbwType, BmrType, BmiType } from "@/types/calculator.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch } from "react";
import { UseFormReset } from "react-hook-form";

export const useCalc = (type: CalculatorType, params: TdeeType | IbwType | BmrType | BmiType) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [type],
    queryFn: () => calculatorService.getCalc(type, params),
    retry: false,
  });

  return { data, isLoading, error };
};
