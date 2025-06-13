import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import "./Textarea.css"; 

interface TextareaProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  variant?: "primary" | "secondary";
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: FieldError;
}

const Textarea: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = (
  {
    id,
    name,
    label,
    placeholder,
    value,
    rows = 4,
    variant = "primary",
    onChange,
    onBlur,
    error,
  },
  ref
) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-group__label">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
        className={
          error
            ? "form-group__input form-group__input--error"
            : `form-group__input form-group__input--${variant}`
        }
      />
      {error && (
        <span className="form-group__error-message">{error.message}</span>
      )}
    </div>
  );
};

export default forwardRef(Textarea);
