"use client";

import { siteConfig } from "@/app/constants";
import { Post } from "@/app/utils/Interface";
import TooltipWrapper from "@/components/TooltipWrapper";
import {
  FacebookIconWithColor,
  TwitterIconWithColor,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

import {
  EmailIcon,
  EmailShareButton,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";

type Props = {
  wrapperClass: string;
  post: Post;
};
// TODO - need to add reaction functionality - in future might want add more share options
const LeftSidebar = ({ wrapperClass, post }: Props) => {
  const { siteURL } = siteConfig;
  const { slug, mainImage } = post;

  return (
    <aside
      className={cn(
        "pt-14 flex flex-col items-center justify-center gap-4 mr-2",
        wrapperClass
      )}
    >
      <TooltipWrapper label="Share to facebook">
        <FacebookShareButton
          url={`${siteURL}/posts/${slug.current}`}
          className="hover:opacity-50"
        >
          <FacebookIconWithColor />
        </FacebookShareButton>
      </TooltipWrapper>
      <TooltipWrapper label="Share to Twitter">
        <TwitterShareButton
          url={`${siteURL}/posts/${slug.current}`}
          className="hover:opacity-50"
        >
          <TwitterIconWithColor />
        </TwitterShareButton>
      </TooltipWrapper>
      <TooltipWrapper label="Share to Pinterest">
        <PinterestShareButton
          url={`${siteURL}/posts/${slug.current}`}
          media={mainImage?.asset?.url}
          className="hover:opacity-50"
        >
          <PinterestIcon className="rounded-md w-7 h-7" />
        </PinterestShareButton>
      </TooltipWrapper>
      <TooltipWrapper label="Share via Email">
        <EmailShareButton
          url={`${siteURL}/posts/${slug.current}`}
          className="hover:opacity-50"
        >
          <EmailIcon className="rounded-md w-7 h-7" />
        </EmailShareButton>
      </TooltipWrapper>
    </aside>
  );
};

export default LeftSidebar;
