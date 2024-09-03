import { CalculatorType } from "@/types/calculator.types";

export function getCalcResultType(type: CalculatorType) {
  const results = {
    tdee: "ккал",
    ibw: "кг",
    bmi: "",
    bmr: "ккал/день",
  };

  return results[type];
}
