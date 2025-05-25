"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// You can create or import this utility if not already present
const VisuallyHidden = ({ children }: { children: ReactNode }) => (
  <span style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
    {children}
  </span>
);

interface CenterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerBtn?: ReactNode;
  title?: string | React.ReactNode;
  className?: string;
  children: ReactNode;
}

const CenterModal = ({ open, setOpen, triggerBtn, className, title, children }: CenterModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerBtn && <DialogTrigger asChild>{triggerBtn}</DialogTrigger>}
        <DialogContent className={cn("max-w-md p-6", className)} aria-describedby={undefined}>
          <DialogHeader>
            {title ? (
              <DialogTitle>{title}</DialogTitle>
            ) : (
              <DialogTitle>
                <VisuallyHidden>Modal</VisuallyHidden>
              </DialogTitle>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
    </Dialog>
  );
};

export default CenterModal;
