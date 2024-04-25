import { client } from "@/sanity/lib/client";

export function createComment(postId: string, user: string) {
  client.create({
    _type: "comment",
  });
}
