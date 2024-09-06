import React from "react";
import Select from "react-select";

interface IOption {
  value: string;
  label: string;
}

export function FieldSelect({
  options,
  onChangeFn,
  resetResult,
  value,
  type,
}: {
  options: IOption[];
  onChangeFn: (...event: any[]) => void;
  resetResult: () => void;
  value: any;
  type: "gender" | "activity" | "desiredActivity";
}) {
  return (
    <>
      <label htmlFor={type}>
        {type === "gender"
          ? "Ваш пол:"
          : type === "activity"
          ? "Ваша текущая дневная активность:"
          : "Ваша планируемая активность"}
      </label>
      <Select
        id={type}
        placeholder="Выберите..."
        options={options}
        isSearchable={false}
        value={options.find((c) => c.value === value)}
        menuPlacement={type === "desiredActivity" ? "top" : "bottom"}
        onChange={(newValue) => {
          onChangeFn(newValue?.value);
          resetResult();
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
    </>
  );
}
