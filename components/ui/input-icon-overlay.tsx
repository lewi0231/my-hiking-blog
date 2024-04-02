import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import React from "react";

type Props = {
  Icon: React.FC<IconProps>;
  iconClass: string;
  overlayIcon: boolean;
};

/**
 * This is designed to take an icon and overlay that icon over the input, but also has the option to not overlay the icon
 */
const InputIconOverlay = ({ Icon, iconClass, overlayIcon = true }: Props) => {
  return (
    <div className={cn("relative ")}>
      <Icon
        width={32}
        height={32}
        className={cn(
          "top-0 left-0 z-10 pl-2",
          overlayIcon ? "absolute" : "",
          iconClass
        )}
      />

      <input
        type="text"
        placeholder="Search..."
        className={cn(
          "input input-bordered w-full max-w-xs pl-10 py-1 rounded-sm"
        )}
        hidden={!overlayIcon}
      />
    </div>
  );
};

export default InputIconOverlay;
