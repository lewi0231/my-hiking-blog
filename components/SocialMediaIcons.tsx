import React from "react";
import { FacebookIconWithColor, TwitterIconWithColor } from "./ui/icons";
import Link from "next/link";

const SocialMediaIcons = () => {
  return (
    <div className="flex gap-2">
      <Link href="">
        <FacebookIconWithColor />
      </Link>
      <TwitterIconWithColor />
    </div>
  );
};

export default SocialMediaIcons;
