import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HeadingProps = {
  icon: ReactNode;
  title: string;
  className?: string;
};

export default function Heading({ icon, title, className }: HeadingProps) {
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <div className="rounded-full h-10 w-10 flex items-center justify-center text-green-300 bg-green-100">
        {icon}
      </div>
      <h4 className="text-base font-medium">{title}</h4>
    </div>
  );
}
