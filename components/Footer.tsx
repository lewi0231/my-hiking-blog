import { siteConfig } from "@/app/constants";
import { cn } from "@/lib/utils";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import SocialMediaIcons from "./SocialMediaIcons";
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
            <div className="flex justify-end flex-1 gap-20 items-start">
              <FooterBlock title="Get in touch">
                <ul className="flex flex-col gap-3 items-center">
                  <li className="hover:underline">
                    <TooltipWrapper label="Would you like to contribute content?">
                      <a href="mailto:trailwisdom.blog@gmail.com?subject=I%20am%20Interested%20in%20Contributing&body=Hi%20Paul,%0D%0A">
                        Contribute
                      </a>
                    </TooltipWrapper>
                  </li>
                  <li className="hover:underline">
                    <TooltipWrapper label="Are you looking to collaborate in some way?">
                      <a href="mailto:trailwisdom.blog@gmail.com?subject=I%20am%20Interested%20in%20Collaborating&body=Hi%20Paul,%0D%0A">
                        Colaboration
                      </a>
                    </TooltipWrapper>
                  </li>
                  <li className="hover:underline">
                    <TooltipWrapper label="Looking for a web developer or undertaking a project together?">
                      <a href="mailto:trailwisdom.blog@gmail.com?subject=I%20Need%20a%20Web%20Developer&body=Hi%20Paul,%0D%0A">
                        Web Development
                      </a>
                    </TooltipWrapper>
                  </li>
                </ul>
              </FooterBlock>
              <FooterBlock title="Navigation">
                <ul className="flex flex-col gap-3 items-end w-full">
                  <li className="hover:underline">
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="/about">About</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="/gallery">Photos</Link>
                  </li>
                </ul>
              </FooterBlock>
            </div>
          </div>
        </div>
        <Separator className="mb-6" />
        <div className="flex justify-between px-14 pb-6 w-full text-gray-700">
          © {format(new Date(), "yyyy")} {siteConfig.siteTitle}. All rights
          reserved.
          <div className={cn(" flex justify-between items-center gap-10")}>
            <div className="flex gap-5">
              <SocialMediaIcons />
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

function FooterBlock({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl font-medium">{title}</h2>
      {children}
    </div>
  );
}
