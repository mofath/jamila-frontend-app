import React, {
  ReactNode,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from "react";
import { Link, LinkProps } from "react-router-dom";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "transparent"
    | "outline"
    | "primary-outline"
    | "accent"
    | "success"
    | "text";
  children: ReactNode;
  className?: string;
  radius?: "large" | "full";
  size?: "small" | "medium" | "large" | "full" | "fit";
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  radius,
  size,
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick = () => {},
  type = "button",
  to,
  ...restProps
}) => {
  const classes = [
    "button",
    variant ? `button--${variant}` : "",
    radius ? `button--rounded-${radius}` : "",
    size ? `button--${size}` : "",
    fullWidth ? "button--fullWidth" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    const { to: _excludedTo, ...linkProps } = restProps as LinkProps;

    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled}
        {...linkProps}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          if (onClick) onClick(e as any);
        }}
      >
        {isLoading ? "Loading..." : children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
