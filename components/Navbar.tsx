import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Inter, Rubik_Dirt } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  MagnifyingGlassIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import InputIconOverlay from "./ui/input-icon-overlay";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const inter = Inter({ weight: "400", subsets: ["latin"] });
const rubik = Rubik_Dirt({ weight: "400", subsets: ["latin"] });

const style = {
  icon: "h-full hover:opacity-50 cursor-pointer",
  nav: "hover:opacity-50",
};

type Props = {
  className: string;
  position: number;
};

function Navbar({ className, position }: Props) {
  return (
    <div
      className={cn(
        `w-full bg-transparent px-20 py-4 h-fit z-20 shadow-sm`,
        className
      )}
    >
      <div
        className={cn(
          "flex justify-between items-center h-full",
          inter?.className
        )}
      >
        <Link href="/">
          <div className={cn(rubik?.className, "text-4xl")}>
            RecursiveTrails
          </div>
        </Link>
        <div
          className={`hidden ${
            position > 0
              ? "flex-row-reverse gap-20 items-center justify-between"
              : "flex-col gap-4 items-end justify-evenly"
          } lg:flex transition-all duration-200`}
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
            <SearchModal position={position} />
          </div>
          <div>
            <ul className="flex gap-6 uppercase font-bold text-sm">
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

const SearchModal = ({ position }: Pick<Props, "position">) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="btn">
            <InputIconOverlay
              Icon={MagnifyingGlassIcon}
              iconClass={
                position > 0
                  ? "opacity-100 text-white"
                  : "opacity-25 text-black"
              }
              overlayIcon={position === 0}
            />
          </button>
        </DialogTrigger>
        <DialogContent>
          <Input
            type="text"
            className={cn(
              "w-5/6 p-2 text-xl text-input h-16 ",
              inter.className
            )}
            placeholder="Search..."
            autoFocus
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
