import { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility for conditional classes

interface CopyTextProps {
  item: any;
  className?: string;
  text:string;
}

export const CopyText = ({ item, className, text }: CopyTextProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset tooltip after 2s
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className={cn("relative flex items-center ", className)}>
      {/* Left Side: Text to Copy */}
      <span className=" ">{item}</span>

      {/* Right Side: Copy Icon Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleCopy} 
        className=" "
      >
        {copied ? <ClipboardCheck className="w-5 h-5 text-brand-orange " /> : <Clipboard className="w-5 h-5 text-brand-blue" />}
      </Button>

      {/* Tooltip Popup */}
      {copied && (
        <div className="absolute top-[-35px] right-0 bg-black text-white text-xs px-2 py-1 rounded shadow-md">
          Copied!
        </div>
      )}
    </div>
  );
};
