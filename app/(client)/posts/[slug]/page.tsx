import { Post, Tag } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Params = {
  params: {
    slug: string;
  };
};

export const getPost = async (slug: string) => {
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
    <div className="">
      <div>
        <Image
          src={post.mainImage.asset.url}
          width={500}
          height={500}
          alt="Post"
        />
      </div>
      <h1>{post?.title}</h1>
      <div>
        {post?.tags.map((tag: Tag) => (
          <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
            <span>{tag.name}</span>
          </Link>
        ))}
      </div>
      <PortableText value={post?.body} components={myPortableTextComponents} />
    </div>
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
