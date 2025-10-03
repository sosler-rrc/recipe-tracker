import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "green" | "red" | "stone";
  disabled?: boolean;
  className?: string;
}

export function Button({ children, variant, disabled = false, className = "", ...props }: ButtonProps) {
  const variantClasses = {
    green: "bg-emerald-600 hover:bg-emerald-800",
    red: "bg-red-600 hover:bg-red-800",
    stone: "bg-stone-200 hover:bg-stone-300",
  };

  const baseClassName = "cursor-pointer p-1 rounded duration-300";
  const disabledClasses = disabled ? "opacity-50 cursor-none hover:bg-current" : "";
  const combinedClassName = [baseClassName, disabledClasses, variant ? variantClasses[variant] : "", className].filter(Boolean).join(" ");

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
}
