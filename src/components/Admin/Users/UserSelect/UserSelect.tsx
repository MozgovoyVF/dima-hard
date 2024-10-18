import React from "react";
import { FieldErrors } from "react-hook-form";
import Select from "react-select";
import { IAdminUsers } from "../Users";

interface IOption {
  value: number;
  label: string;
}

export function UserSelect({
  options,
  onChangeFn,
  value,
  errors,
}: {
  options: IOption[];
  onChangeFn: (userId: number | null) => void;
  value?: number;
  errors: FieldErrors<IAdminUsers>;
}) {
  return (
    <>
      <Select
        id="usersSelect"
        placeholder="Выберите пользователя"
        options={options}
        isSearchable
        menuPlacement={"bottom"}
        value={options.find((c) => c.value === value) || null}
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

            if (errors && errors.userId) {
              return { ...style, boxShadow: "0 0 12px 4px red" };
            }

            return style;
          },
          menu: (styles) => ({
            ...styles,
            backgroundColor: "rgba(138,43,226, 0.9)",
            boxShadow: "0 0 12px 4px blueviolet",
            zIndex: 11,
          }),
          singleValue: (styles) => ({ ...styles, color: "white", textAlign: 'center' }),
          menuList: (styles) => ({
            ...styles,
            color: "white",
            border: "2px solid blueviolet",
            zIndex: 11,
            maxHeight: "300px",
            overflowY: "scroll",
          }),
          container: (styles) => ({ ...styles, width: "100%", zIndex: 10 }),
          menuPortal: (styles) => ({ ...styles, backgroundColor: "white" }),
          option: (styles, { isSelected }) => ({
            ...styles,
            ":hover": { backgroundColor: "blueviolet" },
            backgroundColor: isSelected ? "rgba(75,20,126, 1)" : "transparent",
            zIndex: 11,
          }),
          placeholder: (styles) => ({ ...styles, textAlign: "center" }),
        }}
      />
    </>
  );
}
