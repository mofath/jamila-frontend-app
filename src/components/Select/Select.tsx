import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import "./Select.css";

interface SelectProps {
	id?: string;
	name: string;
	label?: string;
	placeholder?: string;
	options: { value: string; label: string }[];
	value?: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
	error?: FieldError | undefined;
}

const Select: React.ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
	{ id, name, label, options, value, onChange, onBlur, error, placeholder },
	ref
) => {
	return (
		<div className={"form-group"}>
			{label && (
				<label className={"form-group__label"} htmlFor={id}>
					{label}
				</label>
			)}
			<select
				ref={ref}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className={
					error
						? `${"form-group__select"} ${"form-group__select--error"}`
						: "form-group__select"
				}
			>
				{placeholder && <option value="">{placeholder}</option>}

				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && (
				<span className={"form-group__error-message"}>{error.message}</span>
			)}
		</div>
	);
};

export default forwardRef(Select);
