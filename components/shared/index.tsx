import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom Arrows for the Slider
type ArrowProps = {
    onClick?: () => void;
  };
  
  export const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-500 text-black p-2 rounded-full hover:bg-green-600 focus:outline-none"
    >
      <ChevronLeft size={24} />
    </button>
  );
  
  export const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-500 text-black p-2 rounded-full hover:bg-green-600 focus:outline-none"
    >
      <ChevronRight size={24} />
    </button>
  );
  