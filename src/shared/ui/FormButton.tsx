import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function FormButton({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-[8px] px-4 py-2 font-medium transition-colors",
        variant === "primary" && "bg-blue-400 text-white disabled:bg-blue-500",
        variant === "secondary" && "border border-gray-300 hover:bg-gray-50",
        variant === "ghost" && "hover:bg-gray-100",
        className,
      )}
      {...props}
    />
  );
}
