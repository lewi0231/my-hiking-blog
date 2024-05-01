import { raleway } from "@/app/utils/fonts";
import { Post } from "@/app/utils/Interface";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface Props {
  post: Post;
  imageClassName?: string;
}

const PostCard = ({ post, imageClassName }: Props) => {
  const imgSource = post?.mainImage?.asset?.url;

  return (
    <div className={cn("", raleway.className)}>
      <div className="w-full cursor-pointer ">
        <Link
          href={`/posts/${post?.slug?.current}`}
          className="hover:opacity-75"
        >
          <Image
            src={imgSource}
            width={1000}
            height={1000}
            alt="test"
            className={cn("p-2 hover:shadow-sm", imageClassName)}
          />
        </Link>

        <Link
          className="text-left hover:underline hover:opacity-75"
          href={`/posts/${post?.slug?.current}`}
        >
          <h2 className="text-2xl py-1 capitalize font-light px-2">
            {post?.title}
          </h2>
        </Link>
        <div className="px-2">
          <p className="tracking-tight font-light inline text-sm pr-4">
            {post.excerpt}
          </p>
          <div className="py-2 gap-2 inline-flex">
            {post?.tags?.map((tag) => (
              <Badge
                variant="secondary"
                className="px-1 text-xs hover:shadow-md hover:opacity-75"
                key={tag._id}
              >
                <Link href={`/tag/${tag?.slug.current}`} className="">
                  #{tag?.name}
                </Link>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
