import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export function Button({ children, disabled = false, className = "", ...props }: ButtonProps) {
  const baseClassName = "cursor-pointer hover:bg-stone-300 p-1 rounded duration-300";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed hover:bg-current" : "";
  const combinedClassName = [baseClassName, disabledClasses, className].filter(Boolean).join(" ");

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
