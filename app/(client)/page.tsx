import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Header from "@/components/Header";
import { Post } from "../utils/Interface";
import PostComponent from "@/components/PostCard";
import Hero from "@/components/Hero";
import PostListComponent from "@/components/PostListComponent";

async function getPosts() {
  const query = `
    *[_type == "post"]{
      title,
      slug,
      publishedAt,
      excerpt,
      _id,
      tags[]-> {
        _id,
        name,
        slug
      },
      mainImage{
        asset->{
            url
        }
      }
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <div>
      <Hero />
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
