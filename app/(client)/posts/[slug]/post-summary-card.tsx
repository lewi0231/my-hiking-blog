"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePostContext } from "@/context/PostContext";
import { format, parseISO } from "date-fns";
import Link from "next/link";

type Props = {
  excerpt: string;
  author: string;
  date: string;
  authorImage: string;
  slug: string;
};

const PostSummaryCard = () => {
  const { post } = usePostContext() ?? {};

  return (
    <div className="flex flex-col text-justify gap-4">
      <h4 className=" font-semibold text-lg leading-snug tracking-wide text-gray-700 italic">
        {post?.excerpt}
      </h4>
      <p className="my-4 flex items-center gap-2 text-md">
        <Avatar>
          <AvatarImage
            src={post?.author?.image?.asset?.url}
            alt={`Image of ${post?.author?.name ?? "author"}`}
          />
          <AvatarFallback>By</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-blue-600">
          <Link href="/about">{post?.author?.name}</Link>
        </span>
        <span className=" text-gray-600">|</span>
        <span className="font-semibold text-gray-800">
          {format(parseISO(post?.publishedAt ?? ""), "do MMMM yyyy")}
        </span>
      </p>
    </div>
  );
};

export default PostSummaryCard;
