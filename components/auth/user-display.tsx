"use client";

import { logout } from "@/lib/auth/actions";
import { User } from "@supabase/supabase-js";
import TooltipWrapper from "../TooltipWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type Props = {
  user: User | null;
  handleSignOut: () => void;
};

const UserDisplay = ({ user, handleSignOut }: Props) => {
  const username = user?.email?.split("@")[0];

  return (
    <div className="flex gap-4 items-center">
      <TooltipWrapper label={`You're signed in as ${username}`}>
        <Avatar className=" shadow-sm">
          <AvatarImage src={user?.user_metadata?.avatar_url} />{" "}
          <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
        </Avatar>
      </TooltipWrapper>
      <Button
        onClick={() => {
          handleSignOut();
          logout();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default UserDisplay;
