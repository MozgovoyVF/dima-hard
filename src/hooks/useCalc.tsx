import { calculatorService } from "@/services/calculator.service";
import { CalculatorType, TdeeType, IbwType, BmrType, BmiType } from "@/types/calculator.types";
import { useQuery } from "@tanstack/react-query";

export const useCalc = (type: CalculatorType, params: TdeeType | IbwType | BmrType | BmiType) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [type],
    queryFn: () => calculatorService.getCalc(type, params),
    retry: false,
  });

  return { data, isLoading, error };
};
