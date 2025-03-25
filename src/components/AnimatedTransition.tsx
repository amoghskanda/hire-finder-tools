
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTransitionProps {
  children: ReactNode;
  show: boolean;
  className?: string;
}

const AnimatedTransition = ({ children, show, className }: AnimatedTransitionProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out overflow-hidden",
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none h-0",
        className
      )}
    >
      <div className="bg-white rounded-2xl shadow-corporate-lg border border-gray-100 p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
};

export default AnimatedTransition;
