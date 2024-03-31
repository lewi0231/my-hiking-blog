import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Lilita_One } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  MagnifyingGlassIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });

const style = {
  icon: "h-full hover:opacity-50 cursor-pointer",
  nav: "hover:opacity-50",
};

type Props = {
  className: string;
};

function Navbar({ className }: Props) {
  return (
    <div
      className={cn(
        `w-full bg-transparent px-20 h-24 z-20 shadow-sm`,
        className
      )}
    >
      <div className="flex justify-between items-center h-full">
        <Link href="/">
          <div className={cn(font.className, "text-4xl")}>RecursiveTrails</div>
        </Link>
        <div className="flex flex-col items-end justify-evenly h-full">
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
            <div className=" relative w-full">
              <MagnifyingGlassIcon
                width={24}
                className="absolute top-0 left-0 z-10 text-black h-full opacity-25 pl-2"
              />

              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full max-w-xs pl-7 py-1 rounded-sm"
              />
            </div>
          </div>
          <div>
            <ul className="flex gap-6 uppercase font-bold text-lg">
              <li>
                <Link href="/about" className={style.nav}>
                  About
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/about" className={style.nav}>
                  Hikes
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/about" className={style.nav}>
                  Prep
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/about" className={style.nav}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
