import { defineField, defineType } from "sanity";

export default defineType({
  name: "like",
  title: "Like",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "reference",
      to: [{ type: "comment" }],
    }),
  ],
});
