import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface OptionGroup {
  label: string;
  options: Option[];
}

interface CustomSelectProps {
  name: string;
  label?: string;
  options: Option[] | OptionGroup[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  className?: string;
  labelStyle?: string;
  description?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Select an option",
  required = false,
  className = "",
  isDisabled= false,
  labelStyle,
  description,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className=" ">
        <Label className={cn(" text-lg", labelStyle)} htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {description && <small className="text-gray-500 mb-3 block">{description}</small>}
        </div>
      )}

      <Select onValueChange={onChange} value={value} name={name} disabled={isDisabled}>
        <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(options) &&
            options.map((option, index) => {
              if ("options" in option) {
                return (
                  <SelectGroup key={index}>
                    <SelectLabel className="font-bold text-primary py-2 border-t">{option.label}</SelectLabel>
                    {option.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              } else {
                return (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                );
              }
            })}
        </SelectContent>
      </Select>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
