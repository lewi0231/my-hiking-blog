import Hero from "@/components/Hero";
import NewsletterForm from "@/components/NewsletterForm";
import { client } from "@/sanity/lib/client";
import { siteConfig } from "../constants";

import PostList from "@/components/posts/PostList";
import { Post } from "@/lib/types";
import Image from "next/image";
import { getAllPostsQuery } from "../utils/queries";

async function getAllPosts() {
  const query = getAllPostsQuery();
  const posts = await client.fetch(query);
  return posts;
}

export const revalidate = 60;

export default async function Home() {
  const posts: Post[] = await getAllPosts();

  return (
    <article>
      <Hero
        mainImage={siteConfig.featuredImages.homeImage.url}
        title={siteConfig.siteTitle}
        subtitle={siteConfig.siteSubtitle}
        imageAlt={siteConfig.featuredImages.homeImage.alt}
      />
      <div className="bg-white">
        <PostList posts={posts} numPosts={3} />

        <section className="bg-gray-300 flex h-fit">
          <div className="w-3/4 sm:w-2/3 py-12 px-10 max-w-[500px] m-auto">
            <NewsletterForm
              columnInputs={false}
              label="Stay up to date"
              className="uppercase"
            />
          </div>
          <Image
            width={500}
            height={500}
            src={"/star_gazing.jpeg"}
            alt={"Image of the stars"}
            className="w-1/2 hidden sm:block"
            priority
          />
        </section>
      </div>
    </article>
  );
}
