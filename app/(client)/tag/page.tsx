import { client } from "@/sanity/lib/client";

import { getAllTagsQuery } from "@/app/utils/queries";
import Header from "@/components/Header";
import { Tag } from "@/lib/types";
import Link from "next/link";

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
