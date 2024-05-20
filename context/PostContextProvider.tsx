"use client";

import { PostParams } from "@/app/(client)/posts/[slug]/page";
import { Comment, CommentSchemaType, Post } from "@/lib/types";

import { useEffect, useMemo, useState } from "react";
import { PostContext } from "./PostContext";

type Props = {
  value: {
    post: Post;
    comments: Comment[];
  } & PostParams;
  children: React.ReactNode;
};

const NO_PARENT_KEY = 0;

export const PostContextProvider = ({ children, value }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const commentsByParentId = useMemo(() => {
    const group: Record<string | number, Comment[]> = {};

    comments.forEach((comment) => {
      const parentId = comment?.parent_id ?? NO_PARENT_KEY;
      group[parentId] ||= [];
      group[parentId].push(comment);
    });

    return group;
  }, [comments]);

  function createLocalComment({
    commentId,
    message,
    postId,
    email,
    parentId,
    userId,
  }: CommentSchemaType) {
    const newLocalComment: Comment = {
      id: commentId,
      message,
      created_at: new Date().toISOString(),
      user_id: userId,
      post_id: postId,
      parent_id: parentId,
      email,
    };
    setComments((prevComments) => {
      return [newLocalComment, ...prevComments];
    });
  }

  useEffect(() => {
    if (value?.comments == null) return;
    setComments(value.comments);
  }, [value?.comments]);

  function getReplies(parentId: string | undefined) {
    if (!parentId) return [];
    return commentsByParentId[parentId];
  }

  return (
    <PostContext.Provider
      value={{
        ...value,
        getReplies,
        rootComments: commentsByParentId[NO_PARENT_KEY],
        createLocalComment,
        postId: value?.post?._id,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
