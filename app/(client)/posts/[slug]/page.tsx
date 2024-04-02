import { Post, Tag } from "@/app/utils/Interface";
import Hero from "@/components/Hero";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import PostSummaryCard from "./post-summary-card";
import { Separator } from "@/components/ui/separator";
import LeftSidebar from "./left-sidebar";
import RightSidebar from "./right-sidebar";

type Params = {
  params: {
    slug: string;
  };
};

const getPost = async (slug: string) => {
  const query = `
       *[_type == "post" && slug.current == "${slug}"]{
            title,
            slug,
            body,
            publishedAt,
            excerpt,
            author->{
                _id,
                name,
                image{
                  asset->{
                    url
                  }
                }
            },
            tags[]->{
                _id,
                name,
                slug
            },
             mainImage{
                asset->{
                    url
                }
            }

        }[0]
    `;

  const post = await client.fetch(query);
  return post;
};

export const revalidate = 60;

const PostPage = async ({ params }: Params) => {
  const post: Post = await getPost(params?.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <Hero
        mainImage={post.mainImage.asset.url}
        title={post?.title}
        textClass="uppercase"
        tags={post?.tags}
      />
      <div className=" bg-gray-100 w-full py-10 px-2 sm:px-6 flex justify-center h-full">
        <div className="flex gap-5 justify-center w-full sm:max-w-6xl h-full">
          <LeftSidebar wrapperClass="sticky top-24 sm:flex hidden flex-none max-w-12 h-32" />
          <main className=" pt-14 bg-gray-50 px-10 rounded-md shadow-md flex-shrink-1 flex-grow-0 w-full sm:w-[1000px] min-w-0">
            <PostSummaryCard
              author={post?.author.name}
              excerpt={post?.excerpt}
              date={post?.publishedAt}
              authorImage={post?.author?.image?.asset?.url}
            />
            <Separator className="mt-10" />
            <section className="w-full prose-p:tracking-normal prose-headings:font-semibold prose-headings:mt-10 prose-headings:uppercase prose-headings:text-2xl m-auto prose-p:my-4 py-6 text-gray-800 text-lg prose-p:text-justify pb-10">
              <PortableText
                value={post?.body}
                components={myPortableTextComponents}
              />
            </section>
          </main>
          <RightSidebar
            wrapperClass="sm:block flex-grow-0 hidden flex-shrink-1 sm:w-[450px] min-w-1"
            authorImage={post?.author?.image?.asset?.url}
            authorName={post?.author?.name}
          />
        </div>
      </div>
    </article>
  );
};

export default PostPage;

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image src={urlForImage(value)} alt="Post" width={700} height={700} />
    ),
  },
};

// TODO - not currently used - may need elsewhere
const richTextStyles = `
  mt-14
  text-justify
  w-1/2
  m-auto
  prose-headings:my-5
  prose-headings:text-2xl
  prose-p:my-6

`;
