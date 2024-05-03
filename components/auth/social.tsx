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
    <div className="flex flex-col justify-center items-center font-karla m-auto gap-2">
      <Button
        className="w-full border-2 border-opacity-15 shadow-md rounded-xl border-black flex items-center justify-center gap-10"
        variant="outline"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
        <span>Sign in with Google</span>
      </Button>
      <Button
        className="w-full border-2 border-opacity-15 shadow-md rounded-xl border-black flex items-center justify-center gap-10"
        variant="outline"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
        <span>Sign in with Github</span>
      </Button>
    </div>
  );
};
