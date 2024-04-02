import { LikeIcon } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HeartFilledIcon, Link1Icon } from "@radix-ui/react-icons";

import React from "react";

type Props = {
  wrapperClass: string;
};
// TODO - need to add reaction functionality - in future might want add more share options
const LeftSidebar = ({ wrapperClass }: Props) => {
  return (
    <aside
      className={cn(
        "pt-14 opacity-75 flex flex-col items-center justify-center",
        wrapperClass
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <LikeIcon className="w-10 h-10 hover:opacity-50 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a reaction</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="text-center mt-2 text-lg ">0</div>
    </aside>
  );
};

export default LeftSidebar;
