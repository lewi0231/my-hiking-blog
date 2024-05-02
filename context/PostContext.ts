"use client";

import { PostParams } from "@/app/(client)/posts/[slug]/page";
import { CommentComposite, CommentSchemaType, Post } from "@/lib/types";
import { Session } from "next-auth";
import { createContext, useContext } from "react";

type Props = {
  post: Post;
  getReplies: (parentId: string | undefined) => CommentComposite[];
  rootComments: CommentComposite[];
  session: Session | null;
  createLocalComment: (comment: CommentSchemaType) => void;
  postId: string;
} & PostParams;

export const PostContext = createContext<Props>({} as Props);

export const usePostContext = () => useContext(PostContext);
