import { siteConfig } from "@/app/constants";

import { getPostQuery } from "@/app/utils/queries";
import Hero from "@/components/Hero";
import { PostContextProvider } from "@/context/PostContextProvider";
import { Comment, Post } from "@/lib/types";
import { client } from "@/sanity/lib/client";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LeftSidebar from "./left-sidebar";
import PostContent from "./post-content";
import RightSidebar from "./right-sidebar";

export type PostParams = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PostParams): Promise<Metadata> {
  const slug = params?.slug;
  const query = getPostQuery(slug);

  const post: Post = await client.fetch(query);

  return {
    title: post?.title,
    description: post?.excerpt,
    authors: [post?.author],
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      images: [post?.mainImage?.asset?.url],
      url: `${siteConfig.siteURL}/${post?.slug?.current}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.excerpt,
      creator: post?.author?.name,
      images: [
        {
          url: post?.mainImage?.asset?.url,
          width: 1200,
          height: 630,
          alt: "main post image",
        },
      ],
    },
  };
}

const getPost = async (slug: string) => {
  const query = getPostQuery(slug);
  const post = await client.fetch(query);

  return post;
};

const getComments = async (postId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comment")
    .select("*")
    .eq("post_id", postId);
  return data as Comment[];
};

export const revalidate = 60;

const PostPage = async ({ params }: PostParams) => {
  const post: Post = await getPost(params?.slug);
  const comments: Comment[] = await getComments(post?._id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article>
        {/* TODO - fix up the alt text in studio */}
        <Hero
          mainImage={post?.mainImage?.asset?.url}
          subtitle={post?.title}
          tags={post?.tags}
          imageAlt={post?.title}
        />
        <div className=" font-karla bg-gray-100 w-full py-10 px-2 sm:px-6 flex flex-col justify-center items-center h-full">
          <div className="flex gap-5 justify-center w-full sm:max-w-6xl h-full">
            <LeftSidebar
              wrapperClass="sticky top-24 sm:flex hidden flex-none max-w-12 h-32"
              post={post}
            />
            <PostContextProvider
              value={{ post, params, comments: comments || [] }}
            >
              <PostContent />
            </PostContextProvider>

            <RightSidebar
              wrapperClass="sm:block flex-grow-0 hidden flex-shrink-1 sm:w-[450px] min-w-1"
              authorImage={post?.author?.image?.asset?.url}
              authorName={post?.author?.name}
              authorBio={post?.author?.bio[0].children[0].text}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default PostPage;
