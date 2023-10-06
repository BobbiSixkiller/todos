import React, { ReactNode } from "react";
import Spinner from "./Spinner";

interface ButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  type = "button",
  className,
  children,
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-items-center rounded-md border border-transparent max-h-12 max-w-xs bg-lime-100 px-3 py-2 text-sm font-semibold text-lime-900 hover:bg-lime-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 ${
        disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className ? className : ""}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner size="small" /> : children}
    </button>
  );
};

export default Button;
