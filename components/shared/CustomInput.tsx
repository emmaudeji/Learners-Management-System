'use client';

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, FilePenLine } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  icon?: React.ReactNode;
  isTextArea?: boolean;
  wrapper?:string;
  labelStyle?:string
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  description,
  error,
  icon,
  type = "text",
  className, wrapper,
  required,
  isTextArea = false,
  labelStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={cn("flex  flex-col gap-2 w-full",  wrapper)}>
      {label && (
        <div className="">
          <Label htmlFor={props.name} className={cn("flex items-center text-lg gap-1", labelStyle)}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          {description && <small className="text-gray-500">{description}</small>}
        </div>
      )}
      <div className="flex items-center bg-white pl-2 gap-2 border border-gray-300 rounded-md w-full">
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : 
        isTextArea ? null : (
          <span className="text-gray-500">
            {icon ? icon : <FilePenLine size={14} />}
          </span>
        )}

        {isTextArea ? (
          <Textarea
            id={props.name}
            className={cn("p-2 border-none rounded h-16 focus-visible:ring-ring w-full", className)}
            required={required}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <Input
            id={props.name}
            type={isPassword && showPassword ? "text" : type}
            className={cn("p-2 border-none rounded h-10 focus-visible:ring-ring w-full", className)}
            required={required}
            {...props}
          />
        )}
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};
