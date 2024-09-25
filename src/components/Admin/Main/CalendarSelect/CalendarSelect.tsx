import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

interface MonthYearOption {
  value: string;
  label: string;
}

const monthOptions: MonthYearOption[] = [
  { value: "01", label: "Январь" },
  { value: "02", label: "Февраль" },
  { value: "03", label: "Март" },
  { value: "04", label: "Апрель" },
  { value: "05", label: "Май" },
  { value: "06", label: "Июнь" },
  { value: "07", label: "Июль" },
  { value: "08", label: "Август" },
  { value: "09", label: "Сентябрь" },
  { value: "10", label: "Октябрь" },
  { value: "11", label: "Ноябрь" },
  { value: "12", label: "Декабрь" },
];

const yearOptions: MonthYearOption[] = Array.from({ length: 10 }, (_, index) => {
  const year = new Date().getFullYear() - index;
  return { value: year.toString().slice(2), label: year.toString() };
});

const CalendarSelect: React.FC<{ control: any }> = ({ control }) => {
  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <Controller
        name="selectedMonth"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <Select
            options={monthOptions}
            placeholder="Выберите месяц"
            value={monthOptions.find((c) => c.value === value) || null}
            onChange={(newValue) => {
              onChange(newValue?.value || null);
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
        )}
      />
      <Controller
        name="selectedYear"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <Select
            options={yearOptions}
            placeholder="Выберите год"
            value={yearOptions.find((c) => c.value === value) || null}
            onChange={(newValue) => {
              onChange(newValue?.value || null);
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
        )}
      />
    </div>
  );
};

export default CalendarSelect;
