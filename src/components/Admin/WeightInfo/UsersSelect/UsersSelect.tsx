import React from "react";
import { FieldErrors } from "react-hook-form";
import Select from "react-select";
import { IWeightInfoForm } from "../WeightInfo";

interface IOption {
  value: { token: string; secret: string };
  label: string;
}

export function UsersSelect({
  options,
  onChangeFn,
  value,
  errors,
}: {
  options: IOption[];
  onChangeFn: (selectedValue: { token: string; secret: string } | null) => void;
  value?: { token: string; secret: string }; // Делаем value опциональным
  errors: FieldErrors<IWeightInfoForm>;
}) {
  return (
    <>
      <Select
        id="usersSelect"
        placeholder="Выберите пользователя"
        options={options}
        isSearchable
        menuPlacement={"bottom"}
        value={options.find((c) => c.value.token === value?.token) || null}
        onChange={(newValue) => {
          onChangeFn(newValue?.value || null);
        }}
        styles={{
          control: (styles) => {
            const style = {
              ...styles,
              backgroundColor: "transparent",
              border: "2px solid blueviolet",
              ":hover": { borderColor: "blueviolet" },
              boxShadow: "0 0 12px 4px blueviolet",
            };

            if (errors && errors.user) {
              return { ...style, boxShadow: "0 0 12px 4px red" };
            }

            return style;
          },
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
