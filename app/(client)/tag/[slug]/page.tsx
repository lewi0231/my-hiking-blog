import { Post } from "@/app/utils/Interface";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import PostListComponent from "@/components/PostListComponent";
import { client } from "@/sanity/lib/client";
import React from "react";

type Params = {
  params: {
    slug: string;
  };
};

const getPostsByTag = async (tag: string) => {
  const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
        title,
        slug,
        body,
        publishedAt,
        author->{
            _id,
            name,
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

    }
  `;

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
