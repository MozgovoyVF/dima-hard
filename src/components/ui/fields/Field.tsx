import { forwardRef } from "react";
import styles from "./index.module.scss";

interface InputFieldProps {
  id: string;
  label: string;
  extra?: string;
  placeholder: string;
  variant?: string;
  state?: "error" | "success";
  disabled?: boolean;
  type?: string;
  isNumber?: boolean;
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, extra, type, placeholder, state, disabled, isNumber, ...rest }, ref) => {
    return (
      <div className={`${styles.input} ${state === "error" ? styles.error : styles.success}`}>
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref}
          disabled={disabled}
          type={type}
          id={id}
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (
              isNumber &&
              !/[0-9]/.test(event.key) &&
              event.key !== "Backspace" &&
              event.key !== "Tab" &&
              event.key !== "Enter" &&
              event.key !== "ArrowLeft" &&
              event.key !== "ArrowRight"
            ) {
              event.preventDefault();
            }
          }}
          {...rest}
        />
      </div>
    );
  }
);

Field.displayName = "field";
