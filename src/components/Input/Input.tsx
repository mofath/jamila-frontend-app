import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import "./Input.css";

interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  variant?: "primary" | "secondary";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: FieldError | undefined;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    id,
    name,
    type = "text",
    label,
    placeholder,
    value,
    variant = "primary",
    onChange,
    onBlur,
    error,
  },
  ref
) => {
  return (
    <div className={`form-group`}>
      {label && (
        <label htmlFor={id} className={"form-group__label"}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={
          error
            ? `form-group__input form-group__input--error`
            : `form-group__input form-group__input--${variant}`
        }
      />
      {error && (
        <span className={"form-group__error-message"}>{error.message}</span>
      )}
    </div>
  );
};

export default forwardRef(Input);
