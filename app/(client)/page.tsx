import Hero from "@/components/Hero";
import NewsletterForm from "@/components/NewsletterForm";
import PostListComponent from "@/components/PostListComponent";
import { client } from "@/sanity/lib/client";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { siteConfig } from "../constants";
import { Post } from "../utils/Interface";
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
      />
      <div className="bg-white">
        <section className=" bg-gradient-to-r from-white  to-gray-200 flex flex-col justify-center items-center gap-2 py-20 font-raleway">
          <EnvelopeClosedIcon className="w-6 h-6" />
          <h1 className="text-4xl uppercase pt-4 pb-4 font-medium">
            Recent Posts
          </h1>

          <p className="text-xl pb-10">
            My recent adventures and associated thoughts / learnings
          </p>
          {posts?.length > 0 ? (
            <PostListComponent posts={posts.slice(0, 3)} />
          ) : (
            "No posts at the moment, :'("
          )}
        </section>

        <section className="bg-gray-300">
          <NewsletterForm
            columnInputs={false}
            className="w-[85vw] m-auto py-12"
          />
        </section>
      </div>
    </article>
  );
}
