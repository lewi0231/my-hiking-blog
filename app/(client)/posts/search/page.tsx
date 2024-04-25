import { getAllPostsQuery } from "@/app/utils/queries";
import { filterPostsByText } from "@/app/utils/utils";
import Header from "@/components/Header";
import PostListComponent from "@/components/PostListComponent";
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
    <main>
      <div className=" bg-white">
        <Header title="Search Results" />
        {posts?.length > 0 ? (
          <PostListComponent posts={posts} />
        ) : (
          "No posts at the moment, :'("
        )}
      </div>
    </main>
  );
};

export default SearchResultPage;
