"use client";

import { inter, rubik } from "@/app/utils/fonts";
import { cn } from "@/lib/utils";
import {
  Cross1Icon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import SearchModal from "./SearchModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { siteConfig } from "@/app/constants";
import { Hiker, MountainCircleIcon, MountainIcon } from "./ui/icons";

const NavLinks = ({
  className,
  setIsMobile,
}: {
  className: string;
  setIsMobile?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <li className=" w-full">
        <Link
          href="/about"
          className={cn("w-full transition-all duration-300", className)}
          onClick={() => {
            if (setIsMobile) setIsMobile(false);
          }}
        >
          About
        </Link>
      </li>
      <li className=" w-full">
        <Link
          href="/about"
          className={cn("w-full transition-all duration-300", className)}
          onClick={() => {
            if (setIsMobile) setIsMobile(false);
          }}
        >
          Contact
        </Link>
      </li>
    </>
  );
};

const style = {
  icon: "h-full hover:opacity-50 cursor-pointer",
};

type Props = {
  className: string;
};

function Navbar({ className }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isMobile && window.innerWidth >= 1024) {
        console.debug("altering the isMobile to", !isMobile);
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <nav className="relative">
      <div
        className={cn(
          `w-full bg-transparent px-10 sm:px-20 py-4 h-fit z-20 shadow-sm transition duration-300 `,
          scrollPosition > 0 ? "bg-black text-white shadow-md" : "",
          className
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center h-full",
            inter?.className
          )}
        >
          <Logo scrollPosition={scrollPosition} />
          {/* <Link href="/">
            <div
              className={cn(
                rubik?.className,
                "sm:text-4xl text-2xl transition-all tracking-tighter uppercase duration-300"
              )}
            >
              {siteConfig.siteTitle}
            </div>
          </Link> */}
          <div
            className={`hidden ${
              scrollPosition > 0
                ? "flex-row-reverse gap-20 items-center justify-between"
                : "flex-col gap-4 items-end justify-evenly"
            } lg:flex transition-all duration-300`}
          >
            <div className="flex gap-8 items-center">
              <div className=" h-full">
                <ul className="flex gap-4 h-full">
                  <li className="h-full align-middle">
                    <InstagramLogoIcon className={style.icon} />
                  </li>
                  <li>
                    <GitHubLogoIcon className={style.icon} />
                  </li>
                  <li>
                    <TwitterLogoIcon className={style.icon} />
                  </li>
                </ul>
              </div>
              <SearchModal position={scrollPosition} />
            </div>
            <div>
              <ul className="flex gap-6 uppercase font-bold text-sm">
                <NavLinks className="hover:opacity-50" />
              </ul>
            </div>
          </div>
          <button
            className=" lg:hidden hover:opacity-50"
            onClick={() => {
              setIsMobile((prev) => !prev);
            }}
          >
            {isMobile ? (
              <Cross1Icon
                width={24}
                height={24}
                className=""
                onClick={(e) => {}}
              />
            ) : (
              <HamburgerMenuIcon width={24} height={24} />
            )}
          </button>
        </div>
      </div>
      <ul
        className={cn(
          "z-50 fixed top-0 h-full w-full mt-[64px] transition-transform duration-300 sm:mt-[72px] backdrop-blur-sm bg-white bg-opacity-50 justify-start flex-col items-center pt-14",
          isMobile ? "flex translate-x-0" : " -translate-x-full block"
        )}
      >
        <NavLinks
          className="h-10 bg-opacity-50 py-10 text-gray-800 flex justify-center items-center hover:text-white hover:bg-black hover:bg-opacity-75 cursor-pointer w-full uppercase font-semibold"
          setIsMobile={setIsMobile}
        />
      </ul>
    </nav>
  );
}

export default Navbar;

const Logo = ({ scrollPosition }: { scrollPosition: number }) => {
  return (
    <Link href="/">
      <div
        className={cn(
          rubik?.className,
          "sm:text-4xl text-2xl transition-all tracking-tight uppercase duration-300 flex items-center",
          "border-4 border-current border-dashed rounded-lg px-2 text-opacity-75 border-opacity-70"
          // scrollPosition > 0 ? " border-white" : ""
        )}
      >
        <span>Trail W</span>
        {scrollPosition ? (
          <Hiker className="w-9 h-9 -mx-1 mb-1" />
        ) : (
          <Hiker className="w-9 h-9 -mx-1 mb-1 stroke-white" />
        )}
        <span>sdom</span>
      </div>
    </Link>
  );
};
