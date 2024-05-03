import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";

type Props = {
  Icon: LucideIcon;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;
  iconLabel?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({
  Icon,
  isActive,
  color = "#2e2d88",
  children,
  iconLabel,
  ...props
}: Props) => {
  return (
    <div className="flex items-center">
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          isActive ? "" : "",
          "flex justify-center items-center w-fit px-2 rounded-full hover:text-white -ml-2",
          isActive ? "hover:bg-red-500" : `hover:bg-purple-500`
        )}
        {...props}
      >
        <span className={`${children != null ? "mr-1" : ""} flex items-center`}>
          <Icon size={16} strokeWidth={2} />
        </span>
        {children}
      </Button>
      <div className="font-medium tracking-tight text-sm capitalize">
        {iconLabel}
      </div>
    </div>
  );
};

export default IconButton;
