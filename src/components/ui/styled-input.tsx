
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const StyledInput: React.FC<StyledInputProps> = ({
  label,
  icon,
  error,
  className,
  containerClassName,
  labelClassName,
  ...props
}) => {
  // Ensure proper text color for input fields
  const inputClassName = cn(
    "text-gray-900 dark:text-gray-100", // Dark text on light bg, light text on dark bg
    "placeholder-gray-400 dark:placeholder-gray-500", // Lighter placeholder text
    "border-gray-300 dark:border-gray-700", // Border color
    "focus:border-blue-500 dark:focus:border-blue-400", // Focus border color
    "bg-white dark:bg-gray-800", // Background color
    error ? "border-red-500 dark:border-red-400" : "", // Error state
    icon ? "pl-10" : "", // Padding for icon
    className
  );

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <Label 
          htmlFor={props.id} 
          className={cn(
            error ? "text-red-500 dark:text-red-400" : "",
            labelClassName
          )}
        >
          {label} 
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        
        <Input
          {...props}
          className={inputClassName}
        />
      </div>
      
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
