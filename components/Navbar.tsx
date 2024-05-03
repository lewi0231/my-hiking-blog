"use client";

import { inter } from "@/app/utils/fonts";
import { cn } from "@/lib/utils";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
// @ts-ignore
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import SocialMediaIcons from "./SocialMediaIcons";

const NavLinks = ({
  className,
  setIsMobile,
}: {
  className: string;
  setIsMobile?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <li className={cn("w-full")}>
        <Link
          href="/"
          className={cn(
            "w-full text-2xl h-full transition-all duration-300 bg-opacity-50  flex justify-center items-center cursor-pointer  py-10 lg:py-0",
            "lg:text-xl ",
            className
          )}
          onClick={() => {
            if (setIsMobile) setIsMobile(false);
          }}
        >
          Home.
        </Link>
      </li>
      <li className={cn(" w-full")}>
        <Link
          href="/blog"
          className={cn(
            "w-full text-2xl h-full transition-all duration-300 bg-opacity-50  flex justify-center items-center cursor-pointer py-10 lg:py-0",
            "lg:text-xl lg:hover:text-[1rem]",
            className
          )}
          onClick={() => {
            if (setIsMobile) setIsMobile(false);
          }}
        >
          Blog.
        </Link>
      </li>

      <li className={cn(" w-full")}>
        <Link
          href="/gallery"
          className={cn(
            "w-full text-2xl h-full transition-all duration-300 bg-opacity-50 flex justify-center items-center cursor-pointer   py-10 lg:py-0",
            "lg:text-xl lg:hover:text-[1rem]",
            className
          )}
          onClick={() => {
            if (setIsMobile) setIsMobile(false);
          }}
        >
          Photos.
        </Link>
      </li>
      <li className={cn(" w-full")}>
        <Link
          href="/about"
          className={cn(
            "w-full text-2xl h-full transition-all duration-300 bg-opacity-50  flex justify-center items-center cursor-pointer  py-10 lg:py-0",
            "lg:text-xl lg:hover:text-[1rem]",
            className
          )}
          onClick={() => {
            if (setIsMobile) setIsMobile(false);
          }}
        >
          About.
        </Link>
      </li>
    </>
  );
};

const style = {
  icon: "h-full hover:opacity-50 cursor-pointer hover:-translate-y-1 transition-all duration-300",
};

type Props = {
  className: string;
};

function Navbar({ className }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isDarkBackground = pathname === "/blog";

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
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <nav className="relative ">
      <div
        className={cn(
          `w-full bg-transparent px-10 sm:px-20 py-4 h-fit z-20 transition duration-300 `,
          scrollPosition > 0
            ? " bg-gradient-to-r from-white via-gray-100 to-white shadow-sm py-2"
            : "",
          className
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center h-full",
            inter?.className
          )}
        >
          <Logo
            scrollPosition={scrollPosition}
            className={
              isDarkBackground && scrollPosition === 0
                ? "text-white"
                : "text-black"
            }
          />
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
                ? "flex-row-reverse w-1/2 items-center justify-between"
                : "flex-col gap-4 items-end justify-evenly"
            } lg:flex transition-all duration-300`}
          >
            <div className="flex gap-8 items-center ml-20">
              <div className=" h-full">
                <SocialMediaIcons
                  scrollPosition={scrollPosition}
                  isDarkBackground={isDarkBackground}
                />
              </div>
              <SearchModal position={scrollPosition} />
            </div>
            <div>
              <ul className="flex gap-14 font-normal uppercase tracking-wide ">
                <NavLinks
                  className={cn(
                    "hover:opacity-50 ",
                    " border-b-2 border-transparent  hover:bg-transparent",
                    isDarkBackground && scrollPosition === 0
                      ? "text-white hover:text-opacity-70 hover:border-b-white"
                      : "hover:text-black hover:border-b-gray-700 ",
                    scrollPosition
                      ? "lg:text-sm lg:hover:text-[1rem]"
                      : "lg:hover:text-[1.3rem]"
                  )}
                />
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
                width={28}
                height={28}
                className=""
                color={isDarkBackground && !scrollPosition ? "white" : "black"}
                onClick={(e) => {}}
              />
            ) : (
              <HamburgerMenuIcon
                color={isDarkBackground && !scrollPosition ? "white" : "black"}
                width={28}
                height={28}
              />
            )}
          </button>
        </div>
      </div>
      <ul
        className={cn(
          "z-50 fixed top-200 w-full h-full transition-all duration-300 backdrop-blur-sm backdrop-brightness-125 justify-start flex-col items-center pt-0",
          scrollPosition ? "mt-[48px] sm:mt-[76px]" : "mt-[64px] sm:mt-[92px]",
          isMobile ? "flex translate-x-0" : " -translate-x-full block"
        )}
      >
        <NavLinks
          className={cn(
            "hover:text-white  hover:bg-black hover:bg-opacity-75 z-50"
          )}
          setIsMobile={setIsMobile}
        />
      </ul>
    </nav>
  );
}

export default Navbar;

const Logo = ({
  scrollPosition,
  className,
}: {
  scrollPosition: number;
  className: string;
}) => {
  return (
    <Link href="/">
      <div
        className={cn(
          // eastSeaDokdo?.className,
          "sm:text-6xl text-2xl transition-all tracking-tight duration-300 flex items-center",
          "hover:opacity-75 hover:text-[3.85rem] border-opacity-70 transition-all duration-300",
          className,
          "font-east-sea-dokdo"
        )}
      >
        {/* <Image
          src="/logo-light.png"
          width={250}
          height={250}
          alt="Trail Wisdom Logo"
          className="hover:opacity-50 transition-all duration-300"
        /> */}
        Trail Wisdom.
      </div>
    </Link>
  );
};
