import { Post } from "@/lib/types";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import PostCard from "../PostCard";

type Props = {
  posts: Post[];
  numPosts?: number;
};

const PostList = ({ posts, numPosts = posts.length ?? 0 }: Props) => {
  console.log("Posts are", posts);

  return (
    <section className=" bg-gradient-to-r from-white  to-gray-200 flex flex-col justify-center items-center gap-2 py-20 font-karla">
      <EnvelopeClosedIcon className="w-6 h-6" />
      <h2 className="text-4xl uppercase pt-4 pb-4 font-medium">Recent Posts</h2>

      <p className="text-xl pb-10 px-8 text-center">
        Recent adventures, wellbeing-tips and reviews.
      </p>
      {posts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-[90vw] justify-center items-start m-auto h-full gap-4">
          {posts.slice(0, numPosts).map((post: Post) => (
            <PostCard key={post?._id} post={post} imageClassName="rounded-lg" />
          ))}
        </div>
      ) : (
        "No posts at the moment, :'("
      )}
    </section>
  );
};

export default PostList;
