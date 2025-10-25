"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary"
}) => {
  const baseClasses = "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md";
  
  const variantClasses = {
    primary: "bg-slate-700 text-white hover:bg-slate-800",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
  };

  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
