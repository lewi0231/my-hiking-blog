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
    <div className="w-full">
      <Link href={`/posts/${post?.slug?.current}`}>
        <Image
          src={imgSource}
          width={1000}
          height={1000}
          alt="test"
          // className="w-1/3"
        />
      </Link>

      <Link className="text-center" href={`/posts/${post?.slug?.current}`}>
        <h2 className="text-lg uppercase font-bold pt-4">{post?.title}</h2>
        {/* <p>{post?.publishedAt}</p> */}
        {/* <p>{post?.excerpt}</p> */}
      </Link>
      <div className="py-1 text-center flex gap-4 justify-center">
        {post?.tags.map((tag) => (
          <Badge variant="secondary" className="px-1 text-xs" key={tag._id}>
            <Link href={`/tag/${tag?.slug.current}`}>#{tag?.name}</Link>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
