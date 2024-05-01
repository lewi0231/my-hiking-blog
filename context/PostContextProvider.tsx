"use client";

import { PostParams } from "@/app/(client)/posts/[slug]/page";
import { Comment, Post } from "@/app/utils/Interface";
import { Session } from "next-auth";
import { useMemo } from "react";
import { PostContext } from "./PostContext";

type Props = {
  value: {
    post: Post;
    session: Session | null;
  } & PostParams;
  children: React.ReactNode;
};

const NO_PARENT_KEY = 0;

export const PostContextProvider = ({ children, value }: Props) => {
  const commentsByParentId = useMemo(() => {
    if (value.post?.comments == null) return {};
    const group: Record<string | number, Comment[]> = {};

    value.post.comments.forEach((comment) => {
      const parentId = comment?.parentComment?._id ?? NO_PARENT_KEY;
      group[parentId] ||= [];
      group[parentId].push(comment);
    });

    return group;
  }, [value?.post?.comments]);

  function getReplies(parentId: string) {
    return commentsByParentId[parentId];
  }

  return (
    <PostContext.Provider
      value={{
        ...value,
        getReplies,
        rootComments: commentsByParentId[NO_PARENT_KEY],
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
