import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import Select from "react-select";
import { IFoodDayForm } from "../FoodMonth";

interface IOption {
  value: string;
  label: string;
}

interface DaySelectProps {
  control: any;
  errors: FieldErrors<IFoodDayForm>;
  options: IOption[];
  value: string;
  onChangeFn: (value: string | null) => void; // Добавлен onChangeFn пропс
}

const DaySelect: React.FC<DaySelectProps> = ({ control, errors, options, value, onChangeFn }) => {
  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <Controller
        name="selectedDay"
        control={control}
        rules={{ required: "День обязателен для выбора" }}
        render={({ field: { onChange, value } }) => (
          <Select
            options={options}
            placeholder="Выберите день"
            isSearchable={false}
            menuPlacement="top"
            value={options.find((c) => c.value === value) || null}
            onChange={(newValue) => {
              const selectedValue = newValue?.value || null;
              onChange(selectedValue); // Передаем в onChange для обновления значения в форме
              onChangeFn(selectedValue); // Вызываем onChangeFn, переданный пропсом
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

                if (errors && errors.selectedDay) {
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
        )}
      />
    </div>
  );
};

export default DaySelect;
