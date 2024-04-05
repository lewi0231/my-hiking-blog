import { client } from "@/sanity/lib/client";
import React from "react";
import { Tag } from "@/app/utils/Interface";
import Link from "next/link";
import Header from "@/components/Header";
import { getAllTagsQuery } from "@/app/utils/queries";

const getAllTags = async () => {
  const query = getAllTagsQuery();
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
