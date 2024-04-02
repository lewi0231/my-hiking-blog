import { Post } from "@/app/utils/Interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  console.log(post);
  const imgSource = post?.mainImage?.asset?.url;

  return (
    <div className="hover:shadow-xl">
      <div className="w-full cursor-pointer hover:underline hover:opacity-85">
        <Link href={`/posts/${post?.slug?.current}`}>
          <Image
            src={imgSource}
            width={1000}
            height={1000}
            alt="test"
            className="p-2"
          />
        </Link>

        <Link className="text-center" href={`/posts/${post?.slug?.current}`}>
          <h2 className="text-lg uppercase font-bold mt-1">{post?.title}</h2>
        </Link>
      </div>
      <div className="py-1 text-center flex gap-4 justify-center">
        {post?.tags.map((tag) => (
          <Badge
            variant="secondary"
            className="px-1 text-xs hover:shadow-lg hover:opacity-85"
            key={tag._id}
          >
            <Link href={`/tag/${tag?.slug.current}`}>#{tag?.name}</Link>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
