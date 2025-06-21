import React from "react";
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css'
import "./PhoneInput.css";

interface PhoneInputProps {
  name?: string;
  label?: string;
  value?: string;
  country?: string,
  onChange?: (...event: any[]) => void;
  onBlur?: (...event: any[]) => void;
  error?: any;
  variant?: "primary" | "secondary";
  placeholder?: string;
  ref?: React.Ref<any>;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  label,
  value,
  country='us',
  onChange,
  onBlur,
  error,
  variant = "primary",
  placeholder,
  ref,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-group__label">
          {label}
        </label>
      )}
      <ReactPhoneInput
        country="us"
        disableDropdown={true}
        value={value}
        onChange={(val: string) => {
          onChange?.({ target: { value: val, name } }); // mimic native event
        }}
        onBlur={onBlur}
        inputProps={{
          name,
          ref,
          placeholder,
        }}
        inputClass={
          error
            ? "form-group__input form-group__input--error"
            : `form-group__input form-group__input--${variant}`
        }
        containerClass="form-group__phone-container"
        buttonClass="form-group__phone-button"
      />
      {error && <span className="form-group__error-message">{error.message}</span>}
    </div>
  );
};

export default PhoneInput;
