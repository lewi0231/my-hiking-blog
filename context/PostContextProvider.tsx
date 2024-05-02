"use client";

import { PostParams } from "@/app/(client)/posts/[slug]/page";
import {
  CommentComposite,
  CommentSchemaType,
  LocalComment,
  Post,
} from "@/lib/types";
import { Session } from "next-auth";
import { useEffect, useMemo, useState } from "react";
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
  const [comments, setComments] = useState<CommentComposite[]>([]);
  const commentsByParentId = useMemo(() => {
    const group: Record<string | number, CommentComposite[]> = {};

    comments.forEach((comment) => {
      const parentId = comment?.parentComment?._id ?? NO_PARENT_KEY;
      group[parentId] ||= [];
      group[parentId].push(comment);
    });

    return group;
  }, [comments]);

  function createLocalComment({
    commentId,
    comment,
    postId,
    userName,
    userEmail,
    parentId,
  }: CommentSchemaType) {
    const newLocalComment: LocalComment = {
      _id: commentId,
      message: comment,
      _createdAt: new Date().toISOString(),
      user: {
        email: userEmail,
        name: userName,
      },
      post: {
        _ref: postId,
      },
      parentComment: {
        _id: parentId,
      },
    };
    setComments((prevComments) => {
      return [newLocalComment, ...prevComments];
    });
  }

  useEffect(() => {
    if (value?.post?.comments == null) return;
    setComments(value.post.comments);
  }, [value?.post?.comments]);

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
