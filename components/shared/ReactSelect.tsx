import React, { useMemo } from "react";
import CreatableSelect from "react-select/creatable";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  options: Array<OptionType>;
  value: string | string[] | null;
  onChange: (name: string, value: string | string[]) => void;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  label?:string;
  className?:string;
  required?:boolean
  error?:string
}

export const CustomCreatableSelect: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  isClearable = true,
  isMulti = true,
  isSearchable = true,
  placeholder = 'Select...',
  label,
  className,
  required,
}) => {
  const memoizedOptions = useMemo(() => options, [options]);

  // Helper to format selected values correctly
  const formatValue = (
    value: string | string[] | null,
  ): SingleValue<{ label: string; value: string }> | MultiValue<{ label: string; value: string }> => {
    if (isMulti && Array.isArray(value)) {
      return value.map((val) => ({ label: val, value: val }));
    } else if (!isMulti && typeof value === 'string') {
      return value ? { label: value, value: value } : null;
    }
    return null;
  };

  // Handle value change
  const handleChange = (
    newValue: SingleValue<{ label: string; value: string }> | MultiValue<{ label: string; value: string }>,
    actionMeta: ActionMeta<{ label: string; value: string }>
  ) => {
    if (isMulti) {
      const selectedValues = (newValue as MultiValue<{ label: string; value: string }>).map((option) => option.value);
      onChange(name, selectedValues);
    } else {
      const selectedValue = (newValue as SingleValue<{ label: string; value: string }>)?.value || '';
      onChange(name, selectedValue);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
    <CreatableSelect
      isClearable={isClearable}
      options={memoizedOptions}
      isMulti={isMulti}
      isSearchable={isSearchable}
      value={formatValue(value)}
      onChange={handleChange}
      placeholder={placeholder}
      classNamePrefix="custom-creatable-select"
    />
    </div>
  );
};
 


export const ReactSelect: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  isMulti = false,
  placeholder = "Select...",
  label,
  error,
  required,
}) => {
  const memoizedOptions = useMemo(() => options, [options]);

  const formatValue = (
    value: string | string[] | null
  ): SingleValue<OptionType> | MultiValue<OptionType> => {
    if (isMulti && Array.isArray(value)) {
      return value
        .map((val) => options?.find((option) => option?.value === val))
        .filter(Boolean) as MultiValue<OptionType>;
    } else if (!isMulti && typeof value === "string") {
      return options?.find((option) => option?.value === value) || null;
    }
    return null;
  };

  const handleChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (isMulti) {
      const selectedValues = (newValue as MultiValue<OptionType>).map(
        (option) => option.value
      );
      onChange(name, selectedValues);
    } else {
      const selectedValue = (newValue as SingleValue<OptionType>)?.value || "";
      onChange(name, selectedValue);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-2 items-center">
      <label htmlFor={name||''} className="text-sm " >
        {label}
      </label>
      {required ? <span className="text-red-600 fornt-bold">*</span> : null}
      </div>
      <Select
        isMulti={isMulti}
        options={memoizedOptions}
        value={formatValue(value)}
        onChange={handleChange}
        placeholder={placeholder}
        classNamePrefix="custom-select"
        name={name}
      />
      <small className="text-red-600">{error}</small>
    </div>
  );
};


