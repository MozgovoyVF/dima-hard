import { calculatorService } from "@/services/calculator.service";
import { CalculatorType, TdeeType, IbwType, BmrType, BmiType } from "@/types/calculator.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch } from "react";
import { UseFormReset } from "react-hook-form";

export const useCalc = (
  type: CalculatorType,
  params: TdeeType | IbwType | BmrType | BmiType
  // reset: UseFormReset<TdeeType | IbwType | BmrType | BmiType>,
  // setError: Dispatch<React.SetStateAction<string>
) => {
  // const { mutate } = useMutation({
  //   mutationKey: ["calc"],
  //   mutationFn: (data: TdeeType | IbwType | BmrType | BmiType) => calculatorService.getCalc(type, data),
  //   onSuccess() {
  //     reset();
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     // @ts-ignore //
  //     setError(error.response.data.error);
  //   },
  // });

  const { data, isLoading, error } = useQuery({
    queryKey: [type],
    queryFn: () => calculatorService.getCalc(type, params),
    retry: false,
  });

  return { data, isLoading, error };
};
