"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

type Props = {
  slug?: string;
};

export const Social = ({ slug }: Props) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirect: true,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
