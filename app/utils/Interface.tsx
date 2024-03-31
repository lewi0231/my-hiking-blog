export interface Post {
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any;
  tags: Array<Tag>;
  publishedAt: string;
  mainImage: { asset: { url: string } };
  _id: string;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}
