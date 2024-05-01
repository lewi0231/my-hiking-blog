"use client";

import { PostParams } from "@/app/(client)/posts/[slug]/page";
import { Comment, Post } from "@/app/utils/Interface";
import { Session } from "next-auth";
import { createContext, useContext } from "react";

type Props = {
  post: Post;
  getReplies: (parentId: string) => Comment[];
  rootComments: Comment[];
  session: Session | null;
} & PostParams;

export const PostContext = createContext<Props>({} as Props);

export const usePostContext = () => useContext(PostContext);
