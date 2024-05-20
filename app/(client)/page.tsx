import Hero from "@/components/Hero";
import NewsletterForm from "@/components/NewsletterForm";
import PostListComponent from "@/components/PostListComponent";
import { client } from "@/sanity/lib/client";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { siteConfig } from "../constants";

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
        mainImage={siteConfig.mainImages.homeImage}
        title={siteConfig.siteTitle}
        subtitle={siteConfig.siteSubtitle}
        imageAlt="Man on a hill"
      />
      <div className="bg-white">
        <section className=" bg-gradient-to-r from-white  to-gray-200 flex flex-col justify-center items-center gap-2 py-20 font-karla">
          <EnvelopeClosedIcon className="w-6 h-6" />
          <h2 className="text-4xl uppercase pt-4 pb-4 font-medium">
            Recent Posts
          </h2>

          <p className="text-xl pb-10 px-8 text-center">
            Recent adventures, wellbeing-tips and reviews.
          </p>
          {posts?.length > 0 ? (
            <PostListComponent posts={posts.slice(0, 3)} />
          ) : (
            "No posts at the moment, :'("
          )}
        </section>

        <section className="bg-gray-300 flex h-fit">
          <div className="w-3/4 sm:w-1/2 py-12 px-10 max-w-[400px] m-auto">
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
