import { Post } from "./Interface";

export const filterPostsByText = (posts: Post[], text: string) => {
  return posts
    .map((post) => {
      const titleCount =
        (post.title.toLowerCase().split(text.toLowerCase()).length - 1) * 3;
      const excerptCount =
        (post.excerpt.toLowerCase().split(text.toLowerCase()).length - 1) * 2;
      const bodyCount =
        (post.excerpt.toLowerCase().split(text.toLowerCase()).length - 1) * 1;

      return { ...post, count: titleCount + excerptCount + bodyCount };
    })
    .filter((post) => post.count > 0)
    .sort((a, b) => a.count - b.count);
};
