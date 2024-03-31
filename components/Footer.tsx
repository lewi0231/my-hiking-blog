import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";

const Footer = () => {
  return (
    <div className="w-full bg-slate-200">
      <div className="flex justify-around  h-52  items-center">
        <div>list one</div>
        <div>list 2</div>
      </div>
      {/* <Separator /> */}
      <div className="flex justify-between px-10 mt-6 py-6 border-t-black border-2 border-opacity-20 w-full">
        copyright
        <div className=" flex justify-between items-center gap-10">
          <div className="flex gap-2">
            <InstagramLogoIcon />
            <GitHubLogoIcon />
            <TwitterLogoIcon />
          </div>

          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Footer;
