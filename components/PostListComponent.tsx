import { Post } from "@/app/utils/Interface";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

const PostListComponent = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-3 w-[90vw] justify-center items-start m-auto h-screen gap-4">
      {posts.map((post: Post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostListComponent;
