import { siteConfig } from "@/app/constants";
import { Post } from "@/app/utils/Interface";
import { getPostQuery } from "@/app/utils/queries";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import { PostContextProvider } from "@/context/PostContextProvider";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
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

const PostPage = async ({ params }: PostParams) => {
  const post: Post = await getPost(params?.slug);
  const session = await auth();

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* <head>
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
      </head> */}
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
            <PostContextProvider value={{ post, params, session }}>
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
