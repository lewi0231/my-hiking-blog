"use client";

import { login } from "@/lib/auth/actions";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

type Props = {
  slug?: string;
};

export const Social = ({ slug }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center font-karla m-auto gap-2 mt-2 w-full">
      <Button
        className="w-full border-[1px] border-opacity-15 shadow-sm rounded-xl border-black flex items-center justify-center gap-2 flex-grow"
        variant="outline"
        size="lg"
        onClick={async () => login("google")}
      >
        <span>Sign in with</span>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        className="w-full border-[1px] border-opacity-15 shadow-sm rounded-xl border-black flex items-center justify-center gap-2 flex-grow"
        variant="outline"
        size="lg"
        onClick={async () => login("facebook")}
      >
        <span>Sign in with</span>
        <FaFacebook className="w-5 h-5" />
      </Button>

      <Button
        className="w-full border-[1px] border-opacity-15 shadow-sm rounded-xl border-black flex items-center justify-center gap-2"
        variant="outline"
        size="lg"
        type="submit"
        onClick={() => login("github")}
      >
        <span>Sign in with</span>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
