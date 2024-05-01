import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  Icon: LucideIcon;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;
};

const IconButton = ({
  Icon,
  isActive,
  color = "#2e2d88",
  children,
  ...props
}: Props) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(isActive ? "" : "", "flex justify-center items-center")}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""}`}>
        <Icon color={color} size={16} />
      </span>
      {children}
    </Button>
  );
};

export default IconButton;
