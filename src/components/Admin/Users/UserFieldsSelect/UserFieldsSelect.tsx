import React, { useEffect, useState } from "react";
import { FieldError } from "react-hook-form";
import Select from "react-select";
import { IAdminUserUpdate } from "../Users";

interface IOption<T> {
  value: T;
  label: string;
}

export function UserFieldsSelect<T>({
  options,
  onChangeFn,
  value,
  errors,
}: {
  options: IOption<T | null>[]; // Разрешаем T или null
  onChangeFn: (value: T | null) => void; // Разрешаем T или null в функции onChangeFn
  value: T | null; // Разрешаем передавать значение T или null
  errors?: FieldError;
}) {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <>
      <Select
        id="usersSelect"
        placeholder="Выберите пользователя"
        options={options}
        isSearchable={false}
        menuPlacement={"bottom"}
        // value={options.find((c) => c.value === value) || null}
        // onChange={(newValue) => {
        //   onChangeFn(newValue?.value || null); // вызов функции onChangeFn
        // }}
        value={
          options.find((option) => {
            if (typeof option.value === "boolean" && selectedValue === null && option.value === false) {
              return true;
            }
            return option.value === selectedValue;
          }) || null
        }
        onChange={(newValue) => {
          setSelectedValue(newValue?.value || null);
          onChangeFn(newValue?.value || null);
        }}
        styles={{
          control: (styles) => {
            const style = {
              ...styles,
              backgroundColor: "transparent",
              border: "2px solid blueviolet",
              ":hover": { borderColor: "blueviolet", boxShadow: "0 0 12px 4px white" },
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 0 12px 4px blueviolet",
              cursor: "pointer",
              minHeight: "50px",
            };

            if (errors) {
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
            cursor: "pointer",
            backgroundColor: isSelected ? "rgba(75,20,126, 1)" : "transparent",
          }),
        }}
      />
    </>
  );
}
