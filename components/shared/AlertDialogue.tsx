'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import React from "react";

interface ReusableAlertDialogProps {
  children: React.ReactNode;
  triggerBtn?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export const ReusableAlertDialog = ({
  triggerBtn,
  children,
  className,
  isOpen,
  onOpenChange,
  disabled,
}: ReusableAlertDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      {triggerBtn && 
      <AlertDialogTrigger disabled={disabled} asChild>
        {triggerBtn}
      </AlertDialogTrigger>}
      <AlertDialogContent className={cn("p-0", className)}>
         {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};
