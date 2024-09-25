import React from "react";
import Select from "react-select";

interface IOption {
  value: { token: string; secret: string };
  label: string;
}

export function UsersSelect({
  options,
  onChangeFn,
  value,
}: {
  options: IOption[];
  onChangeFn: (selectedValue: { token: string; secret: string } | null) => void;
  value?: { token: string; secret: string }; // Делаем value опциональным
}) {
  return (
    <>
      <label style={{ color: "white" }} htmlFor="usersSelect">
        Выберите пользователя
      </label>
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
