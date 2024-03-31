import { client } from "@/sanity/lib/client";
import React from "react";
import { Tag } from "@/app/utils/Interface";
import Link from "next/link";
import Header from "@/components/Header";

const getAllTags = async () => {
  const query = `
    *[_type == "tag"]{
      _id,
      name,
      slug,
      "postCount": count(*[_type == "post" && references("tags", ^._id)])

    }
  `;
  const tags = client.fetch(query);
  return tags;
};

export const revalidate = 60;

const TagPage = async () => {
  const tags: Tag[] = await getAllTags();

  return (
    <div>
      <Header title="TAGS" />

      <div className="flex gap-10 justify-center">
        {tags.map((tag: Tag) => (
          <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
            #{tag?.name} ({tag?.postCount})
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagPage;
