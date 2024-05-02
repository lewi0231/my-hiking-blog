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
  _updatedAt: string;
  _createdAt: string;
  _id: string;
  message: string;
  parentComment: {
    _id: string | null;
  };
  children: Array<{ _id: string }>;
  likes: Array<{ _id: string }>;
  user: Required<User>;
  post: {
    _ref: string;
  };
};

export type User = {
  _id?: string;
  name: string;
  email: string;
};

export type LocalComment = {
  _id: Comment["_id"];
  message: Comment["message"];
  _createdAt: Comment["_createdAt"];
  user: User;
  post: {
    _ref: string;
  };
  parentComment: {
    _id: string | null;
  };
} & Partial<Omit<Comment, "user">>;

/**
 * This combines two different type options LocalComment and actual Comment
 * This is used for optimistic updates.
 */
export type CommentComposite = LocalComment | Comment;
