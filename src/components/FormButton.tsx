import React from "react";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
};

const FormButton = ({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default FormButton;
