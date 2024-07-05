import { getAllPostsQuery } from "@/app/utils/queries";
import { filterPostsByText } from "@/app/utils/utils";
import Header from "@/components/Header";
import PostList from "@/components/posts/PostList";
import { client } from "@/sanity/lib/client";

type Params = {
  searchParams: {
    query: string;
  };
};

const getSearchResults = async (searchQuery: string) => {
  const query = getAllPostsQuery();
  const posts = await client.fetch(query);
  const filteredPosts = filterPostsByText(posts, searchQuery);
  return filteredPosts;
};

export const revalidate = 60;

const SearchResultPage = async ({ searchParams }: Params) => {
  const query = searchParams.query;

  const posts = await getSearchResults(query);

  return (
    <div className=" bg-white h-screen">
      <Header title="Search Results" />
      {posts?.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="px-20 text-xl text-center pb-20">
          No posts found matching that search.
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
