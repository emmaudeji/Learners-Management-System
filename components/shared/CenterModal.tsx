"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CenterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerBtn?: ReactNode;
  title?:  string|React.ReactNode;
  className?: string;
  children: ReactNode;
}

const CenterModal = ({ open, setOpen, triggerBtn,className, title, children }: CenterModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerBtn&&<DialogTrigger asChild>{triggerBtn}</DialogTrigger>}
      <DialogContent className={cn("max-w-md p-6", className)}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CenterModal;
