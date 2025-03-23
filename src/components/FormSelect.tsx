import React from "react";

type Option = {
  value: string;
  label: string;
};

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  className?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
  className = "",
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        className={`select select-bordered w-full ${
          error ? "select-error" : ""
        } ${className}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-error text-sm mt-1">{error}</span>}
    </div>
  );
};

export default FormSelect;
