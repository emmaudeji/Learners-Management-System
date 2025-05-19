import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const PopoverMenu = ({
  trigerBtn = <Button variant="outline">Open</Button>,
  children,
  className,  
  open,
  setOpen,
  align,
}: {
  trigerBtn: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  open?: boolean
  setOpen?: (open: boolean) => void
  align?: "center" | "end" | "start";
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigerBtn}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn("p-0 rounded-md shadow-md", className)}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};
