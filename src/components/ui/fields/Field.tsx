import { forwardRef } from "react";
import styles from "./index.module.scss";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  extra?: string;
  placeholder: string;
  variant?: string;
  state?: FieldError | null;
  disabled?: boolean;
  type?: string;
  isNumber?: boolean;
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, extra, type, placeholder, state, disabled, isNumber, ...rest }, ref) => {
    return (
      <div className={`${styles.input} ${state ? styles.error : styles.success}`}>
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref}
          disabled={disabled}
          type={type}
          id={id}
          placeholder={placeholder}
          className={styles.inp}
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
        {state && <span className={styles.message}>{state.message}</span>}
      </div>
    );
  }
);

Field.displayName = "field";
