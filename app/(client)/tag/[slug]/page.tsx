import { getPostsByTagQuery } from "@/app/utils/queries";
import Header from "@/components/Header";
import PostListComponent from "@/components/PostListComponent";
import { Post } from "@/lib/types";
import { client } from "@/sanity/lib/client";

type Params = {
  params: {
    slug: string;
  };
};

const getPostsByTag = async (tag: string) => {
  const query = getPostsByTagQuery(tag);

  const posts = await client.fetch(query);

  return posts;
};

export const revalidate = 60;

const TagDetailsPage = async ({ params }: Params) => {
  const posts: Post[] = await getPostsByTag(params.slug);

  return (
    <div className=" bg-gradient-to-r to-slate-50 from-stone-200">
      <Header title={`#${params?.slug}`} />
      <div>{posts?.length > 0 ? <PostListComponent posts={posts} /> : ""}</div>
    </div>
  );
};

export default TagDetailsPage;
