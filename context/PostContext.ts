"use client";

import { PostParams } from "@/app/(client)/posts/[slug]/page";
import { Comment, CommentSchemaType, Post } from "@/lib/types";
import { createContext, useContext } from "react";

type Props = {
  post: Post;
  getReplies: (parentId: string | undefined) => Comment[];
  rootComments: Comment[];
  createLocalComment: (comment: CommentSchemaType) => void;
  postId: string;
} & PostParams;

export const PostContext = createContext<Props>({} as Props);

export const usePostContext = () => useContext(PostContext);
