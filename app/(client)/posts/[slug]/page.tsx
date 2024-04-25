import { siteConfig } from "@/app/constants";
import { Post } from "@/app/utils/Interface";
import { getPostQuery } from "@/app/utils/queries";
import Hero from "@/components/Hero";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import LeftSidebar from "./left-sidebar";
import PostSummaryCard from "./post-summary-card";
import RightSidebar from "./right-sidebar";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params?.slug;
  const query = getPostQuery(slug);

  const post: Post = await client.fetch(query);

  return {
    title: post.title,
    description: post.excerpt,
    authors: [post.author],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post?.mainImage?.asset?.url],
      url: `${siteConfig.siteURL}/${post.slug.current}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.excerpt,
      images: [post?.mainImage?.asset?.url],
    },
  };
}

const getPost = async (slug: string) => {
  const query = getPostQuery(slug);

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
    <>
      <head>
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.excerpt} />
        <meta property="og:image" content={post?.mainImage?.asset?.url} />
        <meta
          property="og:url"
          content={`${siteConfig.siteURL}/posts/${post?.slug.current}`}
        />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={post?.excerpt} />
        <meta name="twitter:image" content={post?.mainImage?.asset?.url} />
      </head>
      <article>
        <Hero
          mainImage={post.mainImage.asset.url}
          subtitle={post?.title}
          tags={post?.tags}
        />
        <div className=" bg-gray-100 w-full py-10 px-2 sm:px-6 flex flex-col justify-center items-center h-full">
          <div className="flex gap-5 justify-center w-full sm:max-w-6xl h-full">
            <LeftSidebar
              wrapperClass="sticky top-24 sm:flex hidden flex-none max-w-12 h-32"
              post={post}
            />
            <main className=" pt-14 bg-gray-50 px-10 rounded-md shadow-md flex-shrink-1 flex-grow-0 w-full sm:w-[1000px] min-w-0">
              <PostSummaryCard
                author={post?.author.name}
                excerpt={post?.excerpt}
                date={post?.publishedAt}
                authorImage={post?.author?.image?.asset?.url}
                slug={params?.slug}
              />
              <Separator className="mt-10" />
              <section className="w-full prose-p:tracking-normal prose-headings:font-semibold prose-headings:mt-10 prose-headings:uppercase prose-headings:text-2xl m-auto prose-p:my-4 py-6 text-gray-800 text-lg prose-p:text-justify pb-10">
                <PortableText
                  value={post?.body}
                  components={myPortableTextComponents}
                />
              </section>
              <Separator className="my-4" />
              <div>
                <h1 className="text-2xl uppercase py-10 font-semibold">
                  Comments
                </h1>
              </div>
            </main>
            <RightSidebar
              wrapperClass="sm:block flex-grow-0 hidden flex-shrink-1 sm:w-[450px] min-w-1"
              authorImage={post?.author?.image?.asset?.url}
              authorName={post?.author?.name}
            />
          </div>
        </div>
      </article>
    </>
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
