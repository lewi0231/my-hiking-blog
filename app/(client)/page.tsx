import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Header from "@/components/Header";
import { Post } from "../utils/Interface";
import PostComponent from "@/components/PostCard";
import Hero from "@/components/Hero";
import PostListComponent from "@/components/PostListComponent";
import { getAllPostsQuery } from "../utils/queries";
import { siteConfig } from "../constants";

async function getAllPosts() {
  const query = getAllPostsQuery();
  const posts = await client.fetch(query);
  return posts;
}

export const revalidate = 60;

export default async function Home() {
  const posts: Post[] = await getAllPosts();

  return (
    <div>
      <Hero
        mainImage={siteConfig.mainImages.homeImage}
        title={siteConfig.siteTitle}
        subtitle={siteConfig.siteSubtitle}
      />
      <div className=" bg-white">
        <Header title="Blog Posts" />
        {posts?.length > 0 ? (
          <PostListComponent posts={posts} />
        ) : (
          "No posts at the moment, :'("
        )}
      </div>
    </div>
  );
}
