export interface Post {
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any;
  author: { _id: string; name: string; image: { asset: { url: string } } };
  tags: Array<Tag>;
  publishedAt: string;
  mainImage: { asset: { url: string } };
  _id: string;
}

export type Photo = {
  _id: string;
  _createdAt: string;
  image: {
    asset: {
      url: string;
      alt: string;
    };
  };
};

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}
