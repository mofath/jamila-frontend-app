import React from "react";
import "./CheckboxGroup.css";

interface Option {
  label: string;
  value: string;
}

interface CheckboxGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  options: Option[];
  error?: any;
}

const CheckboxGroup = React.forwardRef<HTMLInputElement, CheckboxGroupProps>(
  ({ label, options, error, name, ...rest }, ref) => {
    return (
      <div className="form-group">
        {label && <label className="form-group__label">{label}</label>}
        <div className="checkbox-group__options">
          {options.map((option) => (
            <label key={option.value} className="checkbox-group__item">
              <input
                type="checkbox"
                name={name}
                value={option.value}
                ref={ref}
                {...rest}
              />
              {option.label}
            </label>
          ))}
        </div>
        {error && <p className="checkbox-group__error">{error.message}</p>}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
