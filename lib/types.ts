import * as z from "zod";
import {
  CommentSchema,
  LoginSchema,
  RegisterSchema,
  SubscribeSchema,
} from "./validation";

export type LoginSchemaType = z.output<typeof LoginSchema>;

export type RegisterSchemaType = z.output<typeof RegisterSchema>;

export type SubscribeSchemaType = z.output<typeof SubscribeSchema>;

export type CommentSchemaType = z.output<typeof CommentSchema>;

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
  _createdAt: string;
  _updatedAt: string;
  mainImage: { asset: { url: string } };
}

export type Photo = {
  _id: string;
  _createdAt: string;
  image: {
    alt: string;
    asset: {
      url: string;
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
  updated_at?: string;
  created_at?: string;
  id: string;
  message: string;
  parent_id: string | null;
  user_id: string;
  post_id: string;
  email: string;
};

export type User = {
  _id?: string;
  name: string;
  email: string;
};

// export type LocalComment = {
//   _id: Comment["_id"];
//   message: Comment["message"];
//   _createdAt: Comment["_createdAt"];
//   user: User;
//   post: {
//     _ref: string;
//   };
//   parentComment: {
//     _id: string | null;
//   };
// } & Partial<Omit<Comment, "user">>;

/**
 * This combines two different type options LocalComment and actual Comment
 * This is used for optimistic updates.
 */
// export type CommentComposite = LocalComment | Comment;

export type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  timestamp: string;
  permalink: string;
};
