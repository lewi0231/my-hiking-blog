import { Post } from "@/lib/types";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

const PostListComponent = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-[90vw] justify-center items-start m-auto h-full gap-4">
      {posts.map((post: Post) => (
        <PostCard key={post?._id} post={post} imageClassName="rounded-lg" />
      ))}
    </div>
  );
};

export default PostListComponent;
