export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any;
  author: {
    _id: string;
    name: string;
    bio: Array<{ children: Array<{ text: string }> }>;
    image: { asset: { url: string } };
  };
  tags: Array<Tag>;
  publishedAt: string;
  mainImage: { asset: { url: string } };
  comments: Comment[];
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

export type Comment = {
  created: string;
  _updatedAt: string;
  _id: string;
  message: string;
  parentComment: {
    _id: string;
  };
  children: Array<{ _id: string }>;
  likes: Array<{ _id: string }>;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};
