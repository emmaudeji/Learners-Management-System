'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";

interface CustomTogglerProps<T> {
  value: T;
  options: [T, T];
  labels?: [React.ReactNode, React.ReactNode];
  onToggle: (newValue: T) => void;
  className?: string;
  label?: string;
  required?: string;
}

export function CustomToggler<T>({
  value,
  options,
  required,
  labels,
  label,
  onToggle,
  className,
}: CustomTogglerProps<T>) {
  const isChecked = value === options[1];

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
        {label && (
        <Label htmlFor={String(options[0])} className="flex items-center gap-1">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
    <div className={cn("flex items-center gap-3",)}>
      {labels && <span className={cn(!isChecked && "text-primary")}>{labels[0]}</span>}
      <Switch
        id={String(options[0])}
        checked={isChecked}
        onCheckedChange={() => onToggle(isChecked ? options[0] : options[1])}
      />
      {labels && <span className={cn(isChecked && "text-primary")}>{labels[1]}</span>}
    </div>
    </div>
  );
}
