import { defineField, defineType } from "sanity";

export default defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
    }),
    defineField({
      name: "parentComment",
      title: "Parent Comment",
      type: "reference",
      to: [{ type: "comment" }],
    }),
    defineField({
      name: "children",
      title: "Child Comments",
      type: "array",
      of: [{ type: "reference", to: { type: "comment" } }],
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "array",
      of: [{ type: "reference", to: { type: "like" } }],
    }),
  ],
});
