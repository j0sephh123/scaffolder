import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
      {error && <span className="text-error text-sm mt-1">{error}</span>}
    </div>
  );
};

export default FormInput;
