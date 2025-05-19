import React, { useRef } from "react";
import { format } from "date-fns";

interface DatePickerProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  label = "Select Date",
  name,
  value,
  onChange,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input click to open the date picker
  const handleInputClick = () => {
    inputRef.current?.showPicker();
  };

  // Handle date change and format it
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={` w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium  ">
          {label}
        </label>
      )}

      {/* Clickable Box for Date Picker */}
      <div className="relative w-full h-10 mt-1 ">
      <div
        className="flex items-center justify-between w-full h-full p-2 border rounded-md bg-gray-100 text-gray-800  "
        onClick={handleInputClick}
      >
        <span>{value ? format(new Date(value), "dd MMMM yyyy") : "Select a date"}</span>

        {/* Calendar Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-brand-blue"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>

        {/* Hidden Date Input */}
        <input
            type="date"
            id={name}
            name={name}
            ref={inputRef}
            value={value}
            onChange={handleChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
      </div>
      </div>

      
    </div>
  );
};

export default CustomDatePicker;
