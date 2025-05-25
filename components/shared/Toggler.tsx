'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface CustomTogglerProps<T> {
  value: T;
  options: [T, T];
  labels: [React.ReactNode, React.ReactNode];
  onToggle: (newValue: T) => void;
  className?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export function CustomToggler<T>({
  value,
  options,
  labels,
  onToggle,
  className,
  label,
  required = false,
  disabled = false,
  loading = false,
}: CustomTogglerProps<T>) {
  const isChecked = value === options[1];

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      {label && (
        <Label htmlFor={`toggle-${label}`} className="flex items-center gap-1">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="flex items-center gap-3">
        <span className={cn(!isChecked && 'text-primary')}>{labels[0]}</span>
        <div className="relative">
          <Switch
            id={`toggle-${label}`}
            checked={isChecked}
            disabled={disabled || loading}
            onCheckedChange={() => onToggle(isChecked ? options[0] : options[1])}
          />
          {loading && (
            <Loader2 className="absolute w-4 h-4 right-0 top-0 animate-spin text-muted-foreground" />
          )}
        </div>
        <span className={cn(isChecked && 'text-primary')}>{labels[1]}</span>
      </div>
    </div>
  );
}
