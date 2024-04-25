import { siteConfig } from "@/app/constants";
import { cn } from "@/lib/utils";
import {
  GitHubLogoIcon,
  HeartFilledIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import ThemeSwitch from "./ThemeSwitch";
import TooltipWrapper from "./TooltipWrapper";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="w-full bg-gray-200 h-fit">
      <div className="m-auto max-w-[90vw]">
        <div className="flex justify-between px-14 pt-10 pb-4 items-center text-right">
          <div className="space-y-4 flex justify-between lg:items-center items-end h-full w-full gap-4">
            <div className="flex flex-shrink lg:flex-row flex-col flex-1 justify-start gap-10">
              <TooltipWrapper label="Support this great organisation!">
                <Button
                  className="flex justify-start font-semibold gap-2 px-2 w-fit items-center sm:w-[180px]"
                  size="icon"
                >
                  <HeartFilledIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                  <a
                    href={process.env.BEYOND_BLUE_DONATION_LINK}
                    target="__blank"
                    className="text-xs sm:text-medium"
                  >
                    Donate Beyond Blue
                  </a>
                </Button>
              </TooltipWrapper>
              {/* TODO - need to fix stripe implementation */}
              {/* <TooltipWrapper label="If you'd like to support me"> */}
              {/* <Button
                  variant="outline"
                  className="flex justify-start font-semibold px-2 gap-2 w-fit sm:w-[180px] items-center"
                  size="icon"
                >
                  <CoffeeIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                  <a
                    href={process.env.STRIPE_PAYMENT_LINK}
                    target="__blank"
                    className="text-xs sm:text-medium"
                  >
                    Buy Me a Coffee
                  </a>
                </Button> */}
              {/* </TooltipWrapper> */}
            </div>
            <div className="flex justify-end flex-1 gap-14 items-start">
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
