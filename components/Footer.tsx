import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CoffeeIcon } from "./ui/icons";
import TooltipWrapper from "./TooltipWrapper";
import { siteConfig } from "@/app/constants";

const Footer = () => {
  return (
    <div className="w-full bg-gray-200 h-fit">
      <div className="m-auto max-w-[90vw]">
        <div className="flex justify-between px-14 pt-10 pb-4 items-center text-right">
          <TooltipWrapper label="If you'd like to support me">
            <Button
              variant="ghost"
              className="flex justify-between font-semibold px-2 gap-2"
              size="lg"
            >
              <CoffeeIcon />
              Buy Me a Coffee
            </Button>
          </TooltipWrapper>

          <div className="flex gap-32 justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-2xl font-semibold">Services</h2>
              <ul className="flex flex-col gap-1 items-center">
                <li>Website </li>
                <li>stuff again</li>
                <li>more stuff</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 text-gray-800">
              <h2 className="text-2xl font-semibold">About</h2>
              <ul className="flex flex-col gap-1">
                <li>stuff</li>
                <li>stuff again</li>
                <li>more stuff</li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="mb-6" />
        <div className="flex justify-between px-14 pb-6 w-full text-gray-700">
          © {format(new Date(), "yyyy")} {siteConfig.siteTitle}. All rights
          reserved.
          <div className={cn(" flex justify-between items-center gap-10")}>
            <div className="flex gap-5">
              <InstagramLogoIcon
                width={20}
                height={20}
                className={styles.icon}
              />
              <GitHubLogoIcon width={20} height={20} className={styles.icon} />
              <TwitterLogoIcon width={20} height={20} className={styles.icon} />
            </div>

            {siteConfig.featureToggles.darkMode ? (
              <ThemeSwitch className={styles.icon} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const styles = {
  icon: "text-black hover:opacity-50 cursor-pointer hover:-translate-y-2 transition-all duration-300",
};
