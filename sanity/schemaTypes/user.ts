import { defineField, defineType } from "sanity";
import { client } from "../lib/client";

const isUniqueEmail = async (email: string | undefined) => {
  const params = {
    email,
  };

  const numExistingUsers = await client
    .fetch('count(*[_type == "user" && email == $email])', params)
    .then((response) => response.json());

  return numExistingUsers === 0;
};

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "like" },
        },
      ],
    }),
    defineField({
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "comment" },
        },
      ],
    }),
  ],
});
