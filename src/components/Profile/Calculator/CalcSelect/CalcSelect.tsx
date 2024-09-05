import { CalculatorType } from "@/types/calculator.types";
import React, { Dispatch } from "react";
import Select from "react-select";

interface ICalcSelect {
  setCalcType: Dispatch<React.SetStateAction<CalculatorType>>;
  setResult: () => void;
}

export function CalcSelect({ setCalcType, setResult }: ICalcSelect) {
  const options = [
    { value: "tdee", label: "Расчет общих суточных затрат энергии" },
    // { value: "ibw", label: "Расчет идеального веса тела" },
    { value: "bmi", label: "Расчет индекса массы тела" },
    { value: "bmr", label: "Расчет базовой скорости метаболизма" },
  ];

  return (
    <Select
      defaultValue={options[0]}
      options={options}
      isSearchable={false}
      onChange={(newValue) => {
        newValue?.value && setCalcType(newValue.value as CalculatorType);
        setResult();
      }}
      styles={{
        control: (styles) => ({
          ...styles,
          backgroundColor: "transparent",
          border: "2px solid blueviolet",
          ":hover": { borderColor: "blueviolet" },
          boxShadow: "0 0 12px 4px blueviolet",
        }),
        menu: (styles) => ({
          ...styles,
          backgroundColor: "rgba(138,43,226, 0.9)",
          boxShadow: "0 0 12px 4px blueviolet",
        }),
        singleValue: (styles) => ({ ...styles, color: "white" }),
        menuList: (styles) => ({ ...styles, color: "white", border: "2px solid blueviolet" }),
        container: (styles) => ({ ...styles, width: "100%" }),
        menuPortal: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { isSelected }) => ({
          ...styles,
          ":hover": { backgroundColor: "blueviolet" },
          backgroundColor: isSelected ? "rgba(75,20,126, 1)" : "transparent",
        }),
      }}
    />
  );
}
