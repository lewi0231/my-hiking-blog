import { siteConfig } from "@/app/constants";
import { getAllPostsQuery } from "@/app/utils/queries";
import Hero from "@/components/Hero";
import PostList from "@/components/posts/PostList";
import { Post } from "@/lib/types";
import { client } from "@/sanity/lib/client";

async function getAllPosts() {
  const query = getAllPostsQuery();
  const posts = await client.fetch(query);
  return posts;
}

export const revalidate = 60;

const BlogPage = async () => {
  const posts: Post[] = await getAllPosts();
  const { url, alt } = siteConfig.featuredImages.blogImage;

  return (
    <div className=" ">
      <Hero
        mainImage={url}
        subtitle="Blog."
        textPosition="bottom-left"
        imageAlt={alt}
      />

      <div className=" bg-gradient-to-r via-gray-300 to-gray-100 from-white py-20">
        {posts?.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          "No posts at the moment, :'("
        )}
      </div>
    </div>
  );
};

export default BlogPage;
