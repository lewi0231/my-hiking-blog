import { Post } from "@/app/utils/Interface";
import { getPostsByTagQuery } from "@/app/utils/queries";
import Header from "@/components/Header";
import PostListComponent from "@/components/PostListComponent";
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
    <div>
      <Header title={`#${params?.slug}`} />
      <div>{posts?.length > 0 ? <PostListComponent posts={posts} /> : ""}</div>
    </div>
  );
};

export default TagDetailsPage;
