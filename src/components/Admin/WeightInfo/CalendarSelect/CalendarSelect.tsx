import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import Select from "react-select";
import { IWeightInfoForm } from "../WeightInfo";

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

const CalendarSelect: React.FC<{ control: any; errors: FieldErrors<IWeightInfoForm> }> = ({ control, errors }) => {
  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <Controller
        name="selectedMonth"
        control={control}
        defaultValue={
          String(new Date().getMonth() + 1).length === 1
            ? "0" + String(new Date().getMonth() + 1)
            : String(new Date().getMonth() + 1)
        }
        rules={{ required: "Месяц обязателен для выбора" }}
        render={({ field: { onChange, value } }) => (
          <Select
            options={monthOptions}
            placeholder="Выберите месяц"
            isSearchable={false}
            value={monthOptions.find((c) => c.value === value) || null}
            onChange={(newValue) => {
              onChange(newValue?.value || null);
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

                if (errors && errors.selectedMonth) {
                  return { ...style, boxShadow: "0 0 12px 4px red" };
                }

                return style;
              },
              menu: (styles) => ({
                ...styles,
                backgroundColor: "rgba(138,43,226, 0.9)",
                boxShadow: "0 0 12px 4px blueviolet",
              }),
              singleValue: (styles) => ({ ...styles, color: "white", textAlign: "center" }),
              menuList: (styles) => ({ ...styles, color: "white", border: "2px solid blueviolet" }),
              container: (styles) => ({ ...styles, width: "100%" }),
              menuPortal: (styles) => ({ ...styles, backgroundColor: "white" }),
              option: (styles, { isSelected }) => ({
                ...styles,
                ":hover": { backgroundColor: "blueviolet" },
                cursor: "pointer",
                textAlign: "center",
                backgroundColor: isSelected ? "rgba(75,20,126, 1)" : "transparent",
              }),
            }}
          />
        )}
      />
      <Controller
        name="selectedYear"
        control={control}
        rules={{ required: "Год обязателен для выбора" }}
        defaultValue={new Date().getFullYear().toString().slice(2)}
        render={({ field: { onChange, value } }) => (
          <Select
            options={yearOptions}
            placeholder="Выберите год"
            isSearchable={false}
            value={yearOptions.find((c) => c.value === value) || null}
            onChange={(newValue) => {
              onChange(newValue?.value || null);
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

                if (errors && errors.selectedYear) {
                  return { ...style, boxShadow: "0 0 12px 4px red" };
                }

                return style;
              },
              menu: (styles) => ({
                ...styles,
                backgroundColor: "rgba(138,43,226, 0.9)",
                boxShadow: "0 0 12px 4px blueviolet",
              }),
              singleValue: (styles) => ({ ...styles, color: "white", textAlign: "center" }),
              menuList: (styles) => ({ ...styles, color: "white", border: "2px solid blueviolet" }),
              container: (styles) => ({ ...styles, width: "100%" }),
              menuPortal: (styles) => ({ ...styles, backgroundColor: "white" }),
              option: (styles, { isSelected }) => ({
                ...styles,
                ":hover": { backgroundColor: "blueviolet" },
                cursor: "pointer",
                textAlign: "center",
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
