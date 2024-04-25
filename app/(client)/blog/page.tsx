import { Post } from "@/app/utils/Interface";
import { getAllPostsQuery } from "@/app/utils/queries";
import Hero from "@/components/Hero";
import PostListComponent from "@/components/PostListComponent";
import { client } from "@/sanity/lib/client";

async function getAllPosts() {
  const query = getAllPostsQuery();
  const posts = await client.fetch(query);
  return posts;
}

export const revalidate = 60;

const BlogPage = async () => {
  const posts: Post[] = await getAllPosts();

  return (
    <div className=" ">
      <Hero
        mainImage={"/star_gazing.jpeg"}
        subtitle="Blog."
        textPosition="bottom-left"
      />

      <div className=" bg-gradient-to-r via-gray-300 to-gray-100 from-white py-20">
        {posts?.length > 0 ? (
          <PostListComponent posts={posts} />
        ) : (
          "No posts at the moment, :'("
        )}
      </div>
    </div>
  );
};

export default BlogPage;
